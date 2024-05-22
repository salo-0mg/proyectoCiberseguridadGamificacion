document.addEventListener("DOMContentLoaded", function () {
    var jwt = localStorage.getItem("jwt");
    if (jwt == null) {
        window.location.href = "./access.html";
        return;
    }

    function loadUser() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:4000/api/user/profile");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("x-access-token", jwt);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const user = JSON.parse(this.responseText);

                const username = document.getElementById("username");
                const birth = document.getElementById("birth");
                const email = document.getElementById("email");
                const max_score_spam = document.getElementById("max_score_spam");
                const avg_score_spam = document.getElementById("avg_score_spam");
                const count_scores_spam = document.getElementById("count_scores_spam");
                const max_score_phishing = document.getElementById("max_score_phishing");
                const avg_score_phishing = document.getElementById("avg_score_phishing");
                const count_scores_phishing = document.getElementById("count_scores_phishing");

                username.textContent = user.name + " " + user.lastname;
                email.textContent = user.email;
                birth.textContent = user.birthDate.split("T")[0];
                max_score_spam.textContent = user.maxScoreSpam;
                avg_score_spam.textContent = user.avgScoreSpam;
                count_scores_spam.textContent = user.scoreCountSpam;
                max_score_phishing.textContent = user.maxScorePhishing;
                avg_score_phishing.textContent = user.avgScorePhishing;
                count_scores_phishing.textContent = user.scoreCountPhishing;

                // Llamar a la función para dibujar la gráfica de puntajes de Spam
                drawChartSpam(user.scoresSpam);
                drawChartPhishing(user.scoresPhishing);
            } else if (this.readyState === 4) {
                console.error('Error al obtener los datos del usuario');
            }
        };
    }

    loadUser();

    // Función para dibujar la gráfica de puntajes de Spam
    function drawChartSpam(scoresSpam) {
        // Cargar la API de visualización y el paquete corechart
        google.charts.load("current", { packages: ["corechart"] });

        // Establecer la devolución de llamada para ejecutar cuando la API de visualización de Google esté cargada
        google.charts.setOnLoadCallback(function () {
            // Crear el objeto DataTable de Google Charts
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Intento');
            data.addColumn('number', 'Puntaje Spam');

            // Añadir las filas al DataTable usando los datos de puntajes de Spam del usuario
            scoresSpam.forEach(function (score, index) {
                data.addRow([`Intento ${index + 1}`, score]); // Index + 1 para mostrar el intento comenzando desde 1
            });

            // Opciones del gráfico
            var options = {
                title: 'Puntajes en Juego Spam',
                width: 300,
                height: 300
            };

            // Instanciar y dibujar el gráfico ColumnChart en el elemento con ID 'graph_score_spam'
            var chart = new google.visualization.ColumnChart(document.getElementById('graph_score_spam'));
            chart.draw(data, options);
        });
    }

    // Función para dibujar la gráfica de puntajes de Phishing
    function drawChartPhishing(scoresPhishing) {
        // Cargar la API de visualización y el paquete corechart
        google.charts.load("current", { packages: ["corechart"] });

        // Establecer la devolución de llamada para ejecutar cuando la API de visualización de Google esté cargada
        google.charts.setOnLoadCallback(function () {
            // Crear el objeto DataTable de Google Charts
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Intento');
            data.addColumn('number', 'Puntaje Phishing');

            // Añadir las filas al DataTable usando los datos de puntajes de Phishing del usuario
            scoresPhishing.forEach(function (score, index) {
                data.addRow([`Intento ${index + 1}`, score]); // Index + 1 para mostrar el intento comenzando desde 1
            });

            // Opciones del gráfico
            var options = {
                title: 'Puntajes en Juego Phishing',
                width: 300,
                height: 300
            };

            // Instanciar y dibujar el gráfico ColumnChart en el elemento con ID 'graph_score_phishing'
            var chart = new google.visualization.ColumnChart(document.getElementById('graph_score_phishing'));
            chart.draw(data, options);
        });
    }
});