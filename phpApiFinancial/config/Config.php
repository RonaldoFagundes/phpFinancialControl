<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'db_financial_control');
define('DB_USER', 'RFactory');
define('DB_PASS', 'jH7&p_f7*1M');

function getDB() {    
    try {
        return new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    } catch (PDOException $e) {
        echo 'Conexão falhou: ' . $e->getMessage();
        exit;
    }
}















