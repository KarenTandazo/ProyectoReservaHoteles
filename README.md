# Evaluación técnica - Desafío de Reservación de Hoteles
## Descripción

Este proyecto permite la búsqueda del hotel más barato entre 3 hoteles tomando como datos iniciales las fechas de reserva y el tipo de cliente. El resultado muestra, en orden ascendente, las tarifas de cada hotel entre el tipo de cliente y las fechas proporcionadas. En caso de empate, se muestra el hotel con la calificación (estrellas) más alta como primera opción.

## Instrucciones para ejecutar el programa

Abre el archivo 'index.html' en tu navegador para usar el programa.

## Diseño de la solución

### Estructura del módulo

````bash
ProyectoReservaHoteles
|-- ASSETS/
|    |- IMAGENES/
|        |__ Bridgewood.jpg 
|        |__ Lakewood.jpg 
|        |__ Ridgewood.jpg
|        |__ LOGOMIAMI.png 
|        |__ LOGOMIAMI0.png 
|        |__ MIAMIBEACH.jpg
|        |__ MIAMITRAVEL.png
|    |- ICONOS/
|        |__ Group 254.svg
|
|-- CSS/
|    |__ style.css
|
|-- SRC/
|    |__ script.js
|
|__ index.html
|__ README.md    
````
### Interfaz de Usuario

Se creó un formulario en la parte inicial (Portada) de la LandingPage con los siguiente campos: 
- Fecha de ingreso (Check-In) y Fecha de salida (Check-Out): Un campo de texto (input, tipo "date") para que el usuario ingrese la fecha deseada en formato (YYYY-MM-DD) mediante un calendario desplegable.
- Tipo de cliente: Mediante un componene "toggle" el usuario puede confirmar si se trata de un "Cliente con recompensas (Rewards)" o un cliente regular.
- Botón de Búsqueda: Un botón para enviar el formulario y obtener la tarifa de alojamiento en orden ascendente.

Resultado:

Un área de visualización (div) que muestra las tarifas de alojamiento en orden ascendente basado en el cálculo, mostrando como "La mejor opción de alojamiento" a la primera respuesta, y los demás recultados como "Otras opciones:"

### Lógica de la Aplicación

El buscador de Reservas está diseñado a base de JavaScript con Json.
Se inició con la estructuración de un Array con los hoteles como objetos con sus propiedades o atributos de acuerdo a la información proporcionada.

Como siguiente paso, se codifica mediante JavaScript la inserción de código HTML con la información de cada hotel en formato de tablas. Se usa este recurso con el fin que en caso de aumentar la cantidad de hoteles disponibles o modificar la información de alguno de ellos, el programa itere en todo el Array y muestre la nueva información sin necesidad de alterar el código.

Para la codificación del formulario, se tomó en cuenta los siguientes aspectos y validaciones y se realizó la siguiente ejecución:
- Procesamiento de Fechas: 
    - La función rangoFechas convierte la entrada de fecha inicial y final en un rango de fechas, creando un Array donde cada string representa una fecha en el rango de fechas, en formato (YYYY-MM-DD). 
    - La función isWeekend determina si un día es fin de semana usando el método .getUTCDay y realizando una validación donde 0 = Domingo y 6 = Sábado. La función nos retorna un boolean.
- Tipo de cliente: La función obtenerTipoCliente determina el tipo de cliente de acuerdo al estado de toogle. Si el toggle is checked retornará "rewards", caso contrario "regular".
- Cálculo de Tarifas: La función calcularTarifa calcula la tarifa de alojamiento en un hotel tomando como argumentos el objeto "hotel" del array "Hotels", el tipo de cliente y el Array con el rango de fechas. La función nos retorna el valor final de la sumatoria de la tarifa de cada día del rango de fechas, tomando en cuenta si el día corresponde a fin de semana o día de semana.
- Cálculo de la Tarifa Total: La función mejorOpcionHotel realiza los siguientes pasos:
    - Iteración sobre Hoteles: Recorre todos los hoteles disponibles y calcula la tarifa total para cada uno basado en las fechas y el tipo de cliente y crea un nuevo Array con con la información de cada hotel (Object), añadiendo la tarifa calculada.
    - Comparación de Tarifas: Compara la tarifa total calculada para cada hotel y las ordena de forma ascendente. En caso de empate (misma tarifa), se ordenan los hoteles empatados de forma descendente de acuerdo a la calificación (estrellas).

