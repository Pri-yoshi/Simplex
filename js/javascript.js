var help = document.getElementById('help');
	var btnHelp = document.getElementById('btnHelp');
	var btnClose = document.getElementsByClassName("close")[0];
	btnHelp.onclick = function(){
		help.style.display = "block";
	}
	btnClose.onclick = function(){
		help.style.display = "none";
	}
	window.onclick = function(event){
		if(event.target == help){
			help.style.display = "none";
		}
	}

function criar(){ 	

	var tabelaInicio = document.createElement('div');
	tabelaInicio.id='tabelaInicio';
	tabelaInicio.className='container';

	var section = document.createElement('section');
	section.id = 'main';
	
	section.appendChild(tabelaInicio);	
	document.body.appendChild(section);
	document.getElementById('inicio').style.display= 'none';
	gerarTabela();
}

function gerarTabela(){
	var instrucao = document.getElementById('instrucoesText').innerHTML = "Usando apenas números inteiros ou decimais com ponto:<br><br>1-Informe os valores das restrições e da função objetivo.<br><br>2-Selecione a opção mostrar solução passo a passo para ver todas as tabelas geradas até a solução ótima.<br><br>3-Selecione \"Maximizar\" ou \"Minimizar\".<br><br>4-Botão \"Voltar\", volta para a tela inicial.";

	try{
		var qtd_var = document.getElementById("qtd_variaveis").value;    // Pega total de variaveis		  
		var qtd_rest = document.getElementById("qtd_restricoes").value;  // Pega total de restrições
		var tabela = document.getElementById("tabelaInicio");
		var limite = document.getElementById("limite").value;
		
		if (qtd_var == "") throw "Informe uma quantidade de variáveis"                  // Verifica se valor 
		if(qtd_var < 1) throw "Quantidade de variáveis deve ser valor positivo maior que 0."	        // de variaveis
		if(isNaN(qtd_var)) throw "Insira apenas números para quantidade de variáveis"   // e restrições
		if (qtd_rest == "") throw "Informe uma quantidade de restrições"                // são números
		if(qtd_rest < 1) throw "Quantidade de restrições deve ser valor positivo maior que 0."       // e são 
		if(isNaN(qtd_rest)) throw "Insira apenas números para quantidade de restrições" // positivos
		if(limite == "") throw "Informe o limite de iterações"	
		if(isNaN(limite)) throw "Informe um limite positivo"

		for(var i = 0; i< parseInt(qtd_rest); i++){       // Vai gerar as linhas (Quantidade de restrições)

			var texto = 'Restrição '+(parseInt(i)+1)+':';  
			var h3 = document.createElement('h3');          // Cria um elemento HTML <h3>
			var t = document.createTextNode(texto);         // Cria uma label: "Restrições"
			h3.appendChild(t);                              // Insere a label dentro do <h3>
			tabela.appendChild(h3);                  // Insere o elemento dentro de <body>

			var h4 = document.createElement('h4');          // Cria um elemento HTML <h4>

			for(var j = 0; j< parseInt(qtd_var); j++){    // Vai gerar as colunas (Quantidade de variáveis)

				var novoInput = document.createElement('input');   // Cria um elemento HTML <input>
				novoInput.id = "v"+i+j;   
				novoInput.type = "number";                        // Define o ID do elemento input
				novoInput.addEventListener("keydown", function(e) { if([69].includes(e.keyCode)) { e.preventDefault();}});

				var texto = ' x'+(parseInt(j)+1)+'\u00A0\u00A0';              
				var t = document.createTextNode(texto);            // Cria uma label "X"
				h4.appendChild(novoInput);                         // Insere o elemento <input> dentro de <h4>
				h4.appendChild(t);                                // Insere a label dentro de <h4>
			}
			
			var sinal = document.createTextNode("\u00A0" + "  ≤  " + "\u00A0\u00A0\u00A0");  //\u00A0  espaco em branco
			h4.appendChild(sinal);

			var novoInput = document.createElement('input');       // Cria um elemento <input> 
			novoInput.id = "b"+i;
			novoInput.type = "number";
			novoInput.placeholder= 'Total restrição '+(parseInt(i)+1);
			novoInput.addEventListener("keydown", function(e) { if([69].includes(e.keyCode)) { e.preventDefault();}});
			h4.appendChild(novoInput);                          // Insere o <input> dentro de <h4>
			tabela.appendChild(h4);                             // Insre o <h4> dentro de <body>			
		}
		insereFuncaoZ();

	}catch(erro){
		alert("Erro: "+erro);
		document.getElementById('btnInserir').innerHTML='Inserir Valores';
		document.getElementById('btnInserir').setAttribute('onClick','criar()');
		remover();
	}
}

