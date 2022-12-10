const saveButton = document.getElementById('save'),
    buttonIcon = document.querySelector('.save-btn'),
    buttonText = document.querySelector('#save .save-text'),
    confirmMsg = document.getElementById('saved-msg'),
    petName = document.getElementById('pet-name').innerText,
    petId = document.querySelector('.image-info').id

var canLike = false
var liked = sessionStorage.getItem('Liked_Pets')

// When the window loads, it checks to see if the pet has already been saved.
window.onload = function () {
    //Checking if the user is logged in
    if (sessionStorage.getItem("userid")) {
        canLike = true
    }

    // If so, the icon becomes the liked icon
    if (!liked) {
        sessionStorage.setItem('Liked_Pets', "")
        liked = []
    } else {
        liked = JSON.parse(liked)
    }

    // Iterating through the pets to see if it was liked
    var arr = JSON.parse(sessionStorage.getItem("Liked_Pets"))
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].name == petName) {
            saveButton.classList.replace("save", "un")
            buttonIcon.classList.replace("fa-heart-o", "fa-heart");
            buttonText.textContent = "Unsave"
        }
    }
}

function changeText(icon) {
    // If a pet is saved on the Saved pets page, this function
    // changes the icon and text, and adds the pet to the session storage.
    if (icon.classList.contains('save') && canLike) {
        icon.classList.replace("save", "un")
        buttonIcon.classList.replace("fa-heart-o", "fa-heart");
        buttonText.textContent = "Unsave"
        confirmMsg.textContent = "Pet successfully added to list."
        liked.push({
            name: petName
        })
        sessionStorage.setItem('Liked_Pets', JSON.stringify(liked))
        var postRequest = new XMLHttpRequest()
        var url = 'php/likedpets.php'

        postRequest.open('POST', url, true);
        postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // Sends pet info to datastore
        postRequest.send("save=''" + '&' + 'petid=' + petId + '&' + 'userid=' + sessionStorage.getItem('userid'))
        setTimeout(function () {
            confirmMsg.textContent = ""
        }, 3000);
    }

    // If a pet is unsaved on the Saved pets page, this function
    // changes the icon and text, and removes the pet from the session storage.
    else if (!icon.classList.contains('save') && canLike) {
        icon.classList.replace("un", "save")
        buttonIcon.classList.replace("fa-heart", "fa-heart-o");
        buttonText.textContent = "Save"
        confirmMsg.textContent = "Pet removed from list."
        var arr = JSON.parse(sessionStorage.getItem("Liked_Pets"))
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].name == petName) {
                liked.splice(i, 1)
                sessionStorage.setItem('Liked_Pets', JSON.stringify(liked))
            }
        }
        var postRequest = new XMLHttpRequest()
        var url = 'php/likedpets.php'

        postRequest.open('POST', url, true);
        postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // Sends pet info to datastore
        postRequest.send("un=''" + '&' + 'petid=' + petId + '&' + 'userid=' + sessionStorage.getItem('userid'))
        setTimeout(function () {
            confirmMsg.textContent = ""
        }, 3000);
    } else {
        var msg = "You must be logged in to save a pet!"
        if (confirm(msg) == true){
          window.location = 'loginRegister.php'
        }
    }
}

saveButton.addEventListener('click', e => {
    changeText(saveButton)
})