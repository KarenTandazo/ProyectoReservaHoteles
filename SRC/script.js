/* 
Array de objetos que contiene información sobre hoteles. Cada objeto representa un hotel con sus características: nombre, clasificación por estrellas y tarifas según el tipo de cliente y el día de la semana.
Args:
    Ninguno
Returns:
    Array<Object>: Array "hotels" con la información de cada hotel <Object> en formato Json
*/
let hotels = [
    {
        nombre: 'Lakewood',
        estrellas: 3,
        tarifas: {
            regular: { weekdia: 110, weekend: 90 },
            rewards: { weekdia: 80, weekend: 80 }
        }
    },
    {
        nombre: 'Bridgewood',
        estrellas: 4,
        tarifas: {
            regular: { weekdia: 160, weekend: 60 },
            rewards: { weekdia: 110, weekend: 50 }
        }
    },
    {
        nombre: 'Ridgewood',
        estrellas: 5,
        tarifas: {
            regular: { weekdia: 220, weekend: 150 },
            rewards: { weekdia: 100, weekend: 40 }
        }
    }
];

function iconosEstrellas(calificacion) {
    /* 
    Genera HTML con íconos de estrellas que representan la clasificación de un hotel.
    Args:
        calificacion(number): Cantidad de estrellas en el objeto "Hotel"
    Returns:
        HTML: Código HTML con los íconos de estrellas en Font Awesome.
    */
    let stars = '';
    for (let i = 0; i < calificacion; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    return stars;
}

document.addEventListener("DOMContentLoaded", function() {
    /* 
    Genera una tabla en HTML con la información detallada de cada hotel y la añade al contenedor especificado, cuando el DOM fue cargado completamente. 
    Args:
        Listener cuando el DOM ha sido completamente cargado.
    Returns:
        HTML: Código HTML en diseño de tabla con la información de cada hotel.
    */
    let contenedor = document.querySelector(".detalleHoteles");
    hotels.forEach(hotel => {
        let tablaHotel = document.createElement("table");        
        tablaHotel.innerHTML = `
            <tbody>
                <tr>
                    <td class="imagen" rowspan="3" style="background-image: url('./ASSETS/IMAGENES/${hotel.nombre}.jpg');">
                    </td>
                    <td class="nombreHotel" colspan="3">
                        <h3>${hotel.nombre}</h3>
                    </td>
                </tr>
                <tr class="titulosHotel">
                    <td>Rate</td>
                    <td colspan="2">Tarifas</td>
                </tr>
                <tr>
                    <td>
                        <p>${iconosEstrellas(hotel.estrellas)}</p>
                    </td>
                    <td>
                        <h4>Lunes a Viernes</h4>
                        <p>Regular: $ ${hotel.tarifas.regular.weekdia} x persona</p>
                        <p>Rewards: $ ${hotel.tarifas.rewards.weekdia} x persona</p>
                    </td>
                    <td>
                        <h4>Fines de semana</h4>
                        <p>Regular: $ ${hotel.tarifas.regular.weekend} x persona</p>
                        <p>Rewards: $ ${hotel.tarifas.rewards.weekend} x persona</p>
                    </td>
                </tr>
            </tbody>   
        `;
        contenedor.appendChild(tablaHotel);
    });
});

let toggleSwitch = document.getElementById('toggle-switch');
function obtenerTipoCliente() {
    /*
    Función para determinar el tipo de cliente de acuerdo al estado de toogle.
    Args:
        Estado del elemento 'toggle-switch'.
    Returns:
        string: "rewards" si el interruptor está activado (checked), "regular" si no lo está.
    */
    if (toggleSwitch.checked) {
        return 'rewards';
    } else {
        return 'regular';
    }
}
function isWeekend(date){
    /*
    Función para determinar si un día es fin de semana
    Args:
        date (string): Una cadena de texto que representa una fecha.
    Returns:
        boolean: "True" si la fecha es un sábado (6) o domingo (0).
    */
    let d = new Date(date);
    let dia = d.getUTCDay();
    return dia === 0 || dia === 6;
};


let rangoFechas = (fechaInicio, fechaFin) => {
    /*
    Crea un Array con todas las fechas entre dos fechas dadas, incluyendo las mismas.
    Args:
        fechaInicio (string): La fecha de inicio en formato (YYYY-MM-DD).
        fechaFin (string): La fecha de fin en formato (YYYY-MM-DD).
    Returns:
        Array<string>: Un array de strings, donde cada string representa una fecha en el rango de fechas, en formato (YYYY-MM-DD).
    */
    let dates = [];
    let fechaActual = new Date(fechaInicio);
    let ultimoDia = new Date(fechaFin);

    while (fechaActual <= ultimoDia) {
        dates.push(fechaActual.toISOString());
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return dates;
};

let calcularTarifa = (hotel, tipoCliente, dates) => {
    /*
    Calcula la tarifa de alojamiento en un hotel
    Args:
        hotel<object>: El objeto hotel del array Hotels con sus propiedades.
        tipoCliente(string): El tipo de cliente "Regular" o "Reward"
        dates(Array<string>): Un Array con el rango de fechas ingresadas por el user.
    Returns:
        number: Suma total de las tarifas de los distintos días del rango de fechas, tomando en cuenta el tipo de cliente.
    */
    return dates.reduce((total, date) => {
        let diaTarifa = isWeekend(date) ? 'weekend' : 'weekdia';
        return total + hotel.tarifas[tipoCliente][diaTarifa];
    }, 0);
};

let mejorOpcionHotel = () => {
    /* Función principal para encontrar el hotel más barato */
    let tipoCliente = obtenerTipoCliente(); 
    let fechaInicio = document.getElementById('fecha-inicio').value;
    let fechaFin = document.getElementById('fecha-fin').value;

    if (!fechaInicio || !fechaFin) {
        /*
        Verifica si los campos de fechaInicio y fechaFin no traen un valor
        Args:
            fechaInicio (string): La fecha de inicio en formato (YYYY-MM-DD).
            fechaFin (string): La fecha de fin en formato (YYYY-MM-DD).
        Returns:
            HTML: Código HTML con un mensaje de alerta para que el usuario llene los campos faltantes.
        */
        document.getElementById('result').innerHTML = `
        <h4 class="textoRespuesta">Por favor, llena todas las fechas para realizar tu consulta</h4>
        `;
        return;
    }

    let fechaInicioDate = new Date(fechaInicio);
    let fechaFinDate = new Date(fechaFin);

    if (fechaInicioDate > fechaFinDate) {
        /*
        Verifica si la fecha de inicio es anterior a la fecha de Fin
        Args:
            fechaInicio (string): La fecha de inicio en formato (YYYY-MM-DD).
            fechaFin (string): La fecha de fin en formato (YYYY-MM-DD).
        Returns:
            HTML: Código HTML con un mensaje de alerta para el usuario notificando que la fecha de ingreso debe ser anterior a la fecha de salida.
        */
        document.getElementById('result').innerHTML = `
        <h4 class="textoRespuesta">La fecha de Check-In debe ser anterior o igual a la fecha de Check-out</h4>
        `;
        return;
    }

    let dates = rangoFechas(fechaInicio, fechaFin);

    let hotelesConTarifas = [];

    hotels.forEach(hotel => {
        /*
        Bucle para obtener la tarifa calculada de cada hotel y guardarlo en un nuevo Array.
        Args:
            Array<Object>: Array "hotels" con la información de cada hotel <Object> en formato Json.
        Returns:
            Array<Object>: Array "hotelesConTarifas" con la información de cada hotel <Object>, añadiendo la tarifa calculada, en formato Json
        */
        let tarifa = calcularTarifa(hotel, tipoCliente, dates);
        hotelesConTarifas.push({
            nombre: hotel.nombre,
            estrellas: hotel.estrellas,
            tarifas: hotel.tarifas,
            tarifaCalculada: tarifa
        });
    });

    hotelesConTarifas.sort((a, b) => {
        /*
        Ordena los hoteles por tarifa ascendente y, en caso de empate, ordena los hoteles por cantidad de estrellas descendente
        Args:
            Array<Object>: Array "hotelesConTarifas" con la información de cada hotel <Object> en formato Json.
        Returns:
            Array<Object>: Array "hotelesConTarifas" con la información de cada hotel <Object> en formato Json ordenados por tarifa ascendente y, de ser el caso, estrellas descendente.
        */
        if (a.tarifaCalculada === b.tarifaCalculada) {
            return b.estrellas - a.estrellas;
        }
        return a.tarifaCalculada - b.tarifaCalculada;
    });

    let diasOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        /*
        Obtiene el día de la semana que corresponde a una fecha dada
        Args:
            fechaInicio (string): La fecha de inicio en formato (YYYY-MM-DD).
            fechaFin (string): La fecha de fin en formato (YYYY-MM-DD).
        Returns:
            string: Día de la semana al que corresponde fechaInicio y fechaFin.
        */
    let diaInicio = diasOfWeek[fechaInicioDate.getUTCDay()];
    let diaFin = diasOfWeek[fechaFinDate.getUTCDay()];

    let htmlResult = `
        <h4 class="textoRespuesta">La mejor opción para tu alojamiento es:</h4>
        <div id="respuesta1">
            <div id="card" class="imagen imagensalta" rowspan="3" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./ASSETS/IMAGENES/${hotelesConTarifas[0].nombre}.jpg');">
            </div>
            <div class="opcioneslujo2">
                <h3 id="mejorOpcion">${hotelesConTarifas[0].nombre}</h3>
                <p class="ubicacion">${iconosEstrellas(hotelesConTarifas[0].estrellas)}</p>
                <div>
                    <h5 class="ubicacion">Rango de fechas:</h5>
                    <p class="ubicacion"> ${diaInicio} (${fechaInicio}) al ${diaFin} (${fechaFin})</p>
                    <h5 class="ubicacion">Total de días:  </h5>
                    <p class="ubicacion">${dates.length}</p>
                    <h5 class="ubicacion">Valor Total: </h5>
                    <p class="ubicacion">$ ${hotelesConTarifas[0].tarifaCalculada} x persona</p>
                </div>
            </div>
        </div>
    `;

    htmlResult += `<h4 class="textoRespuesta">Otras opciones de alojamiento:</h4>`;
    for (let i = 1; i < hotelesConTarifas.length; i++) {
        let hotel = hotelesConTarifas[i];
        htmlResult += `
            <div class="respuesta">
                <div id="card" class="imagen imagensalta" rowspan="3" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./ASSETS/IMAGENES/${hotel.nombre}.jpg');">
                </div>
                <div class="opcioneslujo2">
                    <h3>${hotel.nombre}</h3>
                    <p class="ubicacion">${iconosEstrellas(hotel.estrellas)}</p>
                    <div>
                        <h5 class="ubicacion">Rango de fechas:</h5>
                        <p class="ubicacion"> ${diaInicio} (${fechaInicio}) al ${diaFin} (${fechaFin})</p>
                        <h5 class="ubicacion">Total de días:  </h5>
                        <p class="ubicacion">${dates.length}</p>
                        <h5 class="ubicacion">Valor Total: </h5>
                        <p class="ubicacion">$ ${hotel.tarifaCalculada} x persona</p>
                    </div>
                </div>
            </div>
        `;
    } 

    document.getElementById('result').innerHTML = htmlResult;
        /*
        Inserta el contenido HTML generado en el DOM una vez que todo el HTML requerido ha sido generado y concatenado en la variable "htmlResult"
        Args:
            HTML: Código HTML generado y concatenado en la variable "htmlResult"
        Returns:
            HTML: Código HTML con la información de la respuesta solicitada de cada hotel.
        */
};
