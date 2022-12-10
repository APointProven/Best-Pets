<!DOCTYPE html>
<html>

<head>
    <link href="css/account.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - Login or Register</title>
</head>

<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>

    <!-- Insert for confirmation/error messages to be displayed through php -->
    <div class="error-box">
        <p id="error-msg" class="error-message">
            <?php
            if (isset($_GET["msg"]) && $_GET["msg"] == 'success') {
                session_start();
                echo ($_SESSION["msg"]);
            } ?>
        </p>
    </div>
    <!-- Login and Register form box -->
    <div class="LR-forms">
        <!-- Login/Register header buttons -->
        <div class="button-box">
            <div id="btn"></div>
            <button type="button" class="toggle-btn" onclick="login()">Sign In</button>
            <button type="button" class="toggle-btn" onclick="register()">Sign Up</button>
        </div>
        <!-- Login Form -->
        <form id="login" class="input-group">
            <i class="uil uil-envelope email"></i>
            <input type="email" id="email" name="email-login" class="input-field login" placeholder="Email" required>

            <i class="uil uil-lock pass"></i>
            <i class="uil uil-eye-slash showHidePw login"></i>
            <input type="password" id="password" name="password" class="input-field login" placeholder="Password" required>

            <input type="checkbox" class="check-box"><span>Remember me</span>
            <button type="submit" class="submit-btn" id="login-btn">Log In</button>
        </form>

        <!-- Signup Form -->
        <form id="register" class="input-group">
            <input type="text" id="name" name="name" class="input-field" placeholder="Name" required>
            <input type="email" id="reg-email" name="email" class="input-field" placeholder="Email" required>

            <i class="uil uil-eye-slash showHidePw signup"></i>
            <input type="password" id="reg-password" name="password" class="input-field signup" placeholder="Enter password" required>

            <i class="uil uil-eye-slash showHidePw confirm"></i>
            <input type="password" id="password_confirmation" name="password_confirmation" class="input-field confirm" placeholder="Confirm password" required>

            <input type="checkbox" id="check-box" class="check-box" required><span>I agree to the terms & conditions.</span>
            <button type="submit" class="submit-btn" id="register-btn">Register</button>
        </form>
    </div>

    <!-- Script to change out the login/register forms -->
    <script>
        var x = document.getElementById("login");
        var y = document.getElementById("register");
        var z = document.getElementById("btn");

        function register() {
            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "110px";
        }

        function login() {
            x.style.left = "50px";
            y.style.left = "450px";
            z.style.left = "0px";
        }
    </script>

    <script type="module" src="javascript/loginRegister.js"></script>
</body>

</html>