function insereFuncaoZ(){

	var qtd_var = document.getElementById("qtd_variaveis").value;    // Pega total de variaveis 
	var divTabela = document.getElementById('tabelaInicio');
	var pZ = document.createElement('h3');
	var t = document.createTextNode('Função Z = ');
	pZ.appendChild(t); 	

	var h4 = document.createElement('h4');

	for(var i = 0; i< parseInt(qtd_var); i++){
		var novoInput = document.createElement('input');   // Cria um elemento HTML <input>
		novoInput.id = "z"+i;  
		novoInput.type = "number";                         // Define o tipo do elemento input
		novoInput.addEventListener("keydown", function(e) { if([69].includes(e.keyCode)) { e.preventDefault();}});

		var texto = ' x'+(parseInt(i)+1)+'\u00A0\u00A0';              
		var t = document.createTextNode(texto);            // Cria uma label "X"
		h4.appendChild(novoInput); 
		h4.appendChild(t);                        // Insere o elemento <input> dentro de <h4>		                              
	}

	divTabela.appendChild(h4);

	var divFuncaoZ = document.createElement('div');
	divFuncaoZ.id = 'divFuncaoZ';
	pZ.className="floating-box";
	h4.className="floating-box";

	divFuncaoZ.appendChild(pZ);
	divFuncaoZ.appendChild(h4);
	divTabela.appendChild(divFuncaoZ);

	var divCheckbox = document.createElement('div');
	divCheckbox.id='divCheckbox';
	var checkbox = document.createElement('input');
	checkbox.id='checkbox';
	checkbox.type = 'checkbox';
	var label = document.createElement('label');
	label.htmlFor='checkbox';
	label.appendChild(document.createTextNode('Mostrar solução passo a passo.'));
	divCheckbox.appendChild(checkbox);
	divCheckbox.appendChild(label);
	divTabela.appendChild(divCheckbox);
	
	var btnMaximizar = document.createElement('button');
	btnMaximizar.innerHTML='Maximizar';
	btnMaximizar.id='btnMaximizar';
	btnMaximizar.onclick=function(){maximizar()};  
	divTabela.appendChild(btnMaximizar);

	var btnMinimizar = document.createElement('button');
	btnMinimizar.innerHTML='Minimizar';
	btnMinimizar.id='btnMinimizar';
	btnMinimizar.onclick=function(){minimizar()};
	divTabela.appendChild(btnMinimizar);

	var btnVoltar = document.createElement('button');
	btnVoltar.innerHTML='Voltar';
	btnVoltar.id='btnVoltar';
	btnVoltar.onclick=function(){remover()};
	divTabela.appendChild(btnVoltar);
}

function minimizar(){
	var min = 1;
	montaCabecalho(min);
}

function maximizar(){
	var min = 0; 
	montaCabecalho(min);	
}

function montaCabecalho(min){

	var divMaximizar = document.createElement('div');
	divMaximizar.id='divMaximizar';
	divMaximizar.className="container";
	var section = document.createElement('section');
	section.id='tabelaMain';
	section.appendChild(divMaximizar);
	document.body.appendChild(section);
	var qtd_var = document.getElementById("qtd_variaveis").value;    // Pega total de variaveis   
	var qtd_rest = document.getElementById("qtd_restricoes").value;  // Pega total de restrições
	var qt_var = parseInt(qtd_var);
	var qt_rest = parseInt(qtd_rest);
	document.getElementById('tabelaInicio').style.display = 'none';
	document.getElementById('inicio').style.display = 'none';

	var cont=0;
	var divMaximizar = document.getElementById('divMaximizar');
	var br = document.createElement('br');
	divMaximizar.appendChild(br);

	var table = document.createElement('table');
	table.id='tabRes'+cont;
	table.border='1px';
	table.className= 'tabela';
	
	var linha = document.createElement('tr');
	linha.id='cab'+cont;

	var coluna1 = document.createElement('th');	          // Cria uma coluna
	var t = document.createTextNode('Linha');            // Cria uma label
	coluna1.appendChild(t);                              // Insere o label na coluna
	coluna1.className='th1';
	linha.appendChild(coluna1);

	var coluna2 = document.createElement('th');          // Cria uma coluna
	var t2 = document.createTextNode('Base');            // Cria uma label
	coluna2.appendChild(t2);                              // Insere o label na coluna
	linha.appendChild(coluna2);

	for(var i = 0; i<qt_var; i++){                 // Insere as colunas das variáveis
		var coluna = document.createElement('th');
		var texto = 'X'+(parseInt(i)+1);              
		var t = document.createTextNode(texto);
		coluna.appendChild(t);
		coluna.id='cab'+i+cont;
		linha.appendChild(coluna);            
	}

	for(var i =0; i<qt_rest; i++){                 // Insere as colunas das Folgas
		var coluna = document.createElement('th');
		var texto = 'f'+(parseInt(i)+1);              
		var t = document.createTextNode(texto);
		coluna.appendChild(t);
		coluna.id='cab'+(i+qt_var)+cont;
		linha.appendChild(coluna);
	}

	var ultColuna = document.createElement('th');          // Cria uma coluna
	var t3 = document.createTextNode('b');            // Cria uma label
	ultColuna.appendChild(t3);                              // Insere o label na coluna
	linha.appendChild(ultColuna);
	table.appendChild(linha);
	divMaximizar.appendChild(table);

	montaTabela(qt_var,qt_rest,cont,min);
}

