const nomeHabito = document.getElementById('nome-habito')
const adicionar = document.getElementById('adicionar')
const listaHabitos = document.getElementById('lista-habitos')
let habitos = []

adicionar.addEventListener('click', () => {
    const novoHabito = {
        nome: nomeHabito.value,
        concluido: false
    }
})


listaHabitos.addEventListener('click', (event) => {                           // sempre que clicar em algo da lista, passa um evento
    const marcar = event.target.closest('.novo-habito, .novo-habito-checado') // 'habito' recebe aonde foi o click, independente do item/div/elemento da classe (pelo closest)
    const excluir = event.target.closest('.excluir-habito')                   // 'excluir' recebe quando excluir ou seus filhos forem clicados
    
    if (!marcar) return                                                       // se marcar nao existir
    const index = Number(marcar.dataset.index)                                // 'index' recebe o data-index de marcar(click na classe)
    
    if (excluir) {                                                            // se chamar 'excluir'
        habitos = habitos.filter((x, indice) => indice !== index)             // cria um novo array filtrando, se o indice for diferente do index, poe na lista(array)

    } else if (marcar){                                                       // se chamar 'marcar'
        habitos[index].concluido = !habitos[index].concluido                  // se o habito com aquele index, for true ele fica false, se for false fica true
    }
    mostrarNaTela()
    atualizarContadores()
})