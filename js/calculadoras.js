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
  
