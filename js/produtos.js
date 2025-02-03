// Função: quando o usuario clicar no botão voltar, ele irá retornar a home
function voltarParaHome() {
    window.location.href = "index.html";
}

function carregarProdutos() {
    fetch("https://vivaleveapi.onrender.com/produtos/produtos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar os produtos");
        }
        return response.json();
    })
    .then(produtos => {
        const container = document.getElementById("produtosContainer");
        container.innerHTML = "";
        produtos.forEach(produto => {
            const produtoElement = document.createElement("div");
            produtoElement.classList.add("produto-card");
            produtoElement.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="comprarProduto('${produto.descricao}')">Comprar</button>
            `;
            container.appendChild(produtoElement);
        });
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível carregar os produtos.");
    });
}

function comprarProduto(url) {
    if (url.startsWith("http")) {
        window.location.href = url;
    } else {
        alert("URL do produto inválida.");
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);



