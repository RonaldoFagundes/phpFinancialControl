<?php



class C_Transactions
{

 
    private $id;
    private $fkac;
    private $mov; 
    private $date;
    private $type;
    private $source;    
    private $form;
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
     * Get the value of fkcc
     */
    public function getFkac()
    {
        return $this->fkac;
    }

    /**
     * Set the value of fkcc
     */
    public function setFkac($fkac): self
    {
        $this->fkac = $fkac;

        return $this;
    }

    /**
     * Get the value of mov
     */
    public function getMov()
    {
        return $this->mov;
    }

    /**
     * Set the value of mov
     */
    public function setMov($mov): self
    {
        $this->mov = $mov;

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
     * Get the value of form
     */
    public function getForm()
    {
        return $this->form;
    }

    /**
     * Set the value of form
     */
    public function setForm($form): self
    {
        $this->form = $form;

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