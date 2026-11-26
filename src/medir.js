
const { generarVentas } = require("./generador");

const {
    totalVendidoInstrumentado,
    ventaMayorInstrumentada,
    totalPorCiudad,
    primeraVenta,
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./analitica");


// Cantidades de ventas que vamos a probar
const cantidades = [100, 1000, 10000, 100000];


// Arreglo para almacenar los resultados
const resultados = [];


// Recorrer las diferentes cantidades
for (const n of cantidades) {

    // Generar las ventas
    const ventas = generarVentas(n);


    // Contador para cada función
    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudad = { operaciones: 0 };
    const contadorPrimera = { operaciones: 0 };


    // Ejecutar las funciones
    totalVendidoInstrumentado(ventas, contadorTotal);

    ventaMayorInstrumentada(ventas, contadorMayor);

    totalPorCiudad(ventas, "Medellín", contadorCiudad);

    primeraVenta(ventas, contadorPrimera);


    // Guardar los resultados
    resultados.push({
        n: n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudad.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });

}



const ventas = generarVentas(10000);

const resultadoCadena = totalCiudadCadena(ventas, "Medellín");
const resultadoUnaPasada = totalCiudadUnaPasada(ventas, "Medellín");

console.log("Resultado con métodos encadenados:", resultadoCadena);
console.log("Resultado con un solo ciclo:", resultadoUnaPasada);

console.log(
  "¿Los resultados son iguales?",
  resultadoCadena === resultadoUnaPasada
);

// Mostrar la tabla
console.table(resultados);

