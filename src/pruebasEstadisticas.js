import Chart from 'chart.js/auto'

let chiCuadrada_5=new Map()
chiCuadrada_5.set("4", 9.4877)
chiCuadrada_5.set("5", 11.0705)
chiCuadrada_5.set("6", 12.5916)
chiCuadrada_5.set("7", 14.0671)
chiCuadrada_5.set("8", 15.5073)
chiCuadrada_5.set("9", 16.9190)
let chiCuadrada_10=new Map()
chiCuadrada_10.set("4",  7.7794)
chiCuadrada_10.set("5", 9.2363)
chiCuadrada_10.set("6", 10.6446)
chiCuadrada_10.set("7", 12.0170)
chiCuadrada_10.set("8", 13.3616)
chiCuadrada_10.set("9", 14.6837)

const kolmogorov_5 = [0.22743, 0.22425, 0.22119, 0.21826, 0.21544, 0.21273, 0.21012, 0.20760, 0.20517,
  0.20283, 0.20056, 0.19837, 0.19625, 0.19420, 0.19221, 0.19028, 0.18841];
const kolmogorov_10 = [0.21472, 0.20185, 0.19910, 0.19646, 0.19392, 0.19148, 0.18913, 0.18687, 0.18468,
   0.18257, 0.18051, 0.17856, 0.17665, 0.17481, 0.17301, 0.17128, 0.16959];

   let alea = [];
   let num;
   
   // Verificar si el array está presente en el almacenamiento local
   let arrayGuardado = localStorage.getItem('miArray');
   if (arrayGuardado) {
     alea = JSON.parse(arrayGuardado);
     num = alea.length;
   } else {
     num = parseInt(prompt("Ingrese el valor de n"));
     generaTablaAleatoria(num);
   }
   
   console.log(alea);
   
   function generaTablaAleatoria(n) {
     for (let i = 0; i < n; i++) {
       alea.push(Math.random());
     }
   
     // Guardar el array en el almacenamiento local
     localStorage.setItem('miArray', JSON.stringify(alea));
   }
   
   let n2 = num;
   
   function getN2() {
     return n2;
   }
   
   console.log(n2);
   


function imprimeTablaAleatoria(valoresAleatorios){
  let tablaHTML = "<table><tr>Valores Aleatorios</tr>";
  tablaHTML += "<tr><th>i</th><th>Valor aleatorio</th>"
  for(let i=0; i<valoresAleatorios.length; i++){
    tablaHTML += "<tr>"
    tablaHTML += "<th>" + (i+1) + "</th>"
    tablaHTML += "<th>" + valoresAleatorios[i] + "</th>"
    tablaHTML += "</tr>"
  }
  tablaHTML += "</table>"
  return tablaHTML
}

function generaIntervalos(arr, w, k){
    let inter=[]
    inter.push(Math.min(...arr) + w)
    for(let i=1; i<k; i++){
        inter.push(inter[i-1] + w)
    }
    return inter
}

function chiCuadrada(intervalos, randoms, k, e){
    let a=0
    let suma=0
    let o=Array(k).fill(0)
    for(let i=0; i<randoms.length; i++){
        if(randoms[i]>=Math.min(...randoms) && randoms[i]<intervalos[0]){
            o[0]++
        }
    }
    suma += Math.pow((o[0] - e), 2) / e
    for(let i=1; i<intervalos.length; i++){
        for(let j=0; j<randoms.length; j++){
            if(randoms[j]>=intervalos[i-1] && randoms[j]<intervalos[i]){
                o[i]++
            }
        }
        suma += Math.pow((o[i] - e), 2) / e
        a=i
    }
    o[a+1]=suma
    return o
}

function evaluacionChiCuadrada(k, v){
  k--
  let valorRetorno
  if(v==5){
    valorRetorno=chiCuadrada_5.get("" + k)
  }
  else if(v==10){
    valorRetorno=chiCuadrada_10.get("" + k)
  }
  return valorRetorno
}

