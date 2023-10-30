let limitesInferiores = [];
let limitesSuperiores = [];
let frecuenciasAbsolutas = [];

let listaXi = [];
let listaFi = [];
let listahi = [];
let listaHi = [];
let listaxifi = [];
let listaxi_x = [];
let listaxi_x2 = [];
let listaxi_x3 = [];
let listaxi_x4 = [];


function limpiar() {
    limitesInferiores = [];
    limitesSuperiores = [];
    frecuenciasAbsolutas = [];

    listaXi = [];
    listaFi = [];
    listahi = [];
    listaHi = [];
    listaxifi = [];
    listaxi_x = [];
    listaxi_x2 = [];
    listaxi_x3 = [];
    listaxi_x4 = [];
    document.getElementById('validar').innerHTML = ``;
    document.getElementById('amplitud').value = '';
    document.getElementById('limiteInferior').value = '';
    document.getElementById('limiteSuperior').value = '';
    document.getElementById('frecuencia').value = '';
    document.getElementById('tabla').innerHTML = '';
    document.getElementById('tabla_2').innerHTML = '';
    document.getElementById('media').innerHTML = ``;
    document.getElementById('mediana').innerHTML = ``;
    document.getElementById('moda').innerHTML = ``;
    document.getElementById('cuartiles').innerHTML = ``;
    document.getElementById('deciles').innerHTML = '';

    document.getElementById('percentiles').innerHTML = '';

    document.getElementById('tabla_3').innerHTML = '';
    document.getElementById('varianza').innerHTML = ``;
    document.getElementById('desv_estandar').innerHTML = ``;
    document.getElementById('coeficiente').innerHTML = ``;
    document.getElementById('asimetria').innerHTML = ``;
    document.getElementById('curtosis').innerHTML = ``;
    document.getElementById('calcular').disabled = true;


}

function validarDatos() {
    let btnAgregar = document.getElementById('agregar_intervalo');

    let limInf = Number(document.getElementById('limiteInferior').value);
    let limSup = Number(document.getElementById('limiteSuperior').value);
    let fiInt = Number(document.getElementById('frecuencia').value);
    let amp = Number(document.getElementById('amplitud').value);


    btnAgregar.disabled = true;

    console.log(`Inf: ${limInf} Sup: ${limSup} Freq: ${fiInt}`);

    if (limInf === '' || limSup == '' || fiInt == '') {
        console.log('Campos vacios');
        document.getElementById('validar').innerHTML = `Ingrese todos los valores`;
    } else if (limSup <= limInf) {
        console.log('ls<li');

        document.getElementById('validar').innerHTML = `Limite superior no puede ser menor al limite inferior`;
    } else if (limSup <= 0) {
        console.log('ls<=0');

        document.getElementById('validar').innerHTML = `Limite superior no puede ser cero`;
    } else if (fiInt <= 0) {
        console.log('f<=0');

        document.getElementById('validar').innerHTML = `La frecuencia deberia ser mayor a cero`;
    }
    else {
        if (limitesInferiores.length == 0) {
            console.log('Nueva amplitud:', amp);

            amp = limSup - limInf;
            document.getElementById('amplitud').value = amp;
            btnAgregar.disabled = false;
            document.getElementById('validar').innerHTML = `Ingresando: Límite Inferior: ${limInf}, Límite Superior: ${limSup}, Frecuencia absoluta: ${fiInt}`;



        } else if ((limSup - limInf) != amp) {
            console.log('Amplitud debe ser:', amp);

            document.getElementById('validar').innerHTML = `Tenga en cuenta la amplitud de los intervalos`;

        } else {
            console.log('Correcto');

            document.getElementById('validar').innerHTML = `Ingresando Inf: ${limInf} Sup: ${limSup} Freq: ${fiInt}`;
            btnAgregar.disabled = false;
        }
    }
}


function agregar() {
    let btnAgregar = document.getElementById('agregar_intervalo');
    let btnCalcular = document.getElementById('calcular');

    let limInf = Number(document.getElementById('limiteInferior').value);
    let limSup = Number(document.getElementById('limiteSuperior').value);
    let fiInt = Number(document.getElementById('frecuencia').value);
    let amp = Number(document.getElementById('amplitud').value);
    let n = 0;

    console.log(`Se agrega--- Inf: ${limInf} Sup: ${limSup} Freq: ${fiInt}`);
    limitesInferiores.push(limInf);
    limitesSuperiores.push(limSup);
    frecuenciasAbsolutas.push(fiInt);
    console.log(limitesInferiores);
    console.log(limitesSuperiores);
    console.log(frecuenciasAbsolutas);
    document.getElementById('limiteInferior').value = limSup;
    document.getElementById('limiteSuperior').value = limSup + amp;
    document.getElementById('frecuencia').value = '';

    btnAgregar.disabled = true;
    btnCalcular.disabled = false;
    let llenarTabla = '';
    for (let i = 0; i < limitesInferiores.length; i++) {
        n += frecuenciasAbsolutas[i];
        llenarTabla += `<tr>
        <td>${limitesInferiores[i]}</td>
        <td>${limitesSuperiores[i]}</td>
        <td>${frecuenciasAbsolutas[i]}</td>
      </tr>`;
    }

    llenarTabla += `<tr>
        <th colspan="2">Total</th>
        <th>${n}</th>
      </tr>`;
    document.getElementById('tabla').innerHTML = llenarTabla;



}

