const catalogo = require("./catalogo");

const {
  parMasCercano
} = require("./analitica");

console.log("Presupuesto de 100.000:");
console.log(parMasCercano(catalogo, 100000));

console.log("Presupuesto de 140.000:");
console.log(parMasCercano(catalogo, 140000));

console.log("Presupuesto de 40.000:");
console.log(parMasCercano(catalogo, 40000));