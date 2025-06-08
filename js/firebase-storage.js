/**
 * Moz Doctor Dose - Sistema de Gerenciamento de Arquivos
 * Implementação de armazenamento para upload de fotos de perfil e outros arquivos
 * Versão otimizada para Netlify sem dependência de PHP
 */

// Configuração do armazenamento 
const STORAGE_CONFIG = {
    // Tamanho máximo de arquivo em bytes (5MB)
    maxFileSize: 5 * 1024 * 1024
};

// Verificar se ProfileUploadService está disponível
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.ProfileUploadService !== 'undefined') {
        console.log('Sistema de armazenamento inicializado com ProfileUploadService');
    } else {
        console.warn('ProfileUploadService não encontrado. Certifique-se de que profile-upload-service.js está carregado antes deste script.');
    }
});

/**
 * Upload de foto de perfil usando ProfileUploadService
 * @param {File} file - O arquivo de imagem selecionado pelo usuário
 * @param {Function} progressCallback - Função de callback para progresso de upload
 * @param {Function} errorCallback - Função de callback para erros
 * @param {Function} completeCallback - Função de callback quando upload estiver completo
 */
function uploadProfilePhoto(file, progressCallback, errorCallback, completeCallback) {
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        if (typeof errorCallback === 'function') {
            errorCallback('Usuário não autenticado');
        }
        return;
    }
    
    // Validações básicas
    if (!file) {
        if (typeof errorCallback === 'function') {
            errorCallback('Nenhum arquivo selecionado');
        }
        return;
    }
    
    // Validar tamanho (5MB máximo)
    if (file.size > STORAGE_CONFIG.maxFileSize) {
        if (typeof errorCallback === 'function') {
            errorCallback('Arquivo muito grande. O tamanho máximo permitido é 5MB.');
        }
        return;
    }
    
    // Validar tipo (apenas imagens)
    if (!file.type.match('image.*')) {
        if (typeof errorCallback === 'function') {
            errorCallback('Por favor, selecione apenas arquivos de imagem.');
        }
        return;
    }
    
    // Verificar se ProfileUploadService está disponível
    if (typeof window.ProfileUploadService === 'undefined') {
        console.error('ProfileUploadService não está disponível');
        if (typeof errorCallback === 'function') {
            errorCallback('Serviço de upload não disponível');
        }
        return;
    }
    
    // Referência para cancelamento (será definida abaixo)
    let isCancelled = false;
    
    // Usar o novo ProfileUploadService para upload
    window.ProfileUploadService.uploadProfileImage(file, currentUser.uid, progressCallback)
        .then(response => {
            if (isCancelled) return;
            
            if (response.status === 'success' && typeof completeCallback === 'function') {
                completeCallback(response.photoURL);
            } else if (response.status === 'error' && typeof errorCallback === 'function') {
                errorCallback(response.message || 'Erro no servidor');
            }
        })
        .catch(error => {
            if (isCancelled) return;
            
            console.error('Erro no upload:', error);
            if (typeof errorCallback === 'function') {
                errorCallback(error.message || 'Erro durante o upload');
            }
        });
    
    // Retorna objeto com método para cancelar
    return {
        cancel: function() {
            isCancelled = true;
            console.log('Upload cancelado pelo usuário');
        }
    };
}

/**
 * Atualiza a foto do perfil no Realtime Database e Firebase Auth
 * @param {string} photoURL - URL da imagem carregada
 * @returns {Promise} - Promise que resolve quando as atualizações forem concluídas
 */
function updateProfilePhotoURL(photoURL) {
    const auth = firebase.auth();
    const database = firebase.database();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        return Promise.reject('Usuário não autenticado');
    }
    
    console.log('Atualizando URL da foto para:', photoURL);
    
    // Atualizar no Auth
    const authPromise = currentUser.updateProfile({
        photoURL: photoURL
    });
    
    // Atualizar no Realtime Database
    const dbRef = database.ref(`users/${currentUser.uid}`);
    const dbPromise = dbRef.update({
        photoURL: photoURL,
        lastUpdated: new Date().toISOString()
    });
    
    // Registrar atividade
    logUserActivity('profile_update', 'Foto de perfil atualizada');
    
    // Retorna promise que resolve quando ambas as atualizações forem concluídas
    return Promise.all([authPromise, dbPromise]);
}

/**
 * Exclui foto de perfil do usuário
 * @returns {Promise} - Promise que resolve quando a foto for removida
 */
function deleteProfilePhoto() {
    const auth = firebase.auth();
    const database = firebase.database();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        return Promise.reject('Usuário não autenticado');
    }
    
    // Buscar a URL atual da foto no Realtime Database
    return database.ref(`users/${currentUser.uid}`).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.photoURL) {
                    // Para o armazenamento local, não precisamos excluir fisicamente o arquivo
                    // pois isso seria tratado pelo script PHP em uma implementação completa
                    // Aqui apenas atualizamos as referências no Auth e Database
                    
                    // Remover referência no Auth
                    const authPromise = currentUser.updateProfile({
                        photoURL: null
                    });
                    
                    // Remover referência no Database
                    const dbPromise = database.ref(`users/${currentUser.uid}/photoURL`).remove();
                    
                    // Registrar atividade
                    logUserActivity('profile_update', 'Foto de perfil removida');
                    
                    return Promise.all([authPromise, dbPromise]);
                }
            }
            return Promise.resolve();
        });
}

// Exportar funções para uso em outros módulos
window.uploadProfilePhoto = uploadProfilePhoto;
window.updateProfilePhotoURL = updateProfilePhotoURL;
window.deleteProfilePhoto = deleteProfilePhoto;
