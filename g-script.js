// Criacao objeto Task
class Task {
    constructor(tarefa, data_inicio, data_termino, hora_inicio, hora_termino, descricao) {
        this.tarefa = tarefa;
        this.data_inicio = data_inicio;
        this.data_termino = data_termino;
        this.hora_inicio = hora_inicio;
        this.hora_termino = hora_termino;
        this.descricao = descricao;
    }
}

// Armazenamento de tarefas
document.querySelector('#form3').addEventListener('submit', (event) => {
    event.preventDefault();
    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    // id Tasks
    let contadorId = 1;
    function gerarId() {
        return contadorId++;
    }
    // Recebimento de dados
    let task = new Task(
        document.getElementById('tarefa').value,
        document.getElementById('data-inicio').value,
        document.getElementById('data-termino').value,
        document.getElementById('hora-inicio').value,
        document.getElementById('hora-termino').value,
        document.getElementById('descricao').value
    );
    // let listaTarefas = JSON.parse(localStorage.getItem('listTasks')) || [];
    task.id = gerarId();
    usuarioLogado.tasks.push(task);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    console.log(task);
    console.log(task.tarefa);
    console.log(usuarioLogado);
})

// Botao voltar
btn_voltar.addEventListener("click", (event) => {
    voltarParaPaginaInicial();
})
function voltarParaPaginaInicial() {
    window.location.href = "index.html";
}

// Função para atualizar a tabela de tarefas
function atualizarTabela() {
    const tabelaTbody = document.getElementById('tabela-tbody');
    tabelaTbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Iterar sobre as tarefas do usuário e adicionar na tabela
    usuarioLogado.tasks.forEach(task => {
        const newRow = tabelaTbody.insertRow();

        // Adicionar colunas com os dados da tarefa
        newRow.insertCell(0).textContent = task.tarefa;
        newRow.insertCell(1).textContent = `${task.data_inicio} ${task.hora_inicio}`;
        newRow.insertCell(2).textContent = `${task.data_termino} ${task.hora_termino}`;
        newRow.insertCell(3).textContent = 'Em andamento';

        // Adicionar botão de alterar
        const btnAlterar = document.createElement('button');
        btnAlterar.className = 'btn btn-warning btn-alterar-tarefa';
        btnAlterar.textContent = 'Alterar';
        btnAlterar.addEventListener('click', () => {
            window.location.href = 'altera-tarefa.html';
        });

        const cellAcao = newRow.insertCell(4);
        cellAcao.appendChild(btnAlterar);
    });
}

// Chame a função para atualizar a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();
});