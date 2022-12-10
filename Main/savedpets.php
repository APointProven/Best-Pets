<!DOCTYPE html>
<html>

<head>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - My Saved Pets</title>
</head>

<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>
    <div class="all-cards">
        <div class="pet-container">
            <!-- Placeholder for saved pet cards (retrieved from js/php) -->
            <main class="grid" id="saved_container">

            </main>
        </div>
    </div>
</body>

<!-- Location of ending statement -->
<footer>
    <p></p>
</footer>
<script src="javascript/petsaving.js"></script>

</html>