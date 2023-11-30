document.addEventListener('DOMContentLoaded', function () {
    // Recuperar usuários do LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Suponha que você tenha o ID do usuário que fez o login (pode ser passado como parâmetro ou armazenado anteriormente)
    const idDoUsuarioLogado = "1"; // Substitua pelo ID correto

    // Encontrar informações do usuário pelo ID
    const usuarioLogado = users[idDoUsuarioLogado];

    if (usuarioLogado) {
        // Exibir o nome do usuário na página
        const usuarioInfoDiv = document.getElementById('usuario-info');
        usuarioInfoDiv.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
    } else {
        console.log("Usuário não encontrado.");
    }
});