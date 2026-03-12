<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Resposta 200 OK para requisições OPTIONS
    exit();
}

require_once __DIR__ . '/core/PostCreditCardCore.php';
$pcc = new PostCreditCardCore();

$data = json_decode(file_get_contents('php://input'), true) ?? [];

/*
if($_GET['action'] === 'postsByDate') {   
    $year  = $data['search']['year'] ?? null;
    $month = $data['search']['month'] ?? null;  
  echo json_encode($pcc->requestPostsByDate($year, $month));
}
*/

if (isset($_GET['action']) && $_GET['action'] === 'postsByDate') {
    // Verifica se o parâmetro "search" existe e contém os valores esperados
    if (!isset($data['search']['year']) || !isset($data['search']['month'])) {
        // Retorna erro caso year ou month não sejam enviados
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "year and month are required"]);
        exit();
    }

    // Extrai o ano e o mês dos dados recebidos
    $year  = $data['search']['year'] ?? null;
    $month = $data['search']['month'] ?? null;

    // Chama a função para obter os posts com base na data
    $result = $pcc->requestPostsByDate($year, $month);

    // Verifica se o resultado é vazio ou não encontrado

    if (empty($result)) {
        echo json_encode(["message" => "No posts found for the given date range"]);
    } else {
        // Retorna os posts encontrados
        echo json_encode($result);
    }
} else {
    // Caso o "action" não seja fornecido ou não seja válido
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Invalid or missing action parameter"]);
}
exit();






