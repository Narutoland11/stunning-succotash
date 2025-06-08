/**
 * Teste direto de upload para Cloudinary
 * Código simplificado para verificação da integração
 */

// Função para executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de teste direto Cloudinary carregado');
    
    // Adicionar botão de teste diretamente no corpo da página
    const testButton = document.createElement('button');
    testButton.textContent = 'TESTE DIRETO CLOUDINARY';
    testButton.style.position = 'fixed';
    testButton.style.top = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '10px 15px';
    testButton.style.background = '#ff5722';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.fontWeight = 'bold';
    testButton.style.cursor = 'pointer';
    
    // Adicionar o botão à página
    document.body.appendChild(testButton);
    
    // Adicionar evento de clique
    testButton.addEventListener('click', function() {
        // Mostrar que o teste está sendo iniciado
        alert('Iniciando teste direto do Cloudinary...');
        
        // Criar canvas para gerar imagem de teste
        createTestImage()
            .then(function(file) {
                // Mostrar detalhes do arquivo
                console.log('Imagem de teste criada:', file.name, file.size, 'bytes');
                alert('Imagem de teste criada: ' + file.name + ' (' + file.size + ' bytes)');
                
                // Upload direto para o Cloudinary
                return uploadToCloudinary(file);
            })
            .then(function(response) {
                // Mostrar resultado bem-sucedido
                console.log('Upload bem-sucedido!', response);
                alert('✅ SUCESSO! Imagem enviada para Cloudinary.\n\nURL: ' + response.secure_url);
                
                // Mostrar a imagem na página
                const img = document.createElement('img');
                img.src = response.secure_url;
                img.style.maxWidth = '300px';
                img.style.display = 'block';
                img.style.marginTop = '20px';
                img.style.border = '2px solid green';
                document.body.appendChild(img);
            })
            .catch(function(error) {
                // Mostrar erro
                console.error('Erro no upload:', error);
                alert('❌ ERRO no upload: ' + JSON.stringify(error));
            });
    });
});

/**
 * Cria uma imagem de teste com canvas
 */
function createTestImage() {
    return new Promise(function(resolve) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        
        const ctx = canvas.getContext('2d');
        
        // Preencher com cor de fundo
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar borda
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        
        // Adicionar texto
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Teste Cloudinary', canvas.width/2, 80);
        ctx.fillText('Moz Doctor Dose', canvas.width/2, 120);
        
        // Adicionar data e hora
        ctx.font = '16px Arial';
        ctx.fillText(new Date().toLocaleString(), canvas.width/2, 160);
        ctx.fillText('Cloud Name: c-5c12b74395e4c12952f8b33425521e', canvas.width/2, 200);
        ctx.fillText('Upload Preset: moz_doctor_app', canvas.width/2, 230);
        
        // Converter para blob
        canvas.toBlob(function(blob) {
            const file = new File([blob], 'teste-direto-cloudinary.png', { type: 'image/png' });
            resolve(file);
        }, 'image/png');
    });
}

/**
 * Faz upload direto para o Cloudinary sem depender do serviço CloudinaryService
 */
function uploadToCloudinary(file) {
    return new Promise(function(resolve, reject) {
        // Configuração fixa do Cloudinary
        const cloudName = 'c-5c12b74395e4c12952f8b33425521e';
        const uploadPreset = 'moz_doctor_app';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        
        // Criar FormData para o upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'profile_images');
        
        // Configurar e enviar a requisição
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', url, true);
        
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                try {
                    const response = JSON.parse(this.responseText);
                    resolve(response);
                } catch (e) {
                    reject({
                        status: this.status,
                        statusText: 'Erro ao processar resposta',
                        responseText: this.responseText
                    });
                }
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    responseText: this.responseText
                });
            }
        };
        
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText || 'Erro de conexão'
            });
        };
        
        // Enviar o FormData
        xhr.send(formData);
    });
}
