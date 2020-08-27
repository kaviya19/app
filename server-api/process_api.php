<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset = UTF-8");


include "config.php";

$postjson = json_decode(file_get_contents('php://input'),true);

if($postjson['aksi']=="student_login"){
    $check=mysqli_fetch_array(mysqli_query($mysqli," SELECT * FROM student_login login WHERE username='$postjson[username]' AND password= '$postjson[password]'"));
    $data = array(
        'username' => $check['username'],
        'email'    => $check['email'],
        'dept'     => $check['dept'],
        'Regno'    => $check['Regno']
    );
    if($check){
        $result = json_encode(array('success'=>true,'result'=>$data));
    }else{
        $result = json_encode(array('success'=>false,'result'=>'Error')); 
    }
    echo $result;
}


if($postjson['aksi']=="staff_login"){
    $check=mysqli_fetch_array(mysqli_query($mysqli," SELECT * FROM staff_login WHERE username='$postjson[username]' AND password= '$postjson[password]'"));
    $data = array(
        'username' => $check['username'],
        'password' => $check['password']
    );
    if($check){
        $result = json_encode(array('success'=>true,'result'=>'Login successfull'));
    }else{
        $result = json_encode(array('success'=>false,'result'=>'Username or password is incorrect')); 
    }
    echo $result;
}
if($postjson['aksi']=="process_submit"){

    $insert = mysqli_query($mysqli," INSERT INTO achievement SET 
       Regno = '$postjson[regno]',
    category = '$postjson[category]',
   scategory = '$postjson[scategory]',
   rdate = '$postjson[rdate]',
   details = '$postjson[details]'
    ");
    if($insert){
        $result = json_encode(array('success'=>true));
    }else{
        $result = json_encode(array('success'=>false)); 
    }
    echo $result;
}
if($postjson['aksi']=="process_edit"){

    $update = mysqli_query($mysqli," UPDATE achievement SET 
    category = '$postjson[category]',
    scategory = '$postjson[scategory]',
    rdate = '$postjson[rdate]',
    details = '$postjson[details]' where Regno= '$postjson[regno]';");
    if($update){
        $result = json_encode(array('success'=>true));
    }else{
        $result = json_encode(array('success'=>false)); 
    }
    echo $result;
}


if($postjson['aksi']=="process_submitchanges"){

    $edit = mysqli_query($mysqli," UPDATE achievement SET
      
   category = '$postjson[category]',
   rdate = '$postjson[rdate]',
   details = '$postjson[details]'  WHERE scategory='$postjson[scategory]' AND Regno= '$postjson[regno]'
    ");
    if($edit){
        $result = json_encode(array('success'=>true));
    }else{
        $result = json_encode(array('success'=>false)); 
    }
    echo $result;
}


if($postjson['aksi']=="process_view"){
    $join=array();
    $i=0;
    $view = mysqli_query($mysqli," SELECT * FROM achievement WHERE Regno='$postjson[regno]'");
      
    while($r=mysqli_fetch_assoc($view)){
        $i++;
       array_push($join, array($r['Regno'],$r['category'],$r['scategory'],$r['rdate'],$r['details']));
    }
      
    if($view){
        $result = json_encode(array('success'=>true,'result'=>$join,'no'=>$i));
    }else{
        $result = json_encode(array('success'=>false,'result'=>'Error')); 
    }
    
    
    echo $result;
}
if($postjson['aksi']=="process_staffview"){
    $joint=array();
    $k=0;
    $staffview = mysqli_query($mysqli," SELECT * FROM achievement");
      
    while($r=mysqli_fetch_assoc($staffview)){
        $k++;
       array_push($joint, array($r['Regno'],$r['category'],$r['scategory'],$r['rdate'],$r['details']));
    }
      
    if($staffview){
        $result = json_encode(array('success'=>true,'result'=>$joint,'no'=>$k));
    }else{
        $result = json_encode(array('success'=>false,'result'=>'Error')); 
    }
    
    
    echo $result;
}
?>

