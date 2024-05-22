document.addEventListener("DOMContentLoaded", function () {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
        window.location.href = './profile.html';
    }
});

function register(event) {
    // Evita el envío predeterminado del formulario
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const birthDate = document.getElementById("birthday").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("Confirm_password").value;

    // Verifica que el usuario tenga al menos 14 años
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (age < 14 || (age === 14 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        Swal.fire({
            text: 'Debes ser mayor de 14 años',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Evita que el formulario se envíe
    }

    // Verifica que la contraseña cumpla con los requisitos
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
        Swal.fire({
            text: 'La contraseña debe tener al menos 8 caracteres, un número y una letra mayúscula',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Evita que el formulario se envíe
    }

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        Swal.fire({
            text: 'Las contraseñas no coinciden',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Evita que el formulario se envíe
    }

    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "https://proyectoapi-ciberseguridadgamificacion.onrender.com/api/auth/signup");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        name: name,
        lastname: lastname,
        birthDate: birthDate,
        email: email,
        password: password
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log("Estado de la solicitud:", this.status);
            console.log("Respuesta del servidor:", this.responseText);
            try {
                const objects = JSON.parse(this.responseText);
                if (this.status === 200) {
                    localStorage.setItem("jwt", objects.token);
                    Swal.fire({
                        text: 'Registro Exitoso',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem("jwt"); // Eliminar el JWT
                            window.location.href = './succesRegister.html';
                        }
                    });
                } else {
                    Swal.fire({
                        text: objects.message || 'Error en el registro',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (e) {
                Swal.fire({
                    text: ("Error: "+e),
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return false; // Evita que el formulario se envíe
}
