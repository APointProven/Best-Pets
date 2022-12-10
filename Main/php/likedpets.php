<?php

$mysqli = require __DIR__ . "/database.php";
//Liking Pets
if (isset($_POST["save"])) {
  // Checks if $_POST['name'] exists, if true, then we're updating the user's info
  $userid = $mysqli->real_escape_string($_POST['userid']);
  $petid = $mysqli->real_escape_string($_POST['petid']);

  $sql = sprintf("INSERT INTO saved (userid, petid)
    VALUES (
        '$userid',
        '$petid'
      );");

  $result = $mysqli->query($sql);
  echo ($petid);
}
//Unliking Pets
elseif (isset($_POST['un'])) {
  // Checks if $_POST['name'] exists, if true, then we're updating the user's info
  $userid = $mysqli->real_escape_string($_POST['userid']);
  $petid = $mysqli->real_escape_string($_POST['petid']);

  $sql = $sql = sprintf("DELETE FROM saved WHERE userid = '$userid' AND petid = '$petid'");
  $result = $mysqli->query($sql);

  echo ("unsaved");
}
$mysqli->close();