function gradosKolmogorov(n, v) {
  let kolmogorov = 0;

  v=parseInt(v)
  
  switch (v) {
    case 5:
      if (n >= 34 && n <= 50) {
        kolmogorov = kolmogorov_5[n - 34];
      } else {
        kolmogorov = 1.36 / Math.sqrt(n);
      }
      break;
      
    case 10:
      if (n >= 34 && n <= 50) {
        kolmogorov = kolmogorov_10[n - 34];
      } else {
        kolmogorov = 1.22 / Math.sqrt(n);
      }
      break;
      
    default:
      alert("El sistema solo soporta 5 o 10 grados de libertad");
      break;
  }
  
  return kolmogorov;
}

function pruebaDeLasSeries(v, pares){
  let valoresO=[]
  for(let i=0; i<v; i++){
    valoresO[i]=[]
    for(let j=0; j<v; j++){
      valoresO[i][j]=0
    }
  }
  let incremento=1/v
  let evaluacion1=0
  let evaluacion2=1
  for(let i=0; i<v; i++){
    for (let j=0; j<v; j++){
      for(let k=0; k<pares.length; k++){
        if(pares[k].par1>evaluacion1 && pares[k].par1<(evaluacion1+incremento) && pares[k].par2<evaluacion2 && pares[k].par2>(evaluacion2-incremento)){
          valoresO[i][j]++;
        }
      }
      evaluacion1+=incremento
    }
    evaluacion2-=incremento
    evaluacion1=0
  }
  return valoresO
}

let o=[]
for(let i=0; i<=4; i++){
  o.push(0)
}

function huecosCalculaO(a){
  if(a==0){
    o[0]++
  }
  else if(a==1){
    o[1]++
  }
  else if(a==2){
    o[2]++
  }
  else if(a==3){
    o[3]++
  }
  else{
    o[4]++
  }
}
function poker(k) {
  let nums=50;
  let arr=[]
  const nnums = new Array(alea);
  for (let i = 0; i < nums; i++) {
    nnums[i] = String(alea[i] * 10000000);
  }

  const fO = new Array(7).fill(0);

  console.log("i\tri\t\tEvento");
  for (let i = 0; i < nums; i++) {
    const repeticiones = new Array(10).fill(0);
    for (let j = 0; j < 5; j++) {
      repeticiones[parseInt(nnums[i].substring(j, j + 1))]++;
    }
    let pares = 0, tercias = 0, pok = 0, quintilla = 0;
    for (let j = 0; j < 10; j++) {
      if (repeticiones[j] === 2)
        pares++;
      if (repeticiones[j] === 3)
        tercias++;
      if (repeticiones[j] === 4)
        pok++;
      if (repeticiones[j] === 5)
        quintilla++;
    }
    console.log((i + 1) + "\t" + (alea[i]) + "\t\t");
    if (pares === 1 && tercias === 0) {
      console.log("1 Par");
      arr.push("Par")
      fO[1]++;
    } else if (pares === 2) {
      console.log("2 Pares");
      arr.push("2 Pares")
      fO[3]++;
    } else if (pares === 0 && tercias === 1) {
      console.log("Tercia");
      arr.push("Tercia")
      fO[2]++;
    } else if (pares === 1 && tercias === 1) {
      console.log("Full");
      arr.push("Full")
      fO[4]++;
    } else if (pok === 1) {
      console.log("Poker");
      arr.push("Poker")
      fO[5]++;
    } else if (quintilla === 1) {
      console.log("Quintilla");
      arr.push("Quintilla")
      fO[6]++;
    } else {
      console.log("Pachuca");
      arr.push("Pachuca")
      fO[0]++;
    }
  }

  const nombres = ["Pachuca", "1 Par", "Tercia", "2 Pares", "Full", "Poker", "Quintilla"];
  const valorEsp = [0.3024, 0.504, 0.072, 0.108, 0.009, 0.0045, 0.0001];
  console.log("\nEvento\t\tFO\tPE\tFE\t(FO-FE)\t(FO-FE)^2/FE");
  let res = 0;
  for (let i = 0; i < 7; i++) {
    console.log(`${i < 6 ? nombres[i] + "\t\t" : nombres[i] + "\t"}`);
    console.log(`${fO[i]}\t${(valorEsp[i])}\t${(valorEsp[i] * nums)}\t${(fO[i] - (valorEsp[i] * nums))}\t${((Math.pow(fO[i] - (valorEsp[i] * nums), 2) / (valorEsp[i] * nums)))}`);
    res += (Math.pow(fO[i] - (valorEsp[i] * nums), 2) / (valorEsp[i] * nums));
  }
   // VALIDACION SI SON INDEPENDIENTES O NO
  console.log(`\nSuma: ${res}`);
  console.log("\n------------------------------------------------------------------------");
  if (res) {
    console.log(`${res} <= ${chiCuadrada_5.get("6",getN2)} por lo tanto SON INDEPENDIENTES`);
  } else {
    console.log(`${res} > ${chiCuadrada_5.get("6",getN2)} por lo tanto NO son independientes`);
  }
  console.log("------------------------------------------------------------------------");
  return arr
}

