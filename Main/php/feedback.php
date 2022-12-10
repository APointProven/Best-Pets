<?php
session_start();
// Grabs the SQL database from the database.php file
$mysqli = require __DIR__ . "/database.php";

if (isset($_POST["content"])) {
    // Checks if $_POST['name'] exists, if true, then we're updating the user's info
    $name = $mysqli->real_escape_string($_POST['name']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $content = $mysqli->real_escape_string($_POST['content']);

    $sql = "INSERT INTO feedback (userName, userEmail, content)
    VALUES (
        '$name',
        '$email',
        '$content'
      );";

    if (!$mysqli->query($sql)) {
        //echo($mysqli -> affected_rows);
    }
    $stmt = $mysqli->stmt_init();
}
$mysqli->close();
