/**
 * Script de teste para validar a integração com Cloudinary
 */

// Função para executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando teste do Cloudinary...');
    
    // Verificar se o Cloudinary Service está disponível
    if (typeof CloudinaryService === 'undefined') {
        console.error('ERRO: CloudinaryService não está disponível. Verifique se cloudinary-integration.js foi carregado.');
        alert('ERRO: CloudinaryService não está disponível. Verifique se cloudinary-integration.js foi carregado.');
        return;
    }
    
    console.log('CloudinaryService encontrado! Configurações:', CloudinaryService.config);
    alert('CloudinaryService inicializado! Cloud name: ' + CloudinaryService.config.cloudName);
    
    // Adicionar botão de teste na interface (apenas para desenvolvimento)
    const profileSection = document.querySelector('.user-profile-section');
    if (profileSection) {
        const testButton = document.createElement('button');
        testButton.textContent = 'Testar integração Cloudinary';
        testButton.className = 'btn btn-info btn-sm mt-3';
        testButton.id = 'test-cloudinary-btn';
        testButton.style.marginBottom = '20px';
        
        // Adicionar div para feedback visual
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'cloudinary-upload-progress';
        feedbackDiv.id = 'upload-progress-container';
        feedbackDiv.innerHTML = `
            <div class="cloudinary-upload-progress-bar" id="upload-progress"></div>
            <div class="cloudinary-upload-status" id="upload-status"></div>
        `;
        
        // Adicionar ao DOM
        profileSection.insertBefore(testButton, profileSection.firstChild);
        profileSection.insertBefore(feedbackDiv, profileSection.firstChild);
        
        // Adicionar evento de clique
        testButton.addEventListener('click', testCloudinaryUpload);
    }
});

/**
 * Testa o upload para o Cloudinary com uma imagem de placeholder
 */
function testCloudinaryUpload() {
    console.log('Iniciando teste de upload para Cloudinary...');
    alert('Iniciando teste de upload para Cloudinary...');
    
    // Mostrar progresso
    const progressBar = document.getElementById('upload-progress');
    const progressContainer = document.getElementById('upload-progress-container');
    const statusDiv = document.getElementById('upload-status');
    
    if (progressContainer) {
        progressContainer.style.display = 'block';
    }
    if (statusDiv) {
        statusDiv.textContent = 'Preparando teste...';
        statusDiv.className = 'cloudinary-upload-status';
    }
    
    // Verificar se o Cloudinary está corretamente configurado
    if (!CloudinaryService || !CloudinaryService.config || !CloudinaryService.config.cloudName) {
        alert('ERRO: Configuração do Cloudinary incompleta!');
        console.error('Configuração do Cloudinary incompleta:', CloudinaryService);
        return;
    }
    
    // Verificar se o preset está definido
    if (!CloudinaryService.config.uploadPreset) {
        alert('ERRO: Upload preset não definido! Certifique-se de que criou o preset "moz_doctor_app" no Cloudinary.');
        console.error('Upload preset não definido!');
        return;
    }
    
    // Criar uma imagem de teste (canvas)
    createTestImage()
        .then(file => {
            if (statusDiv) {
                statusDiv.textContent = 'Enviando imagem de teste para Cloudinary...';
            }
            
            // Usar o serviço Cloudinary para fazer upload
            return CloudinaryService.uploadImage(file, function(progress) {
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
            });
        })
        .then(response => {
            console.log('Teste de upload bem-sucedido!', response);
            alert('Upload para o Cloudinary realizado com SUCESSO!\n\nURL da imagem: ' + response.secure_url);
            
            if (statusDiv) {
                statusDiv.textContent = 'Upload bem-sucedido! URL: ' + response.secure_url;
                statusDiv.className = 'cloudinary-upload-status cloudinary-success';
            }
            
            // Mostrar a imagem carregada
            displayTestImage(response.secure_url);
            
            // Verificar se a imagem está acessível
            const testImg = new Image();
            testImg.onload = function() {
                console.log('Imagem carregada com sucesso do Cloudinary!');
                alert('Imagem confirmada no Cloudinary! A integração está FUNCIONANDO CORRETAMENTE!');
            };
            testImg.onerror = function() {
                console.error('Não foi possível carregar a imagem do Cloudinary');
                alert('ATENÇÃO: A imagem foi enviada mas não está acessível. Verifique as configurações do Cloudinary.');
            };
            testImg.src = response.secure_url;
        })
        .catch(error => {
            console.error('Erro no teste de upload:', error);
            alert('ERRO no upload para Cloudinary: ' + (error.message || JSON.stringify(error)));
            
            if (statusDiv) {
                statusDiv.textContent = 'Erro no upload: ' + (error.message || 'Verifique o console para detalhes');
                statusDiv.className = 'cloudinary-upload-status cloudinary-error';
            }
        });
}

/**
 * Cria uma imagem de teste usando canvas
 * @returns {Promise<File>} - Arquivo de imagem para teste
 */
function createTestImage() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        
        const ctx = canvas.getContext('2d');
        
        // Desenhar fundo
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar texto
        ctx.fillStyle = '#333333';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Teste Cloudinary', canvas.width/2, canvas.height/2);
        ctx.fillText('Moz Doctor Dose', canvas.width/2, canvas.height/2 + 30);
        ctx.fillText(new Date().toLocaleString(), canvas.width/2, canvas.height/2 + 60);
        
        // Converter para arquivo Blob/File
        canvas.toBlob(function(blob) {
            const file = new File([blob], 'teste-cloudinary.png', { type: 'image/png' });
            resolve(file);
        }, 'image/png');
    });
}

/**
 * Exibe a imagem de teste carregada
 * @param {String} imageUrl - URL da imagem carregada
 */
function displayTestImage(imageUrl) {
    const container = document.getElementById('upload-progress-container');
    if (!container) return;
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem de teste Cloudinary';
    imgElement.className = 'img-fluid mt-2 mb-2';
    imgElement.style.maxWidth = '300px';
    imgElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Adicionar após o contêiner de progresso
    container.insertAdjacentElement('afterend', imgElement);
}
