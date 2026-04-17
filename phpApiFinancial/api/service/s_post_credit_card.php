<?php

//include '/controller/c_post_credit_card.php';
//include '/model/m_post_credit_card.php';

//include 'controller/c_credit_card.php';

require_once ROOT_PATH . "/controller/c_post_credit_card.php";
require_once ROOT_PATH . "/model/m_post_credit_card.php";


 class S_Post_Credit_Card {

    private $c_post_cc = "";
    private $m_post_cc = ""; 
    private $c_cc = ""; 



    function __construct()
    {
        $this->c_post_cc = new C_Post_Credit_Card();
        $this->m_post_cc = new M_Post_Credit_Card();
        $this->c_cc      = new C_Credit_Card();
    }




    public function postCreditCardData($data)
    {  
       $this->c_post_cc->setPlaceShop($data['postCreditCard']['placeshop']);     
       $this->c_post_cc->setDate($data['postCreditCard']['date']);
       $this->c_post_cc->setUser($data['postCreditCard']['user']);      
       $this->c_post_cc->setParcel($data['postCreditCard']['parcel']);    
       $this->c_post_cc->setValue($data['postCreditCard']['value']); 
       $this->c_post_cc->setDesc($data['postCreditCard']['desc']);   
       $this->c_post_cc->setExpery($data['postCreditCard']['expery']);
       $this->c_post_cc->setFkcc($data['postCreditCard']['fkcc']); 

       $this->m_post_cc->insertPostCreditCard($this->c_post_cc);    
       return  $this->c_post_cc->getMsg();       
    }




    public function proofPostCreditCard($fkac)
    {  
      
     $this->c_post_cc->setFkcc($fkac); 

      if ( $this->m_post_cc->selectLastPost($this->c_post_cc) ) {
          return $this->c_post_cc->getList();
      }else{
          return $this->c_post_cc->getMsg();
      }
   
   }





    public function listPostsByCreditCardAll($data)
    { 
      //  $this->c_post_cc->setFkcc($id);  
      //  $this->c_post_cc->setFkcc($id);
        
        $this->c_cc->setFkac($data['surch']['fkac']); 
        $this->c_cc->setDueDay($data['surch']['due']);           
        //$this->c_post_cc->setFkcc($data['surch']['fkcc']); 
        $this->c_post_cc->setDate($data['surch']['date']); 

     if ( $this->m_post_cc->selectPostCreditCardAll($this->c_cc, $this->c_post_cc) ) {
          return $this->c_post_cc->getList();
     }else{
          return $this->c_post_cc->getMsg();
     }
    }





    public function listPostsByCreditCardUser($data)
    {         
       // $this->c_post_cc->setFkcc($data['surch']['fkcc']); /
       // $this->c_cc->setFkac($data['surch']['fkac']); 
        //$this->c_cc->setDueDay($data['surch']['due']);        
        //$this->c_post_cc->setDate($data['surch']['date']);
        $this->c_cc->setType($data['surch']['type']);
        $this->c_post_cc->setMonth($data['surch']['month']);
        $this->c_post_cc->setYear($data['surch']['year']);
        $this->c_post_cc->setUser($data['surch']['user']); 
        
     if ( $this->m_post_cc->selectPostCreditCardByUser($this->c_cc, $this->c_post_cc) ) {
          return $this->c_post_cc->getList();
     }else{
          return $this->c_post_cc->getMsg();
     }
    }


    public function amountDataByUser ($data)
    {         
               
       // $this->c_post_cc->setFkcc($data['surch']['fkcc']); 
         /*
        $this->c_cc->setFkac($data['surch']['fkac']); 
        $this->c_cc->setDueDay($data['surch']['due']);        
        $this->c_post_cc->setDate($data['surch']['date']);        
         */
        $this->c_cc->setType($data['surch']['type']);
        $this->c_post_cc->setMonth($data['surch']['month']);
        $this->c_post_cc->setYear($data['surch']['year']);
        $this->c_post_cc->setUser($data['surch']['user']); 
        
     if ( $this->m_post_cc->selectAmountByUser($this->c_cc, $this->c_post_cc) ) {
          return $this->c_post_cc->getAmount();
     }else{
          return $this->c_post_cc->getMsg();
     }
    }


    





    public function listUsersData($id)
    { 
        $this->c_post_cc->setFkcc($id);  
     if ( $this->m_post_cc->selectUser($this->c_post_cc) ) {
          return $this->c_post_cc->getList();
     }else{
          return $this->c_post_cc->getMsg();
     }
    }






 
    public function amountData ($data)
    {   
       
      //  $this->c_post_cc->setFkcc($data['surch']['fkac']); 
             
        $this->c_cc->setFkac($data['surch']['fkac']); 
        $this->c_cc->setDueDay($data['surch']['due']);          
        $this->c_post_cc->setDate($data['surch']['date']); 
        
     if ( $this->m_post_cc->selectAmount($this->c_cc, $this->c_post_cc) ) {
          return $this->c_post_cc->getAmount();
     }else{
          return $this->c_post_cc->getMsg();
     }
    }




    










}