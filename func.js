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

    else if(ordem == 2){//busca uniforme

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

    else if(ordem == 3){ //busca seção aurea

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var epsilon = $("#epsilon").val();
        var retorno = $("#retorno");

        retorno.empty();

        buscaAurea(fx,a,b,epsilon,retorno);
    }

    else if(ordem == 4){ //busca fibonacci

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var epsilon = $("#epsilon").val();
        var retorno = $("#retorno");

        retorno.empty();

        buscaFibonacci(fx,a,b,epsilon,retorno);
    }

    else if(ordem == 5){ //busca fibonacci

        var fx = $("#fx").val();
        var a = $("#a").val();
        var b = $("#b").val();
        var epsilon = $("#epsilon").val();
        var retorno = $("#retorno");

        retorno.empty();

        biseccao(fx,a,b,epsilon,retorno);
    }

}

function biseccao(fx,a,b,epsilon,retorno){
    //
    var f = math.compile(fx);
    a = parseFloat(a);
    b = parseFloat(b);
    epsilon = parseFloat(epsilon);
    //
    var p;
    var z = (math.log10((b-a)/epsilon));
    var y = (math.log10(2));
    var k = parseInt(z/y)+1;
    //
    var fd = math.derivative(fx,'x');
    var fp;
    //
    //
    var resposta = "";
    //
    var texto_retorno = '<table class="table"><thead><tr><th>#</th><th>p</th><th>F(p)</th><th>q</th><th>F(q)</th></tr></thead>';
    texto_retorno += '<tbody>';
    //
    for(var i = 0;i<k;i++){
        p = (a+b)/2;
        //
        fp = fd.eval({x:p}); //derivada aplica ao ponto p
        //
        if ( ((b-a) < epsilon) && (abs(p) < epsilon)){
            break;
        }
        if(fp > epsilon){
            b = p;
        }
        else{
            a = p;
        }
    }
    //
    resposta += "<b>x = " + p;
    resposta += "<br><b>f(x) = "+f.eval({x:p});
    //
    retorno.append(resposta);

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
    //texto_retorno += '</tbody></table>';

    xOtimo = (a+b)/2;
    fxOtimo = f.eval({x:xOtimo});

    texto_retorno += ('<tr bgcolor="#3CB371"><td align="center" colspan="8"><b>Resposta<b></td></tr>');

    if(i%2 === 0)
        texto_retorno += '<tr bgcolor="#DCDCDC">';
    else
        texto_retorno += '<tr>';

    texto_retorno += '<td colspan="8" align="center"><p><b>xOtimo = </b>'+xOtimo.toFixed(4)+'</p><p><b>f(xOtimo) = </b>'+ (parseFloat(f.eval({x:xOtimo}))).toFixed(4) +'</p></td>';
    texto_retorno += '</tr>';
    texto_retorno += '</tbody></table>';

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

function fibonacci(n_fib){
    //n_fib é o valor do maior elemento da sequencia
    //essa função irá retornar um vetor com a sequencia de fibonacci
    var seq_fib = []; //vetor com a sequencia

    seq_fib.push(1);
    seq_fib.push(1);

    // os 2 primeiros elementos são 1,1
    var i = 1; //i = 1, pois ja temos 2 elementos no vetor
    //
    while(seq_fib[i] < n_fib){
        i++;
        seq_fib.push(seq_fib[i-2]+seq_fib[i-1]);
    }

    return seq_fib;
}

function buscaFibonacci(fx,a,b,epsilon,retorno){

    var fib = parseInt((b-a)/epsilon);
    var seq_fib = fibonacci(fib);
    var tam_fib = seq_fib.length-1;

    var f = math.compile(fx);
    var p;
    var fp;
    var q;
    var fq;
    var sub;
    var xOtimo;
    var fOtimo;
    var aPrint;
    var bPrint;
    var flagP = 0;
    var flagQ = 0;

    var passo = '<table class="table"><thead><tr><th>#</th><th>a</th><th>b</th><th>p</th><th>F(p)</th><th>q</th><th>F(q)</th></tr></thead>';
    passo += '<tbody>';

    for(i = 0; i<(tam_fib-1); i++){
        aPrint = parseFloat(a);
        bPrint = parseFloat(b);
        //retorno.append("<br><br>i: "+i);
        sub = (b - a);

        p = parseFloat(parseFloat(a) + parseFloat(((seq_fib[tam_fib-i-2])/seq_fib[tam_fib-i]) * sub));
        //retorno.append("<br>P: "+p.toFixed(4));
        fp = parseFloat(f.eval({x:p}));
        //retorno.append("<br>fp: "+fp.toFixed(4));

        q = parseFloat(parseFloat(a) + parseFloat(((seq_fib[tam_fib-i-1])/seq_fib[tam_fib-i]) * sub));
        //retorno.append("<br>q: "+q.toFixed(4));
        fq = parseFloat(f.eval({x:q}));
        //retorno.append("<br>fq: "+fq.toFixed(4));

        if(fq < fp){
            a = p;
            flagP = 1;
            flagQ = 0;
        }
        else{
            b = q;
            flagP = 0;
            flagQ = 1;
        }


        passo += '<tr>';
        passo += '<td>'+i+'</td>';
        passo += '<td>'+aPrint.toFixed(4)+'</td>';
        passo += '<td>'+bPrint.toFixed(4)+'</td>';
        passo += '<td>'+p.toFixed(4)+'</td>';
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
    }

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
