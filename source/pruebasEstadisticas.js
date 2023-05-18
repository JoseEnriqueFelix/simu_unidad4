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
  let k=parseInt(Math.sqrt(n))
  let e=n/k
  let valoresAleatorios=generaTablaAleatoria(n)
  for(let i=0; i<valoresAleatorios.length; i++){
    console.log((i + 1) + "\t\t" + valoresAleatorios[i])
  }
  let r=Math.max(...valoresAleatorios) - Math.min(...valoresAleatorios)
  let w=r/k
  let intervalos = []
  intervalos=generaIntervalos(valoresAleatorios, w, k)
  window.valoresO=[]
  valoresO=chiCuadrada(intervalos, valoresAleatorios, k, e)
  console.log("i" + "\t\t" + "O" + "\t\t\t" + "E" + "\t\t\t" + "(O-E)" + "\t\t\t" + "((O-E)^2)/E")
  for(let i=0; i<valoresO.length-1; i++){
    console.log((i+1) + "\t\t" + valoresO[i] + "\t\t\t" + e.toFixed(precision) + "\t\t" + (valoresO[i]-e).toFixed(precision) + "\t\t\t" + (Math.pow((valoresO[i] - e), 2) / e).toFixed(precision))
  }
  console.log("La suma es: " + valoresO[valoresO.length-1])
  
  let data = []

  for (let i = 0; i < valoresO.length-1; i++) {
    let obj = { year: i+1, count: valoresO[i] }
    data.push(obj)
  }

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Chi cuadrada',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();