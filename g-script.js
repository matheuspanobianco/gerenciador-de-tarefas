// Criacao objeto Task
class Task {
    constructor(tarefa, data_inicio, data_termino, hora_inicio, hora_termino, descricao, status) {
        this.tarefa = tarefa;
        this.data_inicio = data_inicio;
        this.data_termino = data_termino;
        this.hora_inicio = hora_inicio;
        this.hora_termino = hora_termino;
        this.descricao = descricao;
        this.status = status;
    }
}

// id Tasks
let contadorId = 1;
function gerarId() {
    return contadorId++;
}
// Armazenamento de tarefas
document.querySelector('#form3').addEventListener('submit', (event) => {
    event.preventDefault();
    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    // Recebimento de dados
    let task = new Task(
        document.getElementById('tarefa').value,
        document.getElementById('data-inicio').value,
        document.getElementById('data-termino').value,
        document.getElementById('hora-inicio').value,
        document.getElementById('hora-termino').value,
        document.getElementById('descricao').value,
        'Pendente'
    );
    task.id = gerarId();
    usuarioLogado.tasks.push(task);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

    atualizarTabela();
})

// Botao voltar
btn_voltar.addEventListener("click", (event) => {
    cancelarAlteracao();
})
function cancelarAlteracao() {
    window.location.href = "index.html";
}

// Função para atualizar a tabela de tarefas
function atualizarTabela() {
    const tabelaTbody = document.getElementById('tabela-tbody');
    tabelaTbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    // Obter a data e hora atuais
    const dataHoraAtual = new Date();
    // Iterar sobre as tarefas do usuário e adicionar na tabela
    usuarioLogado.tasks.forEach(task => {
        const novaLinha = tabelaTbody.insertRow();
        //comparar com data atual
        const dataInicioComparacao = new Date(task.data_inicio + 'T' + task.hora_inicio);
        const dataTerminoComparacao = new Date(task.data_termino + 'T' + task.hora_termino);
        if (task.status !== "Realizada") {
            if (dataHoraAtual < dataInicioComparacao) {
                task.status = 'Pendente';
            } else if (dataHoraAtual > dataInicioComparacao && dataHoraAtual < dataTerminoComparacao) {
                task.status = 'Em andamento';
            } else if (dataHoraAtual > dataTerminoComparacao) {
                task.status = 'Em atraso';
            }
        }

        // Formatar data
        const dataInicio = task.data_inicio;
        const dataInicioFormatada = formatarData(dataInicio);
        const dataTermino = task.data_termino;
        const dataTerminoFormatada = formatarData(dataTermino);
        // Adicionar colunas com os dados da tarefa
        novaLinha.insertCell(0).textContent = task.tarefa;
        novaLinha.insertCell(1).textContent = `${dataInicioFormatada} às ${task.hora_inicio}`;
        novaLinha.insertCell(2).textContent = `${dataTerminoFormatada} às ${task.hora_termino}`;
        novaLinha.insertCell(3).textContent = task.status;

        // Adicionar botão de alterar
        const btnAlterar = document.createElement('button');
        btnAlterar.className = 'btn btn-warning btn-alterar-tarefa';
        btnAlterar.textContent = 'Alterar';
        btnAlterar.addEventListener('click', () => {
            window.location.href = `altera-tarefa.html?id=${task.id}`;
            // pega o id para a proxima pagina
        });

        const cellAcao = novaLinha.insertCell(4);
        cellAcao.appendChild(btnAlterar);
    });
}


// Função para atualizar a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();
});

// Formatar data
function formatarData(data) {
    const partesData = data.split('-');
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    return dataFormatada;
}

