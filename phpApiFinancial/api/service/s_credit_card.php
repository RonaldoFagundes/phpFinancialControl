<?php

//include 'controller/c_credit_card.php';
//include 'model/m_credit_card.php';

require_once ROOT_PATH . "/controller/c_credit_card.php";
require_once ROOT_PATH . "/model/m_credit_card.php";

 class S_Credit_Card {

    private $c_credit_card = "";
    private $m_credit_card = "";  



    function __construct()
    {
        $this->c_credit_card = new C_Credit_Card();
        $this->m_credit_card = new M_Credit_Card();
    }

      

    public function cadCreditCardData($data)
     {  
        $this->c_credit_card->setId($data['cadCreditCard']['id']);  
        $this->c_credit_card->setNumber($data['cadCreditCard']['number']) ;
        $this->c_credit_card->setType($data['cadCreditCard']['type']) ;
        $this->c_credit_card->setFormat($data['cadCreditCard']['format']) ;
        $this->c_credit_card->setDesc($data['cadCreditCard']['desc']) ;
        $this->c_credit_card->setFromDate($data['cadCreditCard']['fromDate']);
        $this->c_credit_card->setExperyDate($data['cadCreditCard']['expiry']);
        $this->c_credit_card->setLimit($data['cadCreditCard']['limit']);
        $this->c_credit_card->setDueDay($data['cadCreditCard']['due']);
        $this->c_credit_card->setFkac($data['cadCreditCard']['idac']);

           if( $this->c_credit_card->getId() == 0 ){
               $this->m_credit_card->insertCreditCard($this->c_credit_card);  
           }else{
               $this->m_credit_card->updateCreditCard($this->c_credit_card);
           }
         
        return  $this->c_credit_card->getMsg();       
     }





     public function listAllCreditCard()
     { 
        
      if ( $this->m_credit_card->selectAllCreditCard($this->c_credit_card) ) {
           return $this->c_credit_card->getList();
      }else{
           return $this->c_credit_card->getMsg();
      }

     }




     public function listCreditCardByAccount($id)
     { 

      $this->c_credit_card->setFkac($id) ;      
        
      if ( $this->m_credit_card->selectCreditCardByAccount($this->c_credit_card) ) {
           return $this->c_credit_card->getList();
      }else{
           return $this->c_credit_card->getMsg();
      }

     }








}