# Configuração do Cloudinary para Moz Doctor Dose

Este guia explica como configurar o Cloudinary para funcionar com o sistema de upload de fotos de perfil tanto no ambiente local quanto no deploy do Netlify.

## Informações Importantes

- **Cloud Name**: dddydaoz6
- **Upload Preset**: moz_doctor_app
- **Modo de Upload**: Unsigned (sem assinatura)

## 1. Criando um Upload Preset

1. **Acesse o console do Cloudinary**:
   - Faça login em https://console.cloudinary.com/

2. **Navegue até Upload Presets**:
   - No menu lateral, clique em "Settings" (Configurações)
   - Clique em "Upload" 
   - Role para baixo até a seção "Upload presets"
   - Clique em "Add upload preset"

3. **Configure o novo preset**:
   - **Nome do Preset**: `moz_doctor_app` (exatamente com este nome)
   - **Signing Mode**: Selecione "Unsigned" (sem assinatura)
   - **Folder**: `profile_images` (opcional, mas recomendado)

4. **Configurações de transformação**:
   - Role para baixo até "Incoming Transformations"
   - Adicione uma transformação para otimizar imagens:
     - Width: 500
     - Height: 500
     - Crop: `fill` ou `thumb`
     - Quality: Auto (recomendado para áreas com internet limitada)

5. **Habilitar CORS para Netlify**:
   - Ainda na mesma tela, role para baixo até a seção "Upload Restrictions"
   - Em "Allowed Origins", adicione os seguintes domínios:
     * `https://*.netlify.app` (para todos os sites do Netlify)
     * `http://localhost` (para testes locais)
     * Seu domínio personalizado, se tiver um

6. **Salve as configurações**:
   - Clique em "Save" no final da página

## 2. Configuração Específica para Netlify

Se você está tendo problemas de upload no ambiente do Netlify, siga estas etapas adicionais:

1. **Verifique se a configuração CORS está correta**:
   - Confirme que `https://*.netlify.app` foi adicionado às origens permitidas
   - Se você tem um domínio personalizado, adicione-o também

2. **Atualize para o código mais recente**:
   - Certifique-se de que a versão mais recente do código foi implantada no Netlify
   - O código inclui fallbacks para situações onde o CORS pode ser um problema

3. **Solucione problemas de CORS**:
   - Abra o console do navegador (F12) para verificar mensagens de erro
   - Erros de CORS aparecerão como "Access-Control-Allow-Origin" ou "cross-origin request blocked"

4. **Alternativa temporária**:
   - Se você continuar enfrentando problemas, o sistema usará automaticamente um fallback que salva a imagem localmente
   - As imagens ainda serão salvas no Firebase, mas não serão otimizadas pelo Cloudinary
   - Esta é uma solução temporária até que os problemas de CORS sejam resolvidos

## 3. Testando a Integração

1. **Verifique a configuração no código**:
   - Abra o arquivo `js/cloudinary-integration.js`
   - Confirme que o `cloudName` está correto
   - Confirme que o `uploadPreset` está definido como `moz_doctor_app`

2. **Teste o upload de uma imagem**:
   - Acesse a página de perfil do usuário
   - Tente fazer upload de uma foto de perfil
   - Verifique os logs no console do navegador (F12) para verificar se a conexão com Cloudinary está funcionando

3. **Verifique no Console Cloudinary**:
   - Após o upload, verifique a pasta `profile_images` no Media Library do Cloudinary
   - A imagem deve aparecer lá com as dimensões otimizadas

## Solução de Problemas

Se o upload não funcionar:

1. **Verifique a conexão com o Cloudinary**:
   - Abra o console do navegador (F12)
   - Procure erros relacionados ao Cloudinary
   - Verifique se a mensagem "Conexão com Cloudinary funcionando" aparece nos logs

2. **Verifique o preset**:
   - Confirme que o preset está configurado como "Unsigned"
   - Verifique se o nome está exatamente como `moz_doctor_app`

3. **Limite de tamanho**:
   - O sistema limita o upload a arquivos de 2MB
   - Se sua imagem for maior, reduza o tamanho ou use uma imagem menor

## Vantagens do Cloudinary

- **Gratuito**: O plano gratuito oferece 25GB de armazenamento, suficiente para milhares de fotos de perfil
- **Otimização automática**: Entrega imagens otimizadas para conexões lentas, ideal para Moçambique
- **CDN Global**: Entrega rápida de imagens em todo o mundo
- **Sem manutenção**: Não é necessário gerenciar servidor de armazenamento

## Informações Técnicas

A integração usa a API HTTP direta do Cloudinary, que permite uploads sem necessidade de chaves de API secretas no frontend (usando upload presets sem assinatura).
