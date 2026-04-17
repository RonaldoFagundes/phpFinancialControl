<?php


class C_Cash_Mov
{

 
    private $id;
    private $fktrs;
    private $date;
    private $type;
    private $category;
    private $source;
    private $desc;
    private $value;    
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
     * Get the value of fktrs
     */
    public function getFktrs()
    {
        return $this->fktrs;
    }

    /**
     * Set the value of fktrs
     */
    public function setFktrs($fktrs): self
    {
        $this->fktrs = $fktrs;

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
     * Get the value of category
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set the value of category
     */
    public function setCategory($category): self
    {
        $this->category = $category;

        return $this;
    }


    

    /**
     * Get the value of source
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * Set the value of source
     */
    public function setSource($source): self
    {
        $this->source = $source;

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






   
}