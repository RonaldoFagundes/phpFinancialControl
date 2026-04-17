<?php

//include 'controller/c_bank.php';
//include 'model/m_bank.php';

require_once ROOT_PATH . "/controller/c_bank.php";
require_once ROOT_PATH . "/model/m_bank.php";


 class S_Bank {

    private $c_bank = "";
    private $m_bank = "";  



    function __construct()
    {
        $this->c_bank = new C_Bank();
        $this->m_bank = new M_Bank();
    }



     public function cadBankData($data)
     {  
        $this->c_bank->setNumber($data['bank']['number']) ;
        $this->c_bank->setName($data['bank']['name']) ;
        $this->c_bank->setEin($data['bank']['ein']) ;
        $this->c_bank->setContact($data['bank']['contact']);
        $this->c_bank->setDesc($data['bank']['desc']);
        $this->c_bank->setImg($data['bank']['base64']);
        $this->m_bank->insertBank($this->c_bank);    
        return  $this->c_bank->getMsg();       
     }



     

     public function listBank()
     { 
        
      if ( $this->m_bank->selectBank($this->c_bank) ) {
           return $this->c_bank->getList();
      }else{
           return $this->c_bank->getMsg();
      }

     }


     
     public function updateBankData($data)
     {  
        $this->c_bank->setId($data['bank']['id']) ;
        $this->c_bank->setNumber($data['bank']['number']) ;
        $this->c_bank->setName($data['bank']['name']) ;
        $this->c_bank->setEin($data['bank']['ein']) ;
        $this->c_bank->setContact($data['bank']['contact']);
        $this->c_bank->setDesc($data['bank']['desc']);
        $this->c_bank->setImg($data['bank']['base64']);
        $this->m_bank->updatetBank($this->c_bank);    
        return  $this->c_bank->getMsg();
     }




    public function deleteBank($id)
    {    
       $this->c_bank->setId($id);
       $this->m_bank->deleteBank($this->c_bank);         
       return $this->c_bank->getMsg();
    }

    



 }