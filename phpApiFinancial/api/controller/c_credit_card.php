<?php



class C_Credit_Card
{

private $id;
private $fkac;
private $number;
private $type;
private $format;
private $desc;
private $from_date;
private $expery_date;    
private $limit; 
private $due_day;   
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
 * Get the value of format
 */
public function getFormat()
{
return $this->format;
}

/**
 * Set the value of format
 */
public function setFormat($format): self
{
$this->format = $format;

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
 * Get the value of from_date
 */
public function getFromDate()
{
return $this->from_date;
}

/**
 * Set the value of from_date
 */
public function setFromDate($from_date): self
{
$this->from_date = $from_date;

return $this;
}




/**
 * Get the value of expery_date
 */
public function getExperyDate()
{
return $this->expery_date;
}

/**
 * Set the value of expery_date
 */
public function setExperyDate($expery_date): self
{
$this->expery_date = $expery_date;

return $this;
}



/**
 * Get the value of limit
 */
public function getLimit()
{
return $this->limit;
}

/**
 * Set the value of limit
 */
public function setLimit($limit): self
{
$this->limit = $limit;

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
 * Get the value of due_day
 */
public function getDueDay()
{
return $this->due_day;
}

/**
 * Set the value of due_day
 */
public function setDueDay($due_day): self
{
$this->due_day = $due_day;

return $this;
}
}