<?php
session_start();
// Grabs the SQL database from the database.php file
$mysqli = require __DIR__ . "/database.php";

// Checks if $_POST['name'] exists, if true, then we're updating the user's info
if (isset($_POST["name"])) {
    $name = $mysqli->real_escape_string($_POST['name']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $phone = $mysqli->real_escape_string($_POST['phone']);
    $sesid = $mysqli->real_escape_string($_SESSION['userid']);


    $sqlfetch = sprintf("SELECT * FROM siteusers");
    $result = $mysqli->query($sqlfetch);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['email'] == $_POST['email'] && $row['id'] != $_SESSION['userid']) {
                echo ("Email already taken!");
                break;
            } elseif ($row['phone'] == $_POST['phone'] && $row['id'] != $_SESSION['userid']) {
                echo ("Phone already taken!");
                break;
            } else {
                $sql = "UPDATE siteusers 
                    SET username = '$name', email = '$email', phone = '$phone'
                    WHERE id = '$sesid'";
                echo ("Account details successfully saved.");
                if (!$mysqli->query($sql)) {
                    echo ($mysqli->affected_rows);
                }
                break;
            }
        }
    }
}

// Else if $_POST['password'] exists, then we're updating the user's password
elseif (isset($_POST["password"])) {
    $pass = $mysqli->real_escape_string(password_hash($_POST["newpass"], PASSWORD_DEFAULT));
    $sesid = $mysqli->real_escape_string($_SESSION['userid']);

    $sqlfetch = sprintf(
        "SELECT * FROM siteusers
                            WHERE id = '%s'",
        $mysqli->real_escape_string($_SESSION['userid'])
    );
    $result = $mysqli->query($sqlfetch);
    $user = $result->fetch_assoc();

    if ($user) {
        if (password_verify($_POST["password"], $user["pass_hash"])) {
            $sql = "UPDATE siteusers 
                SET pass_hash = '$pass'
                WHERE id = '$sesid'";

            if (!$mysqli->query($sql)) {
                echo ($mysqli->affected_rows);
            }
            echo ("Password successfully changed!");
        } else {
            echo ("Current password incorrect!");
        }
    }
}
$mysqli->close();
