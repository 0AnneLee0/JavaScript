<?php # Script - a9update.php

$page_title = 'Update the Pennants and World Series';
include ('includes/a9header.html');

//Start the main conditional:
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	// Connect to database:
	require ('a9mysqli_connect.php');
	// Create an array for storing errors:
	$errors = array( );

	// Validate Team ID:
	if (empty($_POST['id'])) {
		$errors[ ] = 'You forgot to enter the Team ID.';
	} else {
		$e = mysqli_real_escape_string($dbc, trim($_POST['id']));
	}

	// Validate Team:
	if (empty($_POST['team_name'])) {
		$errors[ ] = 'You forgot to enter the Team.';
	} else {
		$n = mysqli_real_escape_string($dbc, trim($_POST['team_name']));
	}

	// Validate number of Pennants:
	if (empty($_POST['pen']) && $num<0) {
		$errors[ ] = 'You forgot to enter the Pennants to be updated.';
	} else {
		$p = mysqli_real_escape_string($dbc, trim($_POST['pen']));
	}

	// Validate number of World Series won:
	if (empty($_POST['ws']) && $num<0) {
		$errors[ ] = 'You forgot to enter the World Series to be updated.';
	} else {
		$w = mysqli_real_escape_string($dbc, trim($_POST['ws']));
	}

	// If no validation errors:
	if (empty($errors)) {
		// Check and retrieve user ID:
		$q = "SELECT team_id FROM teamstats WHERE (team='$n' AND team_id='$e')";
		$r = @mysqli_query($dbc, $q);
		$num = @mysqli_num_rows($r);

		if ($num == 1) { // id is unique so one row would be selected.
			// one record is assigned as an array:
			$row = mysqli_fetch_array($r, MYSQLI_NUM);

			// Update the database for pennants and world series:
			$q = "UPDATE champs SET pennants=$p, worldseries=$w WHERE team_id=$row[0]";
			$r = @mysqli_query($dbc, $q);

			// Check the results of the query:
			if (mysqli_affected_rows($dbc) == 1) {
				echo '<h1>Thank You!</h1>
				<p>The Pennants and World Series have been updated!</p><p><br /></p>';
			} else {
				echo '<h1>System Error</h1>
				<p class="error">The Pennants and World Series could not be changed due to a system error. We apologize for any inconvenience. Provide a debugging message to the programmer displaying the query that went wrong.</p>';
				echo '<p>' . mysqli_error($dbc) . '<br /><br />Query: ' . $q . '</p>';
			}

			// Close database connection:
			mysqli_close($dbc);

			include ('includes/footer.html');
			exit( );

		} else { 
			echo '<h1>Error!</h1>
			<p class="error">The team id and team name combination does not match any on file. Please view the teams again to see the correct team id and team names to use.</p>';
		} // End if ($num == 1) conditional

		// Print validation error messages:
	} else {
		echo '<h1>Error!</h1>
		<p class="error">The following error(s) occurred:<br/>';
		foreach ($errors as $msg) { // Print each error.
			echo " - $msg<br />\n";
		}
		echo '</p><p>Please try again.</p><p><br /></p>';
	}

	// Close database connection:
	mysqli_close($dbc);
}
?>

<!-- HTML sticky form -->
<h1>Update the Pennants and World Series</h1>
<form action="a9update.php" method="post">
	
	<!-- Input fields -->
	<p>Team ID: <input type="text" name="id" value="<?php if (isset($_POST['id'])) echo $_POST['id']; ?>" /> </p>
	<p>Team Name: <input type="text" name="team_name" max="50" value="<?php if (isset($_POST['team_name'])) echo $_POST['team_name'];?>" /></p>
	<p>Pennants: <input type="text" name="pen" value="<?php if (isset($_POST['pen'])) echo $_POST['pen'];?>" /></p>
	<p>World Series: <input type="text" name="ws" value="<?php if (isset($_POST['ws'])) echo $_POST['ws']; ?>" /></p>

	<!-- Submit button -->
	<p><input type="submit" name="submit" value="Update" /></p>
</form>

<?php include ('includes/footer.html'); ?>