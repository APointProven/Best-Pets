const img = document.querySelectorAll('.pet-img')
const btns = document.querySelectorAll('.savebtn')
var articles = document.querySelectorAll('#item')
var liked = sessionStorage.getItem('Liked_Pets')
var canLike = false

// Fires the function as soon as the webpage loads
window.onload = function () {

    //Checking if the user is logged in
    if (sessionStorage.getItem("userid")) {
        canLike = true
    }

    // If we don't find the "Liked_Pets" table then we create a new one
    if (!liked) {
        sessionStorage.setItem('Liked_Pets', "")
        liked = []
    } else {
        liked = JSON.parse(liked)
    }

    var arr = JSON.parse(sessionStorage.getItem("Liked_Pets"))

    // Iterates through both the "Liked_Pets" session storage table and the pet cards,
    // compares the name to the id of the card, then changes the like icon if there's a match
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < articles.length; j++) {
            if (articles[j].children[0].id == arr[i].name) {
                articles[j].children[1].classList.replace("save", "un")
                articles[j].children[1].children[0].classList.replace("fa-heart-o", "fa-heart");
            }
        }
    }
}

// Function to change the heart icon when clicked along with adding/removing liked pets from storage
function change(btn) {

    if (btn.classList.contains("save") && canLike) {

        // Replacing the classes so the icon changes
        btn.classList.replace("save", "un")
        btn.children[0].classList.replace("fa-heart-o", "fa-heart");

        // Grabbing the pet name from the id
        var petName = btn.parentElement.children[0].id
        var petId = btn.parentElement.children[2].id

        // Pushes the new key and value to the "Liked_Pets" table
        liked.push({
            name: petName
        })

        // Adds the pushed table to the session storage
        sessionStorage.setItem('Liked_Pets', JSON.stringify(liked))

        var postRequest = new XMLHttpRequest()
        var url = 'php/likedpets.php'

        postRequest.open('POST', url, true);
        postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // Sends pet info to datastore
        postRequest.send("save=''" + '&' + 'petid=' + petId + '&' + 'userid=' + sessionStorage.getItem('userid'))
    } else if (!btn.classList.contains('save') && canLike) {
        // Replacing the classes so the icon changes
        btn.classList.replace("un", "save")
        btn.children[0].classList.replace("fa-heart", "fa-heart-o");

        // Grabbing the pet name from the id and the 'Liked_Pets' table from the session storage
        var petName = btn.parentElement.children[0].id
        var petId = btn.parentElement.children[2].id
        var arr = JSON.parse(sessionStorage.getItem("Liked_Pets"))

        // Iterates through the 'Liked_Pets' table and compares the values to the petName
        for (var i = 0; i < arr.length; i++) {
            // If the names match, the key gets removed from the table
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
    } else {
        alert("You must be logged in to save a pet!")
    }
}

// Adds an event listener to each heart icon to fire the change function
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        change(btn)
    })
})

// Creates a cookie for each pet clicked so the server can grab pet data
// then transfer it onto the onepet.php page
img.forEach(link => {
    link.addEventListener("click", () => {
        var id = link.id;
        sessionStorage.setItem("PETNAME", id);
        var date = new Date();
        date.setTime(date.getTime() + (30 * 1000));
        document.cookie = encodeURI("petName=" + sessionStorage.getItem('PETNAME') + "; expires=" + date);
        return;
    })
})