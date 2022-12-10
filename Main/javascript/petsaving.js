var footer = document.querySelector('footer').children[0]
// Fires function as soon as the page loads
window.onload = function () {

    //Checking if the user is logged in
    if (!sessionStorage.getItem("userid")) {
        footer.innerText = "You must be signed in to save pets!"
    } else {
        footer.innerText = "Click the heart on a companion's page to view them here!"
    }

    // Grabs the 'Liked_Pets' table from the Session Storage
    var arr = JSON.parse(sessionStorage.getItem("Liked_Pets")),
        postRequest = new XMLHttpRequest(),
        url = 'php/_savedpets.php',
        data = []

    // For loop that pushes pet names to table for PHP to read
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i]
        data.push("Pet-" + i + "=" + key.name + "&")
    }

    postRequest.open('POST', url, true);

    // If postRequest is successful then it pastes the data sent inside of the html element
    // that has the id of  "saved_container" 
    postRequest.onreadystatechange = function () {
        if (postRequest.readyState == 4 && postRequest.status == 200) {
            const saved_container = document.getElementById('saved_container')
            saved_container.innerHTML = postRequest.responseText
        }
    }

    //Turns data into a string then removes commas so PHP can read it
    var tostr = data.toString();
    postRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    postRequest.send(tostr.replaceAll(',', ''))

    //Small timeout function to allow the pets to be loaded before you can click the images
    setTimeout(function () {
        const img = document.querySelectorAll('.pet-img')
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
    }, 500);
}