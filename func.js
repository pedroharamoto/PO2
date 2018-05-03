function carregar(pagina){

  var corpo = $('#corpo');

  corpo.empty();
  corpo.load(pagina);
};

function envia(ordem){

    if(ordem == 1){ //busca dicotomica

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var delta = $("#delta").val();
        var epsilon = $("#epsilon").val();
        var retorno = $("#retorno");
        var passos = $("#plot");

        retorno.empty();
        passos.empty();

        buscaDicotomica(fx,a,b,delta,epsilon, retorno,passos);
    }

    if(ordem == 2){//busca uniforme

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var delta = $("#delta").val();
        var retorno = $("#retorno");
        var passos = $("#plot");

        retorno.empty();
        passos.empty();

        BuscaUniforme(fx,a,b,delta,retorno);
    }

    if(ordem == 3){ //busca seção aurea

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var epsilon = $("#epsilon").val();
        var retorno = $("#retorno");

        retorno.empty();

        buscaAurea(fx,a,b,epsilon,retorno);
    }
}

function buscaDicotomica(fx,a,b,delta,epsilon,retorno,passos){

    var f = math.compile(fx);
    var m; //media
    var p; //ponto p
    var fp; //função aplicada ao ponto p
    var q; // ponto q
    var fq; //fução aplicada ao ponto q
    var i = 1;
    var xOtimo;
    var fxOtimo;

    var texto_retorno = '<table class="table"><thead><tr><th>#</th><th>p</th><th>F(p)</th><th>q</th><th>F(q)</th></tr></thead>';
    texto_retorno += '<tbody>';

    while( math.abs(b-a) > epsilon ){

        m = (parseFloat(a) + parseFloat(b))/2;
        p = parseFloat(m) - parseFloat(delta);
        q = parseFloat(m) + parseFloat(delta);

        fp = f.eval({x:p});
        fq = f.eval({x:q});

        if(fp > fq){
            a = p;
        }
        else{
            b = q;
        }

        if(i%2 === 0)
            texto_retorno += '<tr bgcolor="#DCDCDC">';
        else
            texto_retorno += '<tr>';

        texto_retorno += '<td>'+i+'</td>';
        texto_retorno +='<td>'+p.toFixed(4)+'</td>';
        texto_retorno +='<td>'+fp.toFixed(4)+'</td>';
        texto_retorno += '<td>'+q.toFixed(4)+'</td>';
        texto_retorno += '<td>'+fq.toFixed(4)+'</td>';
        texto_retorno += '</tr>';
        i++;
    }

    m = (parseFloat(a)+ parseFloat(b))/2;
    p = parseFloat(m) - parseFloat(delta);
    q = parseFloat(m) + parseFloat(delta);

    fp = f.eval({x:p});
    fq = f.eval({x:q});

    if(i%2 === 0)
        texto_retorno += '<tr bgcolor="#DCDCDC">';
    else
        texto_retorno += '<tr>';
    texto_retorno +='<td>'+i+'</td>';
    texto_retorno +='<td>'+p.toFixed(4)+'</td>';
    texto_retorno +='<td>'+fp.toFixed(4)+'</td>';
    texto_retorno +='<td>'+q.toFixed(4)+'</td>';
    texto_retorno += '<td>'+fq.toFixed(4)+'</td>';
    texto_retorno += '</tr>';
    texto_retorno += '</tbody></table>';

    xOtimo = (a+b)/2;
    fxOtimo = f.eval({x:xOtimo});

    retorno.append("<p><b>xOtimo:</b> "+xOtimo.toFixed(4)+"</p><p><b>F(xOtimo):</b> "+fxOtimo.toFixed(4)+'</p><br>');
    retorno.append(texto_retorno);

}

