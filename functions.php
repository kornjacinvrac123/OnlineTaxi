<?php 


//======================================================================================//
//                            Encrypt and Decrypt function                              //
//                                                                                      //
//                            ======Quick overview =======                              //
//                            ====== AES 256 CBC =======                                //
//Fnc uses IV(inc vector) for having different encrypt every time for the same input    //                  
// and storing iv inside Enc value for decrypting it later...                           //
//Decrypt func is just substracting IV and pure Encrpyted message and using it to decrypt//
//                                     voila    :))                                      //
//=======================================================================================//
function Encrypt($key,$EncryptThis){
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
    $encrypted = openssl_encrypt($EncryptThis, 'AES-256-CBC', $key, 0, $iv);        
    return base64_encode($iv.$encrypted);
 }
function Decrypt($key,$HeterogenicEncrpyt){
   $DecodingHeterogenicEncrypt= base64_decode($HeterogenicEncrpyt);
   $iv_length=openssl_cipher_iv_length('AES-256-CBC');
   $iv= substr($DecodingHeterogenicEncrypt,0,$iv_length);
   $encrypt= substr($DecodingHeterogenicEncrypt,$iv_length);
   return openssl_decrypt($encrypt,'AES-256-CBC', $key, 0,$iv);
}
function Search($dataBasePointer, $tableName, $data, $id, $dataType) {
  
    if ($tableName === 'Users') {
        if ($dataType === 'username') {
            $query = 'SELECT id FROM Users WHERE username=?';
        } else if ($dataType === 'email') {
            $query = 'SELECT id FROM Users WHERE email=?';
        } else {
            return false;
        }
    } else if ($tableName === 'PayCard') {
        if ($dataType === 'cardNumber') {
            $query = 'SELECT id FROM PayCard WHERE cardNumber=?';
        } else if ($dataType === 'cvv2') {
            $query = 'SELECT id FROM PayCard WHERE cvv2=?';
        } else {
            return false;
        }
    } else {
        return false; 
    }


    $stmt = $dataBasePointer->prepare($query);
    if (!$stmt) {
        error_log("SQL Prepare failed: " . $dataBasePointer->error);
        return false;
    }

 
    $stmt->bind_param("s", $data);
    if (!$stmt->execute()) {
        error_log("SQL Execute failed: " . $stmt->error);
        return false;
    }

   
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        if ($row['id'] != $id) {
            return true; 
        }
    }

    return false; 
}
// Function that provides logic for rides history to store most the 5 latest rides
// if there is  a 5 its deleting the oldest one from history
function sad_ServiceHistory($db,$userId){
    $stmt=$db->prepare('SELECT COUNT(*) AS totalRides FROM ServiceHistory WHERE UserId=?');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result= $stmt->get_result();
    if(!$result){
        $stmt->close();
        return false;
    } 
    $row=$result->fetch_assoc();
    $totalRides=$row['totalRides'];
    $stmt->close();
    if($totalRides >=5){
    $stmt= $db->prepare('DELETE FROM ServiceHistory WHERE id=(SELECT  id From ServiceHistory WHERE UserId=? ORDER BY ReservationTime ASC LIMIT 1 )');
       $stmt->bind_param('i', $userId);
       $result=$stmt->execute();
       $stmt->close();
       if($result){
           return true;
       } 
       else return false;
    }
    else return true;
    
}