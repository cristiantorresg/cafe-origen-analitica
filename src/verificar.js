const ventas = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
} = require("./analitica");

function mostrarResultado(nombre, ciclo, metodo) {
  const estado = ciclo === metodo ? "OK" : "DIFERENTE";
  console.log(`${nombre}: ${estado}`);
}

console.log("=== VERIFICACIÓN ===\n");

// 1. Total vendido
mostrarResultado("Total vendido", totalVendido(ventas), totalVendidoM);

// 2. Unidades vendidas
mostrarResultado("Unidades vendidas", unidadesVendidas(ventas), unidadesVendidasM);

// 3. Ventas por ciudad
mostrarResultado(
  "Ventas por ciudad (Medellín)",
  ventasPorCiudad(ventas, "Medellín"),
  ventasPorCiudadM("Medellín")
);

mostrarResultado(
  "Ventas por ciudad (Bogotá)",
  ventasPorCiudad(ventas, "Bogotá"),
  ventasPorCiudadM("Bogotá")
);

mostrarResultado(
  "Ventas por ciudad (Cali)",
  ventasPorCiudad(ventas, "Cali"),
  ventasPorCiudadM("Cali")
);

mostrarResultado(
  "Ventas por ciudad (Pereira)",
  ventasPorCiudad(ventas, "Pereira"),
  ventasPorCiudadM("Pereira")
);