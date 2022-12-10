//  Uses a GET PHP function to grab the 'navbar.html' file and place it in every page
function includeHTML() {
    var doc = document.getElementById('nav-ph')
    var grab = doc.getAttribute('w3-include-html')

    if (grab) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    doc.innerHTML = this.responseText;
                }
                if (this.status == 404) {
                    doc.innerHTML = "Page not found.";
                }
                doc.removeAttribute('w3-include-html')
                includeHTML();
            }
        }
        http.open('GET', grab, true)
        http.send()
        return;
    }
}
includeHTML();

// Small 250ms wait to allow 'navbar.html' elements to load 
setTimeout(function () {
    const burgerToggle = document.getElementById('burger-btn'),
        burgerForm = document.getElementById('burger-nav'),
        personBtn = document.getElementById('person-Btn'),
        personForm = document.getElementById('person-nav')

    // Opens/closes the account menu when clicked
    personBtn.onclick = function () {
        if (personBtn.classList.contains('personClose')) {
            personBtn.classList.replace("personClose", "personOpen")
            personForm.removeAttribute('style');
        } else {
            personBtn.classList.replace("personOpen", "personClose")
            personForm.setAttribute('style', 'display: none');
        }
    }

    // Opens/closes the burger menu when clicked.
    burgerToggle.onclick = function () {
        if (burgerToggle.classList.contains('burgerClose')) {
            burgerToggle.classList.replace("burgerClose", "burgerOpen")
            burgerForm.removeAttribute('style');
        } else {
            burgerToggle.classList.replace("burgerOpen", "burgerClose")
            burgerForm.setAttribute('style', 'display: none');
        }
    }

    var navbtns = document.querySelectorAll('.nav-item')
    navbtns.forEach(btn => {
        var page = window.location.href
        var pageshort = page.substring(page.lastIndexOf('/') + 1)
        var accpages = ['loginRegister.php', 'account.php', ""]

        if (pageshort.includes(btn.id) && pageshort != accpages[0] && pageshort != accpages[1]) {
            btn.classList.add('active')
        } else if (pageshort == accpages[0] || pageshort == accpages[1]) {

            if (btn.innerHTML == "Account") {
                btn.classList.add('active')
            }

        } else if (pageshort == accpages[2]) {

            if (btn.innerHTML == "Home") {
                btn.classList.add('active')
            }
        } else {
            btn.classList.remove('active')
        }

        btn.addEventListener('click', e => {
            e.preventDefault();
            if (btn.id != "acc") {
                window.location = btn.id
            } else {
                var loggedIn = sessionStorage.getItem('userid')
                if (loggedIn) {
                    // If logged in, directs to account page.
                    window.location = 'account.php'
                } else {
                    // If not logged in, directs to login/register page.
                    window.location = 'loginRegister.php'
                }
            }
        })
    })
}, 250);