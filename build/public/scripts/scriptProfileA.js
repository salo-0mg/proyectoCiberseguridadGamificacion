document.addEventListener("DOMContentLoaded", function () {
    var jwt = localStorage.getItem("jwt");
    if (jwt == null) {
        window.location.href = "./access.html";
        return;
    }

    function loadUser() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://proyectoapi-ciberseguridadgamificacion.onrender.com/api/user/profileA");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("x-access-token", jwt);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const user = JSON.parse(this.responseText);

                const username = document.getElementById("username");
                const birth = document.getElementById("birth");
                const email = document.getElementById("email");
                const avg_score_spam = document.getElementById("avg_score_spam");
                const avg_score_phishing = document.getElementById("avg_score_phishing");

                username.textContent = user.name + " " + user.lastname + " (Admin)";
                email.textContent = user.email;
                birth.textContent = user.birthDate.split("T")[0];
                avg_score_spam.textContent = user.avgUsersSpamScore;
                avg_score_phishing.textContent = user.avgUsersPhishingScore;

                // Llamar a la función para dibujar la gráfica de puntajes de Spam
                drawChartSpam(user.userSpamScores);
                drawChartPhishing(user.userPhishingScores);
            } else if (this.readyState === 4) {
                console.error('Error al obtener los datos del usuario');
            }
        };
    }

    loadUser();

    function drawChartSpam(userSpamScores) {
        google.charts.load("current", { packages: ["corechart"] });
    
        google.charts.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Usuario');
            data.addColumn('number', 'Puntaje');
    
            userSpamScores.forEach(function (score, index) {
                data.addRow([`Usuario ${index + 1}`, parseFloat(score)]);
            });
    
            var options = {
                title: 'Puntajes promedio en Juego Spam',
                width: 300,
                height: 300,
                hAxis: { title: 'Usuarios' },
                vAxis: { title: 'Puntajes Promedio' }
            };
    
            var chart = new google.visualization.ColumnChart(document.getElementById('graph_avg_score_spam'));
            chart.draw(data, options);
        });
    }
    

    function drawChartPhishing(userPhishingScores) {
        google.charts.load("current", { packages: ["corechart"] });
    
        google.charts.setOnLoadCallback(function () {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Usuario');
            data.addColumn('number', 'Puntaje');
    
            userPhishingScores.forEach(function (score, index) {
                data.addRow([`Usuario ${index + 1}`, parseFloat(score)]);
            });
    
            var options = {
                title: 'Puntajes promedio en Juego Phishing',
                width: 300,
                height: 300,
                hAxis: { title: 'Usuarios' },
                vAxis: { title: 'Puntajes Promedio' }
            };
    
            var chart = new google.visualization.ColumnChart(document.getElementById('graph_avg_score_phishing'));
            chart.draw(data, options);
        });
    }
});


