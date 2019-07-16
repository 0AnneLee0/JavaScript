<?php # Script - a9mysqli_connect.php

// Set the MySQL host, username, password, and database name as constants:
DEFINE ('DB_USER', '______'); //Database user name
DEFINE ('DB_PASSWORD', '_____'); //ENTER Database password
DEFINE ('DB_HOST', 'localhost:3306');
DEFINE ('DB_NAME', 'annel432_baseball_stats');

// Connect to MySQL:
$dbc = @mysqli_connect (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die ('Could not connect to MySQL: ' . mysqli_connect_error( ) );

// Set encoding:
mysqli_set_charset($dbc, 'utf8');