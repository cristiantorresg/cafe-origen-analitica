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
 console.table(ventas)

 //________________________________________________________________________


//Métodos minireto 3 Día 1

//totalVendidoM (método)
const totalVendidoM = ventas.reduce((acumulado, venta) => {
  return acumulado + (venta.cantidad * venta.precio);
}, 0);

console.log("Total vendido: ",totalVendidoM);

//unidadesVendidasM

const unidadesVendidasM = ventas.reduce((acumulado, venta) => {
  return acumulado + (venta.cantidad); 
}, 0);

console.log("Unidades vendidas:",unidadesVendidasM);

//ventasPorCiudadM

const ventasPorCiudadM = (ciudad) => {
  const ciudadBuscada = normalizarTexto(ciudad);
  const resultado = ventas
    .filter((v) => normalizarTexto(v.ciudad) === ciudadBuscada)
    .reduce((acc, v) => acc + valorVenta(v), 0);
  console.log("Método ventasPorCiudadM:", resultado);
  return resultado;
};

console.log("Total ventas por ciudad (Bogotá):", ventasPorCiudadM("Bogotá "));

// casa
//unidadesPorProducto

function unidadesPorProducto(ventas) {
  return ventas.reduce((resumen, venta) => {
    const producto = venta.producto;
    const cantidad = Number(venta.cantidad) || 0;

    resumen[producto] = (resumen[producto] || 0) + cantidad;
    return resumen;
  }, {});
}

console.log("Unidades por producto:", unidadesPorProducto(ventas));

function topProductosPorValor(ventas, k) {
  const porProducto = ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + valorVenta(v);
    return acc;
  }, {});

  return Object.entries(porProducto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k);
}
console.log(" Top productos por valor: ", topProductosPorValor(ventas, 3))

// TOTAL VENDIDO INSTRUMENTADO

function totalVendidoInstrumentado(ventas, contador) {

    let total = 0;

    for (const v of ventas) {

        contador.operaciones++;

        total += valorVenta(v);
    }

    return total;
}


// VENTA MAYOR INSTRUMENTADA

function ventaMayorInstrumentada(ventas, contador) {

    if (ventas.length === 0) return null;

    let mayor = ventas[0];

    for (const v of ventas) {

        contador.operaciones++; // Visitar un elemento

        contador.operaciones++; // Comparar valores

        if (valorVenta(v) > valorVenta(mayor)) {
            mayor = v;
        }
    }

    return mayor;
}


// TOTAL POR CIUDAD INSTRUMENTADO

function totalPorCiudad(ventas, ciudad, contador) {

    const ciudadBuscada = normalizarTexto(ciudad);

    let total = 0;

    for (const v of ventas) {

        contador.operaciones++; // Visitar un elemento

        contador.operaciones++; // Comparar ciudades

        if (normalizarTexto(v.ciudad) === ciudadBuscada) {
            total += valorVenta(v);
        }
    }

    return total;
}


// PRIMERA VENTA (COMPLEJIDAD CONSTANTE)

function primeraVenta(ventas, contador) {

    contador.operaciones++; // Comparar si el arreglo está vacío

    if (ventas.length === 0) {
        return null;
    }

    contador.operaciones++; // Acceder a la primera venta

    return ventas[0];
}


function clientesRecurrentes(ventas) {

    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {

        for (let j = i + 1; j < ventas.length; j++) {

            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {

                recurrentes.push(ventas[i].cliente);

            }
        }
    }

    return recurrentes;
}
console.log(
    "Clientes recurrentes:",
    clientesRecurrentes(ventas)
);


// CLIENTES RECURRENTES UTILIZANDO SET

function clientesRecurrentesSet(ventas) {

    // Guardará todos los clientes que ya encontramos
    const vistos = new Set();

    // Guardará los clientes que aparecen más de una vez
    const recurrentes = new Set();

    // Recorrer todas las ventas
    for (const venta of ventas) {

        const cliente = venta.cliente;

        // Comprobar si el cliente ya apareció
        if (vistos.has(cliente)) {

            // Si ya apareció, es recurrente
            recurrentes.add(cliente);

        } else {

            // Si es la primera vez, lo registramos
            vistos.add(cliente);

        }
    }

    // Convertir el Set en un arreglo
    return [...recurrentes];
}


// CONTAR COMPRAS POR CLIENTE UTILIZANDO MAP

function comprasPorCliente(ventas) {

    // Crear un Map vacío
    const compras = new Map();

    // Recorrer todas las ventas
    for (const venta of ventas) {

        const cliente = venta.cliente;

        // Obtener la cantidad de compras actuales
        const cantidadActual = compras.get(cliente) || 0;

        // Sumar una compra al cliente
        compras.set(cliente, cantidadActual + 1);
    }

    // Retornar el Map con los conteos
    return compras;
}


// OBTENER CLIENTES RECURRENTES A PARTIR DEL MAP

function clientesRecurrentesMap(ventas) {

    const compras = comprasPorCliente(ventas);

    const recurrentes = [];

    // Recorrer los clientes y sus cantidades
    for (const [cliente, cantidad] of compras) {

        // Si tiene más de una compra, es recurrente
        if (cantidad > 1) {
            recurrentes.push(cliente);
        }
    }

    return recurrentes;
}


// Total por ciudad usando map, filter, map y reduce
function totalCiudadCadena(ventas, ciudad) {
  const ciudadBuscada = normalizarTexto(ciudad);

  return ventas
    .map((venta) => ({
      ...venta,
      ciudadNormalizada: normalizarTexto(venta.ciudad)
    }))
    .filter((venta) => venta.ciudadNormalizada === ciudadBuscada)
    .map((venta) => valorVenta(venta))
    .reduce((total, valor) => total + valor, 0);
}

// Total por ciudad usando un solo ciclo
function totalCiudadUnaPasada(ventas, ciudad) {
  const ciudadBuscada = normalizarTexto(ciudad);
  let total = 0;

  for (const venta of ventas) {
    if (normalizarTexto(venta.ciudad) === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }

  return total;
}



module.exports = {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  ventasPorCiudadM,
  unidadesPorProducto,
  topProductosPorValor,
  totalVendidoInstrumentado,
  ventaMayorInstrumentada,
  totalPorCiudad,
  primeraVenta,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  clientesRecurrentesSet,
  comprasPorCliente,
  clientesRecurrentesMap
  
};

// Minireto 4 dia 1
