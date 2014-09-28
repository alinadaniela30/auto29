
	$(document).ready(function(){
		$(".c").hide();
		$(".harta").click(function(){
			$(".c").toggle();
		});
		
	})

	function trimiteinfo() {
			var dataObj={};
			dataObj.Nume=$("#Nume").val();
			dataObj.Prenume=$("#Prenume").val();
			dataObj.Strada=$("#Strada").val();
			dataObj.Numar=$("#Numar").val();
			dataObj.Apt=$("#Apt").val();
			dataObj.Oras=$("#Oras").val();
			dataObj.Judet=$("#Judet").val();
			dataObj.Telefon=$("#Telefon").val();
			dataObj.Email=$("#Email").val();
			dataObj.Model=$("#Model").val();
			dataObj.Cantitate=$("#Cantitate").val();
			dataObj.Conditii=$("#Conditii").val();
		
		
	
		
	
		$.ajax({
			type: "POST",
			url: "http://lambert.go.ro/auto/php/trimitecomanda.php",
			data: {dataObj: JSON.stringify(dataObj)},
			dataType: 'json',
			success: function(respObj) {
				alert(respObj.statusMsg);
			},     
			error: function(errorObj,errorStatus,errorMsg){
				alert("Error connectiong to server: " + errorStatus + errorMsg);
				
			}
		});	
			
	}
		
			 

	function afiseaza() {
			
			var dataObj={};
			dataObj.Nume=$("#Nume").val();
			dataObj.Prenume=$("#Prenume").val();
			dataObj.Strada=$("#Strada").val();
			dataObj.Numar=$("#Numar").val();
			dataObj.Apt=$("#Apt").val();
			dataObj.Oras=$("#Oras").val();
			dataObj.Judet=$("#Judet").val();
			dataObj.Telefon=$("#Telefon").val();
			dataObj.Email=$("#Email").val();
			dataObj.Model=$("#Model").val();
			dataObj.Cantitate=$("#Cantitate").val();
			dataObj.Conditii=$("#Conditii").val();
			
			
			
            $.ajax({
                type: "POST",
                url: "http://lambert.go.ro/auto/php/afisarecomanda.php",
                data: {dataObj: JSON.stringify(dataObj)},
                dataType: 'json',
				success: function(respObj) {
					if(respObj.status == "OK"){
						// display info in form
						var ownerInfo = {};
						ownerInfo.Nume = respObj.Nume;
						ownerInfo.Prenume = respObj.Prenume;
						ownerInfo.Strada = respObj.Strada;
						ownerInfo.Numar = respObj.Numar;
						ownerInfo.Apt = respObj.Apt;
						ownerInfo.Oras = respObj.Oras;
						ownerInfo.Judet = respObj.Judet;
						ownerInfo.Telefon = respObj.Telefon;
						ownerInfo.Email = respObj.Email;
						ownerInfo.Model = respObj.Model;
						ownerInfo.Cantitate = respObj.Cantitate;
						ownerInfo.Conditii = respObj.Conditii;
						
							
						sessionStorage.setItem("OwnerInfo",JSON.stringify(ownerInfo));
										
						location.href = "index.html";
						
					} 
					else {
						alert(respObj.statusMsg);
					}
				},     
				error: function(errorObj,errorStatus,errorMsg){
					alert("Error connectiong to server: " + errorStatus + errorMsg);
					
				}
			});	

		}			 

		
	$(document).ready(function() {
			
			var OwnerInfo = JSON.parse(sessionStorage.OwnerInfo); 
		document.getElementById("rezultate1").innerHTML=OwnerInfo.Nume+" "+OwnerInfo.Prenume+" "+OwnerInfo.Strada+" "+OwnerInfo.Numar+" "+OwnerInfo.Apt+" "+OwnerInfo.Oras+" "+OwnerInfo.Judet+" "+OwnerInfo.Telefon+" "+OwnerInfo.Email+" "+OwnerInfo.Model+" "+OwnerInfo.Cantitate+" "+OwnerInfo.Conditii;
	
		
	});
	
