<?php


require_once 'conn.php';
//require_once ROOT_PATH . "conn.php";


class M_Transactions extends Conn


{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo  = $this->conn->pdo();
    }



    public function insertTransactions(C_Transactions $ctr)
    {     

         $query = "INSERT INTO tb_transactions (mov_trs, date_trs, type_trs, source_trs, form_trs, desc_trs, value_trs, fk_bac)
         VALUES( :mov, :date, :type, :source, :form, :desc, :value, :fk ) ";
     
         $sql = $this->pdo->prepare($query);
              
         $sql->bindValue(":mov",    $ctr->getMov());
         $sql->bindValue(":date",   $ctr->getDate());         
         $sql->bindValue(":type",   $ctr->getType());
         $sql->bindValue(":source", $ctr->getSource());
         $sql->bindValue(":form",   $ctr->getForm());
         $sql->bindValue(":desc",   $ctr->getDesc());
         $sql->bindValue(":value",  $ctr->getValue());
         $sql->bindValue(":fk",     $ctr->getFkac());

         if ( $sql->execute() ) {
          $ctr->setMsg(" transactions ".$ctr->getType()." success ");
          }else{
          $ctr->setMsg("error");             
         } 

    }
      /*
       if($cpcc->getInOut() == true){
          
          $query = " INSERT INTO tb_transactions (mov_trs, date_trs, type_trs, source_trs, form_trs, desc_trs,  value_trs, fk_bac)
          VALUES( in , :date, :user, :parcel, :value, :desc, :expery, :fk  ) ";
          $sql = $this->pdo->prepare($query);
               
          $sql->bindValue(":shop",   $cpcc->getPlaceShop());
          $sql->bindValue(":date",   $cpcc->getDate());         
          $sql->bindValue(":user",   $cpcc->getUser());
          $sql->bindValue(":parcel", $cpcc->getParcel());
          $sql->bindValue(":value",  $cpcc->getValue());
          $sql->bindValue(":desc",   $cpcc->getDesc());
          $sql->bindValue(":expery", $cpcc->getExpery());
          $sql->bindValue(":fk",     $cpcc->getFkcc());
 
          if ( $sql->execute() ) {
           $cpcc->setMsg("success");
           }else{
           $cpcc->setMsg("error");             
          }        
       }
     */

   





    public function selectLastTransaction(C_Transactions $ctr):bool
    {
        $query = "SELECT * FROM tb_transactions WHERE fk_bac=:fkac ORDER BY id_trs DESC LIMIT 1" ;

        $sql = $this->pdo->prepare($query); 
        $sql->bindValue(":fkac",$ctr->getFkac());
        
        $sql->execute();
  
        if ($sql->rowCount() > 0) {
  
          $registration_trs = array();
  
          while ($registration = $sql->fetchAll(PDO::FETCH_ASSOC)) {
               $registration_trs = $registration;
          }
  
          $ctr->setList($registration_trs);
          return true;
         
       }else{ 
  
          $ctr->setMsg("not found");
          return false; 
       }
  
    }




}

