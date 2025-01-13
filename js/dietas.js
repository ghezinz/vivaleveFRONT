document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html"; // Redireciona para a página de login
        return;
    }

    // Verifica o token na API
    fetch("https://ghezinz.github.io/vivaleveFRONT//auth/verificar-token", {
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
        carregarDietas(authToken); // Carrega as dietas após a verificação do token
    })
    .catch(error => {
        console.error(error.message);
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    });
});

function carregarDietas(authToken) {
    fetch("https://vivaleveapi.onrender.com/dietas/dietas", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar as dietas");
        }
        return response.json();
    })
    .then(dietas => {
        const container = document.getElementById("dietasContainer");
        container.innerHTML = "";
        dietas.forEach(dieta => {
            const dietaElement = document.createElement("div");
            dietaElement.classList.add("dieta-card");
            dietaElement.innerHTML = `
                <h3>${dieta.tipo}</h3>
                <p>${dieta.descricao}</p>
                <p>Calorias: ${dieta.consumo_caloria} kcal</p>
                ${dieta.img_url ? `<img src="${dieta.img_url}" alt="Imagem da dieta">` : ""}
                <button onclick="favoritarDieta(${dieta.id})">Favoritar</button>
            `;
            container.appendChild(dietaElement);
        });
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível carregar as dietas.");
    });
}

function favoritarDieta(dietaId) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Você precisa estar logado para favoritar uma dieta.");
        window.location.href = "login.html";
        return;
    }

    fetch(`http://127.0.0.1:8000/favoritos/favoritos/dietas/${dietaId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Dieta adicionada aos favoritos com sucesso!");
        } else {
            throw new Error("Erro ao favoritar a dieta");
        }
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível favoritar a dieta.");
    });
}