function montaTabela(qt_var,qt_rest,cont,min){ // Inicial

		var divMaximizar = document.getElementById('divMaximizar');
		var br = document.createElement('br');
		divMaximizar.appendChild(br);
		
		var divTabRes = document.createElement('div');
		divTabRes.id='divTabRes'+cont;
		divTabRes.className ='tabela-box';	
		var solBasica = document.createElement('p');		
		var solBasicaText = document.createTextNode('Solução Básica Inicial');
		solBasica.appendChild(solBasicaText);
		divTabRes.appendChild(solBasica);	

		var tabela = document.getElementById("tabRes"+cont);

	try{	
		for(var i = 0; i < qt_rest; i++){
			var linha = document.createElement("tr");
			linha.id = "linha"+i+cont;
			for(var j=0; j < (qt_var+qt_rest+3); j++){
				var cel;
				var coluna = document.createElement("td");
				coluna.id = "coluna"+i+j+cont;
				if(j==0){  // Coluna Linha				
					cel = i+1;				
				}
				else if (j==1){    // Coluna Base
					cel = "f"+(i+1);
				}
				else if( (j >= 2) && (j < (2+qt_var) ) ){  // Colunas de X
					cel = document.getElementById("v"+i+(j-2)).value;
					if(cel == "") throw "Valor vazio!"
	
					cel = parseFloat(cel);												
				}
				else if(j >= (qt_var+2) && j < (qt_var+qt_rest+2)){  // Colunas F
					if( i == (j-qt_var-2)){					
						cel = 1;				
					}
					else{
						cel = 0;
					}
				}else{
					cel = document.getElementById("b"+i).value;
					if(cel == "") throw "Valor vazio!"
					cel = parseFloat(cel);										
				}
				var celula = document.createTextNode(cel);
				coluna.appendChild(celula);
				linha.appendChild(coluna);
			}
			tabela.appendChild(linha);
		}

		var ultLinha = document.createElement("tr"); // Cria a ultima linha da tabela
		ultLinha.id="linhaZ"+cont;

		var coluna = document.createElement("td"); // Cria a coluna que vai receber o número da linha
		coluna.id = "colunaZ"+0+cont;                    // Cria o ID da coluna
		var cel = qt_rest+1;                       // verifica qual vai ser o numero da linha
		var t = document.createTextNode(cel);
		
		coluna.appendChild(t);				   // Insere o número da linha na coluna 
		ultLinha.appendChild(coluna);                 // Insere a coluna na linha

		var coluna2 = document.createElement("td"); // Cria a coluna que vai receber o número da linha
		coluna2.id = "colunaZ"+1+cont; 
		if(min==0){                   // Cria o ID da coluna
			var cel2 = document.createTextNode('Z');                       // Cria o texto da coluna
		}
		else if(min==1){
			var cel2 = document.createTextNode('-Z');
		}
		coluna2.appendChild(cel2);				    // Insere o texto na coluna 
		ultLinha.appendChild(coluna2);                 // Insere a coluna na linha

		for(var i=0; i<= qt_var+qt_rest; i++){ // Aqui vai até i<=qt_var+qt_rest pois aproveita e cria a: linha Z coluna B
			var cel;
			if(i < qt_var){			
				var val = document.getElementById("z"+i).value
				if(val == "") throw "Valor vazio!"
				if(min==0){
					cel = (parseFloat(val))*(-1);  // Pega o valor de X da Função Z e inverte o sinal
				}
				else if(min==1){
					cel = (parseFloat(val));
				}							
			}else{
				cel = 0;  // Na última linha as colunas de F ficam zeradas
			}
			
			var celula = document.createTextNode(cel); 
			var coluna = document.createElement("td");  // Cria coluna
			coluna.id = "colunaZ"+(i+2)+cont;                    // Cria o ID da coluna
			coluna.appendChild(celula);                    // Insere o valor da coluna
			ultLinha.appendChild(coluna);                  // Insere a coluna na linha
		}
		
		tabela.appendChild(ultLinha);	
		divTabRes.appendChild(tabela);
		divMaximizar.appendChild(divTabRes);

		var divBotao = document.createElement('div');
		divBotao.id='divBotao';
		divBotao.className='box';

	}catch(erro){
		alert("Erro: "+erro);
		remover1();		
	}
	
	montaSolucaoBasica(qt_var,qt_rest,cont,min);
}