function calcular() {
    let amp = Number(document.getElementById('amplitud').value);

    let n = 0;
    let sumahi = 0;
    let sumaxifi = 0;
    let llenarTabla = '';


    for (let i = 0; i < frecuenciasAbsolutas.length; i++) {
        n += frecuenciasAbsolutas[i];
    }
    let nuevaFi = 0;
    let nuevaHi = 0;
    for (let i = 0; i < limitesInferiores.length; i++) {
        // Calcular la marca de la clase para cada intervalo
        let xi = (limitesSuperiores[i] + limitesInferiores[i]) / 2;
        listaXi.push(xi);

        let hi = (frecuenciasAbsolutas[i]) / n;
        sumahi += hi;
        listahi.push(hi);

        let xifi = frecuenciasAbsolutas[i] * listaXi[i];
        sumaxifi += xifi;
        listaxifi.push(xifi);

        // Calcular las frecuencias acumuladas
        if (i == 0) {
            console.log('primer elemento...');
            // si es el primer elemento de la lista entonces es igual
            listaFi.push(frecuenciasAbsolutas[0]);
            listaHi.push(listahi[0]);
        } else {
            console.log('sumamos el anterior');
            nuevaFi = listaFi[i - 1];
            nuevaFi += frecuenciasAbsolutas[i];
            listaFi.push(nuevaFi);

            nuevaHi = listaHi[i - 1];
            nuevaHi += listahi[i];
            listaHi.push(nuevaHi);
        }

        llenarTabla += `<tr>
        <td>${limitesInferiores[i]}</td>
        <td>${limitesSuperiores[i]}</td>
        <td>${listaXi[i]}</td>
        <td>${frecuenciasAbsolutas[i]}</td>
        <td>${listaFi[i]}</td>
        <td>${listahi[i]}</td>
        <td>${listaHi[i]}</td>
        <td>${listaxifi[i]}</td>
      </tr>`;

    }


    llenarTabla += `<tr>
    <th colspan="3">Total</th>
    <th>${n}</th>
    <th>-</th>
    <th>${sumahi}</th>
    <th>-</th>
    <th>${sumaxifi}</th>
  </tr>`;

    //   Calcular el promedio
    let media = sumaxifi / n;


    // Para Calcular la mediana:
    let intervaloMediana = n / 2;
    let Fk_mediana = 0;
    let Fk_1_mediana = 0;
    let fk_mediana = 0;
    let limInf_mediana = 0;
    for (let i = 0; i < limitesInferiores.length; i++) {
        if ((n / 2) <= listaFi[i]) {
            console.log('mayor', listaFi[i]);
            Fk_mediana = listaFi[i];
            if (i == 0) {
                Fk_1_mediana = 0;
            } else {
                Fk_1_mediana = listaFi[i - 1];
            }
            fk_mediana = frecuenciasAbsolutas[i];
            limInf_mediana = limitesInferiores[i];
            break;
        }
    }

    let mediana = limInf_mediana + amp * (((n / 2) - Fk_1_mediana) / fk_mediana);

    // PAra calcular la moda:
    let fi_mayor = Math.max(...frecuenciasAbsolutas);
    let index_fi_mayor = frecuenciasAbsolutas.indexOf(fi_mayor);
    let fk_1_moda = 0;
    if (index_fi_mayor > 0) {
        fk_1_moda = frecuenciasAbsolutas[index_fi_mayor - 1];
    }
    let fk1_moda = 0;

    if (index_fi_mayor < frecuenciasAbsolutas.length - 1) {
        fk1_moda = frecuenciasAbsolutas[index_fi_mayor + 1];
    }

    let moda = limitesInferiores[index_fi_mayor] + amp * ((fi_mayor - fk_1_moda) / ((fi_mayor - fk_1_moda) + (fi_mayor - fk1_moda)));

    // Calcular cuartiles
    let Q1 = calcular_til(4, 1, n);
    let Q2 = mediana;
    let Q22 = calcular_til(4, 2, n);
    let Q3 = calcular_til(4, 3, n);



    document.getElementById('tabla_2').innerHTML = llenarTabla;
    document.getElementById('media').innerHTML = `X = ${media}`;
    document.getElementById('mediana').innerHTML = `Me = ${mediana}`;
    document.getElementById('moda').innerHTML = `Mo = ${moda}`;
    document.getElementById('cuartiles').innerHTML = `Q1 = ${Q1} <br> Q2 = ${Q2}<br>Q2 = ${Q22} <br>Q3 = ${Q3}`;

    // Calcular deciles:
    let deciles = '';
    for (let i = 1; i < 10; i++) {
        let D1 = calcular_til(10, i, n);
        deciles += `D${i} = ${D1}<br>`;
    }
    document.getElementById('deciles').innerHTML = deciles;

    // Calcular percentiles:
    let percentiles = '';
    let conta = 0;
    for (let i = 1; i < 100; i++) {
        conta += 1;
        let D1 = calcular_til(100, i, n);
        if (conta == 9) {
            percentiles += `P${i} = ${D1.toFixed(3)}<br>`;
            conta = 0;
        } else {
            percentiles += `P${i} = ${D1.toFixed(3)} &nbsp; | &nbsp;`;
        }
    }
    document.getElementById('percentiles').innerHTML = percentiles;

    calcular2(sumaxifi, n, sumahi);


}

