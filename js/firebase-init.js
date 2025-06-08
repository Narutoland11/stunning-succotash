/**
 * Firebase Initialization
 * Garante que o Firebase seja inicializado corretamente antes de qualquer uso
 */

// IIFE para isolar o escopo mas manter firebase disponível globalmente
(function() {
    // Verificar se o Firebase já foi inicializado para evitar múltiplas inicializações
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
        console.log('Firebase já inicializado, ignorando inicialização duplicada');
        return;
    }
    
    try {
        // Configuração do Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAW2V-AmQEkZPgA6WHdUG2z_n5AizBNDGo",
            authDomain: "mozdoctordose.firebaseapp.com",
            databaseURL: "https://mozdoctordose-default-rtdb.firebaseio.com",
            projectId: "mozdoctordose",
            storageBucket: "mozdoctordose.firebasestorage.app",
            messagingSenderId: "241428315907",
            appId: "1:241428315907:web:297fc71778b21b410b7336",
            measurementId: "G-2WVCDZL9KL"
        };
        
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase inicializado com sucesso');
        
        // Inicializar serviços comumente usados
        if (firebase.analytics) firebase.analytics();
        
        // Inicializar serviços necessários e exportar referências globais
        window.auth = firebase.auth();
        window.database = firebase.database();
        window.storage = firebase.storage();
        window.firestore = firebase.firestore();
        
        // Disparar evento de inicialização do Firebase
        const event = new Event('firebase_initialized');
        window.dispatchEvent(event);
        console.log('Evento firebase_initialized disparado');
        
        // Configurar persistência do Firestore para funcionamento offline
        firebase.firestore().enablePersistence({synchronizeTabs: true})
          .catch((err) => {
            if (err.code == 'failed-precondition') {
              console.warn('Múltiplas abas abertas, persistência disponível apenas em uma aba por vez');
            } else if (err.code == 'unimplemented') {
              console.warn('O navegador não suporta persistência de dados');
            }
          });
        
    } catch (error) {
        console.error('Erro ao inicializar Firebase:', error);
        
        // Criar um mock do Firebase para evitar erros em funções que dependem dele
        if (typeof firebase === 'undefined') {
            window.firebase = {
                auth: function() {
                    return {
                        onAuthStateChanged: function(callback) {
                            callback(null);
                            return function() {};
                        },
                        signInWithEmailAndPassword: function() {
                            return Promise.reject(new Error('Firebase não disponível'));
                        },
                        createUserWithEmailAndPassword: function() {
                            return Promise.reject(new Error('Firebase não disponível'));
                        },
                        signOut: function() {
                            return Promise.resolve();
                        }
                    };
                },
                apps: []
            };
            console.warn('Criado mock do Firebase para evitar erros fatais');
        }
    }
    
    // Verificação após um pequeno delay para garantir que a inicialização foi bem-sucedida
    setTimeout(function() {
        if (firebase.apps && firebase.apps.length > 0) {
            console.log('Verificação: Firebase foi inicializado corretamente');
        } else {
            console.error('Verificação: Firebase não foi inicializado corretamente');
        }
    }, 100);
    
})();
