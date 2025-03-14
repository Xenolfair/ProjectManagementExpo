// Espera a que el DOM se cargue completamente antes de ejecutar el código.
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el elemento que mostrará el nombre del usuario en el encabezado.
    const userNameToShowElement = document.getElementById('Header_Title-Username');
    // Recupera el nombre del usuario que ha iniciado sesión desde el localStorage.
    const loggedInUserName = localStorage.getItem('loggedInUser');
    // Espacio que se utilizará para separar el saludo y el nombre.
    const space = " ";

    // Verifica si hay un nombre de usuario registrado.
    if (loggedInUserName) {
        // Selecciona el elemento del encabezado donde se mostrará el saludo.
        const greetingElement = document.getElementById('Header_Title');
        // Obtiene el saludo apropiado según la hora del día.
        const greeting = getGreeting(loggedInUserName);

        // Inserta el saludo y el nombre del usuario en el elemento del encabezado.
        greetingElement.innerHTML = `${greeting},&nbsp; <span class="Purple">${loggedInUserName}</span>.`;

        // Muestra el nombre del usuario en otro elemento de la página.
        userNameToShowElement.innerHTML = `<span class="Purple">${loggedInUserName}</span>.`;
    }
});

// Función para obtener un saludo basado en la hora actual.
function getGreeting() {
    const now = new Date(); // Obtiene la fecha y hora actual.
    const hour = now.getHours(); // Extrae la hora actual (de 0 a 23).
    let greeting = ""; // Inicializa la variable del saludo.

    // Determina el saludo según la hora del día.
    if (hour >= 6 && hour < 12) {
        greeting = `Buenos días`; // Saludo para la mañana.
    } else if (hour >= 12 && hour < 18) {
        greeting = `Buenas tardes`; // Saludo para la tarde.
    } else {
        greeting = `Buenas noches`; // Saludo para la noche.
    }

    // Retorna el saludo apropiado.
    return `${greeting}`;
}

// Vuelve a esperar a que el DOM se cargue completamente antes de ejecutar este bloque.
document.addEventListener('DOMContentLoaded', () => {
    // Recupera el nombre del usuario que ha iniciado sesión desde el localStorage.
    const loggedInUserName = localStorage.getItem('loggedInUser');
    // Selecciona el elemento donde se mostrará el nombre del usuario.
    const myNameElement = document.getElementById('myName');
    
    // Inserta el nombre del usuario en el elemento correspondiente.
    myNameElement.textContent = loggedInUserName;
});