document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Você precisa estar logado para acessar seus favoritos.");
      window.location.href = "login.html";
      return;
    }
  
    const treinosList = document.getElementById("treinosList");
    const dietasList = document.getElementById("dietasList");
  
    // Função para carregar favoritos
    async function carregarFavoritos(url, listElement) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const favoritos = await response.json();
          favoritos.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item-favorito");
            itemDiv.innerHTML = `
              <h3>${item.nome}</h3>
              <button onclick="removerFavorito('${url}/${item.id}', this)">Remover</button>
            `;
            listElement.appendChild(itemDiv);
          });
        } else {
          console.error("Erro ao carregar favoritos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error.message);
      }
    }
  
    // Função para remover um favorito
    window.removerFavorito = async (url, buttonElement) => {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
  
        if (response.ok) {
          alert("Favorito removido com sucesso!");
          buttonElement.parentElement.remove();
        } else {
          alert("Erro ao remover favorito.");
        }
      } catch (error) {
        console.error("Erro ao remover favorito:", error.message);
      }
    };
  
    // Carregar favoritos
    carregarFavoritos("https://vivaleveapi.onrender.com/favoritos/favoritos/treinos", treinosList);
    carregarFavoritos("https://vivaleveapi.onrender.com/favoritos/favoritos/dietas", dietasList);
  });
  