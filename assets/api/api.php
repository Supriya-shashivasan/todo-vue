<?php

$conn = new mysqli("localhost", "root", "admin", "todo");
if($conn->connect_error){
  die("Could not connect to database");
}

$res= array();
$action='read';
if(isset($_GET['action'])){

  $action = $_GET['action'];
}

if($action=='read'){
  //$result = $conn->query("INSERT INTO `todos` (`title`,`comment`) VALUES ('$title','$comment')");
  $result= $conn->query("SELECT * FROM `todos`");
  $tasks = array();
  while ($row = $result->fetch_assoc()) {
    array_push($tasks, $row );
  }
  $res['tasks'] = $tasks;
}

if($action=='create'){
  $title = $_POST['title'];
  $comment = $_POST['comment'];
  $result = $conn->query("INSERT INTO `todos` (`title`,`comment`) VALUES ('$title','$comment')");
  if($result){
    $res['message'] = 'Added';
  }else{
    $res['error'] = true;
    $res['message'] = ' Add STB';
  }
}


if($action=='update'){
  $id = $_POST['id'];
  $title = $_POST['title'];
  $comment = $_POST['comment'];
  $result = $conn->query("UPDATE `todos` SET `title` = '$title',`comment`= '$comment' WHERE `id`= '$id'");
  if($result){
    $res['message'] = 'Updated';
  }else{
    $res['error'] = true;
    $res['message'] = 'Update STB';
  }
}

if($action=='delete'){
  $id = $_POST['id'];
  $result = $conn->query("DELETE FROM `todos` WHERE `id`= '$id'");
  if($result){
    $res['message'] = 'DELETED';
  }else{
    $res['error'] = true;
    $res['message'] = 'Delete STB';
  }
}


$conn->close;
header("Content-type:application/json");
echo json_encode($res);
die();

?>
