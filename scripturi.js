
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
			dataObj.Numar=$("#Numar").val() == "" ? 0 : parseInt($("#Numar").val());
			dataObj.Apt=$("#Apt").val() == "" ? 0 : parseInt($("#Apt").val()); 
			dataObj.Oras=$("#Oras").val();
			dataObj.Judet=$("#Judet").val();
			dataObj.Telefon=$("#Telefon").val() == "" ? 0 : parseInt($("#Telefon").val());
			dataObj.Email=$("#Email").val();
			dataObj.Model=$("#Model").val();
			dataObj.Cantitate=$("#Cantitate").val() == "" ? 0 : parseInt($("#Cantitate").val());
			dataObj.Conditii=$("#Conditii").val();
		
		
	
		
	
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
		
			 

	function afiseaza() {
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
							console.log("ready:"+JSON.stringify(comenzi.data));
							comenziData = comenzi.data;
							var comenziHtml="<table>"
							for (var i=0; i < comenziData.length;i++) {
							
								comenziHtml +=	"<tr><td>"+comenziData[i].Nume+"</td><td> "+comenziData[i].Prenume+"</td><td> "+comenziData[i].Strada+"</td><td> "+comenziData[i].Numar+"</td><td> "+comenziData[i].Apt+"</td><td> "+comenziData[i].Oras+"</td><td> "+comenziData[i].Judet+"</td><td> "+comenziData[i].Telefon+"</td><td> "+comenziData[i].Email+"</td><td> "+comenziData[i].Model+"</td><td> "+comenziData[i].Cantitate+"</td><td> "+comenziData[i].Conditii+"</td></tr>";
							}
							comenziHtml +="</table>"	
							document.getElementById("rezultate1").innerHTML=comenziHtml;
						}

						location.href = "#rezultate1";
						
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

