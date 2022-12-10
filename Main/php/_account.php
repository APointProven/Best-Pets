<?php
session_start();

// Signing up
if (isset($_POST['password_confirmation'])) {
    $password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $mysqli = require __DIR__ . "/database.php";
    $sql = "INSERT INTO siteusers (username, email, pass_hash)
            VALUES (?,?,?)";
    $stmt = $mysqli->stmt_init();

    if (!$stmt->prepare($sql)) {
        die("SQL error: " . $mysqli->error);
    }

    $stmt->bind_param(
        "sss",
        $_POST["name"],
        $_POST["email"],
        $password_hash
    );

    try {
        $stmt->execute();
        echo ("Registration successful!");
        $mysqli->close();
    } catch (Exception $e) {
        echo ("Email already taken!");;
    }
}

//Logging in
if (isset($_POST['email-login'])) {
    $mysqli = require __DIR__ . "/database.php";
    $sql = sprintf(
        "SELECT * FROM siteusers
            WHERE email = '%s'",
        $mysqli->real_escape_string($_POST["email-login"])
    );
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();

    if ($user) {
        if (password_verify($_POST["password"], $user["pass_hash"])) {
            $_SESSION["userid"] = $user["id"];
            $userid = $_SESSION["userid"];

            $petgrab = sprintf("SELECT * FROM saved
            WHERE userid = $userid");

            $petresult = $mysqli->query($petgrab);
            $pettbl = [];

            if (mysqli_num_rows($petresult) > 0) {
                while ($row = mysqli_fetch_assoc($petresult)) {
                    $petID = $row['petid'];

                    $petnamegrabber = sprintf("SELECT petname FROM pets
                    WHERE id = $petID");

                    $nameresult = $mysqli->query($petnamegrabber);
                    $pet = $nameresult->fetch_assoc();

                    if ($pet) {
                        echo ('name:' . $pet['petname'] . ',');
                    }
                }
            } else {
                header("Location:../index.php?msg=loggedin");
            }
        } else {
            echo ("Invalid email or password!");
        }
        $mysqli->close();
    } else {
        echo ("No account associated with this email!");
    }

    $is_invalid = true;
    exit;
}

//Logging out
if (isset($_POST['logout'])) {
    unset($_SESSION['userid']);
    session_destroy();
    header('Location: ../loginRegister.php');
}

//Checking if logged in or not
if (isset($_POST['myacc'])) {
    if (isset($_SESSION['userid']) && !empty($_SESSION['userid'])) {
        header("Location: ../account.php");
    } else {
        header("Location: ../loginRegister.php");
    }
}
