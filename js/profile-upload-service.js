/**
 * Moz Doctor Dose - Serviço de Upload de Perfil
 * Substitui a funcionalidade do upload-profile.php utilizando Cloudinary e Firebase
 */

const ProfileUploadService = {
    /**
     * Realiza o upload da imagem de perfil usando Cloudinary e salva os dados no Firebase
     * @param {File} imageFile - Arquivo de imagem do usuário
     * @param {String} userId - ID do usuário
     * @param {Function} progressCallback - Função de callback para progresso (0-100)
     * @returns {Promise<Object>} - Objeto com status e URL da imagem
     */
    uploadProfileImage: function(imageFile, userId, progressCallback = null) {
        return new Promise((resolve, reject) => {
            // Verificar parâmetros
            if (!imageFile || !userId) {
                reject({
                    status: "error",
                    message: "Arquivo de imagem e ID do usuário são obrigatórios"
                });
                return;
            }
            
            // Verificar tamanho do arquivo (max 5MB)
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            if (imageFile.size > maxFileSize) {
                reject({
                    status: "error",
                    message: "Arquivo muito grande. O limite é 5MB."
                });
                return;
            }
            
            // Verificar tipo do arquivo
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(imageFile.type)) {
                reject({
                    status: "error",
                    message: "Tipo de arquivo não permitido. Use apenas JPG, PNG ou GIF."
                });
                return;
            }
            
            console.log("Iniciando upload para Cloudinary...");
            
            // Fazer upload para o Cloudinary
            CloudinaryService.uploadImage(imageFile, progressCallback)
                .then(cloudinaryResponse => {
                    const photoURL = cloudinaryResponse.secure_url;
                    
                    // Se usar fallback (resposta local), fazer upload para Firebase Storage
                    if (cloudinaryResponse.is_fallback) {
                        return this._uploadToFirebaseStorage(imageFile, userId)
                            .then(firebaseURL => {
                                console.log("Imagem salva no Firebase Storage:", firebaseURL);
                                return firebaseURL;
                            });
                    }
                    
                    return photoURL;
                })
                .then(photoURL => {
                    // Atualizar perfil do usuário no Firebase
                    return this._updateUserProfile(userId, photoURL);
                })
                .then(photoURL => {
                    console.log("Perfil atualizado com sucesso:", photoURL);
                    resolve({
                        status: "success",
                        message: "Foto de perfil enviada com sucesso",
                        photoURL: photoURL
                    });
                })
                .catch(error => {
                    console.error("Erro no upload da imagem de perfil:", error);
                    
                    // Tentar fallback para Firebase Storage se Cloudinary falhar
                    console.log("Tentando fallback para Firebase Storage...");
                    
                    this._uploadToFirebaseStorage(imageFile, userId)
                        .then(firebaseURL => {
                            return this._updateUserProfile(userId, firebaseURL);
                        })
                        .then(photoURL => {
                            console.log("Perfil atualizado com sucesso via fallback:", photoURL);
                            resolve({
                                status: "success",
                                message: "Foto de perfil enviada com sucesso",
                                photoURL: photoURL
                            });
                        })
                        .catch(fbError => {
                            console.error("Falha no fallback para Firebase Storage:", fbError);
                            reject({
                                status: "error",
                                message: "Não foi possível fazer upload da imagem. Tente novamente mais tarde."
                            });
                        });
                });
        });
    },
    
    /**
     * Upload para Firebase Storage (método de fallback)
     * @private
     */
    _uploadToFirebaseStorage: function(imageFile, userId) {
        return new Promise((resolve, reject) => {
            const storage = firebase.storage();
            const storageRef = storage.ref();
            
            // Criar referência para a imagem do usuário
            const timestamp = new Date().getTime();
            const imageRef = storageRef.child(`profile_images/${userId}/profile_${timestamp}`);
            
            // Fazer upload do arquivo
            const uploadTask = imageRef.put(imageFile);
            
            // Monitorar progresso do upload
            uploadTask.on('state_changed', 
                // Progresso
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload para Firebase Storage: ' + progress + '% concluído');
                },
                // Erro
                error => {
                    console.error('Erro no upload para Firebase Storage:', error);
                    reject(error);
                },
                // Sucesso
                () => {
                    // Obter URL de download
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadURL => {
                            console.log('Arquivo disponível em:', downloadURL);
                            resolve(downloadURL);
                        })
                        .catch(error => {
                            console.error('Erro ao obter URL de download:', error);
                            reject(error);
                        });
                }
            );
        });
    },
    
    /**
     * Atualiza o perfil do usuário no Firebase
     * @private
     */
    _updateUserProfile: function(userId, photoURL) {
        return new Promise((resolve, reject) => {
            // Atualizar photoURL no Auth
            const currentUser = firebase.auth().currentUser;
            if (currentUser && currentUser.uid === userId) {
                currentUser.updateProfile({
                    photoURL: photoURL
                }).then(() => {
                    console.log('Perfil Auth atualizado com nova foto');
                }).catch(error => {
                    console.warn('Não foi possível atualizar Auth:', error);
                });
            }
            
            // Atualizar no Firestore e Realtime Database
            const promises = [];
            
            // Firestore
            const userDocRef = firebase.firestore().collection('users').doc(userId);
            promises.push(
                userDocRef.update({
                    photoURL: photoURL,
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(error => {
                    console.warn('Não foi possível atualizar Firestore:', error);
                    // Continuar mesmo com erro
                    return Promise.resolve();
                })
            );
            
            // Realtime Database
            const userDbRef = firebase.database().ref('users/' + userId);
            promises.push(
                userDbRef.update({
                    photoURL: photoURL,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP
                }).catch(error => {
                    console.warn('Não foi possível atualizar Database:', error);
                    // Continuar mesmo com erro
                    return Promise.resolve();
                })
            );
            
            // Aguardar todas as atualizações
            Promise.all(promises)
                .then(() => {
                    resolve(photoURL);
                })
                .catch(error => {
                    console.error('Erro ao atualizar perfil no Firebase:', error);
                    // Resolver mesmo com erro, pois ainda temos a URL
                    resolve(photoURL);
                });
        });
    }
};

// Verificar se está no ambiente do navegador
if (typeof window !== 'undefined') {
    // Exportar para uso global
    window.ProfileUploadService = ProfileUploadService;
}