function montaSolucaoBasica(qt_var,qt_rest,cont,min){
	var lista = [];
	var lista2 = [];
	var lista3 = [];	

	var otimo = true;
	var maiorAb = 0;
	var linhaZ = [];
	var coluna;
	
	for(var i=2; i<qt_var+qt_rest+2; i++){
		if((parseFloat(document.getElementById('colunaZ'+i+cont).innerHTML)) < 0 ){  // verifica se tem valor negativo na linha Z
			otimo = false;			
		}
		linhaZ.push(parseFloat(document.getElementById("colunaZ"+i+cont).innerHTML));  // guarda linha Z
		if(linhaZ[i-2] < 0 && Math.abs(linhaZ[i-2]) > Math.abs(maiorAb)){ 
			//alert(linhaZ[i-2]);
			maiorAb = linhaZ[i-2];  // guarda o maior negativo
			coluna = i;  // guarda coluna do maior negativo						
		}
	}

	if(otimo){ // Se não tiver elemento negativo na linha Z

		for(var i=0; i< qt_rest+qt_var; i++){
			lista.push(document.getElementById('cab'+i+cont).innerHTML); // guarda cabeçalho da tabela		
		}

		var solucao = document.createElement('section');
		solucao.id='solucao';
		var divSolucaoMain=document.createElement('div');
		divSolucaoMain.id='divSolucaoMain';		
		divSolucaoMain.className='container';
		var divSolucao = document.createElement('div');
		divSolucao.id = 'divSolucao';
		divSolucao.className = 'container';		
		var listaSolucao = document.createElement('ul');
		listaSolucao.id = "listaSolucao";
		listaSolucao.className = "lista";	
		var txtSolucao = document.createElement('p');
		var txtSolucao2 = document.createElement('p');
		txtSolucao.id = "txtSolucao";
		var texto = document.createTextNode('Solução Ótima');
		var texto2 = document.createTextNode('Variáveis básicas:');
		var divLista= document.createElement('div');
		divLista.id='divLista';
		txtSolucao.appendChild(texto);
		txtSolucao2.appendChild(texto2);
		divSolucaoMain.appendChild(txtSolucao);
		divLista.appendChild(txtSolucao2);
		divLista.appendChild(listaSolucao);
		divSolucao.appendChild(divLista);
		divSolucaoMain.appendChild(divSolucao);
		solucao.appendChild(divSolucaoMain);
		document.body.appendChild(solucao);
		
		for(var i = 0; i < qt_rest; i++){
			var li = document.createElement('li');
			li.id = 'varSolucao'+i;
			var texto = document.getElementById('coluna'+i+1+cont).innerHTML;  // coluna da Base
			lista2.push(texto);
			var texto2 = document.getElementById('coluna'+i+(qt_rest+qt_var+2)+cont).innerHTML;  // coluna de b
			var texto3 = texto+' = '+texto2;  // coluna Base = coluna b
			var celula = document.createTextNode(texto3);
			li.appendChild(celula);
			listaSolucao.appendChild(li);
		}	
		
		var teste = false;
		for(var i = 0; i < lista.length; i++){
			teste = false;
			for(var j = 0; j< lista2.length; j++){
				if(lista[i] == lista2[j]){
					teste = true;				
				}
			}
			if(!teste){
				lista3.push(lista[i]);  //lista dos que não estão na Base
			}
		}		

		var li = document.createElement('li');  // Pega o texto "Z" = valor da linha Z coluna b
		li.id='varSolucao'+(qt_rest)+cont;
		var texto = document.getElementById('colunaZ1'+cont).innerHTML;
		var texto2 = document.getElementById('colunaZ'+(qt_rest+qt_var+2)+cont).innerHTML;
		if(min==1){
			texto = 'Z';
			texto2 = parseFloat(texto2)*(-1);
		}
		var texto3 = texto+' = '+texto2;  // Z = b
		var celula = document.createTextNode(texto3);
		li.appendChild(celula);
		listaSolucao.appendChild(li);

		var divSolucao2 = document.createElement('div');
		divSolucao2.id = 'divSolucao2';
		divSolucao2.className = 'container';		
		var listaSolucao2 = document.createElement('ul');
		listaSolucao2.id = "listaSolucao2";
		listaSolucao2.className = "lista";	
		var txtSolucao2 = document.createElement('p');
		txtSolucao2.id = "txtSolucao2";
		var texto = document.createTextNode('Variáveis não básicas:');	
		var divLista2 = document.createElement('div');
		divLista2.id='divLista2';	
		txtSolucao2.appendChild(texto);
		divLista2.appendChild(txtSolucao2);
		divLista2.appendChild(listaSolucao2);
		divSolucao2.appendChild(divLista2);
		divSolucaoMain.appendChild(divSolucao2);

		for(var i = 0; i < lista3.length; i++){
			var texto = lista3[i] + ' = 0';  // iguala a 0 os que não estão na Base
			var li = document.createElement('li');
			li.id ='varSolucao'+(i+qt_rest+1)+cont;
			var celula = document.createTextNode(texto);
			li.appendChild(celula);
			listaSolucao2.appendChild(li);
		}

		var btnSolucao = document.createElement('button');
		btnSolucao.id = 'btnSolucao';			
		btnSolucao.innerHTML = 'Esconder Passos';
		divSolucaoMain.appendChild(btnSolucao);		

		var analise = document.createElement('section');
		analise.id='analise';

		var divAnalise = document.createElement('div');
		divAnalise.id='divAnalise';
		divAnalise.className='container';
	
		analise.appendChild(divAnalise);
		document.getElementById('body').appendChild(analise); 

		var verificaPasso = document.getElementById('checkbox').checked;
		if (!verificaPasso || cont < 2){
			btnSolucao.style.display = 'none';
		}		

		document.getElementById('divTabRes'+cont).style.display='block';		
		btnSolucao.onclick=function(){mostrarPasso(cont)};
		//btnAnalise.onclick=function(){analiseSensibilidade(qt_var,qt_rest,cont)};	

		analiseSensibilidade(qt_var,qt_rest,cont,min);									
	}
	else{		
		cont++;	
		var limite = parseInt(document.getElementById('limite').value);
		if(cont > limite){
			//alert('Limite de iterações atingido!');
			var instrucao = document.getElementById('instrucoesText').innerHTML = "Limite de iterações atingido e não foi encontrada solução ótima.<br><br>Clique no botão\"Resetar\" para voltar a tela inicial."
			var divMaximizar = document.getElementById('divMaximizar');
			var limIteracao = document.createElement('div');
			limIteracao.id='limIteracao';
			limIteracao.className='container';
			var info = document.createElement('p');
			var textInfo = document.createTextNode('Limite de iterações atingido!');
			info.appendChild(textInfo);
			limIteracao.appendChild(info);
			divMaximizar.appendChild(limIteracao);

			var btnResetar= document.createElement('button');
			btnResetar.id='btnResetar';
			btnResetar.innerHTML='Resetar';
			btnResetar.id='btnResetar';
			btnResetar.onclick=function(){remover1()};
			divMaximizar.appendChild(btnResetar);
		}		
		else{
			Iteracao(qt_var,qt_rest,cont,min);
		}		
	}
}

