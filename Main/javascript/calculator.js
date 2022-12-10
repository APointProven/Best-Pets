const calculator = document.querySelector('.calc-box'),
    dogSubmit = document.querySelector('#dogs .submit-btn'),
    dogReset = document.querySelector('#dogs .reset-btn'),
    catSubmit = document.querySelector('#cats .submit-btn'),
    catReset = document.querySelector('#cats .reset-btn'),
    errorMsg = document.getElementById('calc-error-msg')

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

// Handles the dog calculator
dogSubmit.addEventListener('click', e => {
    e.preventDefault();

    var breedSize = document.getElementById("d-breed").value,
        age = parseInt(document.getElementById("d-age").value),
        preventative = parseInt(document.getElementById("d-preventative").value),
        food = parseInt(document.getElementById("d-food").value),
        medical = parseInt(document.getElementById("d-medical").value),
        petRent = parseInt(document.getElementById("d-rent").value)

    // Ensures that all form fields have input so the calculation
    // can be completed correctly. Will then complete the calculation,
    // transform it into USD, and display it.
    if (breedSize > -1 && age > -1 && preventative > -1 && food > -1 && medical > -1 && petRent > -1) {
        let monthly = (breedSize * food) + age + preventative + medical + petRent;
        var monthlyUSD = USDollar.format(monthly);

        let annual = (monthly * 12) + 225;
        var annualUSD = USDollar.format(annual);

        document.getElementById("m-results").innerHTML = monthlyUSD;
        document.getElementById("a-results").innerHTML = annualUSD;
    } else { // Error message if all form fields are not filled in.
        errorMsg.textContent = "Please fill in all fields."
    }
})

// Handles the cat calculator
catSubmit.addEventListener('click', e => {
    e.preventDefault();

    var age = parseInt(document.getElementById("c-age").value),
        preventative = parseInt(document.getElementById("c-preventative").value),
        food = parseInt(document.getElementById("c-food").value),
        medical = parseInt(document.getElementById("c-medical").value),
        petRent = parseInt(document.getElementById("c-rent").value)

    // Ensures that all form fields have input so the calculation
    // can be completed correctly. Will then complete the calculation,
    // transform it into USD, and display it. 
    if (age > -1 && preventative > -1 && food > -1 && medical > -1 && petRent > -1) {
        let monthly = food + age + preventative + medical + petRent;
        var monthlyUSD = USDollar.format(monthly);

        let annual = (monthly * 12) + 100;
        var annualUSD = USDollar.format(annual);

        document.getElementById("m-results").innerHTML = monthlyUSD;
        document.getElementById("a-results").innerHTML = annualUSD;
    } else { // Error message if all form fields are not filled in.
        errorMsg.textContent = "Please fill in all fields."
    }
})

// When the reset button is clicked, it will reset the
// result fields back to zero, in addition to clearing
// the input fields of previous data.
dogReset.addEventListener('click', e => {
    document.getElementById("m-results").innerHTML = "$0.00";
    document.getElementById("a-results").innerHTML = "$0.00";
})

catReset.addEventListener('click', e => {
    document.getElementById("m-results").innerHTML = "$0.00";
    document.getElementById("a-results").innerHTML = "$0.00";
})