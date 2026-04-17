<?php


require_once 'conn.php';
//require_once ROOT_PATH . "conn.php";

class M_Bank extends Conn
{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo  = $this->conn->pdo();
    }
 


    public function insertBank(C_Bank $c_bank)
    {
     $query = "INSERT INTO tb_bank (number_bnk, name_bnk, ein_bnk, contact_bnk , desc_bnk, img_bnk )
     VALUES(:number, :name, :ein, :contact, :desc, :img)";

     $sql = $this->pdo->prepare($query); 

     $sql->bindValue(':number', $c_bank->getNumber() );
     $sql->bindValue(':name',   $c_bank->getName() );
     $sql->bindValue(':ein',    $c_bank->getEin() );
     $sql->bindValue(':contact',$c_bank->getContact() );
     $sql->bindValue(':desc',   $c_bank->getDesc() );
     $sql->bindValue(':img',    $c_bank->getImg() );

          if ( $sql->execute() ) {
              $c_bank->setMsg("success");
            } else {
              $c_bank->setMsg("error");             
          } 
    }




    public function selectBank(C_Bank $c_bank):bool
    {
      $query = "SELECT * from tb_bank" ;
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_bank = array();

        while ($banks = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_bank = $banks;
        }

        $c_bank->setList($list_bank);
        return true;       
     }else { 
        $c_bank->setMsg("not found");
        return false; 
    }

  }





  public function updatetBank(C_Bank $c_bank)
  {   
   $query = "UPDATE tb_bank SET number_bnk=:number, name_bnk=:name, ein_bnk=:ein, contact_bnk=:contact, desc_bnk=:desc, img_bnk=:img  WHERE id_bnk=:id" ;

       $sql = $this->pdo->prepare($query);
     
       $sql->bindValue(':number', $c_bank->getNumber());
       $sql->bindValue(':name',   $c_bank->getName());
       $sql->bindValue(':ein',    $c_bank->getEin());
       $sql->bindValue(':contact',$c_bank->getContact());         
       $sql->bindValue(':desc',   $c_bank->getDesc());       
       $sql->bindValue(':img',    $c_bank->getImg()); 
       $sql->bindValue(':id',     $c_bank->getId());
  
       if ( $sql->execute() ) {
        $c_bank->setMsg("success");
       } else {
        $c_bank->setMsg("error");             
     }
  }



    public function deleteBank(C_Bank $c_bank)
    {   
     $query = "DELETE FROM tb_bank WHERE id_bnk = :id ";

         $sql = $this->pdo->prepare($query);
       
         $sql->bindValue(':id', $c_bank->getId());         

         if ( $sql->execute() ) {
          $c_bank->setMsg("success");
         } else {
          $c_bank->setMsg("error");             
       }
    }


  
 

}