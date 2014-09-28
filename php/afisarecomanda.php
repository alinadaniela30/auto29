  <?php

	$respObj = array();
	$respObj["status"] = "OK";
	$respObj["statusMsg"] = "";
	$dataObj  = json_decode($_POST['dataObj'], true);
	
		// creare conexiune la mysqli server + db
		$connex=mysqli_connect("localhost","root","MocanA78","comenzi");
		
		// verifica conexiune
		if(mysqli_connect_errno()) {
			$respObj["status"] = "ERROR";
			$respObj["statusMsg"] = "Error conectiong to server".mysqli_connect_error();
			exit("");
		}
		$sqlquery="SELECT Nume, Prenume, Strada, Numar, Apt, Oras, Judet, Telefon, Email, Model, Cantitate, Conditii FROM formular ";
		
		$result=mysqli_query($connex,$sqlquery);
		$row=mysqli_fetch_array($result,MYSQLI_NUM);
		
//error_log($row[0]);
		
		if ($row) {
			$respObj["Nume"] = $row[0];
			$respObj["Prenume"] = $row[1];
			$respObj["Strada"] = $row[2];
			$respObj["Numar"] = $row[3];
			$respObj["Apt"] = $row[4];
			$respObj["Oras"] = $row[5];
			$respObj["Judet"] = $row[6];
			$respObj["Telefon"] = $row[7];
			$respObj["Email"] = $row[8];
			$respObj["Model"] = $row[9];
			$respObj["Cantitate"] = $row[10];
			$respObj["Conditii"] = $row[11];
			
			
			
		
		} else {
			$respObj["status"] = "ERROR";
			$respObj["statusMsg"] = "Owner info not found !";
		}
	echo json_encode($respObj);
?>
