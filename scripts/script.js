const nomeHabito = document.getElementById('nome-habito')
const adicionar = document.getElementById('adicionar')
const listaHabitos = document.getElementById('lista-habitos')
const totais = document.getElementById('totais')
const concluidos = document.getElementById('concluidos')
let habitos = []


function mostrarNaTela() {
    listaHabitos.innerHTML = ''                     // limpa a lista, pra não duplicar o que ja tem na tela

    habitos.forEach((item, index) => {               // percorre todo o array, para mostrar os nomes dos itens na tela
        listaHabitos.innerHTML += `<div class="${item.concluido? "novo-habito-checado": "novo-habito"}" data-index=${index}>
            <div class="habito-icone">
                <i class="${item.concluido? "fa-solid fa-circle-check": "fa-regular fa-circle"}"></i>
            </div>
            <div class="habito-nome">
                ${item.nome}
            </div>
            <div class="habito-excluir">
                <button class="excluir-habito"><i class="fa-solid fa-trash-can"></i> Excluir</button>
            </div>
        </div>`
    })
}

function atualizarContadores() {
    totais.textContent = `Hábitos: ${habitos.length}`                               // conta a quantidade, objetos no array
    
    const feitas = habitos.reduce((cont, num) => cont += num.concluido === true, 0) // 'feitas' recebe um reduce, que adiciona no contador +1 quando concluidos for true
    concluidos.textContent = `Concluidos: ${feitas}`                                // mostra a quantidade de concluidas
} 


adicionar.addEventListener('click', () => {
    if(nomeHabito.value === '') {                       // validação de campo vazio
        window.alert('O campo não pode estar vazio!')

    } else {        
        const novoHabito = {                            // cria um novo objeto
            nome: nomeHabito.value,
            concluido: false
        }
        habitos.push(novoHabito)                        // adiciona um objeto no array
        nomeHabito.value = ''                           // limpa o input
        mostrarNaTela()                                 // chamo a função de mostrar na tela
        atualizarContadores()                           // chamo a função de atualizar os contadores
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