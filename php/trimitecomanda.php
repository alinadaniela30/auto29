<?php

	$respObj = array();
	$respObj["status"] = "OK";
	$respObj["statusMsg"] = "";

	$dataObj  = json_decode($_POST['dataObj'], true);
	
//	error_log('$_POST_dataObj:'.$_POST['dataObj']);
//	error_log('$dataObj:'.$dataObj["Username"]);
	
	// creare conexiune la mysqli server + db
	$connex=mysqli_connect("localhost","root","MocanA78","comenzi");
	
	// verifica conexiune
	if(mysqli_connect_errno()) {
		$respObj["status"] = "ERROR";
		$respObj["statusMsg"] = "Error conectiong to server".mysqli_connect_error();
		exit("");
	}

	$sqlquery="INSERT INTO formular (Nume, Prenume, Strada, Numar, Apt, Oras, Judet, Telefon, Email, Model, Cantitate, Conditii ) VALUES ('".$dataObj["Nume"]."','".$dataObj["Prenume"]."','".$dataObj["Strada"]."',".(string)$dataObj["Numar"].",".(string)$dataObj["Apt"].",'".$dataObj["Oras"]."','".$dataObj["Judet"]."',".(string)$dataObj["Telefon"].",'".$dataObj["Email"]."','".$dataObj["Model"]."',".(string)$dataObj["Cantitate"].",'".$dataObj["Conditii"]."') ; ";
	$result = mysqli_query($connex,$sqlquery);
	if ($result)
	{

	
			$respObj["statusMsg"] = "Comanda inregistrata cu succes";}
			
		 else {
			$respObj["status"] = "ERROR";
			$respObj["statusMsg"] = "Eroare la trimitere comanda!";
				}		
		

				
	echo json_encode($respObj);









	
		

		
?>
