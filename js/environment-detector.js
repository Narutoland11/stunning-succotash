/**
 * Environment Detector para Moz Doctor Dose
 * Detecta automaticamente o ambiente de execução (local PHP ou Netlify estático)
 * e configura as funções apropriadas para cada ambiente
 */

const EnvironmentDetector = {
    // Variáveis de estado
    isNetlify: false,
    isLocalPHP: false,
    
    // Inicializa a detecção
    init: function() {
        // Verifica se está no Netlify (com base no header especial ou URL)
        if (
            window.location.hostname.includes('netlify.app') || 
            document.querySelector('meta[name="netlify"]')
        ) {
            console.log('Ambiente Netlify detectado');
            this.isNetlify = true;
            this.setupNetlifyEnvironment();
            return;
        }
        
        // Verifica se o ambiente PHP está disponível
        this.checkPHPAvailability()
            .then(available => {
                if (available) {
                    console.log('Ambiente PHP local detectado');
                    this.isLocalPHP = true;
                    this.setupPHPEnvironment();
                } else {
                    console.log('PHP indisponível, usando Firebase como fallback');
                    this.isNetlify = true;
                    this.setupNetlifyEnvironment();
                }
            });
    },
    
    // Verifica se o PHP está respondendo
    checkPHPAvailability: function() {
        return fetch('ping.php', {
            method: 'HEAD',
            cache: 'no-store'
        })
        .then(response => response.ok)
        .catch(error => {
            console.warn('PHP indisponível', error);
            return false;
        });
    },
    
    // Configura o ambiente para Netlify (Firebase apenas)
    setupNetlifyEnvironment: function() {
        // Inicializar handler do Firebase para perfil
        if (typeof FirebaseProfileHandler !== 'undefined') {
            FirebaseProfileHandler.init(firebase);
            
            // Substitui funções PHP por equivalentes Firebase
            window.uploadProfileImage = function(file) {
                return FirebaseProfileHandler.uploadProfileImage(file);
            };
            
            window.saveProfileData = function(profileData) {
                return FirebaseProfileHandler.updateProfileData(profileData);
            };
            
            window.logUserActivity = function(userId, activityType, message) {
                return FirebaseProfileHandler.logActivity(userId, activityType, message);
            };
            
            console.log('Funções de perfil configuradas para Firebase (Netlify)');
        } else {
            console.error('FirebaseProfileHandler não encontrado');
        }
    },
    
    // Configura o ambiente para PHP local
    setupPHPEnvironment: function() {
        // As funções já devem estar definidas para PHP por padrão
        // Esta função apenas confirma o uso do ambiente PHP
        console.log('Funções de perfil mantidas para PHP local');
    }
};

// Auto-inicialização após carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    EnvironmentDetector.init();
});
