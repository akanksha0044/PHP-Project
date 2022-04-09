<?php
  session_start();
  include_once "config.php";
  $fname=mysqli_real_escape_string($conn,$_POST['fname']);
  $lname=mysqli_real_escape_string($conn,$_POST['lname']);
  $email=mysqli_real_escape_string($conn,$_POST['email']);
  $password=mysqli_real_escape_string($conn,$_POST['password']);

  if(!empty($fname)&&!empty($lname)&&!empty($email)&&!empty($password))
  {
    if(filter_var($email,FILTER_VALIDATE_EMAIL)){//check email is valid or not
      $sql=mysqli_query($conn,"SELECT email from users where email='{$email}'");
      if(mysqli_num_rows($sql)>0)//if valid then email already exist or not
      {
        echo "$email - This email already exist";
      }
      else{
        if(isset($_FILES['image']))//if image is uploaded
        {
            $img_name=$_FILES['image']['name'];//getting image name
            // "$img_name ";
            $img_type=$_FILES['image']['type'];//getting image type
            //echo "$img_type ";
            $tmp_name=$_FILES['image']['tmp_name'];//this temporary name is used to save/move file in our folder
            //echo "$tmp_name ";
            //lets explode image and gets last extension like jpg/png
            $img_explode=explode('.',$img_name);//break string into array
            //echo $img_explode;
            $img_ext=end($img_explode);//get last element of array(the extension)
            //echo "$img_ext";
            $extension=['jpeg','jpg','png','JPG'];//image should be of any of these types
            if(in_array($img_ext,$extension)===true)//if image extension match with any of these extension in array
            {
              $time=time();//current time
                          //we will rename the user file with current time when user uplaod image
                          //so all image file have unique names
                          //lets move user image to particular folder
              $new_img_name=$time.$img_name;
              if(move_uploaded_file($tmp_name,"images/".$new_img_name))//if image(tmp name of image) move to our folder successfully
              {
                $status="Active now";//once user signed up then his status will be active
                $random_id=rand(time(),10000000);//creating random id for user

                //insert all user data inside table
                $sql2=mysqli_query($conn,"INSERT INTO users(unique_id,fname,lname,email,password,img,status)
                                    VALUES('{$random_id}','{$fname}','{$lname}','{$email}','{$password}','{$new_img_name}','{$status}')");
                if($sql2)
                {
                  $sql3=mysqli_query($conn,"SELECT * FROM users where email='{$email}'");
                  if(mysqli_num_rows($sql3)>0){
                    $row=mysqli_fetch_assoc($sql3);//fetch result row as associative array(key value pair)
                    $_SESSION['unique_id']=$row['unique_id'];//using this session we used user unique id in other php files
                    echo "success";
                  }
                }
                else{
                  echo "Something went wrong";
                }
              }
            }
            else{
              echo "Please select an image file of jpeg/jpg/png format";
            }
        }
        else
        {
          echo "Please select an image file";
        }
      }
    }
    else{
      echo "$email - This is not a valid email";
    }
  }
  else{
    echo "all input fields are required";
  }
?>
