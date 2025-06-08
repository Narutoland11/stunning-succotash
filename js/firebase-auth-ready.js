/**
 * Firebase Auth Ready
 * Este script garante que o Firebase Authentication esteja completamente carregado
 * antes de permitir operações de autenticação
 */

// Cria uma promessa que será resolvida quando o Firebase Auth estiver pronto
window.firebaseAuthReady = new Promise((resolve) => {
    // Verificar se o Firebase já está disponível
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
        // Firebase já está inicializado, verificar auth
        const unsubscribe = firebase.auth().onAuthStateChanged(() => {
            unsubscribe();
            console.log('Firebase Auth está pronto!');
            window.authReady = true;
            resolve(firebase.auth());
        }, (error) => {
            console.error('Erro ao inicializar Firebase Auth:', error);
            window.authReady = false;
            resolve(firebase.auth()); // Resolve mesmo com erro para não bloquear
        });
    } else {
        // Firebase ainda não está inicializado, aguardar evento
        window.addEventListener('firebase_initialized', () => {
            const unsubscribe = firebase.auth().onAuthStateChanged(() => {
                unsubscribe();
                console.log('Firebase Auth está pronto após inicialização!');
                window.authReady = true;
                resolve(firebase.auth());
            }, (error) => {
                console.error('Erro ao inicializar Firebase Auth:', error);
                window.authReady = false;
                resolve(firebase.auth());
            });
        });
        
        // Safety timeout para não bloquear indefinidamente
        setTimeout(() => {
            if (!window.authReady) {
                console.warn('Firebase Auth não ficou pronto no tempo esperado');
                window.authReady = false;
                resolve(firebase.auth());
            }
        }, 5000);
    }
});
