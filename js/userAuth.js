// Clase User que representa un usuario con nombre y contraseña.
class User {
    constructor(Name, Password) {
        this.Name = Name, // Asigna el nombre del usuario.
        this.Password = Password; // Asigna la contraseña del usuario.
    }
}

// Objeto que contiene una imagen predeterminada para usuarios.
var imgDefault =  {
    imagenes: "https://jobsaca.com.cy/wp-content/uploads/2015/05/icon-user-default.png",
};

// Función para redirigir a diferentes páginas según el parámetro 'page'.
function goto(page) {
    switch (page) {
        case "ix":
            window.location.href = "/index.html"; // Redirige a la página de inicio.
            break;
        case "hm":
            window.location.href = "/html/home.html"; // Redirige a la página de tareas.
            break;
        case 'lg':
            window.location.href = '/html/login.html'; // Redirige a la página de inicio de sesión.
            break; // Se añade un break para evitar que siga ejecutando otros casos.
        case "pl":
            window.location.href = ''; // Redirige a una página (aún no definida).
            break; // Se añade un break.
        case 'na':
            window.location.href = ''; // Redirige a otra página (aún no definida).
            break; // Se añade un break.
        default:
            console.log("Página no reconocida"); // Mensaje de error si la página no se reconoce.
    }
}

// Habilita el uso de la función goto en el contexto global.
window.goto = goto;

// Función para registrar un nuevo usuario.
function registerUser() {
    const newUserName = document.getElementById('userNameInp'); // Obtiene el elemento del nombre de usuario.
    const newPassword = document.getElementById('passwordInp'); // Obtiene el elemento de la contraseña.
    const sanitizedUsername = newUserName.value.replace(/[^\w]/g, ''); // Limpia el nombre de usuario de caracteres no válidos.
    newUserName.value = sanitizedUsername; // Asigna el nombre de usuario limpio de nuevo al input.

    const savedUsers = JSON.parse(localStorage.getItem('users')) || []; // Recupera usuarios guardados o inicializa un arreglo vacío.
    const existingUser = savedUsers.find((user) => user.Name === newUserName.value); // Busca si el nombre de usuario ya existe.

    // Verifica si el nombre de usuario o la contraseña están vacíos.
    if (newUserName.value === '' || newPassword.value === '') {
        Toastify({
            text: "¡Tu nombre de usuario o contraseña no puede estar vacía!", // Mensaje de error.
            duration: 3000, // Duración de la notificación.
            newWindow: false,
            close: true,
            gravity: "bottom", // Posición de la notificación.
            position: "right",
            style: {
                background: "#161717", // Estilo de la notificación.
            },
        }).showToast();
    } 
    // Verifica la longitud del nombre de usuario y la contraseña.
    else if (newUserName.value.length > 20 || newPassword.value.length < 5 || newUserName.value.length < 3) {
        Toastify({
            text: "¡Tu nombre y contraseña debe de ser entre 5 y 20 carácteres!", // Mensaje de error.
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#161717",
            },
        }).showToast();
    } 
    // Verifica si el nombre de usuario ya está en uso.
    else if (existingUser) {
        Toastify({
            text: "Este nombre de usuario está en uso, por favor usa otro", // Mensaje de error.
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#161717",
            },
        }).showToast();
    } else {
        const newUser = new User(newUserName.value, newPassword.value); // Crea un nuevo usuario.

        savedUsers.push(newUser); // Agrega el nuevo usuario al arreglo de usuarios.

        localStorage.setItem('loggedInUser', newUserName.value); // Guarda el nombre del usuario en sesión.

        localStorage.setItem('users', JSON.stringify(savedUsers)); // Guarda el arreglo de usuarios en localStorage.

        Toastify({
            text: "¡Tu cuenta fue creada satisfactoriamente!", // Mensaje de éxito.
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#161717",
            },
        }).showToast();

        // Redirige a la página de tareas después de 2 segundos.
        setTimeout(() => {
            window.location = '/html/home.html';
        }, 2000);
    }
}

// Función para iniciar sesión de un usuario.
function loginUser() {
    const userName = document.getElementById('userNameInpLogin'); // Obtiene el elemento del nombre de usuario de inicio de sesión.
    const password = document.getElementById('passwordInpLogin'); // Obtiene el elemento de la contraseña de inicio de sesión.
    const savedUsers = JSON.parse(localStorage.getItem('users')) || []; // Recupera usuarios guardados.
    // Busca al usuario que coincida con el nombre y la contraseña ingresados.
    const loggedInUser = savedUsers.find((user) => user.Name === userName.value && user.Password === password.value);

    // Verifica si el usuario existe y las credenciales son correctas.
    if (loggedInUser) {
        localStorage.setItem('loggedInUser', loggedInUser.Name); // Guarda el nombre del usuario que ha iniciado sesión.

        Toastify({
            text: "Iniciando sesión...", // Mensaje de inicio de sesión.
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#161717",
            },
        }).showToast();

        // Redirige a la página de tareas después de 2 segundos.
        setTimeout(() => {
            window.location = '/html/home.html';
        }, 2000);
    } else {
        // Mensaje de error si el usuario no existe o la información es incorrecta.
        Toastify({
            text: "Esta cuenta no existe o la información es incorrecta.",
            duration: 3000,
            newWindow: false,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#161717",
            },
        }).showToast();
    }
}

// Función para establecer roles de usuario.
function setRol() {
    const roles = {
        "SuperAdmin": 0, // Rol para Super Admin.
        "Admin": 1, // Rol para Administrador.
        "Moderator": 2, // Rol para Moderador.
        "Basic-User": 3 // Rol para Usuario Básico.
    }
}