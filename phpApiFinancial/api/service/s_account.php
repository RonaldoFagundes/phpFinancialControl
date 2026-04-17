<?php

//include 'controller/c_account.php';
//include 'model/m_account.php';

require_once ROOT_PATH . "/controller/c_account.php";
require_once ROOT_PATH . "/model/m_account.php";

 class S_Account {

    private $c_account = "";
    private $m_account = "";  

    function __construct()
    {
        $this->c_account = new C_Account();
        $this->m_account = new M_Account();
    }




     public function cadAccountData($data)
     { 
        $this->c_account->setNumber($data['account']['number']) ;
        $this->c_account->setType($data['account']['type']) ;
        $this->c_account->setOpenDate($data['account']['open']) ;
        $this->c_account->setDesc($data['account']['desc']);
        $this->c_account->setAmount($data['account']['amount']);
        $this->c_account->setFkBank($data['account']['fkbnk']);
        $this->m_account->insertAccount($this->c_account);    
        return  $this->c_account->getMsg();
    
    }



    public function listAccount()
     {  
        
       if ( $this->m_account->selectAccount($this->c_account) ) {
           return $this->c_account->getList();
       }else{
           return $this->c_account->getMsg();
       }
    
    }



   




    public function listAccountById($id){  
                
        $this->c_account->setId($id);        

       if ( $this->m_account->selectAccountById($this->c_account) ) {
           return $this->c_account->getList();
       }else{
           return $this->c_account->getMsg();
       }    
    }




    public function listAccountByBank($idBank){  
                
        $this->c_account->setFkBank($idBank);        

       if ( $this->m_account->selectAccountByBank($this->c_account) ) {
           return $this->c_account->getList();
       }else{
           return $this->c_account->getMsg();
       }    
    }




    public function listAccountByBankIgnoreId($data){  

        $this->c_account->setId($data['surchAccount']['id']);
        $this->c_account->setFkBank($data['surchAccount']['fkbnk']);       
                        

       if ( $this->m_account->selectAccountByBankIgnoreId($this->c_account) ) {

           return $this->c_account->getList();

       }else{

           return $this->c_account->getMsg();

       }         
       
    }


    public function listAccountType()
     {  
        
       if ( $this->m_account->selectAccountType($this->c_account) ) {
           return $this->c_account->getList();
       }else{
           return $this->c_account->getMsg();
       }
    
    }




    public function getAmountById($id){  
                
       $this->c_account->setId($id);        

       if ( $this->m_account->selectAmountById($this->c_account) ) {
           return $this->c_account->getAmount();
       }else{
           return $this->c_account->getMsg();
       }    
    }




    public function updateAccountData($data)
    {
        $this->c_account->setId($data['account']['id']) ;
        $this->c_account->setNumber($data['account']['number']) ;
        $this->c_account->setType($data['account']['type']) ;
        $this->c_account->setOpenDate($data['account']['open']) ;
        $this->c_account->setDesc($data['account']['desc']);
        $this->c_account->setAmount($data['account']['amount']);
        $this->c_account->setFkBank($data['account']['fkbnk']);


        $this->m_account->updateAccount($this->c_account);    
        return  $this->c_account->getMsg();
    }
     





 }