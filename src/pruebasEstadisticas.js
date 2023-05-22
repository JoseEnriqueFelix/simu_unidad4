import Chart from 'chart.js/auto'

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
  let menu = prompt("Ingrese: 1) Chi cuadrada; 3) Prueba de las series");

  if (!menu) {
    menu = prompt("Ingrese: 1) Chi cuadrada; 3) Prueba de las series");
    localStorage.setItem('menu', menu);
  }
  let n=prompt("Ingrese el valor de n")
  let v=prompt("ingrese los grados de libertad")
  let valoresAleatorios=generaTablaAleatoria(n)
  if(menu==1){
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
    let contenedorSumatoria=document.getElementById("contenedor-sumatoria");
    
    let sumatoria="<h2> Sumatoria = " + valoresO[valoresO.length-1] + "</h2>"
    contenedorSumatoria.innerHTML=sumatoria

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
  }
  else if(menu==2){

  }
  else if(menu==3){
    let tamaño=v
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
              label: "Num de o's obtenidas",
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
    let contenedorSumatoria=document.getElementById("contenedor-sumatoriaPruebaDeLasSeries");
    
    let sumatoria="<h2> Sumatoria = " + suma + "</h2>"
    contenedorSumatoria.innerHTML=sumatoria



  }
})();