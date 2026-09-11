const nomeHabito = document.getElementById('nome-habito')
const adicionar = document.getElementById('adicionar')
const listaHabitos = document.getElementById('lista-habitos')
let habitos = []

adicionar.addEventListener('click', () => {
    const novoHabito = {
        nome: nomeHabito.value,
        concluido: false
    }
    novoHabito.push()

    const linha = document.createElement('')
})