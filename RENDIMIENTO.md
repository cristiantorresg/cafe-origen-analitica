# Informe de rendimiento del motor de análisis

**Versión:** 0.2  
**Proyecto:** Motor de análisis de ventas  
**Propósito:** Documentar la complejidad temporal y espacial de las funciones del motor, comparar su rendimiento y establecer oportunidades de optimización.

## 1. Análisis de las funciones

La siguiente tabla presenta las funciones desarrolladas durante las actividades del Día 1 y las actividades posteriores. Las complejidades se expresan considerando `n` como la cantidad de ventas y `p` como la cantidad de productos diferentes.

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Operaciones o tiempo con 10.000 ventas |

| `valorVenta` | Calcula el valor de una venta multiplicando cantidad por precio. | O(1) | O(1) | Realiza una multiplicación y devuelve un número. | No aplica como reporte independiente. |
| `totalVendido` | Calcula el valor total de todas las ventas mediante un ciclo. | O(n) | O(1) | Recorre las ventas una vez y utiliza un acumulador. | PENDIENTE |
| `totalVendidoM` | Calcula el total vendido utilizando `reduce`. | O(n) | O(1) | Recorre las ventas una vez y acumula un valor numérico. | PENDIENTE |
| `unidadesVendidas` | Suma las unidades de todas las ventas mediante un ciclo. | O(n) | O(1) | Recorre el arreglo una vez y utiliza un acumulador. | PENDIENTE |
| `unidadesVendidasM` | Suma las unidades utilizando `reduce`. | O(n) | O(1) | Realiza un recorrido y conserva únicamente el acumulado. | PENDIENTE |
| `ventaMayor` | Identifica la venta con el valor más alto. | O(n) | O(1) | Compara cada venta con la mayor encontrada hasta el momento. | PENDIENTE |
| `ticketPromedio` | Calcula el promedio del valor de las ventas válidas. | O(n) | O(1) | Recorre las ventas y mantiene dos acumuladores. | PENDIENTE |
| `normalizarTexto` | Elimina espacios externos y convierte un texto a minúsculas. | O(m) | O(m) | Depende de la longitud del texto procesado, representada por m. | No aplica como reporte independiente. |
| `ventasPorCiudad` | Suma el valor de las ventas que pertenecen a una ciudad. | O(n) | O(1) | Recorre las ventas una vez y acumula los valores coincidentes. | PENDIENTE |
| `ventasPorCiudadM` | Filtra las ventas de una ciudad y suma sus valores con `reduce`. | O(n) | O(n) | `filter` crea un arreglo adicional que puede contener hasta n ventas. | PENDIENTE |
| `unidadesPorProducto` | Agrupa las unidades vendidas según cada producto. | O(n) | O(p) | Recorre las ventas y crea un objeto con los productos y sus cantidades. | PENDIENTE |
| `topProductosPorValor` | Calcula el valor vendido por producto y devuelve los primeros k productos. | O(n + p log p) | O(p) | Agrupa las ventas, convierte el objeto en un arreglo, lo ordena y obtiene los primeros k resultados. | PENDIENTE |
| `clientesRecurrentes` | Identifica los clientes que aparecen en más de una venta. | O(n³) en el peor caso | O(n) | Compara pares de ventas y utiliza `includes`, que puede recorrer el arreglo de clientes recurrentes. | PENDIENTE |
| `totalCiudadCadena` | Normaliza ciudades, filtra las ventas, calcula sus valores y los suma mediante métodos encadenados. | O(n) | O(n) | Realiza cuatro etapas de procesamiento y crea tres arreglos intermedios. | PENDIENTE |
| `totalCiudadUnaPasada` | Calcula el total de una ciudad mediante un único ciclo. | O(n) | O(1) | Recorre las ventas una vez y acumula directamente los valores sin crear arreglos intermedios. | PENDIENTE |

**Nota:** O(m) representa el costo relacionado con la longitud de un texto. En las funciones que procesan ventas, se considera que la longitud de los textos de ciudad y producto está acotada. Por eso, el análisis se centra en n, la cantidad de ventas.

## 2. Proyección

Para estimar el tiempo de ejecución con 1.000.000 de ventas, se utilizarán las mediciones obtenidas con 10.000 ventas como punto de referencia.

Las proyecciones se calculan de acuerdo con la complejidad temporal de cada función:

| Complejidad | Factor aproximado de crecimiento | Proyección para 1.000.000 de ventas |
|---|---:|---|
| O(1) | No depende de n | El tiempo permanece aproximadamente constante. |
| O(n) | 100 veces | Tiempo medido con 10.000 ventas × 100. |
| O(n log n) | 150 veces aproximadamente | Tiempo medido con 10.000 ventas × 150. |
| O(n²) | 10.000 veces | Tiempo medido con 10.000 ventas × 10.000. |
| O(n³) | 1.000.000 de veces | Tiempo medido con 10.000 ventas × 1.000.000. |

Estas proyecciones son aproximaciones teóricas. El tiempo real puede variar por las características de los datos, el hardware, el entorno de ejecución y los costos internos de las operaciones.

### Proyección de los reportes

