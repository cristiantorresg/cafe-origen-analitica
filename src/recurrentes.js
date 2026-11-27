
const { generarVentas } = require("./generador");

const {
    clientesRecurrentes,
    clientesRecurrentesSet,
    clientesRecurrentesMap
} = require("./analitica");

const { performance } = require("node:perf_hooks");


// Cantidades de ventas que vamos a probar
const cantidades = [1000, 10000, 100000];


// Arreglo para guardar los resultados
const resultados = [];


// Funcion para medir el tiempo de ejecucion
function medirTiempo(funcion, ventas) {

    const inicio = performance.now();

    const resultado = funcion(ventas);

    const fin = performance.now();

    return {
        cantidadClientes: resultado.length,
        tiempoMs: Number((fin - inicio).toFixed(3))
    };
}


// Ejecutar las pruebas
for (const n of cantidades) {

    console.log("\nProbando con", n, "ventas...");

    // Generar los datos antes de medir
    const ventas = generarVentas(n);

    // Medir las tres versiones
    const tiempoOriginal = n <= 10000
        ? medirTiempo(clientesRecurrentes, ventas)
        : null;

    const tiempoSet = medirTiempo(clientesRecurrentesSet, ventas);

    const tiempoMap = medirTiempo(clientesRecurrentesMap, ventas);


    // Guardar resultados
    resultados.push({
        ventas: n,

        originalMs: tiempoOriginal
            ? tiempoOriginal.tiempoMs
            : "No ejecutado",

        setMs: tiempoSet.tiempoMs,

        mapMs: tiempoMap.tiempoMs
    });

}


// Mostrar tabla
console.log("\nRESULTADOS DE RENDIMIENTO");

console.table(resultados);
