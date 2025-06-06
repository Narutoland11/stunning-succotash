/**
 * Moz Doctor Dose - Sistema de Configurações do Usuário
 * Responsável pela interface e funcionalidades da página de Configurações
 */

// Disparado quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const settingsSection = document.getElementById('configuracoes');
    const settingsNavItems = document.querySelectorAll('.settings-nav-link');
    const settingsSections = document.querySelectorAll('.settings-section');
    const preferencesForm = document.getElementById('preferences-form');
    const accountForm = document.getElementById('account-form');
    const notificationsForm = document.getElementById('notifications-form');
    const changePasswordForm = document.getElementById('change-password-form');
    const deleteAccountBtn = document.getElementById('delete-account');
    const settingsSavedMessage = document.querySelector('.settings-saved');
    const settingsErrorMessage = document.querySelector('.settings-error');
    
    // Firebase Auth e Database
    const auth = firebase.auth();
    const database = firebase.database();
    
    // Estado do usuário atual
    let currentUser = null;
    let userSettings = {};
    
    // Listener para alterações no estado de autenticação
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Usuário está logado
            currentUser = user;
            
            // Mostrar item de menu de configurações
            const configMenuItem = document.getElementById('menu-configuracoes');
            if (configMenuItem) {
                configMenuItem.style.display = 'block';
            }
            
            // Carregar configurações do usuário
            loadUserSettings();
        } else {
            // Usuário não está logado
            currentUser = null;
            
            // Ocultar item de menu de configurações
            const configMenuItem = document.getElementById('menu-configuracoes');
            if (configMenuItem) {
                configMenuItem.style.display = 'none';
            }
            
            // Ocultar seção de configurações se estiver visível
            if (settingsSection) {
                settingsSection.classList.remove('active');
            }
        }
    });
    
    // Navegação entre seções de configurações
    if (settingsNavItems) {
        settingsNavItems.forEach(navItem => {
            navItem.addEventListener('click', function() {
                // Remover classe ativa de todos os itens
                settingsNavItems.forEach(item => item.classList.remove('active'));
                
                // Adicionar classe ativa ao item clicado
                this.classList.add('active');
                
                // Mostrar seção correspondente
                const targetSection = this.getAttribute('data-section');
                settingsSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Carrega as configurações do usuário
    function loadUserSettings() {
        if (!currentUser) return;
        
        // Referência às configurações do usuário
        const settingsRef = database.ref('users/' + currentUser.uid);
        
        // Buscar dados
        settingsRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                userSettings = snapshot.val();
                
                // Verificar se há configurações de preferências
                if (!userSettings.preferences) {
                    userSettings.preferences = {
                        darkMode: false,
                        notifications: true,
                        newsletter: false,
                        autoSave: true,
                        language: 'pt-BR'
                    };
                }
                
                // Atualizar interface com as configurações carregadas
                updateSettingsUI();
            } else {
                // Criar configurações padrão se não existirem
                userSettings = {
                    displayName: currentUser.displayName || '',
                    email: currentUser.email,
                    preferences: {
                        darkMode: false,
                        notifications: true,
                        newsletter: false,
                        autoSave: true,
                        language: 'pt-BR'
                    }
                };
                
                // Salvar configurações padrão
                settingsRef.set(userSettings);
                updateSettingsUI();
            }
        });
    }
    
    // Atualiza a interface com as configurações do usuário
    function updateSettingsUI() {
        if (!userSettings || !userSettings.preferences) return;
        
        // Atualizar formulário de preferências
        if (preferencesForm) {
            const prefs = userSettings.preferences;
            
            // Modo escuro
            if (preferencesForm.elements['darkMode']) {
                preferencesForm.elements['darkMode'].checked = prefs.darkMode;
            }
            
            // Notificações
            if (preferencesForm.elements['notifications']) {
                preferencesForm.elements['notifications'].checked = prefs.notifications;
            }
            
            // Newsletter
            if (preferencesForm.elements['newsletter']) {
                preferencesForm.elements['newsletter'].checked = prefs.newsletter;
            }
            
            // Auto Save
            if (preferencesForm.elements['autoSave']) {
                preferencesForm.elements['autoSave'].checked = prefs.autoSave;
            }
            
            // Idioma
            if (preferencesForm.elements['language']) {
                preferencesForm.elements['language'].value = prefs.language || 'pt-BR';
            }
        }
        
        // Atualizar formulário de conta
        if (accountForm) {
            if (accountForm.elements['displayName']) {
                accountForm.elements['displayName'].value = userSettings.displayName || currentUser.displayName || '';
            }
            
            if (accountForm.elements['email']) {
                accountForm.elements['email'].value = currentUser.email;
                // Email é apenas para exibição, desabilitar edição
                accountForm.elements['email'].disabled = true;
            }
        }
        
        // Atualizar formulário de notificações
        if (notificationsForm) {
            const prefs = userSettings.preferences;
            
            if (notificationsForm.elements['emailNotifications']) {
                notificationsForm.elements['emailNotifications'].checked = prefs.emailNotifications !== false;
            }
            
            if (notificationsForm.elements['loginAlerts']) {
                notificationsForm.elements['loginAlerts'].checked = prefs.loginAlerts !== false;
            }
            
            if (notificationsForm.elements['updateNotifications']) {
                notificationsForm.elements['updateNotifications'].checked = prefs.updateNotifications !== false;
            }
        }
    }
    
    // Evento para salvar preferências
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const preferences = {
                darkMode: preferencesForm.elements['darkMode'].checked,
                notifications: preferencesForm.elements['notifications'].checked,
                newsletter: preferencesForm.elements['newsletter'].checked,
                autoSave: preferencesForm.elements['autoSave'].checked,
                language: preferencesForm.elements['language'].value
            };
            
            // Salvar no Firebase
            saveUserSettings('preferences', preferences);
            
            // Aplicar modo escuro imediatamente se alterado
            if (preferences.darkMode !== userSettings.preferences.darkMode) {
                document.body.classList.toggle('dark-mode', preferences.darkMode);
            }
        });
    }
    
    // Evento para salvar configurações de conta
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter novo nome de exibição
            const displayName = accountForm.elements['displayName'].value;
            
            // Verificar se houve mudança
            if (displayName !== userSettings.displayName) {
                // Atualizar no Auth
                currentUser.updateProfile({
                    displayName: displayName
                }).then(() => {
                    // Atualizar no Realtime Database
                    saveUserSettings('displayName', displayName);
                }).catch(error => {
                    showSettingsMessage('error', 'Erro ao atualizar nome: ' + error.message);
                });
            } else {
                showSettingsMessage('success', 'Configurações de conta salvas!');
            }
        });
    }
    
    // Evento para salvar preferências de notificações
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores
            const notifications = {
                emailNotifications: notificationsForm.elements['emailNotifications'].checked,
                loginAlerts: notificationsForm.elements['loginAlerts'].checked,
                updateNotifications: notificationsForm.elements['updateNotifications'].checked
            };
            
            // Atualizar objeto de preferências
            const updatedPrefs = {
                ...userSettings.preferences,
                ...notifications
            };
            
            // Salvar no Firebase
            saveUserSettings('preferences', updatedPrefs);
        });
    }
    
    // Evento para alterar senha
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = changePasswordForm.elements['currentPassword'].value;
            const newPassword = changePasswordForm.elements['newPassword'].value;
            const confirmPassword = changePasswordForm.elements['confirmPassword'].value;
            
            // Validar campos
            if (!currentPassword || !newPassword || !confirmPassword) {
                showSettingsMessage('error', 'Todos os campos são obrigatórios');
                return;
            }
            
            // Validar se senhas novas são iguais
            if (newPassword !== confirmPassword) {
                showSettingsMessage('error', 'A nova senha e a confirmação não correspondem');
                return;
            }
            
            // Validar complexidade da senha
            if (newPassword.length < 6) {
                showSettingsMessage('error', 'A senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            // Mostrar carregamento
            const submitBtn = changePasswordForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Alterando...';
            submitBtn.disabled = true;
            
            // Reautenticar o usuário (exigido para operações sensíveis)
            const credential = firebase.auth.EmailAuthProvider.credential(
                currentUser.email, 
                currentPassword
            );
            
            currentUser.reauthenticateWithCredential(credential).then(() => {
                // Reautenticação bem-sucedida, alterar senha
                return currentUser.updatePassword(newPassword);
            }).then(() => {
                // Senha alterada com sucesso
                showSettingsMessage('success', 'Senha alterada com sucesso!');
                
                // Limpar formulário
                changePasswordForm.reset();
                
                // Registrar atividade
                logUserActivity(currentUser.uid, 'security', 'Senha alterada com sucesso');
            }).catch(error => {
                // Tratar erro
                let errorMessage = 'Ocorreu um erro ao alterar a senha';
                
                if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Senha atual incorreta';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'A nova senha é muito fraca';
                }
                
                showSettingsMessage('error', errorMessage);
            }).finally(() => {
                // Restaurar botão
                submitBtn.textContent = 'Alterar Senha';
                submitBtn.disabled = false;
            });
        });
    }
    
    // Evento para excluir conta
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            // Confirmar exclusão
            const confirmed = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
            
            if (confirmed && currentUser) {
                // Primeiro, excluir dados do usuário no Realtime Database
                database.ref('users/' + currentUser.uid).remove().then(() => {
                    // Depois excluir conta no Auth
                    return currentUser.delete();
                }).then(() => {
                    // Conta excluída com sucesso
                    alert('Sua conta foi excluída com sucesso.');
                    window.location.href = '/';
                }).catch(error => {
                    // Tratar erros
                    if (error.code === 'auth/requires-recent-login') {
                        alert('Por motivos de segurança, faça login novamente antes de excluir sua conta.');
                        // Forçar logout para reautenticação
                        auth.signOut();
                    } else {
                        alert('Erro ao excluir conta: ' + error.message);
                    }
                });
            }
        });
    }
    
    // Salva configurações no Firebase
    function saveUserSettings(path, data) {
        if (!currentUser) return Promise.reject(new Error('Usuário não autenticado'));
        
        // Referência ao nó de configurações do usuário
        const userRef = database.ref('users/' + currentUser.uid);
        
        // Atualizar localmente
        if (path === 'preferences') {
            userSettings.preferences = data;
        } else {
            userSettings[path] = data;
        }
        
        // Determinar o que atualizar
        let updateData = {};
        updateData[path] = data;
        
        // Atualizar no Firebase
        return userRef.update(updateData).then(() => {
            showSettingsMessage('success', 'Configurações salvas com sucesso!');
            return data;
        }).catch(error => {
            showSettingsMessage('error', 'Erro ao salvar: ' + error.message);
            throw error;
        });
    }
    
    // Exibe mensagem de feedback nas configurações
    function showSettingsMessage(type, message, duration = 5000) {
        let messageElement;
        
        if (type === 'success') {
            messageElement = settingsSavedMessage;
        } else {
            messageElement = settingsErrorMessage;
        }
        
        if (!messageElement) return;
        
        // Definir texto e mostrar
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        
        // Auto-ocultar após duração
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, duration);
    }
});

// Função para alternar modo escuro
function toggleDarkMode(enable) {
    if (enable) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
}
