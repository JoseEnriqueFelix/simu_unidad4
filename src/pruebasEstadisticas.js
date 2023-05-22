import Chart from 'chart.js/auto'

let chiCuadrada_5=new Map()
chiCuadrada_5.set("5", 11.0705)
chiCuadrada_5.set("6", 12.5916)
chiCuadrada_5.set("7", 14.0671)
chiCuadrada_5.set("8", 15.5073)
chiCuadrada_5.set("9", 16.9190)
let chiCuadrada_10=new Map()
chiCuadrada_10.set("5", 9.2363)
chiCuadrada_10.set("6", 10.6446)
chiCuadrada_10.set("7", 12.0170)
chiCuadrada_10.set("8", 13.3616)
chiCuadrada_10.set("9", 14.6837)

const kolmogorov_5 = [0.22743, 0.22425, 0.22119, 0.21826, 0.21544, 0.21273, 0.21012, 0.20760, 0.20517,
  0.20283, 0.20056, 0.19837, 0.19625, 0.19420, 0.19221, 0.19028, 0.18841];
const kolmogorov_10 = [0.21472, 0.20185, 0.19910, 0.19646, 0.19392, 0.19148, 0.18913, 0.18687, 0.18468,
   0.18257, 0.18051, 0.17856, 0.17665, 0.17481, 0.17301, 0.17128, 0.16959];

function generaTablaAleatoria(n){
    let randoms=[]
    for (let i=0; i<n; i++){
        randoms.push(Math.random())
    }
    return randoms
}

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

(async function() {
  let menu = prompt("Ingrese:\n 1) Chi cuadrada  2)Prueba de Kolmogorov  3) Prueba de las series");

  if (!menu) {
    menu = prompt("Ingrese:\n 1) Chi cuadrada; 2)Prueba de Kolmogorov; 3) Prueba de las series");
    localStorage.setItem('menu', menu);
  }
  let n
  let v
  if(menu==6){
    window.close()
  }
  else{
    n=prompt("Ingrese el valor de n")
    v=prompt("ingrese el % de fallo:\n 1) 5%  2)10%")
    if(v==1){
      v=5
    }
    else if(v==2){
      v=10
    }
  }

  if(menu==1){
    let valoresAleatorios=generaTablaAleatoria(n)
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
  }
  else if(menu==2){
    let valoresAleatorios=generaTablaAleatoria(n)
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
  }
  else if(menu==3){
    let valoresAleatorios=generaTablaAleatoria(n)
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
  }
  else if(menu==4){

  }
  else if(menu==5){

  }
})();