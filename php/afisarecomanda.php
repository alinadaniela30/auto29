  <?php

	$respObj["status"] = "OK";
	$respObj["statusMsg"] = "";
	
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
		
		if ($result) {
			$respObjRows = array();
			$i=0;
			while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)) {
				$i = $i + 1;
				$respObjRow = array();
				$respObjRow["Nume"] = $row["Nume"];
				$respObjRow["Prenume"] = $row["Prenume"];
				$respObjRow["Strada"] = $row["Strada"];
				$respObjRow["Numar"] = $row["Numar"];
				$respObjRow["Apt"] = $row["Apt"];
				$respObjRow["Oras"] = $row["Oras"];
				$respObjRow["Judet"] = $row["Judet"];
				$respObjRow["Telefon"] = $row["Telefon"];
				$respObjRow["Email"] = $row["Email"];
				$respObjRow["Model"] = $row["Model"];
				$respObjRow["Cantitate"] = $row["Cantitate"];
				$respObjRow["Conditii"] = $row["Conditii"];
				
				array_push($respObjRows,$respObjRow);
				
			}
			$respObj["data"]=$respObjRows;
	
		}		
		
		else {
			$respObj["status"] = "ERROR";
			$respObj["statusMsg"] = "Owner info not found !";
		}
	echo json_encode($respObj);
?>
