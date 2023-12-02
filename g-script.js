document.addEventListener('DOMContentLoaded', function () {

    // Recuperar usuários do LocalStorage
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
        // Exibir o nome do usuário na página
        const usuarioInfo = document.getElementById('usuario-info');
        usuarioInfo.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;
    } else {
        alert("Usuário não encontrado.");
        window.location.href = "index.html";
    }
});

btn_voltar.addEventListener("click", (event) => {
    voltarParaPaginaInicial();
})
function voltarParaPaginaInicial() {
    window.location.href = "index.html";
}