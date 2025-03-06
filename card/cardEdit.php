<?php 
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
  }
  require_once __DIR__.'/../functions.php';
  require_once __DIR__.'/../ConDB.php';
  require_once __DIR__.'/../../vendor/autoload.php';
 $db = conn('Account');
 if($db === NULL){
    echo json_encode([
        'status'=>'Error',
        'message'=>'Error with connection to db'
    ]);
 }

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__); 
    $dotenv->safeLoad();
    $key = $_SERVER['ENCRYPTION_KEY'];
?>


<?php 

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $json_raw=file_get_contents('php://input');
        if($json_raw){
            $json=json_decode($json_raw,true);
            if($json){
                extract($json);
                if($userId!=" " && $cardNumber!=" " && $cvv2!=" " && $month!=" " && $year!=" " && $cardName!=" "){
                    if(Search($db,'PayCard',$cardNumber,$id,'cardNumber') === false){
                        if(Search($db,'PayCard',$cvv2,$id,'cvv2') === false){
                    $stmt=$db->prepare('UPDATE PayCard SET cardNumber = ?, month = ?, year = ?, cvv2 = ?, cardName = ? WHERE userId = ?;');
                    if(!$stmt){
                        echo json_encode(["status"=> "Error", "message"=> "Prepare failed: ".$db->error]);
                        exit();
                    }
                    $encryptedCardNumber=Encrypt($key,$cardNumber);
                    $encryptedCvv2=Encrypt($key,$cvv2);
              
                    $stmt->bind_param('sssssi', $encryptedCardNumber,$month,$year,$encryptedCvv2,$cardName,$userId);
                    $result= $stmt->execute();
                    if($result){
                        echo json_encode(["status"=> "Success" , "message"=> "Card info is edited properly"]);    
                    } 
                    else{
                        echo json_encode(["status"=> "Error" , "message"=> "Server could not EDIT your card,try later"]);
                    }
                    $stmt->close();
                 }
                 else echo json_encode(["status"=> "Error" , "message"=> "CVV2 is not valid"]);
                }else echo json_encode(["status"=> "Error" , "message"=> "CardNumber is not valid"]);
            }
            }
            else {
                echo json_encode(["status"=> "Error" , "message"=> "Json is not readable"]);
            }
        }
    }
   else echo json_encode(["status"=> "Error" , "message"=> "Post is not working"]);






?>