// Función para cerrar sesión
function logout() {
    localStorage.removeItem("jwt"); // Elimina el JWT del localStorage
    window.location.href = "./access.html"; // Redirige a la página de acceso
}