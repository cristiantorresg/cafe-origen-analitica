const ventas = require("./datos");
console.log( "Cantidad de registros: ",ventas.length);
console.log ("Primer registro: ", ventas [0]);
console.log ("Ultimo registro: ", ventas [ventas.length -1]);
console.log ("Producto: ", ventas[4].producto);
console.table(ventas);

console.log(ventas.map(v => `[${v.ciudad}]`).join (" "));