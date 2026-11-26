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

 ## Día 1 minireto 3

 ¿Qué recorro? Recorro la lista de ventas (cada compra con su producto, ciudad, cantidad y precio) y, cuando armo topProductosPorValor(ventas, k), recorro cada producto con su total de dinero para ordenarlos de mayor a menor y quedarme con los k primeros.

 ¿Qué filtro? En totalVendidoM, unidadesVendidasM, ventasPorCiudadM, totalPorCiudad(ventas), unidadesPorProducto(ventas) y topProductosPorValor(ventas, k) no saco filas antes de sumar; en analitica.js solo reviso cantidades mayores a cero para el ticket promedio y comparo la ciudad ya limpia.

 ¿Qué transformo? En totalPorCiudad(ventas) limpio el texto de la ciudad quitando espacios y pasando todo a minúsculas para que "Bogotá" y "Bogotá " queden juntas; en totalVendidoM, ventasPorCiudadM y topProductosPorValor(ventas, k) saco el valor de cada venta multiplicando cantidad por precio; y en topProductosPorValor(ventas, k) convierto el objeto en pares con Object.entries() para ordenarlo sin tocar el arreglo original de ventas. 

¿Qué acumulo? Sumo toda la plata vendida en totalVendidoM, todas las unidades en unidadesVendidasM, la plata por cada ciudad en ventasPorCiudadM y totalPorCiudad(ventas), las unidades por producto en unidadesPorProducto(ventas) y la plata por producto en topProductosPorValor(ventas, k).   

¿Cómo agrupo? Uso .reduce() empezando en {} para ventasPorCiudadM, totalPorCiudad(ventas), unidadesPorProducto(ventas) y topProductosPorValor(ventas, k), poniendo la ciudad (ya limpia) o el producto como nombre de casilla para ir sumando ahí cada dato

    Conclusiones

    Hoy trabajé en analitica.js pasando funciones hechas con ciclos a métodos de arreglos. Primero convertí totalVendido, unidadesVendidas y ventasPorCiudad a versiones con .reduce() (totalVendidoM, unidadesVendidasM y ventasPorCiudadM). Después pasé a agrupaciones y rankings más completos.

    En src/verificar.js comparé cada versión con ciclos contra su versión con métodos, usando los mismos datos. Cada comparación da "OK" o "DIFERENTE". Me sirvió porque al cambiar de sintaxis es fácil dañar la lógica sin darse cuenta, y así lo veo de una.

    En totalPorCiudad y unidadesPorProducto vi que hay que normalizar los textos antes de agrupar. Si una ciudad aparece como "Bogotá" y otra vez con espacios de más o en minúscula, el programa las cuenta como grupos distintos. También entendí cómo funciona un objeto {} como acumulador dentro de .reduce(): cada clave va sumando unidades o dinero sin que tenga que crear una variable aparte por cada grupo.

    En topProductosPorValor convertí el objeto agrupado en pares clave-valor con Object.entries(), lo ordené de mayor a menor con .sort() y me quedé con los k primeros usando .slice(). Tuve que tener cuidado de no modificar el arreglo original de ventas.

    Usé la IA para armar estos puntos, pero sobre todo para que me explicara por dentro cómo funcionan estas funciones, casi palabra por palabra. Por ejemplo, en qué momento exacto se ejecuta una función auxiliar dentro de una suma, o cómo va pasando el acumulador en cada vuelta de .reduce(). Ir despacio así me ayudó a entender por qué está cada línea, y no solo a tener el código funcionando.


## Día 1 minireto 4
## Error 1: Ciudades repetidas al agrupar ("Medellín" y "medellín")
* **Síntoma:** Al agrupar las ventas por ciudad, "Medellín" aparecía separada en dos grupos distintos ("Medellín" y "medellín") en lugar de sumar todo en uno solo.
* **Entrada que lo produce:** El arreglo `ventas` de `datos.js`, donde hay registros con `"Medellín"` y otros con `"medellín"` (o textos con espacios sobrantes).
* **Hipótesis:** Si el acumulador usa `v.ciudad` directamente como clave del objeto (`acc[v.ciudad]`), JavaScript trata `"Medellín"` y `"medellín"` como claves diferentes.
* **Prueba realizada:** Se revisó la agrupación sin normalizar (`ventasPorCiudadM` tal cual) frente a agrupar usando `limpiarCiudad` dentro de `totalPorCiudad(ventas)`.
* **Causa:** Usar el texto de la ciudad sin limpiar espacios ni unificar mayúsculas y minúsculas antes de agrupar.
* **Corrección:** Se define `limpiarCiudad` para quitar espacios (`.trim()`) y dejar un formato uniforme antes de sumar en el objeto acumulador, y se llama a `totalPorCiudad(ventas)` en el reporte.

---

## Error 2: Ticket promedio `NaN` al calcular el promedio de un día sin ventas
* **Síntoma:** Al sacar el ticket promedio de una fecha sin ventas, el resultado mostraba `NaN`.
* **Entrada que lo produce:** Un conjunto de ventas vacío `[]`, como ocurre al filtrar un día sin ventas (por ejemplo, `"2026-09-10"` en `datos.js`).
* **Hipótesis:** Dividir el total vendido entre la cantidad de ventas (`total / cantidadVentas`) cuando no hay ventas produce `0 / 0`, que en JavaScript da `NaN`.
* **Prueba realizada:** Se evaluó `ventasDelDia(ventas, "2026-09-10")` (que entrega `cantidadVentas: 0`, `unidades: 0`, `total: 0`) y `ticketPromedio` en `analitica.js`, confirmando que devuelven `0` y no `NaN`.
* **Causa:** Falta de validación para evitar dividir entre cero cuando el número de ventas es `0`.
* **Corrección:** Validar que existan ventas (`cantidadVentas > 0` / `ventasValidas > 0`) antes de dividir y devolver `0` cuando no hay ventas, evitando `NaN`.

## Día 2 minireto 5

Predicción del comportamiento de las funciones

Considero que las funciones totalVendido, ventaMayor y totalPorCiudad presentan un crecimiento proporcional a la cantidad de elementos del arreglo, debido a que utilizan ciclos que recorren las ventas. Por lo tanto, si la cantidad de ventas aumenta 10 veces, espero que sus operaciones también aumenten aproximadamente 10 veces.

En cambio, considero que primeraVenta mantiene una cantidad constante de operaciones, porque únicamente comprueba si el arreglo está vacío y accede a su primera posición, sin importar cuántos elementos contenga.

Según esta predicción, espero que totalVendido, ventaMayor y totalPorCiudad tengan complejidad O(n), mientras que primeraVenta tenga complejidad O(1).

Análisis y comparación de resultados

Al realizar las mediciones con diferentes cantidades de ventas, pude comprobar que las funciones totalVendido, ventaMayor y totalPorCiudad presentan un crecimiento proporcional al tamaño del arreglo. Cuando la cantidad de ventas aumenta diez veces, el número de operaciones también aumenta diez veces, lo que confirma su complejidad O(n).

Por otra parte, la función primeraVenta mantiene siempre dos operaciones, independientemente de si el arreglo contiene 100 o 100.000 elementos. Esto demuestra que su comportamiento es constante y corresponde a una complejidad O(1).

Los resultados obtenidos coinciden con mis predicciones iniciales. Además, pude identificar que dos funciones pueden tener la misma complejidad algorítmica aunque realicen diferentes cantidades de operaciones, como sucede con totalVendido frente a ventaMayor y totalPorCiudad.