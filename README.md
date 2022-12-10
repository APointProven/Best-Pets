# Best Pets Adoption Agency

### Link: https://bit.ly/BestPetsAdoption

## <br> Introduction
Drafted, designed, and implemented in under a month, the **Best Pets Adoption Agency** website was my first major HTML/CSS implementation.

Its purpose was to serve as a final project for my ITC 2060 Human Computer Interaction class.

"First time creating a website, and surprisingly, it works :)" - FlourTM

## <br> Project Requirements
### Group project (up to 4 persons)
  
- ### Program Interface Requirements:
  - Equipped with a Graphical User Interface (GUI) instead of using Command Line Interface (CLI)
  - Be readable and easy to navigate
  - Minimize user's input errors with appropriate feedback messages
  - Reduce the user's effort
  
- ### Choose a simple task (we didn't out of spite)
  - The program should handle a meaningful task for one or more types of users, such as a bookkeeper, calendar, or inventory entry form.
  - It is your responsibility to choose a program that can be completed within a semester
  
- ### Given the limitation of course duration, you don't have to implement all ideas
  - For a solo project, at least 3 features or functions must be implemented to demo the advantages of your program
  - For groups, 2 members should have at least 4 features, 3 or more members should have at least 5
  - The implementation must show the strength of your design
  - Your program is allowed to be in a pilot version, where only part of a system functions well
  - You must AT LEAST get your program to run; otherwise, no credit for coding.

*Note - Other requirements related to the "Project Report" were omitted due to irrelevancy* 

## <br> Implementations
*Note - For this part of the README.md file, we'll be dividing all implementation by webpage*

### Home
- Iterated through the pets table in our database and created cards using the first four pets based on the following requirements:
  - Latest join date
  - Earliest join date
- Iterated through the adopted pets table in our database and grabbed all entries to create cards for the respected category
- Used HTML/CSS/JS to design and implement a user friendly card layout and features
- Made it so pets could be liked from the homepage and transfer to the save page
- Clicking the pet image redirects you to their individual pet page

### All Pets
- A small 60 line script that iterates through the pets table and creates functional cards for every pet
- These cards have the same functionality as the home page

### Dogs
- Similar to the home page, the dogs page consists of a small script that iterates through the pets table and grabs all entries with the species 'dog' and creates their cards
- Since all cards are ran by the same JS script, they all redirect to their respected single pet page, along with add liked pets to the database and session storage

### Cats
- POV be the dogs page but with cats

### Single Pet
- The single pet page is mostly ran through PHP and JS and this is its process:
  - Information about the pet is retrieved from the card upon mouse click
  - That information is then sent to the server through a POST method
  - After the server retrieves the pet information, it looks through the database for the pet that needs to be retrieved and creates an HTML element for it
  - The information about the pet is then used to add essential information to the HTML element such as name, join date, traits, etc.
-  The single pet page, like other pages before this, also has a like feature that saves liked pets to our database and to the session storage.

*Note - All pages mentioned above also uses a script that checks if a pet is liked or not and changes the heart icon based on that information upon page load<br>
### Calculator
- The calculator includes two forms that switch between "Dogs" and "Cats" via button click
- Each form includes fields for age, weight, food quality, and whether or not there are medical issues or apartment rent to worry about. The dog form includes an additional field of breed size
- To create the calculation formulas, ample research was done based on the average pricing of each factor
- Using JS, the user inputs are calculated to provide the estimated monthly and annual cost for taking care of either a dog or cat, depending on which form was selected

### Account
- The account page displays the user's name, email address, and phone number if added
- An edit button and change password button are available to the user if they wish, as well as a log out button
- When the "Edit Details" button is clicked, the text changes to "Save" and the "Change Password" button is removed. It then allows the user to edit their name, email address, and phone number. 
- JS confirms that the email and phone number are in the correct format, and PHP verifies that the email address or phone number do not belong to another account
- When the "Change Password" button is clicked, the text changes to "Save" and the "Edit Details" button is removed. The name, email, and phone fields are then switched to current password, new password, and confirm new password
- JS confirms that the new and confirm password fields in the correct format and are a match to each other, whereas PHP verifies that the current password field matches the user's password

### Saved
- The process for the saved pets page is pretty simple:
  - Instead of grabbing information from the database, the JS code uses the "liked pets" session storage table that is created upon login (further explained [here](https://github.com/FlourTM/Best-Pets-Final#loginregister))
  - The JS code iterates through the session storage table and sends it to the server via POST method
  - Once the server receives the table, it iterates through the table, iterates through the database, and creates cards for each pet saved on the table

### Feedback
- The feedback page consists of a form that requires the user to enter their name, email, and to place their message in the content box
- If the user is not signed in, they will be unable to submit the form
- Using PHP, this information is then sent to the database

### Login/Register
- The login and register page includes two forms that switch between "Sign In" and "Sign Up" upon button click
- The login form includes the email address and the password fields
- The register form includes the name, email address, password, and confirm password fields, along with a box to tick regarding the terms and conditions
- JS verifies that the email address and password are in the correct format for both forms, as well as checking that both password fields match on the register form
- PHP checks if the email and password matches an account on the login form, and that the email does not match another account on the register form
- Upon logging in, a table is created within the session storage to store "liked pets." PHP code for logging in checks for pets liked under the user's userid and iterates through those liked pets then pushes them to a table. Using a get method in the JS code, we are able to grab that table and push it to the "liked pets" session storage table.
