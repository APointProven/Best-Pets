<!-- Iterates through pets database and sends back cards with their info to html/savedpets.php -->
<?php
$mysqli = require __DIR__ . "/database.php";
foreach ($_POST as $key => $value) {
    $sql = "SELECT * from pets
    WHERE petname = '$value'";
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
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
            <div class="text" id=<?= $petid ?>>
                <h3><?= $petname ?></h3>
                <p><?= $petage ?></br></br><?= $petbreed ?> </p>
            </div>
        </article>
<?php
    }
} ?>