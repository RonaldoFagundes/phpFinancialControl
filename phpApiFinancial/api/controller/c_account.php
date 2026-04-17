<?php


class C_Account
{

    private $id;
    private $number;
    private $type;
    private $openDate;
    private $closeDate;
    private $desc;
    private $amount;
    private $status;
    private $fkBank;
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
     * Get the value of openDate
     */
    public function getOpenDate()
    {
        return $this->openDate;
    }

    /**
     * Set the value of openDate
     */
    public function setOpenDate($openDate): self
    {
        $this->openDate = $openDate;

        return $this;
    }



    /**
     * Get the value of closeDate
     */
    public function getCloseDate()
    {
        return $this->closeDate;
    }

    /**
     * Set the value of closeDate
     */
    public function setCloseDate($closeDate): self
    {
        $this->closeDate = $closeDate;

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
     * Get the value of fkBank
     */
    public function getFkBank()
    {
        return $this->fkBank;
    }

    /**
     * Set the value of fkBank
     */
    public function setFkBank($fkBank): self
    {
        $this->fkBank = $fkBank;

        return $this;
    }




    /**
     * Get the value of accountlist
     */
    public function getList()
    {
        return $this->list;
    }

    /**
     * Set the value of accountlist
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