/**
 * Moz Doctor Dose - Sistema de Gerenciamento de Arquivos
 * Implementação de armazenamento local para upload de fotos de perfil e outros arquivos
 * Adaptado para trabalhar com servidor XAMPP local
 */

// Configuração do armazenamento local
const LOCAL_STORAGE_CONFIG = {
    // Caminho base para o script PHP de upload (ajuste para seu ambiente XAMPP)
    uploadUrl: 'upload-profile.php',
    // Tamanho máximo de arquivo em bytes (5MB)
    maxFileSize: 5 * 1024 * 1024
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de armazenamento local inicializado');
});

/**
 * Upload de foto de perfil para servidor local via XAMPP
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
    if (file.size > LOCAL_STORAGE_CONFIG.maxFileSize) {
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
    
    // Criar formulário para envio
    const formData = new FormData();
    formData.append('profile_image', file);
    formData.append('user_id', currentUser.uid);
    
    // Criar objeto XMLHttpRequest para envio
    const xhr = new XMLHttpRequest();
    
    // Configurar event listeners
    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable && typeof progressCallback === 'function') {
            const progress = (e.loaded / e.total) * 100;
            progressCallback(progress);
        }
    });
    
    xhr.addEventListener('error', function(e) {
        console.error('Erro no upload:', e);
        if (typeof errorCallback === 'function') {
            errorCallback('Erro de conexão durante o upload');
        }
    });
    
    xhr.addEventListener('abort', function() {
        if (typeof errorCallback === 'function') {
            errorCallback('Upload cancelado');
        }
    });
    
    xhr.addEventListener('load', function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    if (typeof completeCallback === 'function') {
                        completeCallback(response.photoURL);
                    }
                } else {
                    if (typeof errorCallback === 'function') {
                        errorCallback(response.message || 'Erro no servidor');
                    }
                }
            } catch (e) {
                console.error('Erro ao processar resposta:', e);
                if (typeof errorCallback === 'function') {
                    errorCallback('Erro ao processar resposta do servidor');
                }
            }
        } else {
            if (typeof errorCallback === 'function') {
                errorCallback(`Erro ${xhr.status}: ${xhr.statusText}`);
            }
        }
    });
    
    // Enviar requisição
    xhr.open('POST', LOCAL_STORAGE_CONFIG.uploadUrl, true);
    xhr.send(formData);
    
    // Retorna o objeto XHR para possível cancelamento
    return {
        cancel: function() {
            xhr.abort();
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
