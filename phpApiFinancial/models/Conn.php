<?php

namespace Models;

require_once __DIR__ . '/../config/config.php';


class Conn {
  
    public static function getConnection() {
        return getDB();  
    }



}