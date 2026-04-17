<?php


require_once 'conn.php';
//require_once ROOT_PATH . "conn.php";


class M_User extends Conn
{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo = $this->conn->pdo();
    }

    
    public function insertUser( C_User $c_user)
    {  
     $query = "INSERT INTO tb_users (name_use, email_use, password_use , profile_use) VALUES(:name, :email, :pass, :prof)";
     $sql = $this->pdo->prepare($query);      
     $sql->bindValue(':name',   $c_user->getName() );
     $sql->bindValue(':email',  $c_user->getEmail() );
     $sql->bindValue(':pass',   $c_user->getPassword() );
     $sql->bindValue(':prof',   $c_user->getProfile() );

          if ( $sql->execute() ) {
              $c_user->setMsg("success");
            } else {
              $c_user->setMsg("error");             
          }

    }



    public function selectUsers(C_User $c_user):bool
    {
      $query = "SELECT * from tb_users" ;
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_users = array();

        while ($users = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_users = $users;
        }

        $c_user->setList($list_users);
        return true;       
     }else { 
        $c_user->setMsg("not found");
        return false; 
    }

  }
  
 

}