const apiUrl = 'https://vivaleveapi.onrender.com/dietas/dietas'; // URL base da API
const deleteDietaForm = document.getElementById('deleteDietaForm');
const message = document.getElementById('message');

// Obtém o token do localStorage
const authToken = localStorage.getItem('authToken');

deleteDietaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const dietaId = document.getElementById('dietaId').value.trim();

    if (!dietaId) {
        message.style.color = 'red';
        message.textContent = 'Por favor, insira o ID da dieta.';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${dietaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            message.style.color = 'green';
            message.textContent = `Dieta com ID ${dietaId} deletada com sucesso!`;
            deleteDietaForm.reset();
        } else if (response.status === 404) {
            message.style.color = 'red';
            message.textContent = `Dieta com ID ${dietaId} não encontrada.`;
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao deletar dieta: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
});
