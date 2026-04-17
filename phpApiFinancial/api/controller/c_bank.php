<?php


class C_Bank
{


    private $id;    
    private $number;
    private $name;
    private $ein;
    private $contact;
    private $desc;       
    private $img;
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
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }




    /**
     * Get the value of ein
     */
    public function getEin()
    {
        return $this->ein;
    }

    /**
     * Set the value of ein
     */
    public function setEin($ein): self
    {
        $this->ein = $ein;

        return $this;
    }




    /**
     * Get the value of contact
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * Set the value of contact
     */
    public function setContact($contact): self
    {
        $this->contact = $contact;

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
     * Get the value of img
     */
    public function getImg()
    {
        return $this->img;
    }

    /**
     * Set the value of img
     */
    public function setImg($img): self
    {
        $this->img = $img;

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
     * Get the value of bancList
     */
    public function getList()
    {
        return $this->list;
    }

    /**
     * Set the value of bancList
     */
    public function setList($list): self
    {
        $this->list = $list;

        return $this;
    }


    
}