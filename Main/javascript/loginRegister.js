setTimeout(function () {
    const container = document.querySelector(".forms"),
        pwShowHide = document.querySelectorAll(".showHidePw"),
        pwFields = document.querySelectorAll(".input-field"),
        signUp = document.querySelector(".signup-link"),
        registerBtn = document.getElementById('register-btn'),
        loginBtn = document.getElementById('login-btn'),
        errorMsg = document.getElementById('error-msg')

    var emailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var validPass = /^(?=.*\d)(?=.*[a-z]).{8,20}$/;

    var email = document.getElementById('reg-email'),
        pass = document.getElementById('reg-password'),
        confirmPass = document.getElementById('password_confirmation'),
        loginEmail = document.getElementById('email'),
        loginPass = document.getElementById('password')

    var liked = sessionStorage.getItem('Liked_Pets')

    // Function to handle changing password icons
    function changeText(icon) {
        pwFields.forEach(pwField => {
            if (pwField.type === "password" && pwField.className.match(icon.classList[3])) {
                pwField.type = "text";
                icon.classList.replace("uil-eye-slash", "uil-eye");
            } else if (pwField.type === "text" && pwField.className.match(icon.classList[3])) {
                pwField.type = "password";
                icon.classList.replace("uil-eye", "uil-eye-slash");
            }
        });
    }

    // Looping through each eye icon and creating an event listener
    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            changeText(eyeIcon)
        })
    })

    // Verifies that the user is registering with correct email and password formats
    registerBtn.addEventListener('click', e => {
        var postRequest = new XMLHttpRequest()
        var url = 'php/_account.php'
        var data = []
        e.preventDefault();
        if (!email.value.match(emailVerify)) {
            errorMsg.textContent = "Email address is in wrong format."
        } else if (email.value.match(emailVerify) && !pass.value.match(validPass)) {
            errorMsg.textContent = "Password must contain 1 letter, 1 number, and be between 8-20 characters."
        } else if (email.value.match(emailVerify) && pass.value.match(validPass) && (pass.value != confirmPass.value)) {
            errorMsg.textContent = "Passwords do not match."
        } else {

            for (var i = 0; i < pwFields.length; i++) {
                if (pwFields[i].parentElement.id == "register") {
                    data.push(pwFields[i].name + '=' + pwFields[i].value + "&")
                }
            }

            postRequest.onreadystatechange = function () {
                if (postRequest.readyState == 4 && postRequest.status == 200) {
                    errorMsg.textContent = postRequest.responseText
                }
            }

            var tostr = data.toString();
            var slice = tostr.slice(0, -1)

            postRequest.open('POST', url, true)
            postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            postRequest.send(slice.replaceAll(',', ''))
        }
    })

    // Verifies that the user is logging in with correct email and password formats
    loginBtn.addEventListener('click', e => {
        e.preventDefault();
        if (loginEmail.value == "" || loginPass.value == "") {
            errorMsg.textContent = "Please enter in all fields."
        } else {

            if (!loginEmail.value.match(emailVerify)) {
                errorMsg.textContent = "Please enter a valid email address."
            } else {
                var postRequest = new XMLHttpRequest()
                var url = 'php/_account.php'
                var data = []

                for (var i = 0; i < pwFields.length; i++) {
                    if (pwFields[i].parentElement.id == "login") {
                        data.push(pwFields[i].name + '=' + pwFields[i].value + "&")
                    }
                }

                postRequest.onreadystatechange = function () {
                    if (postRequest.readyState == 4 && postRequest.status == 200) {
                        if (postRequest.responseText.includes('name:') || postRequest.responseText.includes("!DOCTYPE")) {
                            window.location = 'index.php?msg=loggedin'
                            if (postRequest.responseText.includes('name:')) {
                                var response = postRequest.responseText.slice(0, -1)
                                var arr = response.split(",")
                                if (!liked) {
                                    sessionStorage.setItem('Liked_Pets', "")
                                    liked = []
                                } else {
                                    liked = JSON.parse(liked)
                                }
                                for (var i = 0; i < arr.length; i++) {
                                    liked.push({
                                        name: arr[i].replace("name:", "")
                                    })
                                }
                                sessionStorage.setItem('Liked_Pets', JSON.stringify(liked))
                            }
                        } else {
                            errorMsg.textContent = postRequest.responseText
                        }
                    }
                }

                var tostr = data.toString();
                var slice = tostr.slice(0, -1)

                postRequest.open('POST', url, true)
                postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                postRequest.send(slice.replaceAll(',', ''))
            }
        }
    })

    // Allows the log in and register forms to appear
    signUp.addEventListener("click", () => {
        container.classList.add("active");
    });
    login.addEventListener("click", () => {
        container.classList.remove("active");
    });
}, 3000);