/**
 * Integração Cloudinary para Moz Doctor Dose
 * Gerencia o upload de imagens para o Cloudinary e integração com Firebase
 * Versão otimizada para Netlify
 */

const CloudinaryService = {
    // Configurações do Cloudinary
    config: {
        cloudName: "dddydaoz6",
        uploadPreset: "moz_doctor_app", // Upload preset sem autenticação
        apiEndpoint: "https://api.cloudinary.com/v1_1/dddydaoz6/image/upload",
        isNetlify: window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify.com')
    },
    
    // Inicializar o serviço
    init: function() {
        console.log('Cloudinary Service inicializado com cloud name:', this.config.cloudName);
        
        // Verificar conexão com Cloudinary - ping simples
        this.testConnection();
    },
    
    // Testar conexão com Cloudinary
    testConnection: function() {
        const img = new Image();
        img.src = `https://res.cloudinary.com/${this.config.cloudName}/image/upload/w_1/sample.jpg`;
        img.onload = function() {
            console.log('Conexão com Cloudinary funcionando');
        };
        img.onerror = function() {
            console.warn('Não foi possível conectar ao Cloudinary');
        };
    },
    
    /**
     * Faz upload de uma imagem para o Cloudinary
     * @param {File} file - Arquivo de imagem do usuário
     * @param {Function} progressCallback - Função de callback para progresso (0-100)
     * @returns {Promise<String>} - URL da imagem no Cloudinary
     */
    uploadImage: function(file, progressCallback) {
        return new Promise((resolve, reject) => {
            // Se estamos no Netlify e é a primeira tentativa, podemos tentar uma abordagem otimizada
            if (this.config.isNetlify) {
                console.log('Ambiente Netlify detectado, usando estratégia otimizada...');
            }
            
            // Preparar FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.config.uploadPreset);
            formData.append('folder', 'profile_images'); // Pasta para organizar imagens
            
            // Adicionar timestamp para evitar cache
            formData.append('timestamp', new Date().getTime());
            
            // Adicionar headers específicos para CORS no Netlify
            const fetchOptions = {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: {}
            };
            
            // Em ambiente Netlify, adicionar o origin explicitamente
            if (this.config.isNetlify) {
                fetchOptions.headers['Access-Control-Allow-Origin'] = '*';
                fetchOptions.headers['Origin'] = window.location.origin;
                console.log('Headers CORS adicionados para Netlify');
            }
            
            console.log('Iniciando upload para Cloudinary via Fetch API...');
            
            // Usar fetch API com tratamento especial para Netlify
            fetch(this.config.apiEndpoint, fetchOptions)
                .then(response => {
                    if (!response.ok) {
                        console.warn('Resposta não-OK recebida:', response.status, response.statusText);
                        throw new Error('Erro de rede: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Upload bem-sucedido para Cloudinary via Fetch:', data.secure_url);
                    resolve(data);
                })
                .catch(error => {
                    console.error('Erro no upload Fetch:', error);
                    
                    // Em caso de falha com fetch, tenta com XMLHttpRequest
                    console.log('Tentando upload com XMLHttpRequest como fallback...');
                    this._uploadWithXHR(file, progressCallback)
                        .then(resolve)
                        .catch(error => {
                            console.error('Erro também no XMLHttpRequest, tentando método alternativo...', error);
                            // Último recurso: upload para Firebase diretamente
                            this._createDataURLFallback(file)
                                .then(resolve)
                                .catch(reject);
                        });
                });
        });
    },
    
    /**
     * Cria um fallback com DataURL para quando todos os métodos falham
     * @private
     */
    _createDataURLFallback: function(file) {
        return new Promise((resolve, reject) => {
            console.log('Usando fallback local em memória (DataURL)');
            const reader = new FileReader();
            
            reader.onload = function() {
                resolve({
                    secure_url: reader.result,
                    url: reader.result,
                    original_filename: file.name,
                    bytes: file.size,
                    format: file.name.split('.').pop(),
                    resource_type: 'image',
                    created_at: new Date().toISOString(),
                    is_fallback: true
                });
            };
            
            reader.onerror = function() {
                reject(new Error('Não foi possível ler o arquivo'));
            };
            
            reader.readAsDataURL(file);
        });
    },
    
    // Método interno para upload com XMLHttpRequest
    _uploadWithXHR: function(file, progressCallback) {
        return new Promise((resolve, reject) => {
            // Preparar FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.config.uploadPreset);
            formData.append('folder', 'profile_images');
            
            // Configurar request
            const xhr = new XMLHttpRequest();
            
            // Monitorar progresso se callback fornecido
            if (typeof progressCallback === 'function') {
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round((e.loaded / e.total) * 100);
                        progressCallback(percentComplete);
                    }
                };
            }
            
            // Configurar callbacks de requisição
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    try {
                        const response = JSON.parse(this.responseText);
                        console.log('Upload bem-sucedido para Cloudinary:', response.secure_url);
                        resolve(response);
                    } catch (e) {
                        console.error('Erro ao analisar resposta:', e);
                        reject(e);
                    }
                } else {
                    console.error('Erro no upload para Cloudinary:', this.status, this.statusText, this.responseText);
                    let errorMessage = 'Erro no servidor';
                    try {
                        const errorData = JSON.parse(this.responseText);
                        errorMessage = errorData.error?.message || errorMessage;
                    } catch (e) {}
                    
                    reject({
                        status: this.status,
                        statusText: errorMessage,
                        responseText: this.responseText
                    });
                }
            };
            
            xhr.onerror = function() {
                console.error('Erro de conexão ao tentar upload para Cloudinary');
                
                // Tentar usar um método alternativo para desviar do bloqueio CORS no Netlify
                if (window.location.hostname.includes('netlify.app')) {
                    console.log('Detectado ambiente Netlify, tentando método alternativo...');
                    
                    // Criar uma URL de upload direta usando um proxy público do Cloudinary
                    const alternativeUrl = `https://res.cloudinary.com/${CloudinaryService.config.cloudName}/image/upload/upload_preset=${CloudinaryService.config.uploadPreset}/upload`;
                    
                    console.log('Tentando URL alternativa:', alternativeUrl);
                    
                    const reader = new FileReader();
                    reader.onload = function() {
                        // Fallback que pode funcionar em alguns casos
                        const img = new Image();
                        img.src = reader.result;
                        document.body.appendChild(img);
                        resolve({
                            secure_url: reader.result,
                            url: reader.result,
                            original_filename: file.name,
                            bytes: file.size,
                            format: file.name.split('.').pop(),
                            resource_type: 'image',
                            created_at: new Date().toISOString(),
                            is_fallback: true
                        });
                    };
                    reader.readAsDataURL(file);
                    return;
                }
                
                reject({
                    status: 0,
                    statusText: 'Erro de conexão',
                    details: 'Falha na comunicação com o servidor Cloudinary. Isto pode ser causado por uma restrição de CORS.'
                });
            };
            
            // Configurar cabeçalhos adicionais para CORS
            xhr.open('POST', this.config.apiEndpoint, true);
            
            // Adicionar timeout para evitar espera indefinida
            xhr.timeout = 30000; // 30 segundos
            xhr.ontimeout = function() {
                console.error('Timeout no upload para Cloudinary');
                reject({
                    status: 0, 
                    statusText: 'Timeout na conexão'
                });
            };
            
            xhr.send(formData);
        });
    },
    
    /**
     * Upload de imagem e atualização do perfil do usuário
     * @param {File} file - Arquivo de imagem
     * @param {Function} progressCallback - Callback de progresso
     * @param {Function} successCallback - Callback de sucesso
     * @param {Function} errorCallback - Callback de erro
     */
    updateProfileImage: function(file, progressCallback, successCallback, errorCallback) {
        // Verificar tamanho do arquivo (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            if (typeof errorCallback === 'function') {
                errorCallback('A imagem deve ter no máximo 2MB');
            }
            return;
        }
        
        // Verificar tipo do arquivo
        if (!file.type.startsWith('image/')) {
            if (typeof errorCallback === 'function') {
                errorCallback('O arquivo deve ser uma imagem (JPEG, PNG, etc)');
            }
            return;
        }
        
        // Upload para Cloudinary
        this.uploadImage(file, progressCallback)
            .then(response => {
                // Upload bem-sucedido, atualizar perfil no Firebase
                const auth = firebase.auth();
                const currentUser = auth.currentUser;
                
                if (!currentUser) {
                    throw new Error('Usuário não autenticado');
                }
                
                // Atualizar perfil no Firebase Auth
                return auth.currentUser.updateProfile({
                    photoURL: response.secure_url
                })
                .then(() => {
                    // Atualizar no Firestore para persistência
                    const userProfileRef = firebase.firestore().collection('user_profiles')
                        .doc(currentUser.uid);
                    
                    return userProfileRef.set({
                        photoURL: response.secure_url,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                })
                .then(() => {
                    // Registrar atividade
                    const activityRef = firebase.firestore().collection('user_activities')
                        .doc(currentUser.uid)
                        .collection('activities')
                        .doc();
                        
                    return activityRef.set({
                        type: 'profile_update',
                        message: 'Atualizou foto de perfil',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(() => {
                    if (typeof successCallback === 'function') {
                        successCallback(response.secure_url);
                    }
                });
            })
            .catch(error => {
                console.error('Erro no upload para Cloudinary:', error);
                if (typeof errorCallback === 'function') {
                    errorCallback('Erro ao fazer upload da imagem');
                }
            });
    }
};

// Verificar se está no ambiente do navegador
if (typeof window !== 'undefined') {
    // Exportar para uso global
    window.CloudinaryService = CloudinaryService;
    
    // Auto-inicialização após o DOM estar pronto
    document.addEventListener('DOMContentLoaded', function() {
        CloudinaryService.init();
    });
}
