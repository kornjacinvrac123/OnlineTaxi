
<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  
  require_once __DIR__.'/../functions.php';
  require_once __DIR__.'/../ConDB.php';
  $db = conn('Account');
  if($db === NULL){
     echo json_encode([
         'status'=>'Error',
         'message'=>'Error with connection to db'
     ]);
  }
  require_once __DIR__.'/../../vendor/autoload.php';
  

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->safeLoad();
  $key = $_SERVER['ENCRYPTION_KEY'];
?>

<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_raw = file_get_contents('php://input');
    if ($json_raw) {
        $json = json_decode($json_raw, true);
        if($json){
        if ($json['userId']!=" ") {
            $stmt = $db->prepare("SELECT * FROM PayCard WHERE userId=?");
            $stmt->bind_param("i", $json['userId']);
            $result = $stmt->execute();
            if ($result) {
                $row= $stmt->get_result()->fetch_assoc();
                if($row === NULL){
                    echo json_encode([
                        'status'=>'Error',
                        'message'=>'Card not found',
                    ]);
                } 
                else{
                    $decryptedCardNumber=Decrypt($key,$row['cardNumber']);
                    $decryptedCvv2=Decrypt($key,$row['cvv2']);
                    echo json_encode([
                        'status'=>'Success',
                        'message'=>[
                           'cardNumber'=> $decryptedCardNumber,
                           'month'=>$row['month'],
                           'year'=>$row['year'],
                           'cvv2'=>$decryptedCvv2,
                           'cardName'=>$row['cardName'],
                        ]
                    ]);
                }
                $stmt->close(); 
                                    
                }

            }
            else{
                echo json_encode([
                    'status'=>'Error',
                    'message'=>'Empty string',
                ]);
            }
        }
    }
}
else echo json_encode(['status' => 'error','message'=>'POST DOES NOT WORK']);
?>
