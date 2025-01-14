function gerenciarProdutos() {
    window.location.href = "/vivaleveFRONT/administrador/gerenciar_produtos.html";
}
function gerenciarUsuarios() {
    window.location.href = "/vivaleveFRONT/administrador/gerenciar_usuarios.html";
}
function gerenciarTreinos() {
    window.location.href = "/vivaleveFRONT/administrador/gerenciar_treinos.html";
}
function gerenciarDietas() {
    window.location.href = "/vivaleveFRONT/administrador/gerenciar_dietas.html";
}

function voltarParaHome() {
    window.location.href = "/vivaleveFRONT/index.html";
}


// Verificar o token para determinar se é admin
const token = sessionStorage.getItem('authenticated');
if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
    if (payload.role === 'admin') {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.textContent = 'Painel';
        document.querySelector('.menu').appendChild(adminLink);
    }
}

// URL da API
const apiURL = "https://vivaleveapi.onrender.com/produtos/produtos";

// Elemento onde os produtos serão inseridos
const produtosContainer = document.getElementById("produtos-container");

// Função para buscar produtos
async function fetchProdutos() {
    try {
        const response = await fetch(apiURL);
        const produtos = await response.json();

        // Adicionar os produtos no HTML
        produtosContainer.innerHTML = produtos.map(produto => `
            <div class="produto">
                <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>Preço: R$${produto.preco}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

// Chamar a função para buscar os produtos
fetchProdutos();

