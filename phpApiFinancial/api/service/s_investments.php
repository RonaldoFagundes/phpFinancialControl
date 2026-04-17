<?php

//include 'controller/c_transactions.php';
//include 'model/m_transactions.php';

//include '/controller/c_investments.php';
//include '/model/m_investments.php';

require_once ROOT_PATH . "/controller/c_investments.php";
require_once ROOT_PATH . "/model/m_investments.php";


class S_Investments {



    private $c_trs = "";
    private $m_trs = "";  

    private $c_inv = "";
    private $m_inv = "";  

    

    function __construct()
    {

        $this->c_trs = new C_Transactions();
        $this->m_trs = new M_Transactions();

        $this->c_inv = new C_Investments();
        $this->m_inv = new M_Investments();
    }



    public function postRendimentos($data){

      $array_size = sizeof($data);          
   
      for($i=0; $i < $array_size; $i++){
    
         $this->c_inv->setId($data[$i]['id']);
         $this->c_inv->setValue($data[$i]['value']);
         $this->c_inv->setDate($data[$i]['date']);         
         $this->c_inv->setOut(false); 
         
         $this->m_inv->insertProfitability($this->c_inv);  
         $this->m_inv->updateInvestment($this->c_inv); 
         
        }         

        return  $this->c_inv->getMsg();
     
    }











    public function investmentsData($data)
    { 
      
   
      $this->c_trs->setMov($data['investments']['move']);    
      //$this->c_trs->setDate($data['investments']['open']);
      $this->c_trs->setType($data['investments']['trans']);      
      $this->c_trs->setSource($data['investments']['broker']);   
      $this->c_trs->setForm($data['investments']['form']);      
      $this->c_trs->setDesc($data['investments']['desc']); 
      $this->c_trs->setFkac($data['investments']['idac']); 
      
      $this->c_inv->setValue($data['investments']['valuei']);

          
     if( $data['investments']['move'] == "out"){
      
      $this->c_trs->setDate($data['investments']['open']);       
      $this->c_trs->setValue($data['investments']['valuei']);

      $this->c_inv->setBroker($data['investments']['broker']);
      $this->c_inv->setCat($data['investments']['cat']);
      $this->c_inv->setType($data['investments']['type']);
      $this->c_inv->setOpen($data['investments']['open']);        
      $this->c_inv->setExpery($data['investments']['expery']);
      $this->c_inv->setRateType($data['investments']['rate_type']);
      $this->c_inv->setRate($data['investments']['rate']);
     // $this->c_inv->setValue($data['investments']['valuei']);
      $this->c_inv->setDesc($data['investments']['desc']);        
      $this->c_inv->setStatus($data['investments']['status']); 
      $this->c_inv->setFkac($data['investments']['idac']);           

      $this->m_trs->insertTransactions($this->c_trs);
      $this->m_inv->insertInvestments($this->c_inv);

      return $this->c_trs->getMsg()." and ".$this->c_inv->getMsg();

     }else{     
       
        $this->c_trs->setValue($data['investments']['valuet']); 

        $this->c_inv->setOut(true);
        //$this->c_inv->setValue($data['investments']['valuei']);
        $this->c_inv->setRateValue($data['investments']['rate_value']);
        $this->c_inv->setId($data['investments']['id']); 
        $this->c_inv->setDate($data['investments']['date']);
        
        $this->m_inv->insertProfitability($this->c_inv); 
        $this->m_inv->updateInvestment($this->c_inv);
        $this->m_trs->insertTransactions($this->c_trs);        

        return $this->c_trs->getMsg()." and ".$this->c_inv->getMsg();  
      
     }
   


     // return $data;
    }

   


    public function proofInvestment($fkac)
    {  
      $this->c_inv->setFkac($fkac);      
       
      if ( $this->m_inv->selectLastInvestment($this->c_inv) ) {
          return $this->c_inv->getList();
      }else{
          return $this->c_inv->getMsg();
      }   
   }




   public function proofRescue($id)
   {     

     $this->c_inv->setId($id);
      
     if ( $this->m_inv->selectInvestment($this->c_inv) ) {
         return $this->c_inv->getList();
     }else{
         return $this->c_inv->getMsg();
     }  
  }




   public function listInvestmentsByAc($fkac){  
                
    $this->c_inv->setFkac($fkac);   

   if ( $this->m_inv->selectInvestmentsByAccount($this->c_inv) ) {
      return $this->c_inv->getList();
   }else{
      return $this->c_inv->getMsg();
   }    
}





public function getAmountProfitability($id)
{   
   $this->c_inv->setId($id);

   if ( $this->m_inv->selectAmountProfitability($this->c_inv) ) {
      return $this->c_inv->getAmount();
    }else{
      return $this->c_inv->getMsg();
   }   

}







/*
    public function investmentsDatak($data)
    {  
      $this->c_trs->setMov($data['investments']['move']);    
      $this->c_trs->setDate($data['investments']['open']);
      $this->c_trs->setType($data['investments']['trans']);      
      $this->c_trs->setSource($data['investments']['broker']);   
      $this->c_trs->setForm($data['investments']['form']); 
      $this->c_trs->setDesc($data['investments']['desc']);   
      $this->c_trs->setValue($data['investments']['valuei']);
      $this->c_trs->setFkac($data['investments']['idac']);     


      $this->m_trs->insertTransactions($this->c_trs);

      $this->c_inv->setBroker($data['investments']['broker']);
      $this->c_inv->setCat($data['investments']['cat']);
      $this->c_inv->setType($data['investments']['type']);
      $this->c_inv->setOpen($data['investments']['open']);        
      $this->c_inv->setExpery($data['investments']['expery']);
      $this->c_inv->setRateType($data['investments']['rateType']);
      $this->c_inv->setRate($data['investments']['rate']);
      $this->c_inv->setValue($data['investments']['valuei']);
      $this->c_inv->setDesc($data['investments']['desc']);        
      $this->c_inv->setStatus('Active'); 
      $this->c_inv->setFkac($data['investments']['idac']);   

      $this->m_inv->insertInvestments($this->c_inv);

      return $this->c_trs->getMsg()." and ".$this->c_inv->getMsg();

      //return $data;
    }
    */



}