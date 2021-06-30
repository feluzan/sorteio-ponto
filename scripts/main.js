function gereEImprimaResultado() {
	
	// var edital = $("#edital").val();
	// var perfil = $("#perfil").val();
 //    var nomeCandidato = $("#nomeCandidato").val();
 //    var nomeServidor = $("#nomeServidor").val();

    var quantidadePontos = pontos.length;
    var semente;
    
	if($("#sementeManual").is(":checked")) {
		semente = parseInt($("#semente"));
	} else {
		semente = new Date().getTime();
	}
	var embaralhada = gereListaEmbaralhada(quantidadePontos, semente);
	var dados = {
		"edital": $("#edital").val(),
		"perfil": $("#perfil").val(),
	    "nomeCandidato": $("#nomeCandidato").val(),
	    "nomeServidor": $("#nomeServidor").val(),
	}
	imprimaResultado(dados, semente, embaralhada, );
}

function gereListaEmbaralhada(inscritos, semente){
	Math.seedrandom(semente);
	var consumida = new Array(inscritos);
	var resultado = new Array(inscritos);
	for(var i = 0; i < inscritos; i++) {
		consumida[i] = 1+i;
		resultado[i] = 0;
	}

	for(var i = 0; i < inscritos; i++) {
		var aleatorio = Math.floor(Math.random()*inscritos);
		while(consumida[aleatorio] == 0) {
			aleatorio = (1+aleatorio)%inscritos;
		}
		resultado[i] = consumida[aleatorio];
		consumida[aleatorio] = 0;
	}
	
	return resultado;
}

function imprimaResultado(dados, semente, embaralhada) {
    // var conteudo = "";
    
    /**
     * Oculta a section etapa1
     * e exibe a section resultado
     */
    $("#etapa1").hide();
    $("#resultado").show();
    $("#options").show();
    //Inclui nome do candidato e do responsável pelo sorteio

    $("#resultado-Edital").text(dados["edital"]);
    $("#resultado-Perfil").text(dados["perfil"])
    $("#resultado-Candidato").text(dados["nomeCandidato"]);
    $("#resultado-Servidor").text(dados["nomeServidor"]);

    
    //Inclui data e hora do sorteio
    var now = new Date($.now());
    // now.format("dd/mm/yyy | hh:mm tt")
    // $("#resultado-Datahora").text(now);
    $("#resultado-Datahora").text(now.getDay() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + "   |   " + now.getHours() + ":" + now.getMinutes());

    //Inclui a lista de temas
    $("#temasDisponiveis li").remove();
    pontos.forEach(element => {
        $("#temasDisponiveis").append("<li>" + element + "</li>");
    });

    //Inclui tema selecionado
    $("#resultado-TemaSorteado").text(embaralhada[0] + ". " + pontos[embaralhada[0]-1]);


    //Inclui Informações técnicas
    $("#informacoesTecnicas div").remove();
    $("#informacoesTecnicas").append(gereVisualDeInformacoesTecnicas(semente));
}

function gereVisualDeInformacoesTecnicas(semente) {
	var conteudo = "";
	// conteudo += "<b>platform:</b> " + navigator.platform + "<br/>";
	// conteudo += "<b>appName:</b> " + navigator.appName + "<br/>";
	// conteudo += "<b>appVersion:</b> " + navigator.appVersion + "<br/>";
	// conteudo += "<b>userAgent:</b> " + navigator.userAgent + "<br/>";
	conteudo += "<div><b>Versão do sistema:</b> 30/06/2021</div>"
    conteudo += "<div><b>Semente utilizada:</b> \"" + semente + "\"</div>";
    
	return conteudo;
}


var pontos=[];
function addPonto(){
    $("#pontos").append("<li>" + $("#pontoInput").val() + "</li>");
    pontos.push($("#pontoInput").val());
    $("#pontoInput").val('');  
}

function clearAllPontos(){
    $("#pontos").empty();
    pontos = [];
}

function onClickSementeManual(){
    console.log($("#sementeManual").is(":checked"));
    if($("#sementeManual").is(":checked")){
        $("#semente").prop( "disabled", false );
    }else{
        $("#semente").prop( "disabled", true );
    }
}

function generatePDF(){
	var doc = new jsPDF();
	var elementHTML = $('#resultado').html();
	var specialElementHandlers = {
	    '#elementH': function (element, renderer) {
	        return true;
	    }
	};
	// console.log(specialElementHandlers);
	// console.log(elementHTML);
	doc.fromHTML(elementHTML, 15, 15, {
	    'width': 170,
	    'elementHandlers': specialElementHandlers
	});

	//generate file name
	// var fileName = "";
	var fileName = "Ata de Sorteio - ";
	fileName = fileName + $("#edital").val() + " - ";
	fileName = fileName + $("#nomeCandidato").val().split(" ")[0];
	// console.log(fileName);

	// Save the PDF
	doc.save(fileName + '.pdf');
}

function doAgain(){
	if(confirm("Realizar o sorteio novamente? Isso fará com que um novo resultado aletório seja apresentado.")){
		gereEImprimaResultado();
		return;
	}else{

		return false;
	}
}

function validateFields(){
	
}