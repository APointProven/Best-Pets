const editButton = document.getElementById('edit-btn'),
    changeButton = document.getElementById('pass-btn'),
    confirmMsg = document.getElementById('confirm-msg'),
    accountForm = document.getElementById('account'),
    passForm = document.getElementById('passForm')

var emailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phoneVerify = /^\d{10}$/;
var validPass = /^(?=.*\d)(?=.*[a-z]).{8,20}$/;

var editInputs = document.querySelectorAll('.input1'),
    emailAdd = document.getElementById('email'),
    phoneNum = document.getElementById('phone'),
    userName = document.getElementById('name'),
    currentPass = document.getElementById('password'),
    newPass = document.getElementById('password_new'),
    confirmPass = document.getElementById('password_confirmation')
var postRequest = new XMLHttpRequest();
var url = 'php/saveinfo.php';
var params = [];
// Function for when the "Edit Details" button is clicked
editButton.addEventListener('click', e => {
    e.preventDefault();

    // If edit is clicked, it will open the input fields, change "Edit Details" to "Save,"
    // and remove the "Change Password" button
    if (editButton.classList.contains('edit')) {
        editButton.classList.replace("edit", "save")
        editButton.textContent = 'Save';
        editButton.type = "submit"
        changeButton.setAttribute('style', 'display: none');

        for (var i = 0; i < editInputs.length; i++) {
            editInputs[i].removeAttribute('readonly')
        }
    }
    // If save is clicked, it will close the input fields, change "Save" to "Edit Details,"
    // bring back the "Change Password" button, and send the new information if successful.
    else {
        if (phoneNum.value.match(phoneVerify) && !emailAdd.value.match(emailVerify)) {
            confirmMsg.textContent = "Email address is in wrong format."
        } else if (!phoneNum.value.match(phoneVerify) && emailAdd.value.match(emailVerify)) {
            confirmMsg.textContent = "Phone number is in wrong format."
        } else if (!phoneNum.value.match(phoneVerify) && !emailAdd.value.match(emailVerify)) {
            confirmMsg.textContent = "Email address and phone number are in wrong format."
        } else if (emailAdd.value == emailAdd.placeholder && phoneNum.value == phoneNum.placeholder && userName.value == userName.placeholder) {
            editButton.classList.replace("save", "edit")
            editButton.textContent = 'Edit Details'
            editButton.type = "button"
            changeButton.removeAttribute('style');

            for (var i = 0; i < editInputs.length; i++) {
                editInputs[i].setAttribute('readonly', 'readonly')
            }
        } else {
            postRequest.onreadystatechange = function () {
                if (postRequest.readyState == 4 && postRequest.status == 200) {
                    confirmMsg.textContent = postRequest.responseText
                    if (postRequest.responseText.includes("saved")) {
                        editButton.classList.replace("save", "edit")
                        editButton.textContent = 'Edit Details'
                        editButton.type = "button"
                        changeButton.removeAttribute('style')
                        emailAdd.placeholder = emailAdd.value
                        phoneNum.placeholder = phoneNum.value

                        for (var i = 0; i < editInputs.length; i++) {
                            editInputs[i].setAttribute('readonly', 'readonly')
                        }
                    }
                }
            }
            for (var i = 0; i < editInputs.length; i++) {
                params.push(editInputs[i].id + '=' + editInputs[i].value + '&')
            }

            postRequest.open('POST', url, true);
            postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            var tostr = params.toString();
            postRequest.send(tostr.replaceAll(',', ''));
        }
    }
});

// If "Change Password" is clicked, it will hide the account details and
// allow for the password to be changed.
changeButton.addEventListener('click', e => {
    e.preventDefault();
    if (changeButton.classList.contains('change')) {
        changeButton.classList.replace("change", "savePW")
        changeButton.textContent = 'Save Password';
        changeButton.type = "submit"

        editButton.setAttribute('style', 'display: none');
        passForm.removeAttribute('style');
        accountForm.setAttribute('style', 'display: none');
    } else {
        if (newPass.value != confirmPass.value) {
            confirmMsg.textContent = "Passwords do not match."
        } else if (!newPass.value.match(validPass) && !newPass.value == "") {
            confirmMsg.textContent = "Password must contain 1 letter, 1 number, and be between 8-20 characters."
        } else if (newPass.value == "" && confirmPass.value == "") {
            changeButton.classList.replace("savePW", "change")
            changeButton.textContent = 'Change Password'
            changeButton.type = "button"

            editButton.removeAttribute('style');
            passForm.setAttribute('style', 'display: none');
            accountForm.removeAttribute('style');
        } else {
            var postRequest = new XMLHttpRequest();
            var url = 'php/saveinfo.php';

            postRequest.open('POST', url, true);

            postRequest.onreadystatechange = function () {
                if (postRequest.readyState == 4 && postRequest.status == 200) {
                    confirmMsg.textContent = postRequest.responseText
                    if (postRequest.responseText.includes("changed")) {
                        changeButton.classList.replace("savePW", "change")
                        changeButton.textContent = 'Change Password'
                        changeButton.type = "button"

                        editButton.removeAttribute('style');
                        passForm.setAttribute('style', 'display: none');
                        accountForm.removeAttribute('style');
                    }
                }
            }

            postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            postRequest.send("password=" + currentPass.value + "&" + "newpass=" + newPass.value);
        }
    }
});