const form1 = document.getElementById("form1");
const email_login = document.getElementById("email_login");
const senha_login = document.getElementById("senha_login");

const form2 = document.getElementById("form2");
const nome_novo = document.getElementById("nome_novo");
const email_novo = document.getElementById("email_novo");
const senha_novo = document.getElementById("senha_novo");

form1.addEventListener("submit", (event) => {
    event.preventDefault();
    acessarUsuario(email_login.value, senha_login.value);
})
form2.addEventListener("submit", (event) => {
    event.preventDefault();
    cadastrarUsuario(nome_novo.value, email_novo.value, senha_novo.value);
})

// Recuperar usuários do LocalStorage ao carregar a página
const users = JSON.parse(localStorage.getItem('users')) || {};

// Função para gerar um ID único
let contadorId = 1;
function gerarId() {
    return contadorId++;
}

// Função para cadastrar um novo usuário
function cadastrarUsuario(nome, email, senha) {
    const emailVerificado = Object.values(users).find(u => u.email === email);
    if (emailVerificado) {
        alert("Email ja existe!");
        return;
    }
    const id = gerarId();

    // Verificar se o ID já está em uso (muito improvável com a função geradora)
    while (users[id]) {
        id = gerarId();
    }

    // Criar objeto de usuário
    users[id] = {
        id: id,
        nome: nome,
        email: email,
        senha: senha,
        tasks: []
    };
    // Salvar a lista atualizada de usuários no LocalStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert("Usuário cadastrado com sucesso!");
}

// Função para acessar as informações de um usuário por e-mail e senha
function acessarUsuario(email, senha) {
    // Encontrar usuário pelo e-mail
    const usuarioEncontrado = Object.values(users).find(u => u.email === email);

    if (!usuarioEncontrado) {
        alert("E-mail de usuário não encontrado.");
        return;
    }

    // Verificar se a senha está correta
    if (usuarioEncontrado.senha === senha) {
        alert("Login realizado com sucesso!");
        // Guardar os dados do usuario logado para a proxima pagina
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        window.location.href = "gerenciador-de-tarefas.html"
    } else {
        alert("Senha incorreta...");
    }
}
