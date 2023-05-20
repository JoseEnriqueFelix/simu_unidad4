import Chart from 'chart.js/auto'

function generaTablaAleatoria(n){
    let randoms=[]
    for (let i=0; i<n; i++){
        randoms.push(Math.random())
    }
    return randoms
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


(async function() {
  let precision=2
  let n=prompt("Ingrese el valor de n")
  if (!n) {
    n = prompt("Ingrese el valor de n");
    localStorage.setItem('n', n);
  }

  let k=parseInt(Math.sqrt(n))
  let e=n/k
  let valoresAleatorios=generaTablaAleatoria(n)
  // Obtén una referencia al elemento contenedor de la tabla
  let contenedorTabla2 = document.getElementById("contenedor-tabla2");

  // Crea una variable para almacenar el contenido HTML de la tabla
  let tablaHTML2 = "<table>";
  tablaHTML2 += "<tr><th>i</th><th>Valor aleatorio</th>"
  for(let i=0; i<valoresAleatorios.length; i++){
    tablaHTML2 += "<tr>"
    tablaHTML2 += "<th>" + (i+1) + "</th>"
    tablaHTML2 += "<th>" + valoresAleatorios[i] + "</th>"
    tablaHTML2 += "</tr>"
  }
  tablaHTML2 += "</table>"

  contenedorTabla2.innerHTML=tablaHTML2

  let r=Math.max(...valoresAleatorios) - Math.min(...valoresAleatorios)
  let w=r/k
  let intervalos = []
  intervalos=generaIntervalos(valoresAleatorios, w, k)
  window.valoresO=[]
  valoresO=chiCuadrada(intervalos, valoresAleatorios, k, e)
  // Obtén una referencia al elemento contenedor de la tabla
  let contenedorTabla = document.getElementById("contenedor-tabla");

  // Crea una variable para almacenar el contenido HTML de la tabla
  let tablaHTML = "<table>";

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
    tablaHTML += "<td>" + e.toFixed(precision) + "</td>";
    tablaHTML += "<td>" + (valoresO[i] - e).toFixed(precision) + "</td>";
    tablaHTML += "<td>" + (Math.pow((valoresO[i] - e), 2) / e).toFixed(precision) + "</td>";
    tablaHTML += "</tr>";
  }

  // Cierra la etiqueta de la tabla
  tablaHTML += "</table>";

  // Asigna el contenido HTML de la tabla al contenedor
  contenedorTabla.innerHTML = tablaHTML;
  let contenedor_h2=document.getElementById("contenedor-h2");
  let h2="<h2> Sumatoria = " + valoresO[valoresO.length-1] + "</h2>"
  contenedor_h2.innerHTML=h2

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
            label: "Num de o's obtenidad",
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
})();