function getO(){
  return o
}

(async function() {
  let menu = prompt("Ingrese:\n1) Chi cuadrada \n2)Prueba de Kolmogorov\n3) Prueba de las series\n4) Prueba de las distancias\n5) Prueba del poker\n6) Salir");

  if (!menu) {
    menu = prompt("Ingrese:\n 1) Chi cuadrada; 2)Prueba de Kolmogorov; 3) Prueba de las series");
    localStorage.setItem('menu', menu);
  }
  let v
  let n
  if(menu==6){
    window.close()
  }
  else{
    n=getN2()
    console.log(n)
    v=prompt("ingrese el % de fallo:\n 1) 5%  2)10%")
    if(v==1){
      v=5
    }
    else if(v==2){
      v=10
    }
  }

  if(menu==1){
    let valoresAleatorios=alea
    let k=parseInt(Math.sqrt(n))
    let e=n/k
    let contenedorTablaAleatoria = document.getElementById("contenedor-tablaAleatoria");
    contenedorTablaAleatoria.innerHTML=imprimeTablaAleatoria(valoresAleatorios)
    let r=Math.max(...valoresAleatorios) - Math.min(...valoresAleatorios)
    let w=r/k
    let intervalos = []
    intervalos=generaIntervalos(valoresAleatorios, w, k)
    window.valoresO=[]
    valoresO=chiCuadrada(intervalos, valoresAleatorios, k, e)
    // Obtén una referencia al elemento contenedor de la tabla
    let contenedorTablaChiCuadrada = document.getElementById("contenedor-tablaChiCuadrada");

    // Crea una variable para almacenar el contenido HTML de la tabla
    let tablaHTML = "<table><tr>Tabla chi cuadrada</tr>";

    // Encabezados de la tabla
    tablaHTML += "<tr>";
    tablaHTML += "<th>i</th>";
    tablaHTML += "<th>O</th>";
    tablaHTML += "<th>E</th>";
    tablaHTML += "<th>(O-E)</th>";
    tablaHTML += "<th>((O-E)^2)/E</th>";
    tablaHTML += "</tr>";

    // Contenido de la tabla
    for (var i = 0; i < valoresO.length - 1; i++) {
      tablaHTML += "<tr>";
      tablaHTML += "<td>" + (i + 1) + "</td>";
      tablaHTML += "<td>" + valoresO[i] + "</td>";
      tablaHTML += "<td>" + e + "</td>";
      tablaHTML += "<td>" + (valoresO[i] - e) + "</td>";
      tablaHTML += "<td>" + (Math.pow((valoresO[i] - e), 2) / e) + "</td>";
      tablaHTML += "</tr>";
    }

    // Cierra la etiqueta de la tabla
    tablaHTML += "</table>";
    // Asigna el contenido HTML de la tabla al contenedor
    contenedorTablaChiCuadrada.innerHTML = tablaHTML;
    let mensaje
    let comparacion=evaluacionChiCuadrada(k, v)
    if(valoresO[valoresO.length-1]<=comparacion){
      mensaje="<h2> Sumatoria = " + valoresO[valoresO.length-1] + " <= " + comparacion + " ... por lo tanto, los números SI están uniformemente distribuidos</h2>"
    }
    else {
      mensaje="<h2> Sumatoria = " + valoresO[valoresO.length-1] + " > " + comparacion + " ... por lo tanto, los números NO están uniformemente distribuidos</h2>"
    }
    let contenedorSumatoria=document.getElementById("contenedor-sumatoria");
    contenedorSumatoria.innerHTML=mensaje

    let data = []

    for (let i = 0; i < valoresO.length-1; i++) {
      let obj = { iteracion: i+1, valorO: valoresO[i], valorE: e}
      data.push(obj)
    }

    new Chart(
      document.getElementById('grafica'),
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.iteracion),
          datasets: [
            {
              label: "Num de o's obtenidas",
              data: data.map(row => row.valorO)
            },
            {
              label: "Valor esperado",
              data: data.map(row => row.valorE)
            }
          ]
        }
      }
    );
    let boton = document.getElementById('boton');
    let botonHTML="<button>Repetir</button>"
    boton.innerHTML=botonHTML

    // Agrega un evento de clic al botón
    boton.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      location.reload();
    });

    let boton2=document.getElementById('boton2');
    let botonHTML2="<button>Cambiar valor de n y repetir</button>"
    boton2.innerHTML=botonHTML2
    boton2.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      localStorage.removeItem('miArray');
      location.reload();
    });
  }
  else if(menu==2){
    let valoresAleatorios=alea
    let contenedorTablaAleatoria = document.getElementById("contenedor-tablaAleatoria");
    contenedorTablaAleatoria.innerHTML=imprimeTablaAleatoria(valoresAleatorios)
    let valoresOrdenados=valoresAleatorios.sort(function(a, b) {
      return a - b;
    });
    let contenedorTablaKolmogorov = document.getElementById("contenedor-tablaKolmogorov");

    // Crea una variable para almacenar el contenido HTML de la tabla
    let tablaHTML = "<table><tr>Tabla prueba de Kolmogorov</tr><tr><th>i</th><th>Ui</th><th>i/n</th><th>Di</th></tr>";
    let u=[]
    let d=[]
    let mayor=0
    for(let i=0; i<n; i++){
      u.push((i+1)/n)
      d.push(Math.abs(valoresOrdenados[i]-u[i]))
      if(d[i]>mayor){
        mayor=d[i]
      }
      tablaHTML += "<tr><th>" + (i+1) + "</th><th>" + valoresOrdenados[i] + "</th><th>" + u[i] + "</th><th>" + d[i] + "</th></tr>"
    }
    tablaHTML+="</table>"
    contenedorTablaKolmogorov.innerHTML=tablaHTML
    let mensaje
    let kolmogorov=gradosKolmogorov(n,v)
    if(mayor<=kolmogorov){
      mensaje=" <= " + kolmogorov + " ...Entonces, los números SI están uniformemente distribuidos"
    }else{
      mensaje=" > " + kolmogorov + " ...Entonces, los números NO están uniformemente distribuidos"
    }

    let contenedorDiMayor=document.getElementById("contenedor-DiMayor");
    
    let di="<h2> Di mayor = " + mayor + mensaje + " </h2>"
    contenedorDiMayor.innerHTML=di
    let data = []

    for (let i = 0; i < n; i++) {
      let obj = { iteracion: i+1, valoresOrdenados: valoresOrdenados[i], u: u[i] }
      data.push(obj)
    }
    new Chart(
      document.getElementById('grafica'),
      {
        type: 'line',
        data: {
          labels: data.map(row => row.iteracion),
          datasets: [
            {
              label: "Valores obtenidos",
              data: data.map(row => row.valoresOrdenados)
            },{
              label: "Valores esperados",
              data: data.map(row => row.u)
            }
          ]
        }
      }
    );
    let boton = document.getElementById('boton');
    let botonHTML="<button>Repetir</button>"
    boton.innerHTML=botonHTML

    // Agrega un evento de clic al botón
    boton.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      location.reload();
    });
    let boton2=document.getElementById('boton2');
    let botonHTML2="<button>Cambiar valor de n y repetir</button>"
    boton2.innerHTML=botonHTML2
    boton2.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      localStorage.removeItem('miArray');
      location.reload();
    });
  }
  else if(menu==3){
    let valoresAleatorios=alea
    let contenedorTablaAleatoria = document.getElementById("contenedor-tablaAleatoria");
    contenedorTablaAleatoria.innerHTML=imprimeTablaAleatoria(valoresAleatorios)
    let pares=[]
    for(let i=0; i<valoresAleatorios.length; i++){
      if (i==valoresAleatorios.length-1){
        let obj = { par1: valoresAleatorios[i], par2: valoresAleatorios[i]}
        pares.push(obj)
      }
      else{
        let obj = { par1: valoresAleatorios[i], par2: valoresAleatorios[i+1]}
        pares.push(obj)
      }
    }
    let contenedorTablaPruebaDeLasSeries = document.getElementById("contenedor-tablaPruebaDeLasSeries");

    // Crea una variable para almacenar el contenido HTML de la tabla
    let tablaHTML = "<table><tr>Pares ordenados</tr><tr><th>i</th><th>Numero 1</th><th>Numero 2</th></tr>"
    for(let i=0; i<valoresAleatorios.length; i++){
      tablaHTML += "<tr><td>" + (i+1) + "</td><td>" + pares[i].par1 + "</td><td>" + pares[i].par2 +"</td></tr>"
    }

    tablaHTML += "</table>"
    contenedorTablaPruebaDeLasSeries.innerHTML=tablaHTML

    new Chart(
      document.getElementById('grafica'),
      {
        type: 'bubble',
        data: {
          labels: pares.map(row => row.par2),
          datasets: [
            {
              label: "O's obtenidas",
              data: pares.map(row => ({
                x: row.par1,
                y: row.par2,
                r: row.tamaño
              }))
            }
          ]
        },
        options: {
          scales: {
            x: {
              ticks: {
                stepSize: 1/v
              }
            },
            y: {
              ticks: {
                stepSize: 1/v
              }
            }
          }
        }
      }
    );

    let valoresO=pruebaDeLasSeries(v, pares)
    let contenedorTablaPruebaDeLasSeries2=document.getElementById("contenedor-tablaPruebaDeLasSeries2");
    let tablaHTML2="<table><tr>Valores absorvados de O</tr>"
    for (let i=0; i<v; i++){
      tablaHTML2+="<tr>"
      for (let j=0; j<v; j++){
        tablaHTML2 += "<td>" + valoresO[i][j] + "</td>"
      }
      tablaHTML2+="</tr>"
    }
    tablaHTML2+="</table>"
    contenedorTablaPruebaDeLasSeries2.innerHTML=tablaHTML2
    
    let e=n/(v*v)
    let contenedorTablaPruebaDeLasSeries3=document.getElementById("contenedor-tablaPruebaDeLasSeries3");
    let tablaHTML3="<table><tr>Valores esperados E</tr>"
    for (let i=0; i<v; i++){
      tablaHTML3+="<tr>"
      for (let j=0; j<v; j++){
        tablaHTML3 += "<td>" + e + "</td>"
      }
      tablaHTML3+="</tr>"
    }
    tablaHTML3+="</table>"
    contenedorTablaPruebaDeLasSeries3.innerHTML=tablaHTML3

    let contenedorTablaPruebaDeLasSeries4=document.getElementById("contenedor-tablaPruebaDeLasSeries4");
    let tablaHTML4="<table><tr>((O-E)^2)/E</tr>"
    tablaHTML4+="<tr><th></th>"
    let incremento=1/v
    let fila=incremento
    for(let i=0; i<v; i++){
      tablaHTML4+="<th>" + fila.toFixed(1) + "</th>"
      fila+=incremento
    }
    fila=incremento
    let suma=0
    tablaHTML4+="</tr>"
    for (let i=0; i<v; i++){
      tablaHTML4+="<tr><th>" + fila.toFixed(1) + "</th>"
      for (let j=0; j<v; j++){
        tablaHTML4 += "<td>" + (Math.pow((valoresO[i][j] - e), 2) / e) + "</td>"
        suma+=(Math.pow((valoresO[i][j] - e), 2) / e)
      }
      fila+=incremento
      tablaHTML4+="</tr>"
    }
    tablaHTML4+="</table>"
    contenedorTablaPruebaDeLasSeries4.innerHTML=tablaHTML4
    let mensaje
    let contenedorSumatoria=document.getElementById("contenedor-sumatoriaPruebaDeLasSeries");
    if(v==5){
      if(suma<=36.4150){
        mensaje="<h2> Sumatoria = " + suma + " <= " + 36.4150 + " ... por lo tanto, los números SI son independientes</h2>"
      }
      else{
        mensaje="<h2> Sumatoria = " + suma + " <= " + 36.4150 + " ... por lo tanto, los números NO son independientes</h2>"
      }
    }
    else if(v==10){
      if(suma<= 118.4980){
        mensaje="<h2> Sumatoria = " + suma + " <= " +  118.4980 + " ... por lo tanto, los números SI son independientes</h2>"
      }
      else{
        mensaje="<h2> Sumatoria = " + suma + " <= " +  118.4980 + " ... por lo tanto, los números NO son independientes</h2>"
      }
    }
    contenedorSumatoria.innerHTML=mensaje

    let boton = document.getElementById('boton');
    let botonHTML="<button>Repetir</button>"
    boton.innerHTML=botonHTML

    // Agrega un evento de clic al botón
    boton.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      location.reload();
    });
    let boton2=document.getElementById('boton2');
    let botonHTML2="<button>Cambiar valor de n y repetir</button>"
    boton2.innerHTML=botonHTML2
    boton2.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      localStorage.removeItem('miArray');
      location.reload();
    });
  }
  else if(menu==4){
    let valoresAleatorios=alea
    let contenedorTablaAleatoria = document.getElementById("contenedor-tablaAleatoria");
    contenedorTablaAleatoria.innerHTML=imprimeTablaAleatoria(valoresAleatorios)
    let alfa=parseFloat(prompt("Ingrese alfa"))
    let theta=parseFloat(prompt("Ingrese theta"))
    let beta=alfa+theta
    let limiteInferior= alfa > theta ? alfa : theta
    let pf=1-theta
    let tablaHTML="<table><tr>Para alfa="+alfa+", beta="+beta+" y theta="+theta+"</tr><th>n</th><th>Ui</th><th>∈</th><th>i</th>"
    let contador=0
    for(let i=0; i<valoresAleatorios.length; i++){
      let pertenece=0
      let j=""
      if(valoresAleatorios[i]>=limiteInferior && valoresAleatorios[i]<=beta){
        pertenece=1
        j+=0
        huecosCalculaO(0)
      }
      if(pertenece==0){
        contador++
        if((i+1)==valoresAleatorios.length){
          j=contador
          huecosCalculaO(contador)
        }
        else if(valoresAleatorios[i+1]>=limiteInferior && valoresAleatorios[i+1]<=beta){
          j=contador
          huecosCalculaO(contador)
          contador=0
        }
      }
      tablaHTML+="<tr><td>" + (i+1) + "</td><td>" + valoresAleatorios[i] + "</td><td>" + pertenece + "</td><td>" + j + "</td></tr>"
    }
    tablaHTML+="</table>"
    let contenedorTablaHuecos=document.getElementById("contenedor-tablaHuecos")
    contenedorTablaHuecos.innerHTML=tablaHTML
    let tablaHTML2="<table><tr><th>i</th><th>Pi</th><th>Oi</th><th>Ei</th><th>Oi-Ei</th><th>((Oi-Ei)^2)/Ei</th></tr>"
    let sumatoriaO=0
    let ous=getO()
    for(let i=0; i<ous.length; i++){
      sumatoriaO+=ous[i]
    }
    let sumatoria=0
    for (let i=0; i<=4; i++){
      let im=""
      let p=((Math.pow((1-theta), i))*theta)
      if(i==4){
        im+=">="
        p/=theta
      }
      im+=i
      let oi=ous[i]
      let ei=sumatoriaO*p
      let final=(Math.pow(oi-ei,2))/ei
      sumatoria+=final
      tablaHTML2+="<tr><td>"+im+"</td><td>"+p+"</td><td>"+oi+"</td><td>"+ei+"<td>"+(oi-ei)+"</td><td>"+final+"</td></td></tr>"
    }
    console.log(sumatoria)
    tablaHTML2+="</table>"
    let contenedorTablaHuecos2=document.getElementById("contenedor-tablaHuecos2")
    contenedorTablaHuecos2.innerHTML=tablaHTML2
    let comparacion=evaluacionChiCuadrada(5, v)
    if(sumatoria<=comparacion){
      mensaje="<h2> Sumatoria = " + sumatoria + " <= " + comparacion + " ... por lo tanto, los números SI son independientes</h2>"
    }
    else {
      mensaje="<h2> Sumatoria = " + sumatoria + " > " + comparacion + " ... por lo tanto, los números NO son independientes</h2>"
    }
    let contenedorSumatoria=document.getElementById("contenedor-sumatoria");
    contenedorSumatoria.innerHTML=mensaje
    let boton = document.getElementById('boton');
    let botonHTML="<button>Repetir</button>"
    boton.innerHTML=botonHTML
    // Agrega un evento de clic al botón
    boton.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      location.reload();
    });
    let boton2=document.getElementById('boton2');
    let botonHTML2="<button>Cambiar valor de n y repetir</button>"
    boton2.innerHTML=botonHTML2
    boton2.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      localStorage.removeItem('miArray');
      location.reload();
    });
    
  }
  else if(menu==5){
    let valoresAleatorios=alea
    let contenedorTablaAleatoria = document.getElementById("contenedor-tablaAleatoria");
    contenedorTablaAleatoria.innerHTML=imprimeTablaAleatoria(valoresAleatorios)
    let valores=poker(getN2);
    
    let tablaHTML="<table><tr>Poker<th>n</th><th>ri</th><th>Evento</th></tr>"
    for(let i=0; i<valoresAleatorios.length; i++){
      let imprimir=valoresAleatorios[i].toString()
      let arr=imprimir.slice(0, 7)
      imprimir=arr
      tablaHTML+="<tr><td>"+(i+1)+"</td><td>" + imprimir + "</td><td>" + valores[i] + "</td></tr>"
    }
    tablaHTML+="</table>"
    let contenedorTablaPoker=document.getElementById("contenedor-tablaPoker")
    contenedorTablaPoker.innerHTML=tablaHTML

    let tablaHTML2="<table><tr><th>Evento</th><th>FO</th><th>PE</th><th>FE</th><th>((FOi-FEi)^2)/FEi</th></tr>"

    let contador=[]
    for(let i=0; i<7; i++){
      contador[i]=0
    }

    for(let i=0; i<valores.length; i++){
      if(valores[i]=="Pachuca"){
        contador[0]++
      }else if(valores[i]=="Par"){
        contador[1]++
      }else if(valores[i]=="Tercia"){
        contador[2]++
      }else if(valores[i]=="2 Pares"){
        contador[3]++
      }else if(valores[i]=="Full"){
        contador[4]++
      }else if(valores[i]=="Poker"){
        contador[5]++
      }else{
        contador[6]++
      }
    }

    let pe=[0.3024, 0.5040, 0.0720, 0.1080, 0.0090, 0.0045, 0.0001]

    let sumatoria = 0

    for(let i=0; i<7; i++){
      let evento
      if(i==0){
        evento="Pachuca"
      }else if(i==1){
        evento="Par"
      }else if(i==2){
        evento="Tercia"
      }else if(i==3){
        evento="Dos Pares"
      }else if(i==4){
        evento="Full"
      }else if(i==5){
        evento="Poker"
      }else{
        evento="Quintilla"
      }
      let fe=valoresAleatorios.length*pe[i]
      let total=(Math.pow(contador[i]-fe, 2)/fe)
      sumatoria+=total
      tablaHTML2+="<tr><td>" + evento + "</td><td>" + contador[i] + "</td><td>" + pe[i] + "</td><td>" + fe + "</td><td>" + total + "</td></tr>"
    }
    tablaHTML2+="</table>"
    let contenedorTablaPoker2=document.getElementById("contenedor-tablaPoker2")
    contenedorTablaPoker2.innerHTML=tablaHTML2
    let comparacion=evaluacionChiCuadrada(7, v)
    if(sumatoria<=comparacion){
      mensaje="<h2> Sumatoria = " + sumatoria + " <= " + comparacion + " ... por lo tanto, los números SI son independientes</h2>"
    }
    else {
      mensaje="<h2> Sumatoria = " + sumatoria + " > " + comparacion + " ... por lo tanto, los números NO son independientes</h2>"
    }
    let contenedorSumatoria=document.getElementById("contenedor-sumatoria");
    contenedorSumatoria.innerHTML=mensaje


    let boton = document.getElementById('boton');
    let botonHTML="<button>Repetir</button>"
    boton.innerHTML=botonHTML
    // Agrega un evento de clic al botón
    boton.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      location.reload();
    });
    let boton2=document.getElementById('boton2');
    let botonHTML2="<button>Cambiar valor de n y repetir</button>"
    boton2.innerHTML=botonHTML2
    boton2.addEventListener('click', function() {
      // Código que se ejecutará cuando se haga clic en el botón
      localStorage.removeItem('miArray');
      location.reload();
    });
  }
})();