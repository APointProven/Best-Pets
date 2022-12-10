<!DOCTYPE html>
<html>

<head>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - All Pets</title>
</head>

<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>

    <div class="all-cards">
        <div class="pet-container">
            <main class="grid">
                <!--  php function that loops through database and add pet images -->
                <?php
                $mysqli = require __DIR__ . "/php/database.php";

                $sql = "SELECT * FROM  pets";

                $result = mysqli_query($mysqli, $sql);

                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $petpic = $row["img"];
                        $petname = $row["petname"];
                        $petage = $row["age"];
                        $petbreed = $row["breed"];
                        $petid = $row['id'];
                ?>
                        <article id="item">
                            <a id=<?= $petname ?> class="pet-img" href="onepet.php">
                                <img src='<?= $petpic ?>'>
                            </a>

                            <!-- Save button -->
                            <button id="save" class="savebtn save">
                                <i id="save-icon" class="fa fa-heart-o save-btn"></i>
                            </button>

                            <div class="text" id=<?= $petid ?>>
                                <h3><?= $petname ?></h3>
                                <p><?= $petage ?></br></br><?= $petbreed ?> </p>
                            </div>
                        </article>
                <?php
                    }
                }
                $mysqli->close();
                ?>
            </main>
        </div>
    </div>
    <script type="module" src="javascript/petcards.js"></script>
    <script type="module" src="javascript/petWasSaved.js"></script>
</body>

</html>