Resultado:

Un área de visualización (div) que muestra las tarifas de alojamiento basado en el cálculo. El bloque de código del resultado se divide en 3 instancias:
- Día de la semana: Obtiene el día de la semana de la fecha de ingreso y fecha de salida mediante el método .getUTCDay que nos retorna un valor numérico que corresponde al index de Array diasOfWeek.
- Contenido HTML: Genera 2 bloques de código HTML que corresponden a:
    - Hotel más barato: Muestra bajo el título "La mejor opción para tu alojamiento es:" la información del hotel con la mejor tarifa, arrojando nombre, calificación como estrellas visuales, rango de fechas con día de la semana que corresponda, total de días y Tarifa total por persona.
    - Iteración sobre los demás Hoteles: Recorre los demás hoteles disponibles y genera un bloque de cógido HTML con nombre, calificación como estrellas visuales, rango de fechas con día de la semana que corresponda, total de días y Tarifa total por persona.

#### Validaciones del formulario

Se realizan 2 validaciones para la ejecución del cálculo de la Tarifa Total (función mejorOpcionHotel) que corresponde a:
- Campos de fechas llenos: Se ejecuta un condicional 'if' para validar si los valores de fechaInicio o fechaFin se encuentran vacíos. De ser así, inserta contenido HTML con un mensaje de alerta para que el usuario llene los campos faltantes.
- Fecha de ingreso anterior a fecha de salida: Se ejecuta un condicional 'if' para validar si el valor de fechaInicio es mayor a fechaFin. De ser así, inserta contenido HTML con un mensaje de alerta para el usuario notificando que la fecha de ingreso debe ser anterior o igual a la fecha de salida.

## Legibilidad y Mantenimiento

- Código Modular: El código está segmentado en funciones específicas que manejan tareas particulares, facilitando la comprensión y el mantenimiento.
- Comentarios y Nombres Claros: Las variables y funciones tienen nombres descriptivos y el código está comentado para explicar la lógica, mejorando la legibilidad.

### Facilidad de Extensión:

- Escalabilidad: La estructura del código permite añadir nuevos hoteles o modificar tarifas fácilmente sin cambios drásticos en la lógica existente.
- Adaptabilidad: Se pueden adaptar los cálculos y formatos de entrada sin necesidad de rediseñar la interfaz.

### Interfaz de Usuario:

- Simplicidad: La interfaz está diseñada para ser simple y directa, evitando distracciones y facilitando la entrada de datos y la visualización de resultados.

## Referencias
Las imágenes e íconos utilizadas para este proyecto han sido tomadas de:
- Microsoft. Logotipo, isotipo e imagotipo de empresa ficticia de reservación de hoteles. Generada por Microsoft Designer, 2024.
- Booking.com. (n.d.). Lakewood Residence. Recuperado de https://www.booking.com/hotel/lk/lakewood-residence.es.html 
- Booking.com. (n.d.). Bridgewood Manor Hotel. Recuperado de https://www.booking.com/hotel/gb/bridgewoodmanor.es.html 
- TripAdvisor. “Ridgewood Hotel.”. Recuperado de: https://www.tripadvisor.com.ve/Hotel_Feature-g298445-d589848-zft9165-Ridgewood_Hotel.html 
- Font Awesome. (n.d.). Font Awesome: The iconic font and CSS toolkit. Recuperado de https://fontawesome.com/ 

## Autor
Karen Tandazo Reyes - karen_tandazo22@hotmail.com