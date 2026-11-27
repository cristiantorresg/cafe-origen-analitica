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
  mejorSemanaBruta,
  mejorSemana,
  parMasCercano
} = require("./analitica");
const { generarVentas } = require("./generador");
const catalogo = require("./catalogo");
const { performance } = require("node:perf_hooks");

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


console.log("\n===== PRUEBAS DE MEJOR SEMANA =====");

const ventasDiarias = [
  320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
  480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
  710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

const k = 7;

// Ejecutar las dos versiones
const resultadoBruto = mejorSemanaBruta(ventasDiarias, k);
const resultadoVentana = mejorSemana(ventasDiarias, k);

console.log("Fuerza bruta:", resultadoBruto);
console.log("Ventana deslizante:", resultadoVentana);

// Comprobar que los resultados sean iguales
console.log(
  "¿Los resultados coinciden?",
  JSON.stringify(resultadoBruto) === JSON.stringify(resultadoVentana)
);


console.log("\n===== PRUEBA CON 100.000 DÍAS =====");

// Generar 100.000 días con ventas aleatorias
const diasAleatorios = Array.from(
  { length: 100000 },
  () => Math.floor(Math.random() * 1000) + 1
);

// Medir fuerza bruta
const inicioBruto = performance.now();
const resultadoGrandeBruto = mejorSemanaBruta(diasAleatorios, 7);
const finBruto = performance.now();

// Medir ventana deslizante
const inicioVentana = performance.now();
const resultadoGrandeVentana = mejorSemana(diasAleatorios, 7);
const finVentana = performance.now();

// Mostrar resultados
console.log("Resultado fuerza bruta:", resultadoGrandeBruto);
console.log("Resultado ventana deslizante:", resultadoGrandeVentana);

console.log(
  "¿Coinciden?",
  JSON.stringify(resultadoGrandeBruto) ===
    JSON.stringify(resultadoGrandeVentana)
);

// Mostrar tiempos
console.log(
  `Tiempo fuerza bruta: ${(finBruto - inicioBruto).toFixed(4)} ms`
);

console.log(
  `Tiempo ventana deslizante: ${(finVentana - inicioVentana).toFixed(4)} ms`
);


console.log("\n===== PRUEBAS DE PAR MÁS CERCANO =====");

const presupuestos = [100000, 140000, 40000];

for (const presupuesto of presupuestos) {
  console.log(`\nPresupuesto: $${presupuesto}`);

  const resultado = parMasCercano(catalogo, presupuesto);

  if (resultado === null) {
    console.log("No hay dos productos que cumplan el presupuesto.");
  } else {
    console.log("Productos:", resultado.productos);
    console.log("Total:", resultado.total);
    console.log("Dinero restante:", resultado.presupuestoRestante);
  }
}


console.log("\n===== TRAZA DE PUNTEROS: PRESUPUESTO $100.000 =====");

const preciosOrdenados = [...catalogo].sort(
  (a, b) => a.precio - b.precio
);

let izquierda = 0;
let derecha = preciosOrdenados.length - 1;
const presupuestoTraza = 100000;

while (izquierda < derecha) {
  const productoIzquierdo = preciosOrdenados[izquierda];
  const productoDerecho = preciosOrdenados[derecha];

  const suma =
    productoIzquierdo.precio + productoDerecho.precio;

  console.log({
    izquierda: productoIzquierdo.producto,
    precioIzquierda: productoIzquierdo.precio,
    derecha: productoDerecho.producto,
    precioDerecha: productoDerecho.precio,
    suma
  });

  if (suma > presupuestoTraza) {
    derecha--;
  } else {
    izquierda++;
  }
}