function analiseSensibilidade(qt_var,qt_rest,cont,min){
	var instrucao = document.getElementById('instrucoesText').innerHTML = "Encontrada solução ótima.<br><br>Clique no botão \"Resetar\" para voltar a tela inicial."

	document.getElementById('')
	var divTabAnalise = document.createElement('div');
	divTabAnalise.id='divTabAnalise';
	divTabAnalise.className='tabela-box';
	var tabAnalise = document.createElement('table');
	tabAnalise.id='tabAnalise';
	tabAnalise.className='tabela';
	tabAnalise.border = '1px';
	var titulo = document.createElement('p');
	var tituloNome = document.createTextNode('Análise de Sensibilidade');
	titulo.appendChild(tituloNome);
	divTabAnalise.appendChild(titulo);
	divTabAnalise.appendChild(tabAnalise);
	document.getElementById('divAnalise').appendChild(divTabAnalise);

	var linhaTabAnalise = document.createElement('tr');
	var colVF = document.createElement('th');
	colVF.id='tabAnalise0';
	var colVFName = document.createTextNode(' ');
	colVF.appendChild(colVFName);

	var colSombra = document.createElement('th');
	colSombra.id='tabAnalise1';
	var colSombraName = document.createTextNode('Preço Sombra');
	colSombra.appendChild(colSombraName);

	var colCusto = document.createElement('th');
	colCusto.id='tabAnalise2';
	var colCustoName = document.createTextNode('Custo Reduzido');
	colCusto.appendChild(colCustoName);

	var colMin = document.createElement('th');
	colMin.id='tabAnalise3';
	var colMinName =document.createTextNode('Min');
	colMin.appendChild(colMinName);

	var colMax = document.createElement('th');
	colMax.id='tabAnalise4';
	var colMaxName = document.createTextNode('Max');
	colMax.appendChild(colMaxName);

	linhaTabAnalise.appendChild(colVF);
	linhaTabAnalise.appendChild(colSombra);
	linhaTabAnalise.appendChild(colCusto);
	linhaTabAnalise.appendChild(colMin);
	linhaTabAnalise.appendChild(colMax);
	tabAnalise.appendChild(linhaTabAnalise);
	//fim do cabeçalho da tabela de sensibilidade

	var lstSombra = []; // valor de f na linha Z
	var colB = []; // coluna b
	for(var i=(2+qt_var); i<(qt_var+qt_rest+2); i++){
		lstSombra.push(parseFloat(document.getElementById('colunaZ'+i+cont).innerHTML));//.toFixed(2);
	}
	for(var i=0; i<qt_rest; i++){
		colB.push(parseFloat(document.getElementById('coluna'+i+(qt_var+qt_rest+2)+cont).innerHTML));//.toFixed(2);
	}
	

	for(var i=0; i< qt_rest; i++){
		var novaLinha = document.createElement('tr');
		novaLinha.id='lin'+i;
		for(var j=0; j<5; j++){
			var novaCol = document.createElement('td');
			novaCol.id='col'+i+j;
			if(j==0){ // coluna das variaveis
				var texto = document.createTextNode('f'+(i+1));
			}
			else if(j==1){ //coluna sombra
				var texto = document.createTextNode(lstSombra[i]);				
			}
			else if(j==2){ // coluna custo
				var texto = document.createTextNode('----');
			}
			else{
				var texto= document.createTextNode('');
			}
			novaCol.appendChild(texto);
			novaLinha.appendChild(novaCol);
		}		
		tabAnalise.appendChild(novaLinha);
	}
	//preço sombra = valor da coluna f na linha Z	

	var lstMin=[];
	var lstMax=[];
	var lstF=[];
	

	for(var j= (2+qt_var); j<(qt_var+qt_rest+2); j++){
		var lstDelta=[];
		for(var i=0; i<qt_rest; i++){
			var b= parseFloat(document.getElementById("coluna"+i+(qt_var+qt_rest+2)+(cont)).innerHTML);
			var f= parseFloat(document.getElementById("coluna"+i+j+(cont)).innerHTML);
			if(f[i]!=0){
				lstDelta.push((b*(-1)/f));//.toFixed());
			}
			else{
				lstDelta.push(0);
			}
		}
		var maxAux;
		var minAux;
		
		var pos=[];
		var neg=[];
		// Separa lista delta em positivos e negativos
		for(k=0; k<lstDelta.length; k++){
			if(lstDelta[k]==0){
				pos.push(lstDelta[k]);
				neg.push(lstDelta[k]);
			}
			else if(lstDelta[k]>0){
				pos.push(lstDelta[k]);
			}
			else if(lstDelta[k]<0){
				neg.push(lstDelta[k]);
			}
		}
		maxAux = Math.min(...pos); //positivo  mais prox de 0
		minAux = Math.max(...neg); //negativo mais prox de 0
		
		var maxFinal;
		var minFinal;
		minFinal = parseFloat(document.getElementById('b'+[j-2-qt_var]).value)+minAux;  // valor da restrição + valor min
		maxFinal = parseFloat(document.getElementById('b'+[j-2-qt_var]).value)+maxAux; // valor da restrição + valor max
		if(minAux=='Infinity' || minFinal=='Infinity'){
			lstMin.push('∞');
		}
		else if(minAux > minFinal){
			lstMin.push(minAux);
		}
		else{
			lstMin.push(minFinal);
		}
		
		if(maxAux=='Infinity' || maxFinal=='Infinity'){
			lstMax.push('∞');
		}		
		else if(maxAux > maxFinal){
			lstMax.push(maxAux);
		}
		else{
			lstMax.push(maxFinal);
		}		
	}	

	for(var i=0; i<lstMax.length; i++){
		document.getElementById('col'+i+3).innerHTML = lstMin[i];
		if(lstMin[i]=='∞'){
			document.getElementById('col'+i+3).style.fontSize = "x-large";
		}
		document.getElementById('col'+i+4).innerHTML = lstMax[i];
		if(lstMax[i]=='∞'){
			document.getElementById('col'+i+4).style.fontSize = "x-large";
		}		
	}

	//verificar qual variavel de decisão não está na base
	var lstVar=[];
	var lstBase=[];
	for(var i=0; i<qt_var; i++){
		lstVar.push(document.getElementById('cab'+i+cont).innerHTML);
	}

	for(var i=0; i<qt_rest; i++){
		lstBase.push(document.getElementById('coluna'+i+1+cont).innerHTML);
	}

	var lstNaoBase=[];
	
	for(var j=0; j<lstVar.length; j++){
		var check = lstBase.indexOf(lstVar[j]);
		if(check == -1){
			lstNaoBase.push(lstVar[j]);
		}
	}
	
	var lstCab=[];
	for(var i=0; i<(qt_var+qt_rest); i++){
		lstCab.push(document.getElementById('cab'+i+cont).innerHTML);
	}

	var nBaseIndex=[];
	for(var i=0; i<lstNaoBase.length; i++){
		nBaseIndex.push(lstCab.indexOf(lstNaoBase[i]));
	}

	var lstValorZ=[];
	for(var i=0; i<lstNaoBase.length; i++){
		lstValorZ.push(parseFloat(document.getElementById('colunaZ'+(nBaseIndex[i]+2)+cont).innerHTML));
	}

	for(var i=0; i< lstNaoBase.length; i++){
		var novaLinha = document.createElement('tr');
		novaLinha.id='lin'+(qt_rest+i);
		var varNm = document.createElement('td');
		var nmT = document.createTextNode(lstNaoBase[i]);
		varNm.appendChild(nmT);
		novaLinha.appendChild(varNm);
		var sombra = document.createElement('td');
		var sombraT = document.createTextNode('----');
		sombra.appendChild(sombraT);
		novaLinha.appendChild(sombra);
		var custo = document.createElement('td');
		if(min==1){
			var custoT = document.createTextNode('-'+lstValorZ[i]);
		}
		else{
			var custoT = document.createTextNode(lstValorZ[i]);
		}
		
		custo.appendChild(custoT);
		novaLinha.appendChild(custo);
		var reduz = document.createElement('td');
		var reduzT = document.createTextNode('----');
		reduz.appendChild(reduzT);
		novaLinha.appendChild(reduz);
		var max = document.createElement('td');
		var maxT = document.createTextNode('----');
		max.appendChild(maxT);
		novaLinha.appendChild(max);
		tabAnalise.appendChild(novaLinha);
	}

		var btnResetar = document.createElement('button');		
		var divReset = document.createElement('div');
		divReset.id='divReset';
		divReset.className='container';
		btnResetar.innerHTML='Resetar';
		btnResetar.id='btnResetar';
		btnResetar.onclick=function(){remover1()};  
		divReset.appendChild(btnResetar);
		analise.appendChild(divReset);
}

