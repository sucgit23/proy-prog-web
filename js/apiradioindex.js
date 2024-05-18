document.addEventListener("DOMContentLoaded", function () {
    // URL de la API de radio
    const apiUrl = "https://api.boostr.cl/radios.json";

    // Elementos del reproductor de música
    const playBtn = document.getElementById("play-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const nextBtn = document.getElementById("next-btn");
    const stationName = document.getElementById("station-name");
    const radioPlayer = document.getElementById("radio-player");

    let currentStationIndex = 0; // Índice de la estación actual

    // Función para obtener y filtrar las estaciones de radio desde la API
    function getFilteredRadioStations() {
        axios.get(apiUrl)
            .then(function (response) {
                // Manejo de la respuesta de la API
                const responseData = response.data;
                
                // Verificar si responseData tiene la propiedad 'data' que esperamos
                if (responseData.hasOwnProperty('data')) {
                    const radioStations = responseData.data;
                    
                    // Filtrar solo las estaciones que tienen una URL de transmisión válida
                    const streamingStations = radioStations.filter(station => station.stream);

                    // Verificar si streamingStations es un array
                    if (Array.isArray(streamingStations)) {
                        // Mostrar el nombre de la primera estación de radio por defecto
                        showStationName(streamingStations[currentStationIndex].name);

                        // Agregar eventos click para controlar la reproducción de música
                        playBtn.addEventListener("click", function() {
                            // Reproducir la estación de radio actual
                            radioPlayer.play();
                        });

                        pauseBtn.addEventListener("click", function() {
                            // Pausar la reproducción de audio
                            radioPlayer.pause();
                        });

                        // Agregar evento click para cambiar a la siguiente estación
                        nextBtn.addEventListener("click", function() {
                            currentStationIndex++;
                            if (currentStationIndex >= streamingStations.length) {
                                currentStationIndex = 0; // Volver al inicio si se alcanza el final
                            }
                            showStationName(streamingStations[currentStationIndex].name);
                            // Cambiar la estación de radio
                            changeRadioStation(streamingStations[currentStationIndex].stream);
                        });
                    } else {
                        console.log("La propiedad 'data' no contiene un array de estaciones de radio con transmisión:", streamingStations);
                    }
                } else {
                    console.log("La respuesta de la API no contiene la propiedad 'data':", responseData);
                }
            })
            .catch(function (error) {
                console.log("Error al obtener las estaciones de radio:", error);
            });
    }

    // Función para mostrar el nombre de la estación en el elemento HTML correspondiente
    function showStationName(name) {
        stationName.textContent = name;
    }

    // Función para cambiar la estación de radio
    function changeRadioStation(streamUrl) {
        // Verificar si la URL de la transmisión es válida
        if (streamUrl) {
            // Detener la reproducción actual (si la hay)
            radioPlayer.pause();
            // Cambiar la URL de la estación de radio
            radioPlayer.src = streamUrl;
            // Iniciar la reproducción de la nueva estación de radio
            radioPlayer.play();
        } else {
            console.error("La URL de transmisión de la estación de radio no es válida:", streamUrl);
        }
    }

    // Llamar a la función para obtener las estaciones de radio al cargar la página
    getFilteredRadioStations();
});
