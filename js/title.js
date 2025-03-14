class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        // Inicializa el elemento donde se mostrará el texto (txtElement),
        // las palabras que se van a escribir (words), y el tiempo de espera (wait).
        this.txtElement = txtElement; // Elemento HTML donde se mostrará el texto.
        this.words = words; // Array de palabras que se van a escribir.
        this.txt = ''; // Texto actual que se está escribiendo.
        this.wordIndex = 0; // Índice de la palabra actual en el array.
        this.wait = parseInt(wait, 10); // Tiempo de espera entre palabras (convertido a número).
        this.type(); // Llama al método para empezar a escribir.
        this.isDeleting = false; // Indica si se está eliminando el texto.
    }

    type() {
        // Índice actual de la palabra (se asegura que esté dentro del rango del array).
        const current = this.wordIndex % this.words.length;
        // Obtiene el texto completo de la palabra actual.
        const fullTxt = this.words[current];

        // Verifica si se está eliminando texto.
        if (this.isDeleting) {
            // Si está eliminando, quita un carácter del texto.
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Si no está eliminando, añade un carácter al texto.
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Inserta el texto actual en el elemento HTML.
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Velocidad inicial de escritura.
        let typeSpeed = 300;

        // Si está eliminando, reduce la velocidad de escritura.
        if (this.isDeleting) {
            typeSpeed /= 2; // Reduce la velocidad a la mitad.
        }

        // Si la palabra está completa.
        if (!this.isDeleting && this.txt === fullTxt) {
            // Pausa al final de la palabra.
            typeSpeed = this.wait; // Espera el tiempo definido antes de empezar a eliminar.
            // Cambia el estado a "eliminando".
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            // Si ha terminado de eliminar.
            this.isDeleting = false; // Cambia el estado a "no eliminando".
            // Aumenta el índice a la siguiente palabra.
            this.wordIndex++;
            // Pausa antes de comenzar a escribir la siguiente palabra.
            typeSpeed = 500; // Tiempo de pausa entre palabras.
        }

        // Llama al método type después de un tiempo determinado.
        setTimeout(() => this.type(), typeSpeed); // Se usa recursión para continuar el proceso.
    }
}

// Inicializa al cargar el DOM.
document.addEventListener('DOMContentLoaded', init);

// Función para iniciar la aplicación.
function init() {
    const txtElement = document.querySelector('.txt-type'); // Selecciona el elemento donde se escribirá el texto.
    const words = JSON.parse(txtElement.getAttribute('data-words')); // Obtiene las palabras desde el atributo data-words.
    const wait = txtElement.getAttribute('data-wait'); // Obtiene el tiempo de espera desde el atributo data-wait.
    // Inicializa el TypeWriter con los elementos obtenidos.
    new TypeWriter(txtElement, words, wait);
}
