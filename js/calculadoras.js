// Funcionalidad de Calculadora de Ahorro
function calcularAhorro() {
    const ahorro = document.getElementById("ahorro").value;
    const resultadoAhorro = ahorro * 12;
    document.getElementById("resultadoAhorro").innerText = 
        ` $${resultadoAhorro}`;
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
    await node.type('ahorro anual es de:')
    await sleep(2000)
    await node.delete('ahorro anual es de:')
    await node.type('dinero anual es:')
    await sleep(2000)
    await node.delete('dinero anual es:')
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
