<?php
  session_start();
  include_once("config.php");
  $outgoing_id=$_SESSION['unique_id'];
  $value=mysqli_real_escape_string($conn,$_POST['searchTerm']);
  $sql=mysqli_query($conn,"SELECT * FROM users where (NOT unique_id={$outgoing_id}) AND (fname LIKE '%{$value}%' OR lname LIKE '%{$value}%')");
  $output="";
  if(mysqli_num_rows($sql)>0)
  {
    include "data.php";
  }
  else{
    $output.="No user found";
  }
  echo $output;



?>