function BuscaUniforme(fx,a,b,delta,retorno){

    var f = math.compile(fx);
    var m; //media
    var p = parseFloat(a); //ponto p
    var fp = f.eval({x:p}); //função aplicada ao ponto p
    var q = parseFloat(p) + parseFloat(delta); // ponto q
    var fq = f.eval({x:q}); //fução aplicada ao ponto q
    var i = 1;
    var xOtimo;
    var fxOtimo;

    var resposta = "";

    var passo = '<table class="table"><thead><tr><th>#</th><th>p</th><th>F(p)</th><th>q</th><th>F(q)</th></tr></thead>';
    passo += '<tbody>';

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += '<td>'+i+'</td>';
    passo +='<td>'+ p.toFixed(4) +'</td>';
    passo +='<td>'+fp.toFixed(4)+'</td>';
    passo += '<td>'+q.toFixed(4)+'</td>';
    passo += '<td>'+fq.toFixed(4)+'</td>';
    passo += '</tr>';
    i++;

    while( fp>fq && q<b){
        p = q;
        fp = fq;
        q = parseFloat(p) + parseFloat(delta);
        fq = f.eval({x:q});

        if(i%2 === 0)
            passo += '<tr bgcolor="#DCDCDC">';
        else
            passo += '<tr>';

        passo += '<td>'+i+'</td>';
        passo +='<td>'+p.toFixed(4)+'</td>';
        passo +='<td>'+fp.toFixed(4)+'</td>';
        passo += '<td>'+q.toFixed(4)+'</td>';
        passo += '<td>'+fq.toFixed(4)+'</td>';
        passo += '</tr>';
        i++;
    }

    passo += ('<tr bgcolor="#3CB371"><td align="center" colspan="5"><b>Refinamento</b></td></tr>');

    p = parseFloat(p) - parseFloat(delta);
    fp = f.eval({x:p});

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += '<td>'+i+'</td>';
    passo +='<td>'+p.toFixed(4)+'</td>';
    passo +='<td>'+fp.toFixed(4)+'</td>';
    passo += '<td>'+q.toFixed(4)+'</td>';
    passo += '<td>'+fq.toFixed(4)+'</td>';
    passo += '</tr>';
    i++;

    delta = parseFloat(delta)/10;
	q = parseFloat(p) + parseFloat(delta);
	fq = f.eval({x:q});

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += '<td>'+i+'</td>';
    passo +='<td>'+p.toFixed(4)+'</td>';
    passo +='<td>'+fp.toFixed(4)+'</td>';
    passo += '<td>'+q.toFixed(4)+'</td>';
    passo += '<td>'+fq.toFixed(4)+'</td>';
    passo += '</tr>';
    i++;

    while (fp>fq && q<b){
		p = q;
		fp = fq;
		q = parseFloat(p) + parseFloat(delta);
		fq = f.eval({x:q});

        if(i%2 === 0)
            passo += '<tr bgcolor="#DCDCDC">';
        else
            passo += '<tr>';

        passo += '<td>'+i+'</td>';
        passo +='<td>'+p.toFixed(4)+'</td>';
        passo +='<td>'+fp.toFixed(4)+'</td>';
        passo += '<td>'+q.toFixed(4)+'</td>';
        passo += '<td>'+fq.toFixed(4)+'</td>';
        passo += '</tr>';
        i++;
    }


    passo += ('<tr bgcolor="#3CB371"><td align="center" colspan="5"><b>Resposta<b></td></tr>');
    if (q > b){
        resposta += ("<b>xOtimo =</b> "+b.toFixed(4) + "<br> <b>F(xOtimo) = </b>"+ (f.eval({x:b})).toFixed(4));
    }
    else{
        resposta += ("<b>xOtimo =</b> "+p.toFixed(4) + "<br> <b>F(xOtimo) = </b>    " + fp.toFixed(4));
    }

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += ('<td colspan="5"><p align="center">'+ resposta + '</p></td></tr>');

    passo += '</tbody></table>';
    retorno.append(passo);
}
function buscaAurea(fx,a,b,epsilon,retorno){

    var alfa = (Math.pow(5,(1/2)) - 1)/2;
    alfa = (parseFloat(alfa)).toFixed(5);

    var beta = 1 - alfa;
    beta = (parseFloat(beta)).toFixed(5);

    var aPrint;
    var bPrint;

    var flagP = 0;
    var flagQ = 0;

    var p; //ponto p
    var fp; //função aplicada ao ponto p
    var q; // ponto q
    var fq; //fução aplicada ao ponto q
    var f = math.compile(fx);
    var i = 1;
    var xOtimo;
    var fxOtimo;

    var resposta = "";

    var passo = '<table class="table"><thead><tr><th>#</th><th>a</th><th>b</th><th>(b-a)</th><th>p</th><th>F(p)</th><th>q</th><th>F(q)</th></tr></thead>';
    passo += '<tbody>';

    while((b-a) > epsilon){
        aPrint = a
        bPrint = b;

        p = (parseFloat(a) + (parseFloat(beta) * (b-a))); //ponto p
        fp = f.eval({x:p}); //função aplicada ao ponto p

        q = parseFloat(a) + (parseFloat(alfa) * (b-a)); // ponto q
        fq = f.eval({x:q}); //fução aplicada ao ponto q

        if(fp > fq){
            a = p;
            flagQ = 0;
            flagP = 1;
        }
        else{
            b = q;
            flagP = 0;
            flagQ = 1;
        }

        if(i%2 === 0)
            passo += '<tr bgcolor="#DCDCDC">';
        else
            passo += '<tr>';

        passo += '<td>'+i+'</td>';
        passo += '<td>'+(parseFloat(aPrint)).toFixed(4)+'</td>';
        passo += '<td>'+(parseFloat(bPrint)).toFixed(4)+'</td>';
        passo += '<td>'+(parseFloat(bPrint-aPrint)).toFixed(4)+'</td>';
        passo +='<td>'+p.toFixed(4)+'</td>';

        if(flagP){
            passo +='<td bgcolor="#8FBC8F">'+fp.toFixed(4)+'</td>';
        }
        else{
            passo +='<td>'+fp.toFixed(4)+'</td>';
        }

        passo += '<td>'+q.toFixed(4)+'</td>';


        if(flagQ){
            passo +='<td bgcolor="#8FBC8F">'+fq.toFixed(4)+'</td>';
        }
        else{
            passo +='<td>'+fq.toFixed(4)+'</td>';
        }

        passo += '</tr>';
        i++;
    }

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += '<td>'+i+'</td>';
    passo += '<td>'+(parseFloat(aPrint)).toFixed(4)+'</td>';
    passo += '<td>'+(parseFloat(bPrint)).toFixed(4)+'</td>';
    passo += '<td>'+(parseFloat(bPrint-aPrint)).toFixed(4)+'</td>';
    passo +='<td>'+p.toFixed(4)+'</td>';
    passo +='<td>'+fp.toFixed(4)+'</td>';
    passo += '<td>'+q.toFixed(4)+'</td>';
    passo += '<td>'+fq.toFixed(4)+'</td>';
    passo += '</tr>';
    i++;

    xOtimo = (a+b)/2;

    passo += ('<tr bgcolor="#3CB371"><td align="center" colspan="8"><b>Resposta<b></td></tr>');

    if(i%2 === 0)
        passo += '<tr bgcolor="#DCDCDC">';
    else
        passo += '<tr>';

    passo += '<td colspan="8" align="center"><p><b>xOtimo = </b>'+xOtimo.toFixed(4)+'</p><p><b>f(xOtimo) = </b>'+ (parseFloat(f.eval({x:xOtimo}))).toFixed(4) +'</p></td>';
    passo += '</tr>';
    passo += '</tbody></table>';

    retorno.append(passo);

}