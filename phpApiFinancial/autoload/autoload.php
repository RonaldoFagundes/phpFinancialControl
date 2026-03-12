<?php


// Função de autoload
function autoload($class) {
    // Substitui a barra invertida (\) por barra normal (/) para encontrar o diretório correto
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    
    // Define o diretório base do projeto
    $baseDir = __DIR__ . '/../';  // Caminho para a raiz do seu projeto
    
    // Tenta carregar a classe de acordo com seu namespace
    if (strpos($class, 'Controller') === 0) {
        // Construa o caminho para o diretório controllers
        $file = $baseDir . 'controllers' . DIRECTORY_SEPARATOR . basename($class) . '.php';

    } elseif (strpos($class, 'Models') === 0) {
        // Construa o caminho para o diretório models
        $file = $baseDir . 'models' . DIRECTORY_SEPARATOR . basename($class) . '.php';

    }

    // Verifique se o arquivo existe e, em caso afirmativo, faça o require
    if (file_exists($file)) {
        require_once $file;
    }
}




// Registra o autoloader
spl_autoload_register('autoload');
