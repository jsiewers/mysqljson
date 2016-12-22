<?php
$con = mysqli_connect("localhost","root","","webshop");
if (mysqli_connect_errno()) {
   echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$output = "[";
mysqli_query($con, "SET NAMES utf8;");
$sth = mysqli_query($con, "SELECT * FROM produkt, categorie WHERE categorie.idcategorie = produkt.categorie");
while($row = mysqli_fetch_array($sth, MYSQLI_ASSOC)) {
    if($output != "[") { $output .= ", "; }
    $output .= json_encode($row, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
    //print_r($row);
 }
 $output .= "]";

print $output;
