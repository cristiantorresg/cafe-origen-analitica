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