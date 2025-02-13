document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    fetch("https://vivaleveapi.onrender.com/treinos/treinos", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar os treinos.");
        }
        return response.json();
    })
    .then(treinos => {
        const treinosPerdaPeso = treinos.filter(treino => treino.tipo === "perda de peso");
        const container = document.getElementById("treinosContainer");

        if (treinosPerdaPeso.length === 0) {
            container.innerHTML = "<p>Nenhum treino encontrado para perda de peso.</p>";
            return;
        }

        treinosPerdaPeso.forEach(treino => {
            const treinoElement = document.createElement("div");
            treinoElement.classList.add("treino-card");
            treinoElement.innerHTML = `
                <h3>${treino.nome}</h3>
                <p>${treino.descricao}</p>
                <p>Duração: ${treino.duracao} minutos</p>
                <button onclick="favoritarTreino(${treino.id})">Favoritar</button>
            `;
            container.appendChild(treinoElement);
        });
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível carregar os treinos.");
    });
});

function favoritarTreino(treinoId) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Você precisa estar logado para favoritar um treino.");
        window.location.href = "login.html";
        return;
    }

    fetch(`https://vivaleveapi.onrender.com/favoritos/favoritos/treinos/${treinoId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Treino adicionado aos favoritos com sucesso!");
        } else {
            throw new Error("Erro ao favoritar o treino");
        }
    })
    .catch(error => {
        console.error(error.message);
        alert("Não foi possível favoritar o treino.");
    });
}