| Función | Complejidad utilizada | Tiempo con 10.000 ventas | Estimación con 1.000.000 de ventas |
|---|---|---|---|
| `totalVendido` | O(n) | PENDIENTE | PENDIENTE |
| `totalVendidoM` | O(n) | PENDIENTE | PENDIENTE |
| `unidadesVendidas` | O(n) | PENDIENTE | PENDIENTE |
| `unidadesVendidasM` | O(n) | PENDIENTE | PENDIENTE |
| `ventaMayor` | O(n) | PENDIENTE | PENDIENTE |
| `ticketPromedio` | O(n) | PENDIENTE | PENDIENTE |
| `ventasPorCiudad` | O(n) | PENDIENTE | PENDIENTE |
| `ventasPorCiudadM` | O(n) | PENDIENTE | PENDIENTE |
| `unidadesPorProducto` | O(n) | PENDIENTE | PENDIENTE |
| `topProductosPorValor` | O(n + p log p) | PENDIENTE | PENDIENTE |
| `clientesRecurrentes` | O(n³) en el peor caso | PENDIENTE | PENDIENTE |
| `totalCiudadCadena` | O(n) | PENDIENTE | PENDIENTE |
| `totalCiudadUnaPasada` | O(n) | PENDIENTE | PENDIENTE |

## 3. Riesgos

Las funciones se ordenan según el riesgo potencial que representan cuando aumenta la cantidad de ventas. Se tienen en cuenta el crecimiento del tiempo de ejecución y el consumo de memoria adicional.

1. **`clientesRecurrentes`:** presenta el mayor riesgo en el peor caso debido a las comparaciones anidadas y al uso de `includes`, que puede recorrer el arreglo de clientes recurrentes repetidamente. Su complejidad temporal puede llegar a O(n³).

2. **`topProductosPorValor`:** necesita agrupar los productos y ordenar los resultados. Cuando aumenta la cantidad de productos diferentes, también aumenta el trabajo de ordenamiento y la memoria utilizada.

3. **`totalCiudadCadena`:** realiza cuatro etapas de procesamiento y crea tres arreglos intermedios. Aunque su complejidad temporal es O(n), puede consumir una cantidad considerable de memoria con historiales grandes.

4. **`ventasPorCiudadM`:** utiliza `filter` para crear un arreglo adicional antes de realizar la suma. Esto incrementa el consumo de memoria.

5. **`unidadesPorProducto`:** necesita almacenar un resumen de los productos y sus cantidades. Su memoria adicional depende del número de productos diferentes.

6. **`totalCiudadUnaPasada` y `ventasPorCiudad`:** recorren todas las ventas, pero no crean arreglos adicionales. Su consumo de memoria adicional es constante.

7. **`totalVendido`, `totalVendidoM`, `unidadesVendidas`, `unidadesVendidasM`, `ventaMayor` y `ticketPromedio`:** realizan recorridos lineales y utilizan variables acumuladoras, por lo que presentan un consumo de memoria adicional constante.

8. **`valorVenta` y `normalizarTexto`:** son funciones auxiliares cuyo costo depende de una operación individual y no del número total de ventas.

El criterio de clasificación considera tanto el tiempo de ejecución como la memoria adicional. Una función puede tener una complejidad temporal lineal y aun así representar un riesgo de memoria si crea arreglos u objetos de gran tamaño.

## 4. Plan de optimización

### Función seleccionada: `clientesRecurrentes`

Se identifica `clientesRecurrentes` como la principal candidata a optimización debido a que realiza comparaciones repetidas entre las ventas y utiliza `includes` para verificar si un cliente ya fue agregado al resultado.

**Trabajo que se repite:**

La función compara cada venta con las siguientes para encontrar coincidencias de clientes. Además, cuando encuentra una coincidencia, consulta el arreglo de clientes recurrentes mediante `includes`. Esta búsqueda adicional puede repetirse muchas veces y aumentar considerablemente el tiempo de ejecución.

**Información que se podría guardar:**

Se propone utilizar una estructura de tipo `Map` para almacenar cada cliente y la cantidad de veces que aparece en las ventas. De esta manera, se podría consultar y actualizar el contador de cada cliente sin volver a comparar todas las ventas entre sí.

**Mejora esperada:**

Con este enfoque se evitarían las comparaciones anidadas y las búsquedas repetitivas dentro del arreglo de resultados. La solución podría reducir la complejidad temporal promedio de la función a O(n), utilizando memoria adicional O(n) para almacenar los clientes y sus cantidades.

La optimización queda planteada como una propuesta para una siguiente versión y no se implementa en esta entrega.

## 5. Conclusión

El análisis permitió identificar que no basta con evaluar cuánto tarda una función en ejecutarse; también es importante conocer cuánta memoria adicional necesita y cómo crece su consumo cuando aumenta el volumen de información.

Las funciones que realizan recorridos lineales y utilizan acumuladores representan una alternativa eficiente para procesar grandes cantidades de ventas. Por otro lado, las funciones que crean arreglos intermedios, ordenan información o realizan comparaciones repetidas requieren mayor atención.

Como resultado, se propone priorizar la optimización de `clientesRecurrentes` y conservar alternativas de una sola pasada cuando permitan obtener el mismo resultado con un menor consumo de memoria.