<?php

//include 'controller/c_transactions.php';
//include 'model/m_transactions.php';

//include 'controller/c_cash_mov.php';
//include 'model/m_cash_mov.php';


require_once ROOT_PATH . "/controller/c_transactions.php";
require_once ROOT_PATH . "/model/m_transactions.php";




 class S_Transactions {

    private $c_trs = "";
    private $m_trs = "";  

    private $m_cm = ""; 
    private $c_cm = ""; 



    function __construct()
    {
        $this->c_trs = new C_Transactions();
        $this->m_trs = new M_Transactions();
    }




    public function transactionsData($data)
    {  

       // return $data;
       
        $this->c_trs->setMov($data['transaction']['move']);     
        $this->c_trs->setDate($data['transaction']['date']);
        $this->c_trs->setType($data['transaction']['type']);      
        $this->c_trs->setSource($data['transaction']['source']);    
        $this->c_trs->setForm($data['transaction']['form']); 
        $this->c_trs->setDesc($data['transaction']['desc']);   
        $this->c_trs->setValue($data['transaction']['valuet']);
        $this->c_trs->setFkac($data['transaction']['idac']); 
        
        $this->m_trs->insertTransactions($this->c_trs);                
           // return  $this->c_trs->getMsg();  

         if( $data['transaction']['type'] === "Saque" ){

            $this->c_cm = new C_Cash_Mov();
            $this->m_cm = new M_Cash_Mov();   
            
            //$data['transaction']['type'],
            //$data['transaction']['number'],

           $fk = ($data['transaction']['idac']) ;
           $id = $this->proofTransaction($fk)[0]['id_trs'];
                       
            $this->c_cm->setDate($data['transaction']['date']);
            $this->c_cm->setType('in');      
            $this->c_cm->setCategory($data['transaction']['type']);
            $this->c_cm->setSource($data['transaction']['account']."  ".$data['transaction']['number']);    
            $this->c_cm->setDesc($data['transaction']['desc']);   
            $this->c_cm->setValue($data['transaction']['value']);       
            //$this->c_cm->setFktrs($data['transaction']['fktrs']); 
            $this->c_cm->setFktrs($id); 
            $this->m_cm->insertCashMov($this->c_cm); 
            
            return  $this->c_trs->getMsg()." ".$this->c_cm->getMsg();
           
         }else{

            return  $this->c_trs->getMsg();
         }  
            
         
        
    }
        

    

        /*
        if( $data['transaction']['idacf'] != 0 ){          
             return " return ".$data['transaction']['idacf']." chamar metodo in e out ";
        }else{
            return " return ".$data['transaction']['idacf'] ;
        }
         */

    




    public function proofTransaction($fkac)
    {  
      $this->c_trs->setFkac($fkac);
       
      if ( $this->m_trs->selectLastTransaction($this->c_trs) ) {
          return $this->c_trs->getList();
      }else{
          return $this->c_trs->getMsg();
      }
   
   }

    
    
 }    