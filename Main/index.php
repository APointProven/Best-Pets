<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Pets - Home</title>
</head>



<body>
    <!-- Navigation Bar -->
    <my-header id=nav-ph w3-include-html='navbar.html'></my-header>
    <script type="module" src="javascript/navbar.js"></script>
    <!-- Pet Cards -->
    <div class="all-cards">

        <!-- Newest Residents -->
        <h1>Newest Residents</h1>
        <div class="pet-container">
            <main class="grid">
                <?php
                $mysqli = require __DIR__ . "/php/database.php";

                $sql = "SELECT * from pets
                        WHERE DATEDIFF('2022/11/25',joined) < 360
                        GROUP BY joined desc";

                $result = mysqli_query($mysqli, $sql);
                if (mysqli_num_rows($result) > 0) {
                    for ($x = 0; $x < 4; $x++) {
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

        <!-- Earliest Residents -->
        <h1>Earliest Residents</h1>
        <div class="pet-container">
            <main class="grid">
                <?php
                $mysqli = require __DIR__ . "/php/database.php";

                $sql = "SELECT * from pets
                        GROUP BY joined";
                $result = mysqli_query($mysqli, $sql);
                if (mysqli_num_rows($result) > 0) {
                    for ($x = 0; $x < 4; $x++) {
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

        <!-- Recently Adopted -->
        <h1>Recently Adopted</h1>
        <div class="pet-container">
            <main class="grid">
                <?php
                $mysqli = require __DIR__ . "/php/database.php";

                $sql = "SELECT * from Adopted_Pets";
                $result = mysqli_query($mysqli, $sql);
                if (mysqli_num_rows($result) > 0) {
                    for ($x = 0; $x < 4; $x++) {
                        $row = mysqli_fetch_assoc($result);
                        $petpic = $row["img"];
                        $petname = $row["petname"];
                        $petage = $row["age"];
                        $petbreed = $row["breed"];
                ?>
                        <article id="item">
                            <a id=<?= $petname ?> class="pet-img">
                                <img src='<?= $petpic ?>'>
                            </a>
                            <p class="adopted-text">ADOPTED</p>
                            <div class="text">
                                <h3><?= $petname ?></h3>
                                <p><?= $petage ?></br></br><?= $petbreed ?> </p>
                            </div>
                        </article>
                <?php
                    }
                }
                $mysqli->close();
                ?>
                <script type="text/javascript">
                    const img = document.querySelectorAll('.pet-img'),
                        card = document.querySelectorAll('item');
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
                </script>
                <script type="module" src="javascript/petcards.js"></script>
                <?php if (isset($_GET["msg"]) && $_GET["msg"] == 'loggedin') {
                    session_start();
                    $user = $_SESSION["userid"];
                ?>
                    <script>
                        sessionStorage.setItem("userid", '<?= $user ?>')
                    </script>
                <?php
                } ?>
            </main>
        </div>
    </div>

</body>

<!-- Mission Statement -->
<footer>
    <h1>Our Mission and What We Do</h2>
        <p>Since 2022, our mission here at the Best Pets adoption agency is to provide a safe,
            loving home for animals who have been surrendered. As a no-kill animal shelter, we strive to give these
            lovely
            cats and dogs a second chance at life, while providing resources, education, and programs to teach safe care
            and eliminate the deaths of our furry companions.
        </p>
</footer>

</html>