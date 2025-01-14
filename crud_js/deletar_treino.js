const apiUrl = 'https://vivaleveapi.onrender.com/treinos/treinos'; // URL base da API
const deleteForm = document.getElementById('deleteTreinoForm');
const message = document.getElementById('message');

// Obtém o token do localStorage
const authToken = localStorage.getItem('authToken');

deleteForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    message.textContent = ''; // Limpa mensagens anteriores

    const treinoId = document.getElementById('treinoId').value.trim();

    if (!treinoId) {
        message.style.color = 'red';
        message.textContent = 'Por favor, insira o ID do treino.';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${treinoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            message.style.color = 'green';
            message.textContent = `Treino com ID ${treinoId} deletado com sucesso!`;
            deleteForm.reset(); // Limpa o formulário após a submissão bem-sucedida
        } else if (response.status === 404) {
            message.style.color = 'red';
            message.textContent = `Treino com ID ${treinoId} não encontrado.`;
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao deletar treino: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
});
