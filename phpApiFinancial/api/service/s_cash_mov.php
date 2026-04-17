<?php

//include 'controller/c_cash_mov.php';
//include 'model/m_cash_mov.php';

require_once ROOT_PATH . "/controller/c_cash_mov.php";
require_once ROOT_PATH . "/model/m_cash_mov.php";

class S_Cash_Mov {

    private $m_cm = ""; 
    private $c_cm = ""; 



    function __construct()
    {
        $this->c_cm = new C_Cash_Mov();
        $this->m_cm = new M_Cash_Mov();
    }


  

    public function postCashMovData($data)
    { 
       $this->c_cm->setDate($data['cashMov']['date']);
       $this->c_cm->setType($data['cashMov']['type']);      
       $this->c_cm->setCategory($data['cashMov']['category']);    
       $this->c_cm->setSource($data['cashMov']['source']);
       $this->c_cm->setDesc($data['cashMov']['desc']);   
       $this->c_cm->setValue($data['cashMov']['value']);       
       $this->c_cm->setFktrs($data['cashMov']['fktrs']); 

       $this->m_cm->insertCashMov($this->c_cm);    
       return  $this->c_cm->getMsg();       
    }




    public function proofCashMov()
    {  
            
      if ( $this->m_cm->selectLastCashMov($this->c_cm) ) {
          return $this->c_cm->getList();
      }else{
          return $this->c_cm->getMsg();
      }
   
   }




   public function cashAmount()
    {              
      $this->m_cm->selectAmount($this->c_cm)  ;
      return $this->c_cm->getMsg();         
   }


}