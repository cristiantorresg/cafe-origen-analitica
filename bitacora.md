 ##  Día 1 Minireto 1
Diccionario de datos 

- id (int / number): Identificador único de cada venta o registro.
- fecha (string / date): Fecha en la que se realizó la transacción.
- cliente (string): Código identificador del cliente que realizó la compra.
- producto (string): Nombre y presentación del producto vendido.
- ciudad (string): Ciudad donde se efectuó o registró la venta.
- cantidad (int / number): Número de unidades vendidas del producto en esa transacción.
- precio (int / float / number): Valor por unidad del producto en pesos colombianos

Casos borde detectados

- Ciudad: La venta con el ID 5 tiene una entrada con un formato distinto, mientras las demás entradas por ciudad empiezan por mayuscula, esta empieza por minuscula. Esto hace que en la colección sea un valor distinto a "Medellín" en la clave "ciudad" ya que lo toma como el valor: "medellín".
    Decisiones posibles:

    Normalizar al cargar o procesar: Estandarizar con mayúscula inicial (ej. ciudad[0].toUpperCase() + ciudad.slice(1).toLowerCase()) o normalizar a minúsculas/mayúsculas para comparaciones (v.ciudad.trim().toLowerCase() === "medellín").

    Validar en la entrada de datos: Si estos registros vienen de un formulario o archivo externo, limpiar o rechazar formatos inconsistentes antes de guardar.

- Cantidad: LA venta con ID 8 tiene registrada una cantidad en 0, esto hace que la colección no la cuente por ejemplo si queremos sumar la cantidad total de productos vendidos.
    Decisiones posibles:

    Filtrar para métricas de ventas efectivas: Usar .filter(v => v.cantidad > 0) cuando calcule unidades vendidas, ticket promedio de compra o clientes activos.

    Conservar para auditoría o control: Mantenerlo si representa un pedido anulado, una muestra/cortesía o un error de captura que se quiere reportar aparte.

- clientes: Los clientes C01, C02, C03 tienen ventas que se repiten.

    Decisiones posibles:

    Agrupar por cliente: Usar reduce para calcular el gasto total, número de compras o productos favoritos de cada cliente (C01, C02, etc.).

    Revisar duplicados reales: Solo sería un problema de duplicado si dos registros tuvieran el mismo id o si se sospecha de un doble cobro accidental (mismo cliente, fecha, producto y cantidad muy cercanos).


   ## Día 1 Minireto 2
   Verificacion manual (tablas de traza)

 1. Traza de totalVendido(ventas)
- Valor inicial: total = 0
- Calculo por registro: valorVenta(v) = v.cantidad * v.precio

| Iteracion | id | cantidad | precio | valorVenta(v) | total acumulado |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Inicio | — | — | — | — | 0 |
| 1 | 1 | 2 | 42000 | 84000 | 84000 |
| 2 | 2 | 1 | 26000 | 26000 | 110000 |
| 3 | 3 | 1 | 95000 | 95000 | 205000 |
| 4 | 4 | 1 | 42000 | 42000 | 247000 |
| 5 | 5 | 3 | 45000 | 135000 | 382000 |
| 6 | 6 | 2 | 26000 | 52000 | 434000 |
| 7 | 7 | 1 | 120000 | 120000 | 554000 |
| 8 | 8 | 0 | 42000 | 0 | 554000 |
| 9 | 9 | 2 | 45000 | 90000 | 644000 |
| 10 | 10 | 4 | 42000 | 168000 | 812000 |
| 11 | 11 | 1 | 95000 | 95000 | 907000 |
| 12 | 12 | 3 | 26000 | 78000 | 985000 |

- Resultado manual: 985000
- Comprobacion con el programa: Coincide con el valor devuelto por totalVendido(ventas).

---

 2. Traza de ventasPorCiudad(ventas, "medellin")
- Valores iniciales: ciudadBuscada = "medellin", total = 0
- Condicion: normalizarTexto(v.ciudad) === "medellin"

| Iteracion | id | v.ciudad original | v.ciudad normalizada | ¿Coincide? | valorVenta(v) | total acumulado |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| Inicio | — | — | — | — | — | 0 |
| 1 | 1 | "Medellin" | "medellin" | Si | 84000 | 84000 |
| 2 | 2 | "Bogota" | "bogota" | No | — | 84000 |
| 3 | 3 | "Cali" | "cali" | No | — | 84000 |
| 4 | 4 | "Medellin" | "medellin" | Si | 42000 | 126000 |
| 5 | 5 | "medellin" | "medellin" | Si | 135000 | 261000 |
| 6 | 6 | "Bogota" | "bogota" | No | — | 261000 |
| 7 | 7 | "Bogota" | "bogota" | No | — | 261000 |
| 8 | 8 | "Cali" | "cali" | No | — | 261000 |
| 9 | 9 | "Cali" | "cali" | No | — | 261000 |
| 10 | 10 | "Pereira" | "pereira" | No | — | 261000 |
| 11 | 11 | "Medellin" | "medellin" | Si | 95000 | 356000 |
| 12 | 12 | "Bogota" | "bogota" | No | — | 356000 |

- Resultado manual: 356000
- Comprobacion con el programa: Coincide con el valor devuelto por ventasPorCiudad(ventas, "medellin"), incluyendo el registro id: 5 en minuscula.

## Conclusiones - Minireto 1 y Minireto 2

 Aún me estoy familiarizando con el funcionamiento de los métodos y las funciones. Me he apoyado en la IA y he investigado por mi cuenta para desglosar y entender la sintaxis, la lógica y el funcionamiento de cada recurso usado para manipular colecciones de arrays. Aunque todavía no lo domino por completo, entiendo cómo están representados los arrays y objetos, cómo importar y exportar módulos para trabajar los datos en distintos archivos, y cómo acceder a claves y valores para mostrarlos con console.log. En la parte de analítica todavía no logro construir todas las funciones desde cero por mi cuenta porque sigo afianzando la lógica de los ciclos, por lo que me apoyé en la IA para armarlas y luego desglosar cada parte y comprender qué hace cada instrucción.