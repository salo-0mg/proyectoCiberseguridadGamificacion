document.addEventListener("DOMContentLoaded", function () {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
        // Aquí podrías verificar el token y determinar el perfil adecuado, si fuera necesario
        window.location.href = './profile.html';
    }
});

function login(event) {
    // Evita el envío predeterminado del formulario
    event.preventDefault();

    const email = document.getElementById("emailSignin").value;
    const password = document.getElementById("passwordSignin").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:4000/api/auth/signin");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    localStorage.setItem("jwt", response.token);
                    Swal.fire({
                        text: 'Inicio Exitoso',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const roles = response.roles.map(role => role.name); // Extrae los nombres de los roles
                            if (roles.includes("admin")) {
                                window.location.href = './profileA.html';
                            } else if (roles.includes("user")) {
                                window.location.href = './profile.html';
                            } else {
                                Swal.fire({
                                    text: 'Rol no especificado',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                });
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error parsing response:', error);
                    Swal.fire({
                        text: 'Error en la respuesta del servidor',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                // Aquí manejamos los errores de respuesta del servidor
                console.error('HTTP error:', this.status);
                console.log('Response text:', this.responseText);

                try {
                    const response = JSON.parse(this.responseText);
                    Swal.fire({
                        text: response.message || 'Credenciales Erroneas',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } catch (error) {
                    console.error('Error parsing error response:', error);
                    Swal.fire({
                        text: 'Error en la respuesta de error del servidor',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    };

    const requestData = JSON.stringify({
        email: email,
        password: password
    });
    xhttp.send(requestData);

    return false; // Evita que el formulario se envíe
}
