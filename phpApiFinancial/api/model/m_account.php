<?php


require_once 'conn.php';

//require_once ROOT_PATH . "conn.php";

class M_Account extends Conn
{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo = $this->conn->pdo();
    }
 


  public function insertAccount(C_Account $c_account )
  {         
     $query = "INSERT INTO tb_bank_account (number_bka, type_bka , open_date_bka, desc_bka , amount_bka, fk_bank )
     VALUES(:number, :type, :open, :desc, :amount, :fk)";

     $sql = $this->pdo->prepare($query); 

     $sql->bindValue(':number', $c_account->getNumber() );
     $sql->bindValue(':type',   $c_account->getType() );
     $sql->bindValue(':open',   $c_account->getOpenDate() );
     $sql->bindValue(':desc',   $c_account->getDesc() );
     $sql->bindValue(':amount', $c_account->getAmount() );
     $sql->bindValue(':fk',     $c_account->getFkBank() );

          if ( $sql->execute() ) {
              $c_account->setMsg("success");
            } else {
              $c_account->setMsg("error");             
          }
     
  }






  public function selectAccount(C_Account $c_account):bool
  {
      $query = " SELECT
        tb_bank.name_bnk , 
        tb_bank_account.type_bka ,
        tb_bank_account.number_bka
      FROM tb_bank 
      INNER JOIN tb_bank_account ON (fk_bank = id_bnk );" ;
      
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_account = array();

        while ($accounts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_account = $accounts;
        }

        $c_account->setList($list_account);
        return true;
       
     }else{ 

        $c_account->setMsg("not found");
        return false; 
     }

  }




  public function selectAccountById(C_Account $c_account):bool
  {
      $query = " SELECT
        tb_bank_account.id_bka ,
        tb_bank.name_bnk , 
        tb_bank_account.type_bka ,
        tb_bank_account.number_bka
      FROM tb_bank 
      INNER JOIN tb_bank_account ON (fk_bank = id_bnk ) WHERE tb_bank_account.id_bka not in (:id)
      and tb_bank_account.type_bka not in ('Investimentos');" ;
      
      $sql = $this->pdo->prepare($query); 
      $sql->bindValue(':id', $c_account->getId());   
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_account = array();

        while ($accounts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_account = $accounts;
        }

        $c_account->setList($list_account);
        return true;
       
     }else{ 

        $c_account->setMsg("not found");
        return false; 
     }

  }


 






/*
  public function selectAccount(C_Account $c_account):bool
  {
      $query = "SELECT * from tb_bank_account" ;
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_account = array();

        while ($accounts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_account = $accounts;
        }

        $c_account->setList($list_account);
        return true;
       
     }else{ 

        $c_account->setMsg("not found");
        return false; 
     }

  }
 */







 public function selectAccountByBank(C_Account $c_account):bool
  {
         $query = "SELECT
                   tb_bank_account.id_bka ,
                   tb_bank.name_bnk , 
                   tb_bank_account.type_bka ,
                   tb_bank_account.number_bka ,
                   tb_bank_account.amount_bka,
                   tb_bank_account.open_date_bka ,
                   tb_bank_account.desc_bka ,
                   tb_bank_account.fk_bank  
                   FROM tb_bank 
                   INNER JOIN tb_bank_account ON (fk_bank = id_bnk ) WHERE tb_bank_account.fk_bank = :fkbnk";                   
         $sql = $this->pdo->prepare($query);
         $sql->bindValue(':fkbnk', $c_account->getFkbank());               
         $sql->execute();

      if ($sql->rowCount() > 0) {

          $list_account = array();
  
          while ($accounts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
               $list_account = $accounts;
          }
  
          $c_account->setList($list_account);
          return true;
         
      }else{   
          $c_account->setMsg("not found");
          return false; 
       }

  }







  public function selectAccountByBankIgnoreId(C_Account $c_account):bool
  {
         $query = "SELECT                   
                   tb_bank_account.id_bka , 
                   tb_bank.name_bnk ,
                   tb_bank_account.type_bka ,
                   tb_bank_account.number_bka ,
                   tb_bank_account.amount_bka               
                   FROM tb_bank 
                   INNER JOIN tb_bank_account ON (fk_bank = id_bnk )
                   WHERE tb_bank_account.fk_bank  = :fkbnk and tb_bank_account.id_bka not in (:id);" ;

         $sql = $this->pdo->prepare($query);
         $sql->bindValue(':fkbnk', $c_account->getFkbank());   
         $sql->bindValue(':id', $c_account->getId());              
         $sql->execute();

      if ($sql->rowCount() > 0) {

          $list_account = array();
  
          while ($accounts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
               $list_account = $accounts;
          }
  
          $c_account->setList($list_account);
          return true;
         
      }else{   
          $c_account->setMsg("not found");
          return false; 
       }

  }




  public function selectAmountById(C_Account $c_account):bool
  {
      $query = "SELECT amount_bka AS value from tb_bank_account WHERE id_bka= :id" ;
      $sql = $this->pdo->prepare($query); 
      $sql->bindValue(':id', $c_account->getId());    
      $sql->execute();
     
      if ($sql->rowCount() > 0) {

         $amount = $sql->fetch();
         $c_account->setAmount($amount['value']);
         return true ;         

      }else{ 

         $c_account->setMsg("not found"); 
         return false;
         
     }

  }


  public function selectAccountType(C_Account $c_account):bool
  {
      $query = "SELECT distinct type_bka from tb_bank_account order by type_bka;" ;
      $sql = $this->pdo->prepare($query);    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_type = array();

        while ($type = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_type = $type;
        }

        $c_account->setList($list_type);
        return true;
       
     }else{ 

        $c_account->setMsg("not found");
        return false; 
     }

  }




  public function updateAccount(C_Account $c_account)
  {   

   $query = "UPDATE tb_bank_account SET number_bka=:number, type_bka=:type, open_date_bka=:open,   
    desc_bka=:desc,  amount_bka=:amount , fk_bank=:fk   WHERE id_bka=:id" ;
      
     $sql = $this->pdo->prepare($query); 

     $sql->bindValue(':number', $c_account->getNumber() );
     $sql->bindValue(':type',   $c_account->getType() );
     $sql->bindValue(':open',   $c_account->getOpenDate() );
     $sql->bindValue(':desc',   $c_account->getDesc() );
     $sql->bindValue(':amount', $c_account->getAmount() );
     $sql->bindValue(':fk',     $c_account->getFkBank() );
     $sql->bindValue(':id',     $c_account->getId() );
       
       if ( $sql->execute() ) {
        $c_bank->setMsg("success");
       } else {
        $c_bank->setMsg("error");             
     }
  }


  
 

}