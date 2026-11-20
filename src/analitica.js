const ventas = require("./datos");
// Total vendido ciclo for...
const valorVenta = (venta) => venta.cantidad * venta.precio;

function totalVendido(ventas) {
  let total = 0;
  for (const v of ventas) total += valorVenta(v);
  return total;
}

// Unidades vendidas ciclo for...
function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const v of ventas) {
    unidades += v.cantidad;
  }
  return unidades;
}

// Venta mayor ciclo for...
function ventaMayor(ventas) {
  if (ventas.length === 0) return null;

  let mayor = ventas[0];
  for (const v of ventas) {
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v;
    }
  }
  return mayor;
}

// ticketPromedio
function ticketPromedio(ventas) {
  let total = 0;
  let ventasValidas = 0;

  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVenta(v);
      ventasValidas++;
    }
  }

  if (ventasValidas === 0) return 0;

  return total / ventasValidas;
}
// Ventas por ciudad

const normalizarTexto = (texto) => String(texto ?? "").trim().toLowerCase();

function ventasPorCiudad(ventas, ciudad) {
  const ciudadBuscada = normalizarTexto(ciudad);
  let total = 0;

  for (const v of ventas) {
    if (normalizarTexto(v.ciudad) === ciudadBuscada) {
      total += valorVenta(v);
    }
  }

  return total;
}



console.log("Total vendido:", totalVendido(ventas));
console.log("Unidades vendidas:", unidadesVendidas(ventas));
console.log("Venta mayor:", ventaMayor(ventas));
console.log("Ticket promedio:", ticketPromedio(ventas));
console.log("Ventas por ciudad (Medellín):", ventasPorCiudad(ventas, "Medellín"));
console.log("Ventas por ciudad (Bogotá):", ventasPorCiudad(ventas, "Bogotá"));
console.log("Ventas por ciudad (Cali):", ventasPorCiudad(ventas, "Cali"));
console.log("Ventas por ciudad (Pereira):", ventasPorCiudad(ventas, "Pereira"));