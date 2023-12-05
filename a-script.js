document.addEventListener('DOMContentLoaded', () => {
    // Função para obter parâmetro da URL
    function obterParametroUrl(nome) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nome);
    }

    // Obter o ID da tarefa da URL
    const taskId = obterParametroUrl('id');

    // Se o ID estiver presente, preencher os campos do formulário
    if (taskId) {
        // Buscar dados do usuario logado
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        // Encontrar a tarefa com base no ID
        const tarefaSelecionada = usuarioLogado.tasks.find(task => task.id === parseInt(taskId));

        // Preencher os campos do formulário com os dados da tarefa selecionada
        if (tarefaSelecionada) {
            document.getElementById('tarefa').value = tarefaSelecionada.tarefa;
            document.getElementById('data-inicio').value = tarefaSelecionada.data_inicio;
            document.getElementById('data-termino').value = tarefaSelecionada.data_termino;
            document.getElementById('hora-inicio').value = tarefaSelecionada.hora_inicio;
            document.getElementById('hora-termino').value = tarefaSelecionada.hora_termino;
            document.getElementById('descricao').value = tarefaSelecionada.descricao;

            // eventos de clique aos botões
            document.querySelector('.btn-alterar-tarefa').addEventListener('click', (event) => alterarTarefa(event, tarefaSelecionada));
            document.querySelector('.btn-excluir-tarefa').addEventListener('click', (event) => excluirTarefa(event, tarefaSelecionada));
            document.querySelector('.btn-concluir-tarefa').addEventListener('click', (event) => marcarComoRealizada(event, tarefaSelecionada));
            document.getElementById('btn_cancelar').addEventListener('click', (event) => marcarComoRealizada(event, tarefaSelecionada));

        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Função para obter parâmetro da URL
    function obterParametroUrl(nome) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nome);
    }

    // Obter o ID da tarefa da URL
    const taskId = obterParametroUrl('id');

    // Se o ID estiver presente, preencher os campos do formulário
    if (taskId) {
        // Buscar dados do usuario logado
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        // Encontrar a tarefa com base no ID
        const tarefaSelecionada = usuarioLogado.tasks.find(task => task.id === parseInt(taskId));

        // Preencher os campos do formulário com os dados da tarefa selecionada
        if (tarefaSelecionada) {
            document.getElementById('tarefa').value = tarefaSelecionada.tarefa;
            document.getElementById('data-inicio').value = tarefaSelecionada.data_inicio;
            document.getElementById('data-termino').value = tarefaSelecionada.data_termino;
            document.getElementById('hora-inicio').value = tarefaSelecionada.hora_inicio;
            document.getElementById('hora-termino').value = tarefaSelecionada.hora_termino;
            document.getElementById('descricao').value = tarefaSelecionada.descricao;
        }

        // Adiciona eventos de clique aos botões
        document.querySelector('.btn-alterar-tarefa').addEventListener('click', () => alterarTarefa(tarefaSelecionada));
        document.querySelector('.btn-excluir-tarefa').addEventListener('click', () => excluirTarefa(tarefaSelecionada));
        document.querySelector('.btn-concluir-tarefa').addEventListener('click', () => marcarComoRealizada(tarefaSelecionada));

        // Adiciona evento de clique ao botão de cancelar
        document.getElementById('btn_cancelar').addEventListener('click', () => {
            // Redireciona de volta à página anterior
            window.location.href = "gerenciador-de-tarefas.html";
        });
    }
});

// Botao cancelar
function cancelarAlteracao() {
    window.location.href = "gerenciador-de-tarefas.html";
}

// Função para alterar uma tarefa
function alterarTarefa(event, tarefa) {
    event.preventDefault();
    // Obtenha os valores dos campos do formulário
    const novaTarefa = {
        tarefa: document.getElementById('tarefa').value,
        data_inicio: document.getElementById('data-inicio').value,
        data_termino: document.getElementById('data-termino').value,
        hora_inicio: document.getElementById('hora-inicio').value,
        hora_termino: document.getElementById('hora-termino').value,
        descricao: document.getElementById('descricao').value,
        status: tarefa.status,
        id: tarefa.id // Mantem o mesmo id da tarefa original
    };

    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Encontrar e substituir a tarefa no array
    const index = usuarioLogado.tasks.findIndex(task => task.id === tarefa.id);
    if (index !== -1) {
        usuarioLogado.tasks[index] = novaTarefa;

        // Atualizar os dados no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        // Redireciona de volta à página anterior
        window.location.href = "gerenciador-de-tarefas.html";
    }
}

// Função para excluir uma tarefa
function excluirTarefa(event, tarefa) {
    event.preventDefault();
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Filtrar as tarefas, excluindo a tarefa com o ID correspondente
    usuarioLogado.tasks = usuarioLogado.tasks.filter(task => task.id !== tarefa.id);
    // Atualizar os dados no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    // Redireciona de volta à página anterior
    window.location.href = "gerenciador-de-tarefas.html";
}

// Função para marcar uma tarefa como realizada (ou alterar o status conforme necessário)
function marcarComoRealizada(event, tarefa) {
    event.preventDefault();
    // Obtenha os valores dos campos do formulário
    const novaTarefa = {
        tarefa: tarefa.tarefa,
        data_inicio: tarefa.data_inicio,
        data_termino: tarefa.data_termino,
        hora_inicio: tarefa.hora_inicio,
        hora_termino: tarefa.hora_termino,
        descricao: tarefa.descricao,
        status: "Realizada",
        id: tarefa.id // Mantem o mesmo id da tarefa original
    };

    // Buscar dados do usuario logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Encontrar e substituir a tarefa no array
    const index = usuarioLogado.tasks.findIndex(task => task.id === tarefa.id);
    if (index !== -1) {
        usuarioLogado.tasks[index] = novaTarefa;
        // Atualizar os dados no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        // Redireciona de volta à página anterior
        window.location.href = "gerenciador-de-tarefas.html";
    }

}
