// Aqui voy a crear un modelo para la tarea como tal
class TaskModel {
    constructor(name, date, description) {
        // Parametros de la tarea
        this.name = name;
        this.date = date;
        this.description = description;
    }
}

// Parte de la vista del usuaruio
class TaskView {
    constructor() {
        // Elementos del formulario y la tabla donde se muestran las tareas (en la parte de abajo ya pasada la tarea)
        this.tasksForm = document.getElementById('tasksForm');
        this.tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];
    }

    // Método para agregar tarea a la tabla visual
    addTaskToTable(task) {
        // Se agrega la línea de la tarea en sí
        const newRow = this.tasksTable.insertRow();

        // Creamos un div que encierra todos los datos de la tarea como tal
        const taskBlock = document.createElement('div');
        // Definimos una clase para luego editar elementos en CSS
        taskBlock.className = 'task-block';
        // Puesto aquí debido a errores de compatibilidad
        taskBlock.style.position = 'relative';

        // Crea el SVG de la flecha como span
        const completeSvg = document.createElement('span');
        completeSvg.className = 'complete-svg'; 

        // Con el inner accedo al HTML y lo modifico, como acabo de crear el span pues agrego mis elementos
        completeSvg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve" width="18" height="18" fill="#6e91fc">
                <g>
                    <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
                </g>
            </svg>
        `;

        // Le doy la acción al tocar de tachar texto
        completeSvg.onclick = () => {
            if (taskBlock.style.textDecoration === 'line-through') {
                taskBlock.style.textDecoration = 'none';
            } else {
                taskBlock.style.textDecoration = 'line-through';
            }
        };
        
        // creo un div para el svg para evitar errores
        const titleContainer = document.createElement('div');
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';

        // Agrega el SVG al contenedor de título para luego hacer display: block;
        titleContainer.appendChild(completeSvg); 

        // Agregamos el título de la tarea
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.name;

        // Agrega el título al contenedor donde estaba el SVG
        titleContainer.appendChild(taskTitle);

        // Agregar el contenedor al bloque de la línea de la tarea
        taskBlock.appendChild(titleContainer); 

        // Creamos contenedor para la descripción y la fecha
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'description-container';

        // Agregar la descripción y la fecha
        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';

        // Lo agrego seguido de la coma
        taskDescription.textContent = `${task.description}, ${task.date}`;

        // Agregar descripción al contenedor de descripción
        descriptionContainer.appendChild(taskDescription);

        // Agregar todos los elementos al bloque de tarea inicial
        taskBlock.appendChild(descriptionContainer); 

        // Crear SVG para el botón de eliminar
        const deleteSvg = document.createElement('span');
        deleteSvg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" style="enable-background:new 0 0 512.021 512.021;" xml:space="preserve" width="13" height="13" fill="white">
                <g>
                    <path class="delete-path" d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
                </g>
            </svg>
        `;

        // Estilos para SVG de eliminar
        deleteSvg.style.position = 'absolute';
        deleteSvg.style.top = '10px';
        deleteSvg.style.right = '10px';
        deleteSvg.style.cursor = 'pointer';

        // Agregamos las transiciones de color y tamaño al SVG de eliminar de saltar y cambiar a azul, ver la página!
        deleteSvg.style.transition = 'fill 0.3s, transform 0.5s';
        deleteSvg.onmouseover = () => {
            const path = deleteSvg.querySelector('.delete-path');
            path.style.fill = '#6e91fc';
            deleteSvg.style.transform = 'scale(1.1)';
        };

        deleteSvg.onmouseout = () => {
            const path = deleteSvg.querySelector('.delete-path');
            path.style.fill = 'white';
            deleteSvg.style.transform = 'scale(1)';
        };

        // Función para eliminar la tarea visualmente cuando se le da al svg de la X
        deleteSvg.onclick = () => {
            tasksTable.deleteRow(newRow.rowIndex);
        };

        // Agregar el SVG de eliminar al bloque de tarea inicial
        taskBlock.appendChild(deleteSvg);

        // Crear celda para el bloque de tarea, se toma como solo una
        const taskCell = newRow.insertCell();
        taskCell.appendChild(taskBlock);
    }

    //estructura:
        //taskBlock -> taskTitle((titleContainer(SVG) + task.name)(descriptionContainer(taskDescription(description+date)())))

    // Metodo para resetear el formulario
    resetForm() {
        this.tasksForm.reset();
    }
}

// Parte del controlador, intermediario de la vista y la logica que tiene que ver con el local storage
class TaskController {
    constructor() {
        // Se inicializa un array vacío o se recuperan las tareas desde localStorage para evitar errores
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Se crea una instancia de la vista
        this.view = new TaskView();

        // Manejo del evento submit en el formulario, se regula
        this.view.tasksForm.onsubmit = (event) => this.handleFormSubmit(event);

        // Cargamios tareas existentes al cargar la página
        this.loadTasks();
    }

    // Cargar tareas desde el localStorage y agregarlas a la tabla
    loadTasks() {
        this.tasks.forEach(task => {
            this.view.addTaskToTable(task);
        });
    }

    // Manejo del evento de envío del formulario
    handleFormSubmit(event) {
        event.preventDefault();

        // Obtener los datos del formulario sin espacios innecesarios
        const name = document.getElementById('name').value.trim();
        const date = document.getElementById('date').value.trim();
        const description = document.getElementById('description').value.trim();

        // Validación para asegurar que los campos no estén vacíos
        if (name && date && description) {
            // Crea una nueva tarea y guardarla con el modelo que tenemos
            const task = new TaskModel(name, date, description);
            this.tasks.push(task);

            // Agregamos la tarea a la tabla
            this.view.addTaskToTable(task);
            // Guardar tareas en localStorage
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            // Limpiar el formulario
            this.view.resetForm();
        } else {
            // Mostrar alerta si los campos están vacíos
            alert('Por favor, completa todos los campos.');
        }
    }
}

// Iniciamos la aplicación al cargar el DOM para recuperar los datos antiguos y controlar los procesos
document.addEventListener('DOMContentLoaded', () => {
    new TaskController();
});
