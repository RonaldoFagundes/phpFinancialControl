<?php

namespace Models;

use Models\Conn;

use Controller\PostCreditCardController;


class PostCreditCardModel 
{

   private $conn = "";
    
   function __construct()
   {
      $this->conn = Conn::getConnection();
   }

   public function getPostsByDate(PostCreditCardController $pcc):bool
   {
      $query = "SELECT 
      tb_post_creditcard.user_pcc ,
      tb_post_creditcard.shop_pcc ,
      tb_post_creditcard.date_pcc ,
      tb_post_creditcard.value_pcc ,
      tb_post_creditcard.desc_pcc ,
      tb_post_creditcard.parcel_pcc ,
      tb_creditcard.format_cc ,
      tb_creditcard.type_cc ,
      tb_post_creditcard.expery_date_pcc          
      FROM tb_post_creditcard 
      INNER JOIN tb_creditcard ON tb_post_creditcard.fk_cc = tb_creditcard.id_cc 
      WHERE year(tb_post_creditcard.expery_date_pcc)=:year
      and month(tb_post_creditcard.expery_date_pcc)=:month
      ORDER BY STR_TO_DATE(tb_post_creditcard.date_pcc,'%d/%m/%Y')ASC;";

      $sql = $this->conn->prepare($query);      
      
      $sql->bindValue(':year', $pcc->getYear());      
      $sql->bindValue(':month', $pcc->getMonth());  

      $sql->execute();   

      if ($sql->rowCount() > 0) {
          $list_posts = array();
          while ($posts = $sql->fetchAll($this->conn::FETCH_ASSOC)) {
             $list_posts = $posts;
          }
          $pcc->setList($list_posts);
          return true; 
       }else{
          $pcc->setMsg("not found");
          return false; 
       }       
   }  

}