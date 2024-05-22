function login(event) {
    event.preventDefault();

    const email = document.getElementById("emailSignin").value;
    const password = document.getElementById("passwordSignin").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://proyectoapi-ciberseguridadgamificacion.onrender.com/api/auth/signin");
    xhttp.setRequestHeader("Content-Type", "application/json");

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
                            const roles = response.roles.map(role => role.name);
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
                        text: 'Error en la respuesta del servidor',
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

    return false;
}