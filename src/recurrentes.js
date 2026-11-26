
const { generarVentas } = require("./generador");

const {
    clientesRecurrentes
} = require("./analitica");

const { performance } = require("node:perf_hooks");


// Cantidades de ventas que vamos a medir
const cantidades = [1000, 2000, 4000, 8000, 16000];


// Arreglo para guardar los resultados
const resultados = [];


// Ejecutar las pruebas
for (const n of cantidades) {

    console.log("\nProbando con", n, "ventas...");

    // Generar las ventas
    const ventas = generarVentas(n);

    // Nombre para identificar la medición
    const etiqueta = "Tiempo con " + n + " ventas";

    // Iniciar medición
    console.time(etiqueta);

    const inicio = performance.now();

    // Ejecutar la función
    const resultado = clientesRecurrentes(ventas);

    const fin = performance.now();

    // Finalizar medición
    console.timeEnd(etiqueta);

    // Calcular tiempo en milisegundos
    const tiempo = fin - inicio;

    // Guardar los resultados
    resultados.push({
        ventas: n,
        clientesRecurrentes: resultado.length,
        tiempoMs: Number(tiempo.toFixed(3))
    });

}


// Mostrar tabla de resultados
console.log("\nRESULTADOS DE LAS MEDICIONES");

console.table(resultados);
