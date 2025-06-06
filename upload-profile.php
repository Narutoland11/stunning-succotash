<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configurações
$target_dir = "uploads/profile_images/";
$max_file_size = 5 * 1024 * 1024; // 5MB

// Verificar se o diretório de uploads existe, senão criar
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Verificar se é uma solicitação POST com arquivo
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["profile_image"])) {
    $response = array();
    
    try {
        $user_id = isset($_POST["user_id"]) ? $_POST["user_id"] : null;
        
        // Validar ID do usuário
        if (!$user_id) {
            throw new Exception("ID do usuário é obrigatório");
        }
        
        // Criar pasta específica do usuário se não existir
        $user_dir = $target_dir . $user_id . "/";
        if (!file_exists($user_dir)) {
            mkdir($user_dir, 0777, true);
        }
        
        $file = $_FILES["profile_image"];
        
        // Verificar erros de upload
        if ($file["error"] !== UPLOAD_ERR_OK) {
            throw new Exception("Erro no upload do arquivo: " . $file["error"]);
        }
        
        // Validar tamanho do arquivo
        if ($file["size"] > $max_file_size) {
            throw new Exception("Arquivo muito grande. O limite é 5MB.");
        }
        
        // Validar tipo do arquivo
        $allowed_types = ["image/jpeg", "image/png", "image/gif"];
        $file_type = mime_content_type($file["tmp_name"]);
        if (!in_array($file_type, $allowed_types)) {
            throw new Exception("Tipo de arquivo não permitido. Use apenas JPG, PNG ou GIF.");
        }
        
        // Gerar nome único para o arquivo
        $file_extension = pathinfo($file["name"], PATHINFO_EXTENSION);
        $file_name = "profile_" . time() . "." . $file_extension;
        $target_file = $user_dir . $file_name;
        
        // Excluir imagem anterior (opcional)
        $files = glob($user_dir . "profile_*");
        foreach($files as $old_file) {
            if (is_file($old_file)) {
                unlink($old_file);
            }
        }
        
        // Mover arquivo para o diretório de destino
        if (move_uploaded_file($file["tmp_name"], $target_file)) {
            // Retornar URL da imagem
            $base_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
            $file_url = $base_url . "/" . $target_file;
            
            $response = [
                "status" => "success",
                "message" => "Foto de perfil enviada com sucesso",
                "photoURL" => $file_url
            ];
        } else {
            throw new Exception("Ocorreu um erro ao salvar o arquivo");
        }
    } catch (Exception $e) {
        $response = [
            "status" => "error",
            "message" => $e->getMessage()
        ];
        http_response_code(400);
    }
    
    // Enviar resposta como JSON
    echo json_encode($response);
    exit;
}

// Se chegou aqui, não é uma solicitação válida
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Método não permitido"]);
?>
