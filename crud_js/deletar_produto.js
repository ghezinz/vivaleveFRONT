const apiUrl = 'https://vivaleveapi.onrender.com/produtos/produtos'; // URL base da API
const deleteForm = document.getElementById('deleteForm');
const message = document.getElementById('message');

// Obtém o token do localStorage
const authToken = localStorage.getItem('authToken');

deleteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const produtoId = document.getElementById('produtoId').value;

    if (!produtoId) {
        message.textContent = 'Por favor, insira o ID do produto.';
        message.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${produtoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            message.style.color = 'green';
            message.textContent = `Produto com ID ${produtoId} deletado com sucesso!`;
            deleteForm.reset(); // Limpa o formulário após o envio bem-sucedido
        } else if (response.status === 404) {
            message.style.color = 'red';
            message.textContent = `Produto com ID ${produtoId} não encontrado.`;
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao deletar produto: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
});
