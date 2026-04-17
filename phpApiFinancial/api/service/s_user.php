<?php

//include '/controller/c_user.php';
//include '/model/m_user.php';
require_once ROOT_PATH . "/controller/c_user.php";
require_once ROOT_PATH . "/model/m_user.php";

 class S_User {

    private $c_user = "";
    private $m_user = "";  

    function __construct()
    {
        $this->c_user = new C_User();
        $this->m_user = new M_User();
    }

     public function cadUserData($data)
     {  
        $this->c_user->setName($data['user']['name']) ;
        $this->c_user->setEmail($data['user']['email']) ;
        $this->c_user->setPassword($data['user']['password']);
        $this->c_user->setProfile($data['user']['profile']);
        $this->m_user->insertUser($this->c_user);    
        return  $this->c_user->getMsg();
     }


     public function listUsers()
     { 
        
      if ( $this->m_user->selectUsers($this->c_user) ) {
           return $this->c_user->getList();
      }else{
           return $this->c_user->getMsg();
      }

     }



 }