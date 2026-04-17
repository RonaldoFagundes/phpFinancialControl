<?php


require_once 'conn.php';
//require_once ROOT_PATH . "conn.php";


class M_Post_Credit_Card extends Conn
{
  private $conn = "";
  private $pdo = "";

    function __construct()
    {
         $this->conn = new Conn();
         $this->pdo  = $this->conn->pdo();
    }





    
    public function insertPostCreditCard(C_Post_Credit_Card $cpcc)
    {     
         $query = " INSERT INTO tb_post_creditcard (shop_pcc, date_pcc, user_pcc, parcel_pcc, value_pcc, desc_pcc, expery_date_pcc, fk_cc)
         VALUES( :shop, :date, :user, :parcel, :value, :desc, :expery, :fk  ) ";

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
          $cpcc->setMsg("post_creditcard ".getPlaceShop()." success");
          }else{
          $cpcc->setMsg("error");             
         }       
    }




    


   
    
    public function selectPostCreditCardAll( C_Credit_Card $c_cc , C_Post_Credit_Card $cpcc )
    {
      //$query = "SELECT * FROM tb_post_creditcard WHERE fk_cc = :fkcc and expery_date_pcc like '%':date'%' ";
      //$query = "SELECT * FROM tb_post_creditcard WHERE fk_cc = :fkcc and month(str_to_date(expery_date_pcc,'%d/%m/%Y'))=:date ";
      
      $query = " SELECT 
       tb_post_creditcard.user_pcc ,
       tb_post_creditcard.shop_pcc ,
       tb_post_creditcard.date_pcc ,
       tb_post_creditcard.value_pcc ,
       tb_post_creditcard.desc_pcc ,
       tb_creditcard.format_cc ,
       tb_post_creditcard.expery_date_pcc          
       FROM tb_post_creditcard 
       inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc   
       inner JOIN tb_bank_account ON  tb_creditcard.fk_bac = tb_bank_account.id_bka
       where tb_bank_account.id_bka = :fkac 
       and tb_creditcard.due_day_cc = :due
       and month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :date 
       order by tb_post_creditcard.date_pcc;";
            
      $sql = $this->pdo->prepare($query); 
      $sql->bindValue(':fkac', $c_cc->getFkac()); 
      $sql->bindValue(':due', $c_cc->getDueDay()); 
      $sql->bindValue(':date', $cpcc->getDate());    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_post = array();

        while ($posts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_post = $posts;
        }
        $cpcc->setList($list_post);  
        return true;      
     }else { 
        $cpcc->setMsg("not found"); 
        return false;         
    }
  }







  public function selectPostCreditCardByUser(C_Credit_Card $ccc, C_Post_Credit_Card $cpcc)
  {
   // $query = "SELECT * FROM tb_post_creditcard WHERE user_pcc = :user and fk_cc = :fkcc 
   // and expery_date_pcc and month(str_to_date(expery_date_pcc,'%d/%m/%Y'))=:date";

    /*
     $query = " SELECT 
      tb_post_creditcard.user_pcc ,
      tb_post_creditcard.shop_pcc ,
      tb_post_creditcard.date_pcc ,
      tb_post_creditcard.value_pcc ,
      tb_post_creditcard.desc_pcc ,
      tb_post_creditcard.parcel_pcc ,
      tb_creditcard.format_cc ,
      tb_post_creditcard.expery_date_pcc          
      FROM tb_post_creditcard 
      inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc   
      inner JOIN tb_bank_account ON  tb_creditcard.fk_bac = tb_bank_account.id_bka
      where tb_bank_account.id_bka = :fkac 
      and tb_creditcard.due_day_cc = :due
      and month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :date
      and year(str_to_date(tb_post_creditcard.expery_date_pcc ,'%d/%m/%Y'))=2025 
      and tb_post_creditcard.user_pcc = :user order by tb_post_creditcard.date_pcc;";
       */


 $query = " SELECT 
      tb_post_creditcard.user_pcc ,
      tb_post_creditcard.shop_pcc ,
      tb_post_creditcard.date_pcc ,
      tb_post_creditcard.value_pcc ,
      tb_post_creditcard.desc_pcc ,
      tb_post_creditcard.parcel_pcc ,
      tb_creditcard.format_cc ,
      tb_post_creditcard.expery_date_pcc          
      FROM tb_post_creditcard 
      inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc 
      where month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :month
      and year(str_to_date(tb_post_creditcard.expery_date_pcc ,'%d/%m/%Y'))=:year 
      and tb_creditcard.type_cc = :type
      and tb_post_creditcard.user_pcc = :user order by tb_post_creditcard.date_pcc;";


    $sql = $this->pdo->prepare($query); 
    //$sql->bindValue(':fkac', $c_cc->getFkac()); 
    //$sql->bindValue(':due', $c_cc->getDueDay()); 
    //$sql->bindValue(':date', $cpcc->getDate());
    $sql->bindValue(':type', $ccc->getType());
    $sql->bindValue(':month',$cpcc->getMonth());
    $sql->bindValue(':year', $cpcc->getYear());
    $sql->bindValue(':user', $cpcc->getUser()); 
    $sql->execute();

    if ($sql->rowCount() > 0) {

      $list_post = array();

      while ($posts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
           $list_post = $posts;
      }
      $cpcc->setList($list_post);  
      return true;      
   }else { 
      $cpcc->setMsg("not found"); 
      return false;         
  }
}




 public function selectAmountByUser(C_Credit_Card $ccc, C_Post_Credit_Card $cpcc)
  {
   //$query = "SELECT sum( tb_post_creditcard.value_pcc) AS value
   //FROM tb_post_creditcard INNER JOIN tb_creditcard tc  ON (fk_cc = id_cc  ) 
  // WHERE tb_post_creditcard.user_pcc = :user and month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))=:date and tb_post_creditcard.fk_cc = :fkcc ";
 
   // $query = "SELECT sum(value_pcc) as value from tb_post_creditcard WHERE user_pcc = :user AND fk_cc = :fkcc";
   
   /*
   $query = "SELECT sum( tb_post_creditcard.value_pcc) AS value 
   FROM tb_post_creditcard 
   inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc   
   inner JOIN tb_bank_account ON  tb_creditcard.fk_bac = tb_bank_account.id_bka 
   where tb_bank_account.id_bka = :fkac 
   and tb_creditcard.due_day_cc = :due
   and month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :date 
   and year(str_to_date(tb_post_creditcard.expery_date_pcc ,'%d/%m/%Y'))=2025
   and tb_post_creditcard.user_pcc = :user;";
   */


   $query = "SELECT sum( tb_post_creditcard.value_pcc) AS value 
      FROM tb_post_creditcard 
      inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc 
      where month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :month
      and year(str_to_date(tb_post_creditcard.expery_date_pcc ,'%d/%m/%Y'))=:year
      and tb_creditcard.type_cc = :type
      and tb_post_creditcard.user_pcc = :user order by tb_post_creditcard.date_pcc;";     

    $sql = $this->pdo->prepare($query); 
     $sql->bindValue(':type', $ccc->getType());
    $sql->bindValue(':month',$cpcc->getMonth());
    $sql->bindValue(':year', $cpcc->getYear());
    $sql->bindValue(':user', $cpcc->getUser()); 
    /*
    $sql->bindValue(':fkac', $c_cc->getFkac()); 
    $sql->bindValue(':due', $c_cc->getDueDay()); 
    $sql->bindValue(':date', $cpcc->getDate());
    */
    $sql->execute();

   if ($sql->rowCount() > 0) {
        $value = $sql->fetch();
        $cpcc->setAmount($value['value']);                   
        return true;   
     }else{ 
        $cpcc->setMsg("not found"); 
        return false;
    }
  }






 public function selectUser(C_Post_Credit_Card $cpcc)
    {
      $query = "SELECT DISTINCT user_pcc FROM tb_post_creditcard WHERE fk_cc = :fkcc" ;
      $sql = $this->pdo->prepare($query); 
      $sql->bindValue(':fkcc', $cpcc->getFkcc());    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $list_post = array();

        while ($posts = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $list_post = $posts;
        }
        $cpcc->setList($list_post);  
        return true;      
     }else { 
        $cpcc->setMsg("not found"); 
        return false;         
    }
  }





  

  

  public function selectAmount(C_Credit_Card $c_cc, C_Post_Credit_Card $cpcc):bool
  {

   //$query = "SELECT sum( tb_post_creditcard.value_pcc) AS value 
   //FROM tb_post_creditcard INNER JOIN tb_creditcard tc  ON (fk_cc = id_cc  ) 
   //WHERE month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))=:date and tb_post_creditcard.fk_cc = :fkcc ";
 
   // $query = "SELECT sum(value_pcc) as value from tb_post_creditcard WHERE fk_cc = :fkcc";
       
   $query = "SELECT sum( tb_post_creditcard.value_pcc) AS value 
    FROM tb_post_creditcard 
    inner JOIN tb_creditcard ON  tb_post_creditcard.fk_cc = tb_creditcard.id_cc   
    inner JOIN tb_bank_account ON  tb_creditcard.fk_bac = tb_bank_account.id_bka
    where tb_bank_account.id_bka = :fkac 
    and tb_creditcard.due_day_cc = :due
    and month(str_to_date(tb_post_creditcard.expery_date_pcc,'%d/%m/%Y'))= :date
    and year(str_to_date(tb_post_creditcard.expery_date_pcc ,'%d/%m/%Y'))=2025;";

    $sql = $this->pdo->prepare($query);
    $sql->bindValue(':fkac', $c_cc->getFkac()); 
    $sql->bindValue(':due', $c_cc->getDueDay()); 
    $sql->bindValue(':date', $cpcc->getDate()); 
    $sql->execute();

   if ($sql->rowCount() > 0) {
        $value = $sql->fetch();
        $cpcc->setAmount($value['value']);                   
        return true;   
     }else{ 
        $cpcc->setMsg("not found"); 
        return false;
    }
  }







 



 


  public function selectLastPost(C_Post_Credit_Card $cpcc):bool
  {
      $query = "SELECT * FROM tb_post_creditcard WHERE fk_cc = :fkcc ORDER BY id_pcc DESC LIMIT 1" ;
      $sql = $this->pdo->prepare($query); 
      $sql->bindValue(':fkcc', $cpcc->getFkcc());    
      $sql->execute();

      if ($sql->rowCount() > 0) {

        $registration_post = array();

        while ($registration = $sql->fetchAll(PDO::FETCH_ASSOC)) {
             $registration_post = $registration;
        }

        $cpcc->setList($registration_post);
        return true;
       
     }else{ 

        $cpcc->setMsg("not found");
        return false; 
     }

  }







  


   /*
    public function deletePostCreditCard(PostCreditCards $pcs)
    {
     $query = "DELETE FROM tb_post_creditcard WHERE fk_cc = :id" ;   
     $sql = $this->pdo->prepare($query);
     $sql->bindValue(":id", $pcs->getId());
    if ($sql->execute()) {                    
         return true;   
      }else{         
         return false;
     }
   }
  */









}