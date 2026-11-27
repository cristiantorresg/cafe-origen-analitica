const ventas = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  clientesRecurrentes,
  clientesRecurrentesSet,
  clientesRecurrentesMap,
} = require("./analitica");
const { generarVentas } = require("./generador");

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


// =======================================
// VERIFICACION DE CLIENTES RECURRENTES
// =======================================

// Funcion para ordenar y comparar resultados
function compararClientes(ventas, nombrePrueba) {

    const original = clientesRecurrentes(ventas);
    const resultadoSet = clientesRecurrentesSet(ventas);
    const resultadoMap = clientesRecurrentesMap(ventas);

    // Ordenamos los arreglos para evitar
    // diferencias causadas por el orden
    const ordenar = (clientes) => [...clientes].sort();

    const originalOrdenado = ordenar(original);
    const setOrdenado = ordenar(resultadoSet);
    const mapOrdenado = ordenar(resultadoMap);

    // Comparamos los tres resultados
    const iguales =
        JSON.stringify(originalOrdenado) ===
        JSON.stringify(setOrdenado) &&
        JSON.stringify(originalOrdenado) ===
        JSON.stringify(mapOrdenado);

    console.log("\nPRUEBA:", nombrePrueba);
    console.log("Cantidad de clientes recurrentes:", original.length);
    console.log("Original vs Set:", 
        JSON.stringify(originalOrdenado) === JSON.stringify(setOrdenado)
    );
    console.log("Original vs Map:", 
        JSON.stringify(originalOrdenado) === JSON.stringify(mapOrdenado)
    );
    console.log("Resultado general:", iguales ? "CORRECTO" : "ERROR");

    return iguales;
}


// PRIMERA PRUEBA: DATOS ORIGINALES DEL DIA 1

compararClientes(ventas, "Datos originales del Día 1");


// SEGUNDA PRUEBA: 5.000 VENTAS GENERADAS

const ventasGeneradas = generarVentas(5000);

compararClientes(ventasGeneradas, "5.000 ventas generadas");
