function gereEImprimaResultado() {
    var nomeCandidato = $("#nomeCandidato").val();
    var nomeServidor = $("#nomeServidor").val();

    var quantidadePontos = pontos.length;
    var semente;
    
	if($("#sementeManual").is(":checked")) {
		semente = parseInt($("#semente"));
	} else {
		semente = new Date().getTime();
	}
	var embaralhada = gereListaEmbaralhada(quantidadePontos, semente);
	imprimaResultado(nomeCandidato, nomeServidor, semente, embaralhada, );
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

function imprimaResultado(nomeCandidato, nomeServidor, semente, embaralhada) {
    // var conteudo = "";
    
    /**
     * Oculta a section etapa1
     * e exibe a section resultado
     */
    $("#etapa1").hide();
    $("#resultado").show();

    //Inclui nome do candidato e do responsável pelo sorteio
    $("#resultado-Candidato").text(nomeCandidato);
    $("#resultado-Servidor").text(nomeServidor);

    
    //Inclui data e hora do sorteio
    var now = new Date($.now());
    $("#resultado-Datahora").text(now.getDay() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + "   |   " + now.getHours() + ":" + now.getMinutes());

    //Inclui a lista de temas
    pontos.forEach(element => {
        $("#temasDisponiveis").append("<li>" + element + "</li>");
    });

    //Inclui tema selecionado
    $("#resultado-TemaSorteado").text(embaralhada[0] + ". " + pontos[embaralhada[0]-1]);


    //Inclui Informações técnicas
    $("#informacoesTecnicas").append(gereVisualDeInformacoesTecnicas(semente));
}

function gereVisualDeInformacoesTecnicas(semente) {
	var conteudo = "";
	// conteudo += "<b>platform:</b> " + navigator.platform + "<br/>";
	// conteudo += "<b>appName:</b> " + navigator.appName + "<br/>";
	// conteudo += "<b>appVersion:</b> " + navigator.appVersion + "<br/>";
	// conteudo += "<b>userAgent:</b> " + navigator.userAgent + "<br/>";
	conteudo += "<b>Versão deste sistema:</b> 04/02/2021<br/>"
    conteudo += "<b>Semente utilizada:</b> \"" + semente + "\"<br/>";
    
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

