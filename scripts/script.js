const nomeHabito = document.getElementById('nome-habito')
const adicionar = document.getElementById('adicionar')
const listaHabitos = document.getElementById('lista-habitos')
const totais = document.getElementById('totais')
const concluidos = document.getElementById('concluidos')
const filtroTodos = document.getElementById('filtro-todos')
const filtroPendentes = document.getElementById('filtro-pendentes')
const filtroConcluidos = document.getElementById('filtro-concluidos')
const limparLista = document.getElementById('limpar-lista')

let filtroAtual = 'todos'                                           // guarda qual filtro o usuário escolheu

let habitos = JSON.parse(localStorage.getItem('habitos')) || []     // recuprando localStorage e convertendo novamente
mostrarNaTela()
atualizarContadores()

//FUNÇÕES
function mostrarNaTela() {
    listaHabitos.innerHTML = ''                                     // limpa a lista, pra não duplicar o que ja tem na tela

    let habitosParaMostrar = habitos.map((item, index) => {         // map percorre o array e cria um novo objeto para cada hábito (um bojeto dentro do outro)
        return {                                                    // retorna item(que é um objeto de habitos) e index(o indice desse habito que fica salvo)
            item: item,
            index: index
        }
    })

    if (filtroAtual === 'pendentes') {
        habitosParaMostrar = habitosParaMostrar.filter(item => item.item.concluido === false)       // filter faz a validação se está concluida ou nao

    } else if (filtroAtual === 'concluidos') {
        habitosParaMostrar = habitosParaMostrar.filter(item => item.item.concluido === true)        // o primeiro item é um auxiliar pelo map, o segundo é o objeto original
    }


    habitosParaMostrar.forEach((item) => {                          // percorre todo o array, para mostrar os nomes dos itens na tela

    const habito = item.item                                        // acessa o hábito original que foi guardado dentro do objeto auxiliar
    const index = item.index                                        // recupera o indice original do habito

        listaHabitos.innerHTML += `<div class="${habito.concluido? "novo-habito-checado": "novo-habito"}" data-index=${index}>
            <div class="habito-icone">
                <i class="${habito.concluido? "fa-solid fa-circle-check": "fa-regular fa-circle"}"></i>
            </div>
            <div class="habito-nome">
                ${habito.nome}
            </div>
            <div class="habito-editar">
                <button class="editar-habito"><i class="fa-solid fa-pen"></i> Editar</button>
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

function salvarHabitos() {
    localStorage.setItem('habitos', JSON.stringify(habitos))    // criando localStorage e convertendo
}

//BOTÕES
adicionar.addEventListener('click', () => {
    if(nomeHabito.value === '') {                       // validação de campo vazio
        window.alert('O campo não pode estar vazio!')

    } else {        
        const novoHabito = {                            // cria um novo objeto
            nome: nomeHabito.value,
            concluido: false
        }
        habitos.push(novoHabito)                        // adiciona um objeto no array

        salvarHabitos()                                 // chamando a função do localStorage

        nomeHabito.value = ''                           // limpa o input
        mostrarNaTela()                                 // chamo a função de mostrar na tela
        atualizarContadores()                           // chamo a função de atualizar os contadores
    }
})


// um evento pra cada botão, cada botão passa um valor para a variavel filtroAtual e atualiza a tela
filtroTodos.addEventListener('click', (event) => {
    filtroAtual = 'todos'
    mostrarNaTela()
})

filtroPendentes.addEventListener('click', (event) => {
    filtroAtual = 'pendentes'
    mostrarNaTela()
})

filtroConcluidos.addEventListener('click', (event) => {
    filtroAtual = 'concluidos'
    mostrarNaTela()
})

limparLista.addEventListener('click', (event) => {
    habitos = habitos.filter(item => item.concluido === false)                // remove da lista original, todos os ja concluidos
    salvarHabitos()                                                           
    mostrarNaTela()
    atualizarContadores()
})


listaHabitos.addEventListener('click', (event) => {                           // sempre que clicar em algo da lista, passa um evento
    if (event.target.tagName === 'INPUT') {                                   // sempre que o click for em um input, encerre a função (sem executar o resto do evento)
        return
    }
    
    const marcar = event.target.closest('.novo-habito, .novo-habito-checado') // 'habito' recebe aonde foi o click, independente do item/div/elemento da classe (pelo closest)
    const excluir = event.target.closest('.excluir-habito')                   // 'excluir' recebe quando excluir ou seus filhos forem clicados
    const editar = event.target.closest('.editar-habito')
    const salvar = event.target.closest('.salvar-habito')

    if (!marcar) return                                                       // se marcar nao existir
    const index = Number(marcar.dataset.index)                                // pega o valor do atributo data-index do hábito e converte o valor de string para Number
    
    if (excluir) {                                                            // se chamar 'excluir'
        habitos = habitos.filter((x, indice) => indice !== index)             // cria um novo array filtrando, se o indice for diferente do index, poe na lista(array)

    } else if (editar){                                                       // se apertar em 'editar'
        const nome = marcar.querySelector('.habito-nome')                     // a variavel recebe o valor 'habito-nome', que está dentro de 'marcar', que é a div quase toda
        nome.innerHTML = `<input class="edit-input" value="${habitos[index].nome}"> 
        <button class="salvar-habito"> Salvar </button>`                      // nome recebe um input, com o valor do habito, na posição do index, com o nome do habito
        
        return                                                                // encerra a função e retorna

    } else if (salvar){                                                       // quando clicar em salvar
        const salvo = marcar.querySelector('input')                           // 'salvo' recebe input, que está em marcar
        habitos[index].nome = salvo.value                                     // habito na posição do index, recebe no nome, o valor de salvo(input)

    } else if (marcar){                                                       // se chamar 'marcar'
        habitos[index].concluido = !habitos[index].concluido                  // se o habito com aquele index, for true ele fica false, se for false fica true
    }

    salvarHabitos()                                                           // chamando a função do localStorage
    mostrarNaTela()
    atualizarContadores()
})


nomeHabito.addEventListener('keydown', (clic) => {
    if (clic.key === 'Enter') {
        adicionar.click();
    }
})