function mostrarPasso(cont){

	if(cont < 2){
		document.getElementById('btnSolucao').style.display = 'none';
	}
	else{
		for(var i=1; i < cont; i++){
			x = document.getElementById('divTabRes'+i);
			if(x.style.display == 'none'){
				x.style.display = 'block';
				document.getElementById('btnSolucao').innerHTML = 'Esconder passos';
			}
			else{
				x.style.display = 'none';
				document.getElementById('btnSolucao').innerHTML = 'Mostrar passos';
			}

		}
	}
}

function Iteracao(qt_var,qt_rest,cont,min){
	
	var tabela = document.getElementById("divMaximizar");	

	var linhaZ = [];  //lista para guardar os valores da linha Z
	var tamColuna = qt_var+qt_rest+2;
	var entraBase=0; // guarda o mais negativo que entrará na base
	var coluna;  //guarda o indice da coluna da variavel que entrara na base
	var colEntra = [];  //guarda os valores da coluna que dividirá coluna b
	var colB = [];
	var colDiv = [];	

	//cria novo cabeçalho
	var tabRes = document.createElement('table');
	tabRes.id='tabRes'+cont;
	tabRes.border='1px';
	tabRes.className='tabela';
	var linha = document.createElement('tr'); 
	linha.id='cab'+cont;
	var coluna1 = document.createElement('th');
	var t = document.createTextNode('Linha');
	coluna1.appendChild(t);
	linha.appendChild(coluna1);
	var coluna2 = document.createElement('th');          // Cria uma coluna
	var t2 = document.createTextNode('Base');            // Cria uma label
	coluna2.appendChild(t2);                              // Insere o label na coluna
	linha.appendChild(coluna2);

	for(var i = 0; i<qt_var; i++){                 // Insere as colunas das variáveis
		var coluna = document.createElement('th');
		var texto = 'X'+(parseInt(i)+1);              
		var t = document.createTextNode(texto);
		coluna.appendChild(t);
		coluna.id='cab'+i+cont;
		linha.appendChild(coluna);            
	}

	for(var i =0; i<qt_rest; i++){                 // Insere as colunas das Folgas
		var coluna = document.createElement('th');
		var texto = 'f'+(parseInt(i)+1);              
		var t = document.createTextNode(texto);
		coluna.appendChild(t);
		coluna.id='cab'+(i+qt_var)+cont;
		linha.appendChild(coluna);
	}

	var ultColuna = document.createElement('th');          // Cria uma coluna
	var t3 = document.createTextNode('b');            // Cria uma label
	ultColuna.appendChild(t3);                              // Insere o label na coluna
	linha.appendChild(ultColuna);
	tabRes.appendChild(linha);	

	var divTabRes = document.createElement('div');
	divTabRes.id='divTabRes'+cont;
	divTabRes.className ='tabela-box';	
	var iteracao = document.createElement('p');
	var iteracaoText = document.createTextNode('Iteração '+cont);
	iteracao.appendChild(iteracaoText);
	divTabRes.appendChild(iteracao);

	//pega valor da tabela anterior
	//var tabAnterior = document.getElementById('tabRes'+(cont-1));
	for(var i=0; i < qt_rest; i++){
		var linha = document.createElement('tr');
		linha.id='linha'+i+cont;
		for(var j=0; j< (qt_var+qt_rest+3); j++){
			var cel;
			var coluna=document.createElement('td');
			coluna.id='coluna'+i+j+cont;
			if(j==0){  //coluna da Linha
				cel= i+1;
			}
			else{ 
				cel=document.getElementById('coluna'+i+j+(cont-1)).innerHTML;
			}
			var celula = document.createTextNode(cel);
			coluna.appendChild(celula);
			linha.appendChild(coluna);			 
		}
		tabRes.appendChild(linha);
	}

	//LinhaZ
	var ultLinha = document.createElement('tr');
	ultLinha.id='linhaZ'+cont;
	var colunaZ = document.createElement('td');
	colunaZ.id='colunaZ'+0+cont;
	var celZ=qt_rest+1;  // numero da linha z
	var t=document.createTextNode(celZ);

	colunaZ.appendChild(t);
	ultLinha.appendChild(colunaZ);

	var colunaZ2 = document.createElement('td');
	colunaZ2.id='colunaZ'+1+cont;
	if(min==1){
		var celZ2=document.createTextNode('-Z');
	}
	else{
		var celZ2=document.createTextNode('Z');
	}
	colunaZ2.appendChild(celZ2);
	ultLinha.appendChild(colunaZ2);

	for(var i=2; i<= qt_var+qt_rest+2; i++){
		var c =document.getElementById('colunaZ'+i+(cont-1)).innerHTML;
		var celulaZ =document.createTextNode(c);
		var col = document.createElement('td');
		col.id='colunaZ'+i+cont;
		col.appendChild(celulaZ);
		ultLinha.appendChild(col);
	}
	
	tabRes.appendChild(ultLinha);	
	divTabRes.appendChild(tabRes);
	divMaximizar.appendChild(divTabRes);

	var check = document.getElementById('checkbox').checked;
	if(cont>0 && !check){
		//alert(check);		
		divTabRes.style.display='none';
	}

	// bloco que verifica qual o mais negativo da linha Z
	for(var i=2; i <= tamColuna; i++){  //percorre linhaZ				
		linhaZ.push(parseFloat(document.getElementById("colunaZ"+i+(cont)).innerHTML));		
		if(linhaZ[i-2] < 0 && Math.abs(linhaZ[i-2]) > Math.abs(entraBase)){			
			entraBase = linhaZ[i-2]; // guarda o mais negativo
			coluna = i;	// guarda a coluna		
		}			
	}	

	var varEntra = document.getElementById("cab"+(coluna-2)+(cont)).innerHTML;  // variavel que entra na base
	
	//bloco que guarda os elementos das colunas que serão divididas	
	for(var i=0; i < qt_rest; i++){ //percorre coluna
		colEntra.push(parseFloat(document.getElementById("coluna"+i+coluna+(cont)).innerHTML));  // guarda elementos da coluna do mais negativo
		colB.push(parseFloat(document.getElementById("coluna"+i+(qt_var+qt_rest+2)+(cont)).innerHTML));  // guarda os elementos da coluna b		
	}
	
	var positivo = false;
	//bloco que divide coluna b
	for(var i=0; i < colB.length; i++){  // divide coluna de b pela coluna da variavel que entrará na base 
		if(colEntra[i] > 0){  
			colDiv.push(colB[i]/colEntra[i]);
			positivo=true;				
		}
		else if(colEntra[i] == 0){
			colDiv.push('zero');
		}
		else if(colEntra[i] < 0){
			colDiv.push('negativo');
		} 
	}	

	if(positivo){
		verificaMenor(qt_var,qt_rest,coluna,colDiv,cont,min);
	}
	else{

		var instrucao = document.getElementById('instrucoesText').innerHTML = 'Não existe solução ótima para esta função.<br><br>Clique no botão \"Resetar\" para voltar para tela inicial.'
		document.getElementById('divTabRes'+cont).style.display ='none';
		var impossivel = document.createElement('div');
		impossivel.id='impossivel';
		var impResp = document.createElement('p');
		var resp = document.createTextNode('Não exise solução ótima para a função!');		
		impResp.appendChild(resp);
		impossivel.appendChild(impResp);
		divMaximizar.appendChild(impossivel);

		var btnResetar= document.createElement('button');
		btnResetar.id='btnResetar';
		btnResetar.innerHTML='Resetar';
		btnResetar.id='btnResetar';
		btnResetar.onclick=function(){remover1()};
		divMaximizar.appendChild(btnResetar);
	}	
}