function calcular_til(s, l, n) {
    // s es en cuantos se divide el 100%
    // Para cuartiles: s=1,2,3
    // Para deciles: s=1,2,3,4,5,6,7,8,9,10
    // Para percentiles: s=1,2,3,4,5,6,7,8,...,...,99,100

    // l es el numero de cuartil, decil o percentil
    // n es el total de datos

    let amp = Number(document.getElementById('amplitud').value);
    let limInf_til = 0;
    let Fk_1_til = 0;
    let fk_til = 0;

    for (let i = 0; i < limitesInferiores.length; i++) {
        if ((l * n / s) <= listaFi[i]) {
            console.log('mayor', listaFi[i]);

            if (i == 0) {
                Fk_1_til = 0;
            } else {
                Fk_1_til = listaFi[i - 1];
            }
            fk_til = frecuenciasAbsolutas[i];
            limInf_til = limitesInferiores[i];
            break;
        }
    }
    let Qk = limInf_til + amp * ((((l * n) / s) - Fk_1_til) / fk_til);
    return Qk;
}

function calcular2(sumaxifi, n, sumahi) {
    let media = sumaxifi / n;
    let llenarTabla = '';

    let sumaxi_x = 0;
    let sumaxi_x2 = 0;
    let sumaxi_x3 = 0;
    let sumaxi_x4 = 0;

    for (let i = 0; i < limitesInferiores.length; i++) {
        let xi_x = listaXi[i] - media;
        sumaxi_x += xi_x;

        listaxi_x.push(xi_x);

        let fi_x_x2 = frecuenciasAbsolutas[i] * (Math.pow(listaxi_x[i], 2));
        sumaxi_x2 += fi_x_x2;
        listaxi_x2.push(fi_x_x2);

        let fi_x_x3 = frecuenciasAbsolutas[i] * (Math.pow(listaxi_x[i], 3));
        sumaxi_x3 += fi_x_x3;
        listaxi_x3.push(fi_x_x3);

        let fi_x_x4 = frecuenciasAbsolutas[i] * (Math.pow(listaxi_x[i], 4));
        sumaxi_x4 += fi_x_x4;
        listaxi_x4.push(fi_x_x4);

        llenarTabla += `<tr>
        <td>${limitesInferiores[i]}</td>
        <td>${limitesSuperiores[i]}</td>
        <td>${listaXi[i]}</td>
        <td>${frecuenciasAbsolutas[i]}</td>
        <td>${listaFi[i]}</td>
        <td>${listahi[i]}</td>
        <td>${listaHi[i]}</td>
        <td>${listaxifi[i]}</td>
        <td>${listaxi_x[i]}</td>
        <td>${listaxi_x2[i]}</td>
        <td>${listaxi_x3[i]}</td>
        <td>${listaxi_x4[i]}</td>
        </tr>`;

    }
    llenarTabla += `<tr>
    <th colspan="3">Total</th>
    <th>${n}</th>
    <th>-</th>
    <th>${sumahi}</th>
    <th>-</th>
    <th>${sumaxifi}</th>
    <th>${sumaxi_x}</th>
    <th>${sumaxi_x2}</th>
    <th>${sumaxi_x3}</th>
    <th>${sumaxi_x4}</th>
    </tr>`;

    // Calcular varianza:
    let varianza = sumaxi_x2 / (n - 1);
    let desviacion_estandar = Math.sqrt(varianza);
    let coeficiente_var = desviacion_estandar / media * 100;
    let asimetria = sumaxi_x3 / (n * Math.pow(desviacion_estandar, 3));
    let curtosis = sumaxi_x4 / (n * Math.pow(desviacion_estandar, 4));

    document.getElementById('tabla_3').innerHTML = llenarTabla;
    document.getElementById('varianza').innerHTML = `s<sup>2</sup> = ${varianza}`;
    document.getElementById('desv_estandar').innerHTML = `s = ${desviacion_estandar}`;
    document.getElementById('coeficiente').innerHTML = ` = ${coeficiente_var}`;
    document.getElementById('asimetria').innerHTML = ` = ${asimetria}`;
    document.getElementById('curtosis').innerHTML = `cc = ${curtosis}`;





}