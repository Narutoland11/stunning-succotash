/**
 * Firebase Profile Handler
 * Esta biblioteca substitui o processamento PHP pelo Firebase Storage e Firestore
 * Compatível com deploys no Netlify
 */

// Controlador de Perfil do Usuário
const ProfileHandler = {
    // Armazenar referências do Firebase
    storage: null,
    db: null,
    
    // Inicializar com config do Firebase
    init: function(firebaseApp) {
        this.storage = firebase.storage(firebaseApp);
        this.db = firebase.firestore(firebaseApp);
        console.log('Profile Handler inicializado');
    },
    
    // Upload de imagem usando Cloudinary em vez do Firebase Storage
    uploadProfileImage: function(file, userId) {
        return new Promise((resolve, reject) => {
            // Verificar tipo e tamanho
            if (!file || !file.type.match('image.*')) {
                reject('Arquivo inválido. Deve ser uma imagem.');
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) {
                reject('Imagem muito grande. Máximo 2MB.');
                return;
            }
            
            // Usar Cloudinary se estiver disponível, caso contrário fallback para Firebase
            if (typeof CloudinaryService !== 'undefined') {
                // Mostrar progress bar
                const progressBar = document.getElementById('upload-progress');
                if (progressBar) {
                    progressBar.style.width = '0%';
                    progressBar.parentElement.style.display = 'block';
                }
                
                const self = this; // Guardar referência para usar nos callbacks
                
                // Upload para Cloudinary com callback de progresso
                CloudinaryService.uploadImage(file, function(progress) {
                    if (progressBar) {
                        progressBar.style.width = progress + '%';
                    }
                })
                .then(function(response) {
                    // Esconder progress bar
                    if (progressBar) {
                        progressBar.parentElement.style.display = 'none';
                    }
                    
                    // Atualizar perfil no Firebase com URL do Cloudinary
                    return self._updateProfileWithImage(userId || firebase.auth().currentUser.uid, response.secure_url);
                })
                .then(function(photoURL) {
                    resolve(photoURL);
                })
                .catch(function(error) {
                    console.error('Erro no upload para Cloudinary:', error);
                    reject('Erro ao fazer upload da imagem');
                });
                return; // Importante adicionar return para encerrar a função aqui
            }
            
            // Referência para o arquivo no Storage
            const storageRef = this.storage.ref();
            const profileImagesRef = storageRef.child(`profile_images/${userId}/profile_${Date.now()}`);
            
            // Upload do arquivo
            const uploadTask = profileImagesRef.put(file);
            
            // Monitorar progresso
            uploadTask.on('state_changed', 
                // Progresso
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload: ' + progress + '%');
                },
                // Erro
                (error) => {
                    console.error('Erro no upload:', error);
                    reject(error.message || 'Erro no upload');
                },
                // Sucesso
                () => {
                    // Obter URL do arquivo
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('Arquivo disponível em:', downloadURL);
                        
                        // Atualizar perfil no Firestore
                        this.db.collection('users').doc(userId).update({
                            photoURL: downloadURL,
                            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(() => {
                            // Atualizar perfil do Auth
                            firebase.auth().currentUser.updateProfile({
                                photoURL: downloadURL
                            })
                            .then(() => {
                                // Registrar atividade
                                this.logUserActivity(userId, 'profile_update', 'Atualizou foto de perfil');
                                resolve({
                                    status: 'success',
                                    message: 'Foto de perfil atualizada com sucesso',
                                    image_url: downloadURL
                                });
                            })
                            .catch(error => reject(error.message));
                        })
                        .catch(error => reject(error.message));
                    })
                    .catch(error => reject(error.message));
                }
            );
        });
    },
    
    // Atualizar dados do perfil
    // Método para atualizar perfil com URL da imagem
    _updateProfileWithImage: function(userId, imageUrl) {
        return new Promise((resolve, reject) => {
            if (!userId || !imageUrl) {
                reject('Dados inválidos');
                return;
            }
            
            // Atualizar no Firestore
            this.db.collection('users').doc(userId).update({
                photoURL: imageUrl,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                // Atualizar no Firebase Auth
                return firebase.auth().currentUser.updateProfile({
                    photoURL: imageUrl
                });
            })
            .then(() => {
                // Registrar atividade
                this.logUserActivity(userId, 'profile_update', 'Atualizou foto de perfil');
                resolve(imageUrl);
            })
            .catch(error => {
                console.error('Erro ao atualizar perfil com imagem:', error);
                reject(error);
            });
        });
    },
    
    updateProfileData: function(userId, userData) {
        return new Promise((resolve, reject) => {
            if (!userId || !userData) {
                reject('Dados inválidos');
                return;
            }
            
            // Limpar e validar dados
            const cleanData = {};
            const allowedFields = ['displayName', 'phone', 'specialization', 'bio', 'hospital', 'email'];
            
            allowedFields.forEach(field => {
                if (userData[field]) {
                    cleanData[field] = typeof userData[field] === 'string' 
                        ? userData[field].trim() 
                        : userData[field];
                }
            });
            
            // Adicionar timestamp
            cleanData.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
            
            // Atualizar no Firestore
            this.db.collection('users').doc(userId).update(cleanData)
            .then(() => {
                // Atualizar Auth se houver displayName
                if (cleanData.displayName) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: cleanData.displayName
                    });
                }
                
                // Registrar atividade
                this.logUserActivity(userId, 'profile_update', 'Atualizou dados do perfil');
                
                resolve({
                    status: 'success', 
                    message: 'Perfil atualizado com sucesso',
                    data: cleanData
                });
            })
            .catch(error => {
                console.error('Erro ao atualizar perfil:', error);
                reject(error.message || 'Erro ao atualizar perfil');
            });
        });
    },
    
    // Registrar atividade do usuário
    logUserActivity: function(userId, activityType, message) {
        const activityData = {
            type: activityType,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        return this.db.collection('user_activities')
            .doc(userId)
            .collection('activities')
            .add(activityData)
            .catch(error => console.error('Erro ao registrar atividade:', error));
    },
    
    // Buscar atividades recentes
    getRecentActivities: function(userId, limit = 10) {
        return new Promise((resolve, reject) => {
            this.db.collection('user_activities')
                .doc(userId)
                .collection('activities')
                .orderBy('timestamp', 'desc')
                .limit(limit)
                .get()
                .then(snapshot => {
                    const activities = [];
                    snapshot.forEach(doc => {
                        activities.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    resolve(activities);
                })
                .catch(error => {
                    console.error('Erro ao buscar atividades:', error);
                    reject(error);
                });
        });
    }
};
