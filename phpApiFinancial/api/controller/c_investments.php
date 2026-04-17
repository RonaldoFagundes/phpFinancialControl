<?php



class C_Investments
{

    private $id;
    private $broker;
    private $cat;
    private $type;
    private $open; 
    private $expery;
    private $date;
    private $rateType;
    private $rate;  
    private $rateValue;  
    private $amount;
    private $value;
    private $desc;  
    private $status;  
    private $fkac;      
    private $out;
    private $list = [];
    private $msg;


     






    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId($id): self
    {
        $this->id = $id;

        return $this;
    }


    /**
     * Get the value of broker
     */
    public function getBroker()
    {
        return $this->broker;
    }

    /**
     * Set the value of broker
     */
    public function setBroker($broker): self
    {
        $this->broker = $broker;

        return $this;
    }




    /**
     * Get the value of cat
     */
    public function getCat()
    {
        return $this->cat;
    }

    /**
     * Set the value of cat
     */
    public function setCat($cat): self
    {
        $this->cat = $cat;

        return $this;
    }



    /**
     * Get the value of type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     */
    public function setType($type): self
    {
        $this->type = $type;

        return $this;
    }



    
    /**
     * Get the value of open
     */
    public function getOpen()
    {
        return $this->open;
    }

    /**
     * Set the value of open
     */
    public function setOpen($open): self
    {
        $this->open = $open;

        return $this;
    }




    /**
     * Get the value of expery
     */
    public function getExpery()
    {
        return $this->expery;
    }

    /**
     * Set the value of expery
     */
    public function setExpery($expery): self
    {
        $this->expery = $expery;

        return $this;
    }



     /**
     * Get the value of date
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     */
    public function setDate($date): self
    {
        $this->date = $date;

        return $this;
    }


    /**
     * Get the value of rateType
     */
    public function getRateType()
    {
        return $this->rateType;
    }

    /**
     * Set the value of rateType
     */
    public function setRateType($rateType): self
    {
        $this->rateType = $rateType;

        return $this;
    }





    /**
     * Get the value of rate
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * Set the value of rate
     */
    public function setRate($rate): self
    {
        $this->rate = $rate;

        return $this;
    }


    /**
     * Get the value of rateValue
     */
    public function getRateValue()
    {
        return $this->rateValue;
    }


    
    /**
     * Set the value of rateValue
     */
    public function setRateValue($rateValue): self
    {
        $this->rateValue = $rateValue;

        return $this;
    }


     /**
     * Get the value of value
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set the value of value
     */
    public function setValue($value): self
    {
        $this->value = $value;

        return $this;
    }


    /**
     * Get the value of amount
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set the value of amount
     */
    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }





    /**
     * Get the value of desc
     */
    public function getDesc()
    {
        return $this->desc;
    }

    /**
     * Set the value of desc
     */
    public function setDesc($desc): self
    {
        $this->desc = $desc;

        return $this;
    }




    /**
     * Get the value of status
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the value of status
     */
    public function setStatus($status): self
    {
        $this->status = $status;

        return $this;
    }

   

    /**
     * Get the value of fkac
     */
    public function getFkac()
    {
        return $this->fkac;
    }

    /**
     * Set the value of fkac
     */
    public function setFkac($fkac): self
    {
        $this->fkac = $fkac;

        return $this;
    }



   
     /**
     * Get the value of out
     */
    public function getOut()
    {
        return $this->out;
    }

    /**
     * Set the value of out
     */
    public function setOut($out): self
    {
        $this->out = $out;

        return $this;
    }




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

    

   

   

    

    

    
}