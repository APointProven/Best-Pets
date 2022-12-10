<?php
session_start(); ?>
<!DOCTYPE html>
<html>

<head>
    <link href="css/account.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - Account</title>
</head>

<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>

    <!-- Insert for the confirmation/error messages to be displayed through js -->
    <div class="confirm-box">
        <p id="confirm-msg" class="confirm-message"></p>
    </div>

    <?php
    $mysqli = require __DIR__ . "/php/database.php";
    $sql = sprintf(
        "SELECT * FROM siteusers
            WHERE id = '%s'",
        $mysqli->real_escape_string($_SESSION['userid'])
    );
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();
    if ($user) {
    ?>
        <!-- Account Information Form -->
        <div class="account-form">
            <h1>My Account</h1>

            <!-- Form with log out text and button, with the post method for php -->
            <form action="php/_account.php" method="post">
                <p class="notYou">Not you?</p>
                <button type="submit" id="logout" class="logout" name="logout">Sign out now.</button>
            </form>

            <!-- Form with account details - including name, email, and phone number. Using 
                readonly attributes which are altered through js after "Edit Details" button click. -->
            <form id="account" class="input-group" action="php/saveinfo.php" method="post">
                <h3 class="input1Header">Name:</h3>
                <input type="text" id="name" class="input-field input1" placeholder="<?= $user["username"] ?>" value="<?= $user["username"] ?>" readonly>
                <h3 class="input1Header">Email:</h3>
                <input type="email" id="email" class="input-field input1" placeholder="<?= $user["email"] ?>" value="<?= $user["email"] ?>" readonly>
                <h3 class="input1Header">Phone Number:</h3>
                <input type="tel" id="phone" class="input-field input1" placeholder="<?= $user["phone"] ?>" value="<?= $user["phone"] ?>" readonly>
            </form>

            <!-- Form with change password inputs. Using style display none which is
                altered through js after "Change Password" button click. -->
            <form style="display: none" id="passForm" class="input-group" action="php/saveinfo.php" method="post">
                <h3 id="input2Header">Current Password:</h3>
                <i id="currentIcon" class="uil uil-eye-slash showHidePw current"></i>
                <input type="password" id="password" class="input-field input2 current" placeholder="Current password">
                <h3 id="input2Header">New Password:</h3>
                <i id="newIcon" class="uil uil-eye-slash showHidePw new"></i>
                <input type="password" id="password_new" class="input-field input2 new" placeholder="New password">
                <h3 id="input2Header">Confirm New Password:</h3>
                <i id="confirmIcon" class="uil uil-eye-slash showHidePw confirmNew"></i>
                <input type="password" id="password_confirmation" class="input-field input2 confirmNew" placeholder="Confirm password">
            </form>

            <!-- Edit Details and Change Password buttons -->
            <button type="button" id="edit-btn" class="edit">Edit Details</button>
            <button type="button" id="pass-btn" class="change">Change Password</button>
        </div>
    <?php
        $mysqli->close();
    } ?>

    <script>
        // Removes liked pets from storage upon logout
        const logoutButton = document.getElementById('logout')
        logoutButton.onclick = function() {
            sessionStorage.removeItem("Liked_Pets")
            sessionStorage.removeItem("userid")
        }
    </script>

    <script type="module" src="javascript/myAccount.js"></script>
    <script type="module" src="javascript/loginRegister.js"></script>
</body>

</html>