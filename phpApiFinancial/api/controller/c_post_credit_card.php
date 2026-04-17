<?php



class C_Post_Credit_Card
{

 
    private $id;
    private $fkcc;
    private $place_shop;
    private $desc;
    private $expery;
    private $date;
    private $month;
    private $year;
    private $user;
    private $parcel;
    private $value;
    private $amount;
    private $number;
    private $msg;
    private $list = [];




    public function __construct(){}







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
     * Get the value of fkcc
     */
    public function getFkcc()
    {
        return $this->fkcc;
    }

    /**
     * Set the value of fkcc
     */
    public function setFkcc($fkcc): self
    {
        $this->fkcc = $fkcc;

        return $this;
    }




    /**
     * Get the value of place_shop
     */
    public function getPlaceShop()
    {
        return $this->place_shop;
    }

    /**
     * Set the value of place_shop
     */
    public function setPlaceShop($place_shop): self
    {
        $this->place_shop = $place_shop;

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
     * Get the value of user
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set the value of user
     */
    public function setUser($user): self
    {
        $this->user = $user;

        return $this;
    }




    /**
     * Get the value of parcel
     */
    public function getParcel()
    {
        return $this->parcel;
    }

    /**
     * Set the value of parcel
     */
    public function setParcel($parcel): self
    {
        $this->parcel = $parcel;

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
     * Get the value of number
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set the value of number
     */
    public function setNumber($number): self
    {
        $this->number = $number;

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