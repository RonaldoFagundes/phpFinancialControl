<?php


require_once 'conn.php';
//require_once ROOT_PATH . "conn.php";


class M_Credit_Card extends Conn
{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo  = $this->conn->pdo();
    }




    public function insertCreditCard(C_Credit_Card $c_cc)
    {
     $query = "INSERT INTO tb_creditcard (number_cc, type_cc, format_cc, desc_cc, from_date_cc, expery_date_cc, due_day_cc, limit_cc, fk_bac )
     VALUES(:number, :type, :format, :desc, :fromDate, :expiry, :due, :limit, :idac )";

     $sql = $this->pdo->prepare($query); 

     $sql->bindValue(':number',   $c_cc->getNumber());
     $sql->bindValue(':type',     $c_cc->getType());
     $sql->bindValue(':format',   $c_cc->getFormat());
     $sql->bindValue(':desc',     $c_cc->getDesc());
     $sql->bindValue(':fromDate', $c_cc->getFromDate());
     $sql->bindValue(':expiry',   $c_cc->getExperyDate());
     $sql->bindValue(':due',      $c_cc->getDueDay());
     $sql->bindValue(':limit',    $c_cc->getLimit());
     $sql->bindValue(':idac',     $c_cc->getFkac()) ;

          if ( $sql->execute() ) {
              $c_cc->setMsg("success");
            } else {
              $c_cc->setMsg("error");             
          } 
    }
    



    public function selectAllCreditCard(C_Credit_Card $c_cc):bool
    {
      $query = "SELECT * from tb_creditcard" ;
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_cc = array();

        while ($ccs = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_cc = $ccs;
        }
        $c_cc->setList($list_cc);  
        return true;      
     }else { 
        $c_cc->setMsg("not found"); 
        return false;         
    }

  }





  public function selectCreditCardByAccount(C_Credit_Card $c_cc):bool
  {
    $query = "SELECT * FROM tb_creditcard WHERE fk_bac=:fkac" ;
    $sql = $this->pdo->prepare($query);   
    
    $sql->bindValue(':fkac', $c_cc->getFkac());               
   
    $sql->execute();

    if ($sql->rowCount() > 0) {

      $list_cc = array();

      while ($ccs = $sql->fetchAll(PDO::FETCH_ASSOC)) {
           $list_cc = $ccs;
      }
      $c_cc->setList($list_cc);  
      return true;      
   }else { 
      $c_cc->setMsg("not found"); 
      return false;         
  }
}



                
public function updateCreditCard(C_Credit_Card $c_cc)
{   
 $query = "UPDATE tb_creditcard SET number_cc=:number, type_cc=:type,  format_cc=:format, desc_cc=:desc, 
   from_date_cc=:fromDate, expery_date_cc=:expiry, due_day_cc=:due, limit_cc=:limit WHERE id_cc=:id" ;

     $sql = $this->pdo->prepare($query);
     
     $sql->bindValue(':number',   $c_cc->getNumber());
     $sql->bindValue(':type',     $c_cc->getType());
     $sql->bindValue(':format',   $c_cc->getFormat());
     $sql->bindValue(':desc',     $c_cc->getDesc());
     $sql->bindValue(':fromDate', $c_cc->getFromDate());
     $sql->bindValue(':expiry',   $c_cc->getExperyDate());
     $sql->bindValue(':due',      $c_cc->getDueDay());
     $sql->bindValue(':limit',    $c_cc->getLimit());
     $sql->bindValue(':id',       $c_cc->getId()) ;

     if ( $sql->execute() ) {
      $c_cc->setMsg("success");
    } else {
      $c_cc->setMsg("error");             
  } 
}

}
