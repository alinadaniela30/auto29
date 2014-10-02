var lAfiseaza = true;
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
		dataObj.Numar=$("#Numar").val() ;
		dataObj.Apt=$("#Apt").val(); 
		dataObj.Oras=$("#Oras").val();
		dataObj.Judet=$("#Judet").val();
		dataObj.Telefon=$("#Telefon").val() ;
		dataObj.Email=$("#Email").val();
		dataObj.Model=$("#Model").val();
		dataObj.Cantitate=$("#Cantitate").val() ;
		dataObj.Conditii=$("#Conditii").val();

		if(ValidareForm(dataObj)) {	
			$.ajax({
				type: "POST",
				url: "http://lambert.go.ro/auto29/php/trimitecomanda.php",
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
	}
		
			 

	function afiseaza() {
		
		if (lAfiseaza) {
			var comenziHtml="", comenzi, comenziData;						
			var dataObj={};
			
            $.ajax({
                type: "POST",
                url: "http://lambert.go.ro/auto29/php/afisarecomanda.php",
                data: {},
                dataType: 'json',
				success: function(respObj) {
					if(respObj.status == "OK"){
						// display info in form
							
						sessionStorage.setItem("comenzi",JSON.stringify(respObj));

						if (typeof sessionStorage.comenzi != "undefined") {
							comenzi = JSON.parse(sessionStorage.comenzi); 
							comenziData = comenzi.data;
							var comenziHtml="<table>"
							for (var i=0; i < comenziData.length;i++) {
							
								comenziHtml +=	"<tr><td>"+comenziData[i].Nume+"</td><td> "+comenziData[i].Prenume+"</td><td> "+comenziData[i].Strada+"</td><td> "+comenziData[i].Numar+"</td><td> "+comenziData[i].Apt+"</td><td> "+comenziData[i].Oras+"</td><td> "+comenziData[i].Judet+"</td><td> "+comenziData[i].Telefon+"</td><td> "+comenziData[i].Email+"</td><td> "+comenziData[i].Model+"</td><td> "+comenziData[i].Cantitate+"</td><td> "+comenziData[i].Conditii+"</td></tr>";
							}
							comenziHtml +="</table>"	
							document.getElementById("rezultate1").innerHTML=comenziHtml;
						}

//						location.href = "#rezultate1";
						
					} 
					else {
						alert(respObj.statusMsg);
					}
				},     
				error: function(errorObj,errorStatus,errorMsg){
					alert("Error connectiong to server: " + errorStatus + errorMsg);
					
				}
			});
			$("#btnAfiseaza").text("Ascunde comenzile efectuate");
			$("#rezultate1").show();
		}
		else {
			$("#btnAfiseaza").text("Afiseaza comenzile efectuate");
			$("#rezultate1").hide();
		}
		lAfiseaza = !lAfiseaza;
}			 

function ValidareForm(dataObj){
	var filtrare_dataObj = {};
	filtrare_dataObj.Nume= /^[A-Za-z]{1,15}$/;
	filtrare_dataObj.Prenume= /^[A-Za-z]{1,15}$/;
	filtrare_dataObj.Strada= /^[A-Za-z0-9]{1,15}$/;
	filtrare_dataObj.Numar= /^[0-9]{1,3}$/;
	filtrare_dataObj.Apt= /^[0-9]{1,3}$/;
	filtrare_dataObj.Oras= /^[A-Za-z]{1,15}$/;
	filtrare_dataObj.Judet= /^[A-Za-z0-9]{1,15}$/;
	filtrare_dataObj.Telefon= /^[0-9]{1,10}$/;
	filtrare_dataObj.Email= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	filtrare_dataObj.Model= /^[A-Za-z0-9]{3,20}$/;
	filtrare_dataObj.Cantitate= /^[0-9]{1,2}$/;
	filtrare_dataObj.Conditii= /^[A-Za-z0-9]{3,15}$/;
	var erori=[];
console.log(dataObj.Model)
	
	if(!filtrare_dataObj.Nume.test(dataObj.Nume))
		erori[erori.length]="Nume invalid";
	
	if(!filtrare_dataObj.Prenume.test(dataObj.Prenume))
			erori[erori.length]="Prenume invalid";
	
	if(!filtrare_dataObj.Strada.test(dataObj.Strada))
		erori[erori.length]="Strada invalid";
	
	if(!filtrare_dataObj.Numar.test(dataObj.Numar))
		erori[erori.length]="Numar strada invalid";
	
	if(!filtrare_dataObj.Apt.test(dataObj.Apt))
		erori[erori.length]="Apartament invalid";
	
	if(!filtrare_dataObj.Oras.test(dataObj.Oras))
		erori[erori.length]="Oras invalid";
	
	if(!filtrare_dataObj.Judet.test(dataObj.Judet))
		erori[erori.length]="Judet invalid";
	
	if(!filtrare_dataObj.Telefon.test(dataObj.Telefon))
		erori[erori.length]="Telefon invalid";
	
	if(!filtrare_dataObj.Email.test(dataObj.Email))
		erori[erori.length]="Email invalid";

	if(!filtrare_dataObj.Model.test(dataObj.Model))
		erori[erori.length]="Model invalid";
	
	if(!filtrare_dataObj.Cantitate.test(dataObj.Cantitate))
		erori[erori.length]="Cantitate invalid";
	
	if(!filtrare_dataObj.Conditii.test(dataObj.Conditii))
		erori[erori.length]="Conditii invalid";

	
	if(erori.length>0)
	{
		raportErori(erori);
		return false;
	}
	return true;

}
function raportErori(erori)
{
	var atentiune="Ceva este gresit....";
	for(i=0;i<erori.length;i++)
	{
		var numarErori=i+1;
		atentiune +="\n"+numarErori+"."+erori[i];
	}
	alert(atentiune);
}
