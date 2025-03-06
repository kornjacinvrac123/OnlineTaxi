
<?php
//   error_reporting(E_ALL);
//   ini_set('display_errors', 1);
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");

  // It is just hack to brigde problem Corss having with dotenv lib
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

  // Using dotenv lib to catch our .env file and print value
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
                if(!empty($userId) && !empty($cardNumber) && !empty($cvv2) && !empty($month) && !empty($year) && !empty($cardName)){
                 
                    $stmt=$db->prepare('INSERT INTO PayCard (userId,cardNumber,month,year,cvv2,cardName) VALUES(?,?,?,?,?,?)');

                    $encryptedCardNumber=Encrypt($key,$cardNumber);
                    $encrypedCvv2=Encrypt($key,$cvv2);

                    $stmt->bind_param('isssss', $userId,$encryptedCardNumber,$month,$year,$encrypedCvv2,$cardName);
                    $result= $stmt->execute();
                    if($result){
                        echo json_encode(["status"=> "Success" , "message"=> "Card info is proccessed properly"]);    
                    } 
                    else{
                        echo json_encode(["status"=> "Error" , "message"=> "Server could not insert your card,try later"]);
                    }
                    $stmt->close();
 
                }
            }
            else {
                echo json_encode(["status"=> "Error" , "message"=> "Json is not readable"]);
            }
        }
    }
   else echo json_encode(["status"=> "Error" , "message"=> "Post is not working"]);






?>