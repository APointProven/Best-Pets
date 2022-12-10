<!DOCTYPE html>
<html>

<head>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - Pet</title>
</head>

<script>
    // Grabs clicked pet from the session storage as soon as the page loads
    window.addEventListener('load', () => {
        const params = (new URL(document.location)).searchParams;
        const name = sessionStorage.getItem('PETNAME');
    })
</script>

<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>

    <?php
    $mysqli = require __DIR__ . "/php/database.php";
    $pet = $_COOKIE['petName'];
    $sql = "SELECT * FROM  pets WHERE petname ='$pet'";
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $joined = date("F d, Y", strtotime($row['joined'])); ?>
            <!-- Pet Information -->
            <div class="info-box">
                <!-- Includes image, name title, age, and breed -->
                <div class="image-info" id=<?= $row['id'] ?>>
                    <img src=<?= $row["img"] ?> alt="" class="image">
                    <h2 id="pet-name"><?= $row["petname"] ?></h2>
                    <h3 id="pet-info"><?= $row["age"] ?>, <?= $row["breed"] ?></h3>
                </div>

                <!-- Includes the pet introduction and description -->
                <h3 id="about-name" class="about-name">About <?= $row["petname"] ?>:</h3>
                <p id="pet-info-text">A lovely little <?= $row["breed"] ?> named "<?= $row["petname"] ?>" who joined the Best
                    Pets adoption agency on <?= $joined ?>. They are known around here for
                    being <?= $row["trait1"] ?>, <?= $row["trait2"] ?>, and <?= $row["trait3"] ?>.</p>
            </div>
    <?php
        }
        $mysqli->close();
    } ?>

    <!-- Bottom Section to include save button and requirements -->
    <div class="bottom-portion">
        <!-- The interested and save section -->
        <div id="interested" class="interested">
            <h2>Interested in this pet?</h3>
                <p>Click the Save icon and read over the adoption requirements!</p>

                <!-- Save button -->
                <button id="save" class="btn save">
                    <i id="save-icon" class="fa fa-heart-o save-btn"></i>
                    <h3 id="save-text" class="save-text">Save</h3>
                </button>

                <!-- Insert for confirmation messages to be displayed through js -->
                <div class="saved-box">
                    <p id="saved-msg" class="saved-message"></p>
                </div>
        </div>

        <!-- The requirements section -->
        <div class="req-box">
            <h2 class="requirements">Adoption Requirements</h2>
            <ul>
                <li>$75 adoption fee</li>
                <li>Spayed/neutered within 3 months of adoption</li>
            </ul>
        </div>
    </div>
    <script type="module" src="javascript/petWasSaved.js"></script>
</body>

</html>