const sendButton = document.getElementById('feedback-btn')
const confirmMsg = document.getElementById('confirm-msg')
var postRequest = new XMLHttpRequest();
var url = 'php/feedback.php';
var params = [];

sendButton.addEventListener('click', e => {
    e.preventDefault();

    var name = document.getElementById('name');
    var emailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = document.getElementById('email');
    var userText = document.getElementById('feedback-text');

    // Verifies that the email is in the correct format. 
    // If all is complete, it will send the feedback 
    // information to the database.
    if (!email.value.match(emailVerify)) {
        confirmMsg.textContent = "Email is in wrong format."
    } else {
        if (!sessionStorage.getItem('userid')) {
            confirmMsg.textContent = "You must be logged in to submit feedback!"
        } else {
            confirmMsg.textContent = "Feedback sent successfully."
            postRequest.open('POST', url, true);
            postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            postRequest.send("name=" + name.value + "&" + "email=" + email.value + "&" + "content=" + userText.value);
            document.getElementById("feedback").reset();
        }
    }
})