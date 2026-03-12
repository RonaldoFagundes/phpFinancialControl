<?php


namespace Controller;


  class PostCreditCardController
  {

    private $month;
    private $year;    
    private $list = [];  
    private $msg;
   

   /**
    * Get the value of list
    */
   public function getList()
   {
      return $this->list;
   }

   /**
    * Set the value of list
    */
   public function setList($list): self
   {
      $this->list = $list;

      return $this;
   }

   /**
    * Get the value of msg
    */
   public function getMsg()
   {
      return $this->msg;
   }

   /**
    * Set the value of msg
    */
   public function setMsg($msg): self
   {
      $this->msg = $msg;

      return $this;
   }

    /**
     * Get the value of month
     */
    public function getMonth()
    {
        return $this->month;
    }

    /**
     * Set the value of month
     */
    public function setMonth($month): self
    {
        $this->month = $month;

        return $this;
    }

    /**
     * Get the value of year
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set the value of year
     */
    public function setYear($year): self
    {
        $this->year = $year;

        return $this;
    }
      

  
  }