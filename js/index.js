document.addEventListener("DOMContentLoaded", async () => {
    const adminLink = document.getElementById("adminLink");
    const favoritosLink = document.getElementById("favoritosLink");
    const noAccountFooter = document.getElementById("noAccountFooter");
    const hasAccountFooter = document.getElementById("hasAccountFooter");
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        adminLink.style.display = "none";
        favoritosLink.style.display = "none";
        return;
    }

    try {
        const response = await fetch("https://vivaleveapi.onrender.com/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const user = await response.json();

            // Exibir "Painel Admin" apenas se o usuário for admin
            if (user.is_admin) {
                adminLink.style.display = "inline-block";
            }

            // Exibir "Favoritos" para todos os usuários autenticados
            favoritosLink.style.display = "inline-block";

            // Ocultar mensagens de login/cadastro
            noAccountFooter.style.display = "none";
            hasAccountFooter.style.display = "none";

            // Adicionar opção de logout
            const menu = adminLink.parentElement;
            const logoutLink = document.createElement("li");
            logoutLink.innerHTML = '<a href="#">Sair</a>';
            menu.appendChild(logoutLink);

            logoutLink.addEventListener("click", () => {
                localStorage.removeItem("authToken");
                window.location.reload();
            });
        } else {
            console.error("Erro ao obter informações do usuário.");
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error.message);
    }
});

// Função que cria a lógica do carrosel de imagens

const track = document.getElementById('carouselTrack');
const images = document.querySelectorAll('.carousel-image');
const imageWidth = images[0].clientWidth;
let index = 1; // Começa na segunda imagem (primeira "real")

function moveCarousel() {
    index++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * imageWidth}px)`;

    if (index === images.length - 1) {
        setTimeout(() => {
            track.style.transition = 'none'; // Remove transição temporariamente
            index = 1; // Volta para a primeira imagem "real"
            track.style.transform = `translateX(-${index * imageWidth}px)`;
        }, 500); // Tempo igual ao da transição
    }
}

setInterval(moveCarousel, 2000); // Altere o intervalo para ajustar o tempo


// Função: se o usuário tentar acessar os treinos sem estar autenticado, essa função será chamada
function alertarCadastro() {
  alert("Para acessar os treinos, é necessário realizar o cadastro.");
}

// Função: redireciona o usuário para a página de produtos
function irParaProdutos() {
    window.location.href = "produtos.html";
  } 