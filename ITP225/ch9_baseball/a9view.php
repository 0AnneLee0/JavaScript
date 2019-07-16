<?php # Script - a9view.php

$page_title = 'View the Champs';
include ('includes/a9header.html');

echo '<h1>MLB Champs</h1>';

// Connect to database:
require ('a9mysqli_connect.php');

// Assign database query to variable:
$q = "SELECT t.team AS team_name, c.team_id AS id, c.pennants AS pen, c.worldseries AS ws FROM teamstats t, champs c WHERE t.team_id=c.team_id ORDER BY t.team_id ASC";
// Send SQL command to database:
$r = @mysqli_query ($dbc, $q);

// Assign number of rows returned by query to variable:
$num = mysqli_num_rows ($r);

// Create HTML table to display results:
//if ($r) {
if ($num > 0) {
	echo "<p>There are currently $num MLB teams.</p>\n";
	echo '<table align="center" cellspacing="3" cellpadding="3" width="75%">
	<tr>
		<td align="left"><b>Team</b></td>
		<td align="right"><b>Team ID</b></td>
		<td align="right"><b>Pennants</b></td>
		<td align="right"><b>World Series</b></td>
	</tr>';

	// Fetch and print each returned record:
	while ($row = mysqli_fetch_array($r, MYSQLI_ASSOC)) {
	  echo '<tr><td align="left">' . $row['team_name'] . '</td><td align="right">' . $row['id'] . '</td><td align="right">' . $row['pen'] . '</td><td align="right">' . $row['ws'] . '</td></tr>';
	}

	// Close HTML and free query resources:
	echo '</table>';
	mysqli_free_result ($r);

} else {
	echo '<p class="error">There are currently no baseball teams in the database.</p>';
} // End of if ($r) IF.

mysqli_close($dbc);
include ('includes/footer.html');
?>
