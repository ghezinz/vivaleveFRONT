document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    // Verificar se o token é válido
    fetch("http://127.0.0.1:8000/auth/verificar-token", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Token inválido ou expirado");
        }
        return response.json();
    })
    .then(() => {
        carregarDietasFavoritadas(authToken);
    })
    .catch(error => {
        console.error("Erro na autenticação:", error.message);
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    });
});

function carregarDietasFavoritadas(authToken) {
    fetch("https://vivaleveapi.onrender.com/favoritos/favoritos/dietas", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar as dietas favoritadas");
        }
        return response.json();
    })
    .then(dietas => {
        const container = document.getElementById("dietasContainer");
        container.innerHTML = "";

        if (dietas.length === 0) {
            container.innerHTML = "<p>Nenhuma dieta favoritada encontrada.</p>";
            return;
        }

        dietas.forEach(dieta => {
            const dietaElement = document.createElement("div");
            dietaElement.classList.add("dieta-card");
            dietaElement.innerHTML = `
                <h3>${dieta.tipo}</h3>
                <p>${dieta.descricao}</p>
                <p>Calorias: ${dieta.consumo_caloria} kcal</p>
                ${dieta.img_url ? `<img src="${dieta.img_url}" alt="Imagem da dieta">` : ""}
            `;
            container.appendChild(dietaElement);
        });

        // Adicionar botão para calcular calorias
        const calcularButton = document.createElement("button");
        calcularButton.textContent = "Calcular Calorias";
        calcularButton.addEventListener("click", () => calcularCalorias(dietas));
        container.appendChild(calcularButton);
    })
    .catch(error => {
        console.error("Erro ao carregar as dietas:", error.message);
        alert("Não foi possível carregar as dietas favoritadas.");
    });
}

function calcularCalorias(dietas) {
    const totalCalorias = dietas.reduce((soma, dieta) => soma + (dieta.consumo_caloria || 0), 0);
    alert(`O total de calorias das dietas favoritadas é: ${totalCalorias} kcal`);
}
