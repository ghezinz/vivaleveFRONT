// Função: quando o usuario clicar no botão voltar, ele irá retornar a home
function voltarParaHome() {
    window.location.href = "index.html";
}

function carregarProdutos() {
    fetch("https://vivaleveapi.onrender.com/produtos/produtos", {
        method: "GET",
        // Não há mais a necessidade de incluir o token, pois não requer autenticação
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
                <p>${produto.descricao}</p>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                ${produto.img_url ? `<img src="${produto.img_url}" alt="Imagem do produto">` : ""}
            `;
            container.appendChild(produtoElement);
        });
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível carregar os produtos.");
    });
}

document.addEventListener("DOMContentLoaded", carregarProdutos);


