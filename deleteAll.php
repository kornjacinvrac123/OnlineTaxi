<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once 'ConDB.php';

$db = conn('Account');

if ($db == null) {
    echo json_encode([
        'status' => 'Error',
        'message' => 'Could not load the data',
    ]);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_raw = file_get_contents('php://input');
    if ($json_raw) {
       
        $json = json_decode($json_raw, associative: true);
        if (json_last_error() === JSON_ERROR_NONE) {
            extract($json);
            if (!empty($id)) {
                $stmt = $db->prepare('DELETE FROM PayCard WHERE userId=?');
                if ($stmt) {
                    $stmt->bind_param('i', $id);
                    $stmt->execute();
                    $stmt->close();
                } 

                $stmt = $db->prepare('DELETE FROM ServiceHistory WHERE Userid=?');
                if ($stmt) {
                    $stmt->bind_param('i', $id);
                    $stmt->execute();
                    $stmt->close();
                } 

                $stmt = $db->prepare('DELETE FROM Users WHERE id=?');
                if ($stmt) {
                    $stmt->bind_param('i', $id);
                    $stmt->execute();
                    $stmt->close();
                } else {
                    echo json_encode(['status' => 'Error', 'message' => 'Failed to prepare Users query']);
                    exit();
                }

                echo json_encode(['status' => 'Success', 'message' => 'Records deleted']);
            } else {
                echo json_encode(['status' => 'Error', 'message' => 'ID is empty']);
            }
        } else {
            echo json_encode(['status' => 'Error', 'message' => 'Invalid JSON']);
        }
    } else {
        echo json_encode(['status' => 'Error', 'message' => 'No input data']);
    }
} else {
    echo json_encode(['status' => 'Error', 'message' => 'Invalid request method']);
}
?> 