function verificaMenor(qt_var,qt_rest,coluna,colDiv,cont,min){

	var menor; // guarda o menor resultado da divisao
	var linhaMenor=0;
	
	for(var i=0; i < colDiv.length; i++){
		if(colDiv[i] != 'zero' && colDiv[i] != 'negativo'){
			menor = colDiv[i];
			break;
		}
	}	

	for(var i=0; i < colDiv.length; i++){  // verifica qual o menor
		if((colDiv[i] != 'zero') && (colDiv[i] != 'negativo') && (colDiv[i] <= menor)){
			menor = colDiv[i];
			linhaMenor = i;
		}
	}
			
	var varSai = document.getElementById("coluna"+linhaMenor+1+(cont)).innerHTML;
	var varEntra = document.getElementById("cab"+(coluna-2)+(cont)).innerHTML;
	
	document.getElementById("coluna"+linhaMenor+1+cont).innerHTML = varEntra;
	divide(linhaMenor,coluna,qt_var,qt_rest,cont,min);	
}

function divide(linhaMenor,coluna,qt_var,qt_rest,cont,min){

	var pivo = document.getElementById("coluna"+linhaMenor+coluna+(cont)).innerHTML;
	pivo = parseFloat(pivo);
	
	for(var i=2; i <= (qt_var+qt_rest+2); i++){
		document.getElementById("coluna"+linhaMenor+i+(cont)).innerHTML = (parseFloat(document.getElementById("coluna"+linhaMenor+i+cont).innerHTML)/pivo);//.toFixed(2);
			// tabela atual                                             =          linha pivo da tabela atual / pivo                            
	}
	
	linha=0;	
	
	//zera valores da coluna do pivo	
	for(var linha=0; linha < qt_rest; linha++){
		var aux = []; //guarda a linha do pivo multiplicada
		var x = parseFloat(document.getElementById("coluna"+linha+coluna+cont).innerHTML); // elemento da coluna do pivo
		if(linha < qt_rest && linha != linhaMenor && x != 0){		
			for(var j=2; j <= (qt_var+qt_rest+2); j++){
				aux.push(parseFloat(document.getElementById("coluna"+linhaMenor+j+cont).innerHTML)*x*(-1)); // multiplicação da linha do pivo pelo elemento da coluna dele * (-1)
			}
			for(var j=2; j <= (qt_var+qt_rest+2); j++){
				document.getElementById("coluna"+linha+j+cont).innerHTML = (parseFloat(document.getElementById("coluna"+linha+j+(cont)).innerHTML) + aux[j-2]);//.toFixed(2);				
			}
		}
	}	

	var z = parseFloat(document.getElementById("colunaZ"+coluna+cont).innerHTML);  //elemento da linha Z abaixo da coluna do pivo
	//alert(z)
	if(z != 0){
		var aux = [];
		for(var j=2; j <= (qt_var+qt_rest+2); j++){
			aux.push(parseFloat(document.getElementById("coluna"+linhaMenor+j+cont).innerHTML)*z*(-1));			
		}
		for(var j=2; j <= (qt_var+qt_rest+2); j++){
			document.getElementById("colunaZ"+j+cont).innerHTML = (parseFloat(document.getElementById("colunaZ"+j+cont).innerHTML) + aux[j-2]);//.toFixed(2);				
		}
	}
	montaSolucaoBasica(qt_var,qt_rest,cont,min);
}

function remover(){
	var main = document.getElementById('main');	

	document.getElementById('btnInserir').innerHTML='Inserir Valores';
	document.getElementById('btnInserir').setAttribute('onClick','criar()');
	document.getElementById('inicio').style.display = 'block';
	document.body.removeChild(main);
}

function remover1(){	
	var instrucao = document.getElementById('instrucoesText').innerHTML = "Utilizando números inteiros positivos:<br><br>1-Informe a quantidade de variáveis. <br><br>2-Informe a quantidade de restrições. <br><br>3-Informe a quantidade de limite de iterações.<br><br>Clique no botão para inserir os valores."
	var main = document.getElementById('main');	
	var tabelaMain = document.getElementById('tabelaMain');	
	var solucao = document.getElementById('solucao');

	document.getElementById('btnInserir').innerHTML='Inserir Valores';
	document.getElementById('btnInserir').setAttribute('onClick','criar()');	
	document.body.removeChild(main);
	document.body.removeChild(tabelaMain);	

	if(document.getElementById('solucao') != null){
		document.body.removeChild(document.getElementById('solucao'));		
	}
	if(document.getElementById('analise') != null){
		document.body.removeChild(document.getElementById('analise'));
	}
	document.getElementById('inicio').style = 'block';
}