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
			var comenziHtml="", comenziData;						
			//var dataObj={};
			
            $.ajax({
                type: "GET",
                url: "http://lambert.go.ro/auto29/php/afisarecomanda.php",
                //data: {},
                dataType: 'json',
				success: function(respObj) {
					if(respObj.status == "OK"){
						// display info in form
							
						comenziData = respObj.data;
						var comenziHtml="<table>"
						for (var i=0; i < comenziData.length;i++) {
							comenziHtml +=	"<tr><td>"+comenziData[i].Nume+"</td><td> "+comenziData[i].Prenume+"</td><td> "+comenziData[i].Strada+"</td><td> "+comenziData[i].Numar+"</td><td> "+comenziData[i].Apt+"</td><td> "+comenziData[i].Oras+"</td><td> "+comenziData[i].Judet+"</td><td> "+comenziData[i].Telefon+"</td><td> "+comenziData[i].Email+"</td><td> "+comenziData[i].Model+"</td><td> "+comenziData[i].Cantitate+"</td><td> "+comenziData[i].Conditii+"</td></tr>";
						}
						comenziHtml +="</table>"	
						document.getElementById("rezultate1").innerHTML=comenziHtml;

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
		erori[erori.length]="Nume invalid, doar litere max 15";
	
	if(!filtrare_dataObj.Prenume.test(dataObj.Prenume))
			erori[erori.length]="Prenume invalid, doar litere, max 15";
	
	if(!filtrare_dataObj.Strada.test(dataObj.Strada))
		erori[erori.length]="Strada invalid";
	
	if(!filtrare_dataObj.Numar.test(dataObj.Numar))
		erori[erori.length]="Numar strada invalid";
	
	if(!filtrare_dataObj.Apt.test(dataObj.Apt))
		erori[erori.length]="Apartament invalid";
	
	if(!filtrare_dataObj.Oras.test(dataObj.Oras))
		erori[erori.length]="Oras invalid, doar litere max 15";
	
	if(!filtrare_dataObj.Judet.test(dataObj.Judet))
		erori[erori.length]="Judet invalid, doar litere max 15";
	
	if(!filtrare_dataObj.Telefon.test(dataObj.Telefon))
		erori[erori.length]="Telefon invalid, maxim 10 cifre";
	
	if(!filtrare_dataObj.Email.test(dataObj.Email))
		erori[erori.length]="Email invalid";

	if(!filtrare_dataObj.Model.test(dataObj.Model))
		erori[erori.length]="Model invalid, selectati un model auto";
	
	if(!filtrare_dataObj.Cantitate.test(dataObj.Cantitate))
		erori[erori.length]="Cantitate invalida, maxim 2 cifre";
	
	if(!filtrare_dataObj.Conditii.test(dataObj.Conditii))
		erori[erori.length]="Conditii invalid, maxim 15 caractere";

	
	if(erori.length>0)
	{
		raportErori(erori);
		return false;
	}
	return true;

}
function raportErori(erori)
{
	var alerta="Date incorect completate";
	for(i=0;i<erori.length;i++)
	{
		var numarErori=i+1;
		alerta +="\n"+numarErori+"."+erori[i];
	}
	alert(alerta);
}



$(document).ready(function() {
	$("#calcul_consum").click(function() { 


capacity = {"data":[{"capacitate":"1,4","valoare":2},{"capacitate":"1,6","valoare":3},{"capacitate":"1,9","valoare":5}]};
fuel = {"data":[{"combustibil":"diesel","valoare":10},{"combustibil":"benzina","valoare":20},{"combustibil":"gpl","valoare":30}]};
category = {"data":[{"categoria":"urban","valoare":5},{"categoria":"extraurban","valoare":3},{"categoria":"mediu","valoare":10}]};

var selCapacity = "", selFuel = "",  selCategory = "";
var coefCapacity = 0 , coefFuel = 0 , coefCategory = 0 ;

if ($("#capacitate14").is(":checked")) 
	selCapacity = $("#capacitate14").val();
if ($("#capacitate16").is(":checked")) 
	selCapacity = $("#capacitate16").val();
if ($("#capacitate19").is(":checked")) 
	selCapacity = $("#capacitate19").val();
	
for (var i=0; i < capacity.data.length; i++) {
	var element = capacity.data[i];
	if (element.capacitate == selCapacity)
		coefCapacity = element.valoare;
}	

if ($("#diesel").is(":checked")) 
	selFuel = $("#diesel").val();
if ($("#benzina").is(":checked")) 
	selFuel = $("#benzina").val();
if ($("#gpl").is(":checked")) 
	selFuel = $("#gpl").val();
	
for (var i=0; i < fuel.data.length; i++) {
	var element = fuel.data[i];
	if (element.combustibil == selFuel)
		coefFuel = element.valoare;
}	


if ($("#drum_urban").is(":checked")) 
	selCategory = $("#drum_urban").val();
if ($("#drum_extra").is(":checked")) 
	selCategory = $("#drum_extra").val();
if ($("#drum_mediu").is(":checked")) 
	selCategory = $("#drum_mediu").val();

for (var i=0; i < category.data.length; i++) {
	var element = category.data[i];
	if (element.categoria == selCategory)
		coefCategory = element.valoare;
}	

	rezultat = 0.5 * coefCapacity + 0.4 * coefFuel + 0.1 * coefCategory;
	

	$("#consum_auto").val(rezultat);
	
	});

});
