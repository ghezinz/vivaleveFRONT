// treinos.js

// Função para verificar se o usuário está logado
function verificarLogin() {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        // Se o token não existe, redireciona para a página de login
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    // Verifica se o token é válido
    fetch("https://vivaleveapi.onrender.com/users/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Usuário não autenticado");
        }
        return response.json();
    })
    .then(user => {
        console.log(`Usuário logado: ${user.username}`);
        // Se o usuário estiver logado, não faz nada e a página é exibida
    })
    .catch(error => {
        console.error(error.message);
        alert("Sua sessão expirou ou você não está logado.");
        window.location.href = "login.html";
    });
}

// Chama a função para verificar o login ao carregar a página
document.addEventListener("DOMContentLoaded", verificarLogin);

function Musculacao() {
    window.location.href = "escolhas_treinos.html";
 }

 function Perda_de_Peso() {
    window.location.href = "exercicio_perda_peso.html";
 }
