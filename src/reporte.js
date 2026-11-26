const ventas = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ticketPromedio,
  ventaMayor,
  ventasPorCiudadM,
  unidadesPorProducto,
  topProductosPorValor,
} = require("./analitica");


const pesos = (valor) =>
  `$${Number(valor || 0).toLocaleString("es-CO")}`;
// Alinea etiqueta a la izquierda y valor a la derecha para verse como informe
const linea = (etiqueta, valor) =>
  `${String(etiqueta).padEnd(28, " ")} ${String(valor).padStart(16, " ")}`;

const seccion = (titulo) => {
  console.log(`\n${"=".repeat(46)}`);
  console.log(titulo.toUpperCase());
  console.log("=".repeat(46));
};

// 1. Resumen general
seccion("Resumen general");
const mayor = ventaMayor(ventas);
console.log(linea("Total vendido:", pesos(totalVendido(ventas))));
console.log(linea("Unidades vendidas:", `${unidadesVendidas(ventas)} uds`));
console.log(linea("Ticket promedio:", pesos(Math.round(ticketPromedio(ventas)))));
console.log(
  linea(
    "Venta mayor:",
    mayor ? `${mayor.producto} (${pesos(mayor.cantidad * mayor.precio)})` : "N/A"
  )
);

// 2. Ventas por ciudad (usando el método importado)
const limpiarCiudad = (ciudad) => {
  const texto = String(ciudad ?? "").trim();
  if (!texto) return "Sin ciudad";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

function totalPorCiudad(ventas) {
  return ventas.reduce((acc, v) => {
    const monto = v.cantidad * v.precio;
    const ciudad = limpiarCiudad(v.ciudad);
    acc[ciudad] = (acc[ciudad] || 0) + monto;
    return acc;
  }, {});
}

// 3. Unidades por producto (usando el método importado)
seccion("Unidades por producto");
const porProducto = unidadesPorProducto(ventas);
for (const [producto, unidades] of Object.entries(porProducto)) {
  console.log(linea(producto, `${unidades} uds`));
}

// 4. Top 3 productos por valor (usando el método importado)
seccion("Top 3 productos por valor");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach(([producto, total], i) => {
  console.log(linea(`#${i + 1} ${producto}`, pesos(total)));
});

//Ventas del día
seccion ("Ventas del día")
function ventasDelDia(ventas, fecha) {
  const filtradas = ventas.filter((v) => v.fecha === fecha);

  return {
    fecha,
    cantidadVentas: filtradas.length,
    unidades: unidadesVendidas(filtradas),
    total: totalVendido(filtradas),
  };
}

const resumen = ventasDelDia(ventas, "2026-09-01"); 

console.log(`Fecha: ${resumen.fecha}`);
console.log(`Cantidad de ventas: ${resumen.cantidadVentas}`);
console.log(`Unidades vendidas: ${resumen.unidades}`);
console.log(`Total vendido: ${pesos(resumen.total)}`);

//Días sin ventas
seccion ("Día sin venta")
const sinVentas = ventasDelDia(ventas, "2026-09-10");

console.log(`Fecha: ${sinVentas.fecha}`);
console.log(`Cantidad de ventas: ${sinVentas.cantidadVentas}`);
console.log(`Unidades vendidas: ${sinVentas.unidades}`);
console.log(`Total vendido: ${pesos(sinVentas.total)}`);