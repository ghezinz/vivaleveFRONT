const apiUrl = 'https://vivaleveapi.onrender.com/users/users'; // URL da API
const usuariosTableBody = document.querySelector('#usuariosTable tbody');
const message = document.getElementById('error-message');

// Obtém o token do localStorage
const authToken = localStorage.getItem('authToken');

// Função para listar usuários
async function listarUsuarios() {
    message.textContent = ''; // Limpa mensagens anteriores
    usuariosTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    // Verifica se o token está disponível
    if (!authToken) {
        message.textContent = 'Erro: Token de autenticação não encontrado. Faça login novamente.';
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const usuarios = await response.json();

            if (usuarios.length === 0) {
                message.textContent = 'Nenhum usuário encontrado.';
                return;
            }

            // Preenche a tabela com os dados dos usuários (apenas nome, email e username)
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.email}</td>
                    <td>${usuario.username}</td>
                `;
                usuariosTableBody.appendChild(row);
            });

            document.getElementById('usuariosTable').style.display = 'table'; // Exibe a tabela
        } else {
            // Mensagem de erro detalhada
            const errorMsg = `Erro ao listar usuários: ${response.status} - ${response.statusText}`;
            console.error(errorMsg);
            message.textContent = errorMsg;
        }
    } catch (error) {
        message.textContent = `Erro: ${error.message}`;
        console.error("Erro na requisição:", error);
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', listarUsuarios);
