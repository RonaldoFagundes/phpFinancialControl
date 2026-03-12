<?php

require_once __DIR__ . '/../autoload/autoload.php';

use Controller\PostCreditCardController;
use Models\PostCreditCardModel;


class PostCreditCardCore
{

    private $postController = "";
    private $postModel = "";
    
    function __construct()
    {
       $this->postController = new PostCreditCardController();
       $this->postModel = new PostCreditCardModel();
    }    


    public function requestPostsByDate($year , $month) 
    {       
        $this->postController->setYear($year);
        $this->postController->setMonth($month); 
        if ($this->postModel->getPostsByDate($this->postController)) {
            $res = $this->postController->getList();  
        }else{       
            $res = $this->postController->getMsg();  
        }
        return $res;
    }


}




