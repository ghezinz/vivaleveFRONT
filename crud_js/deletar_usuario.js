// URL da API
const apiUrl = 'https://vivaleveapi.onrender.com/users/users'; // Substitua pela URL da sua API

// Referência ao formulário e mensagem
const form = document.getElementById('deleteForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita recarregar a página

    const userId = document.getElementById('userId').value;
    const authToken = localStorage.getItem('authToken'); // Obtém o token do localStorage

    // Valida se o token está presente
    if (!authToken) {
        message.textContent = 'Token de autenticação não encontrado. Faça login novamente.';
        message.style.color = 'red';
        return;
    }

    // Valida se o ID é válido
    if (!userId || isNaN(userId)) {
        message.textContent = 'Por favor, insira um ID válido.';
        message.style.color = 'red';
        return;
    }

    try {
        // Realiza a requisição DELETE
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`, // Adiciona o token de autenticação
                'Content-Type': 'application/json', // Define o Content-Type como JSON
            },
        });

        if (response.ok) {
            message.textContent = `Usuário com ID ${userId} deletado com sucesso!`;
            message.style.color = 'green';
        } else if (response.status === 404) {
            message.textContent = `Usuário com ID ${userId} não encontrado.`;
            message.style.color = 'red';
        } else if (response.status === 405) {
            message.textContent = 'Método não permitido. Verifique a configuração da API.';
            message.style.color = 'red';
        } else {
            const errorData = await response.json();
            message.textContent = `Erro ao deletar o usuário: ${
                errorData.detail || 'Erro desconhecido.'
            }`;
            message.style.color = 'red';
            console.error('Detalhes do erro:', errorData);
        }
    } catch (error) {
        message.textContent = `Erro: ${error.message}`;
        message.style.color = 'red';
        console.error('Erro ao deletar usuário:', error);
    }

    // Limpa o campo do ID após a submissão
    form.reset();
});
