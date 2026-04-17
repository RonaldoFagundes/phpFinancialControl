<?php

//require_once './credencials.php';
require_once ROOT_PATH . "/credencials.php";


class Conn
{
  private $host;
  private $user;
  private $password;
  private $db;

  public function pdo()
  {    
    $crd = new Credencials();
    $this->host = $crd->getHost();
    $this->user = $crd->getUser();
    $this->password = $crd->getPassword();
    $this->db =  $crd->getDb();
    try {
      $pdo = new PDO(
        "mysql:host=$this->host;dbname=$this->db",
        $this->user,
        $this->password,
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
      );
      return $pdo;

    } catch (PDOException $e) {
      echo 'ERROR: ' . $e->getMessage();
    }

  }


}