/**
 * Moz Doctor Dose - Otimizador de Imagens
 * Script para carregar imagens de forma otimizada e aplicar dimensões explícitas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Encontrar todas as imagens na página
    const images = document.querySelectorAll('img');
    
    // Para cada imagem na página
    images.forEach(function(img) {
        // Ignorar imagens que já têm width e height definidos
        if (img.hasAttribute('width') && img.hasAttribute('height')) {
            return;
        }
        
        // Verificar se a imagem já está carregada ou tem um evento de carga
        if (img.complete) {
            applyDimensions(img);
        } else {
            img.addEventListener('load', function() {
                applyDimensions(img);
            });
        }
        
        // Adicionar lazy loading para imagens abaixo da dobra
        if (!isAboveFold(img)) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    /**
     * Aplica dimensões explícitas às imagens
     * @param {HTMLImageElement} img - Elemento de imagem
     */
    function applyDimensions(img) {
        // Obter dimensões reais
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        
        // Definir atributos apenas se a imagem tiver dimensões válidas
        if (width && height) {
            img.setAttribute('width', width);
            img.setAttribute('height', height);
        }
    }
    
    /**
     * Verifica se um elemento está acima da dobra
     * @param {HTMLElement} element - Elemento a ser verificado
     * @return {boolean} - Verdadeiro se estiver acima da dobra
     */
    function isAboveFold(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight;
    }
    
    // Converter imagens para WebP via service worker se suportado
    if ('serviceWorker' in navigator) {
        // Registro do service worker será implementado separadamente
        console.log('Service Worker compatível para otimização de imagens');
    }
});
