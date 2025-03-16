// Funcionalidad de Calculadora de Ahorro
function agregarCampoAhorro() {
  const simulador = document.getElementById("simulador");

  const newDiv = document.createElement("div");
  newDiv.classList.add("blockInputs");

  const newDivInteriorName = document.createElement("div");
  newDivInteriorName.classList.add("name-group");

  const newDivInteriorValue = document.createElement("div");
  newDivInteriorValue.classList.add("input-group");

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", "text");
  newInput.classList.add("input", "ahorroName");
  newInput.required = true;

  const newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "number");
  newInput2.setAttribute("name", "number");
  newInput2.classList.add("input", "ahorro");
  newInput2.required = true;

  const newLabel = document.createElement("label");
  newLabel.classList.add("user-label");
  newLabel.textContent = "Concepto";

  const newLabel2 = document.createElement("label");
  newLabel2.classList.add("user-label");
  newLabel2.textContent = "Valor (COP)";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = `<svg viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  deleteButton.onclick = function() { eliminarCampo(deleteButton); };
  newDivInteriorName.appendChild(newInput);
  newDivInteriorName.appendChild(newLabel);

  newDivInteriorValue.appendChild(newInput2);
  newDivInteriorValue.appendChild(newLabel2);

  newDiv.appendChild(newDivInteriorName);
  newDiv.appendChild(newDivInteriorValue);
  newDiv.appendChild(deleteButton);

  simulador.insertBefore(newDiv, document.querySelector(".buttons-container"));

  let currentHeight = parseInt(window.getComputedStyle(calculadoras).height);
  calculadoras.style.height = `${currentHeight + 70}px`;
}

function eliminarCampo(button) {
  button.parentElement.remove();
}

function calcularAhorro() {
  let FirstValue = parseFloat(document.getElementById("ahorro").value) || 0; // Convertir el valor inicial a número
  let totalAhorro = FirstValue; // Inicializar con el primer valor

  document.querySelectorAll(".ahorro").forEach(input => {
    if (input.type === "number" && input.id !== "ahorro") { // Ignorar el primer input ya sumado
      const valor = parseFloat(input.value) || 0;
      totalAhorro += valor;
    }
  });

  document.getElementById("resultadoAhorro").innerText = `$${totalAhorro.toFixed(2)}`;
}

//letter 
async function init () {
    const node = document.querySelector("#type-text")
    
    await sleep(1000)
    node.innerText = ""
    await node.type('💸 Tu ')
    
    while (true) {
      await node.type('ahorro anual es de:')
      await sleep(2000)
      await node.delete('ahorro anual es de:')
      await node.type('dinero anual es:')
      await sleep(2000)
      await node.delete('dinero anual es:')
    }
  }
  
//letter 
async function init () {
  const node = document.querySelector("#type-text")
  
  await sleep(1000)
  node.innerText = ""
  await node.type('💸 Tu ')
  
  while (true) {
    await node.type('proyecto cuesta:')
    await sleep(2000)
    await node.delete('proyecto cuesta:')

    await node.type('debes cobrar:')
    await sleep(2000)
    await node.delete('debes cobrar:')
  }
}


// Source code 🚩

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
  get typeInterval () {
    const randomMs = 100 * Math.random()
    return randomMs < 50 ? 10 : randomMs
  }
  
  async type (text) {
    for (let character of text) {
      this.innerText += character
      await sleep(this.typeInterval)
    }
  }
  
  async delete (text) {
    for (let character of text) {
      this.innerText = this.innerText.slice(0, this.innerText.length -1)
      await sleep(this.typeInterval)
    }
  }
}

customElements.define('type-async', TypeAsync, { extends: 'span' })


init()
