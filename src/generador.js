
// Listas fijas de productos y sus precios
const productos = [
    { producto: "Origen Huila 500 g", precio: 42000 },
    { producto: "Origen Nariño 250 g", precio: 26000 },
    { producto: "Prensa francesa", precio: 95000 },
    { producto: "Origen Sierra 500 g", precio: 45000 },
    { producto: "Molino manual", precio: 120000 }
];

// Lista fija de ciudades
const ciudades = [
    "Medellín",
    "Bogotá",
    "Cali",
    "Pereira"
];

// Función para elegir un elemento aleatorio
function aleatorio(arreglo) {
    const posicion = Math.floor(Math.random() * arreglo.length);
    return arreglo[posicion];
}

// Función para generar ventas
function generarVentas(n) {

    // Determinar la cantidad de clientes diferentes
    const maxClientes = Math.max(1, Math.floor(n / 3));

    const cantidadClientes = Math.floor(
        Math.random() * maxClientes
    ) + 1;

    // Crear los clientes
    const clientes = [];

    for (let i = 1; i <= cantidadClientes; i++) {
        clientes.push("C" + String(i).padStart(3, "0"));
    }

    // Crear el arreglo de ventas
    const ventas = [];

    for (let i = 1; i <= n; i++) {

        const productoElegido = aleatorio(productos);

        const venta = {
            id: i,
            fecha: new Date().toISOString().slice(0, 10),
            cliente: aleatorio(clientes),
            producto: productoElegido.producto,
            ciudad: aleatorio(ciudades),
            cantidad: Math.floor(Math.random() * 5) + 1,
            precio: productoElegido.precio
        };

        ventas.push(venta);
    }

    return ventas;
}

module.exports = {
    generarVentas
};
  