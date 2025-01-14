const apiUrl = 'https://vivaleveapi.onrender.com/dietas/dietas'; // URL base da sua API
const updateDietForm = document.getElementById('updateDietForm');
const message = document.getElementById('message');

updateDietForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const dietaId = document.getElementById('dietaId').value.trim();
    const dietaNome = document.getElementById('dietaNome').value.trim(); // Novo campo: Nome da Dieta
    const dietaTipo = document.getElementById('dietaTipo').value.trim();
    const dietaDescricao = document.getElementById('dietaDescricao').value.trim();
    const dietaCaloria = document.getElementById('dietaCaloria').value.trim();

    if (!dietaId) {
        message.style.color = 'red';
        message.textContent = 'Por favor, insira o ID da dieta.';
        return;
    }

    // Criar objeto JSON com os campos preenchidos
    const dietaData = {
        ...(dietaNome && { nome: dietaNome }), // Atualiza o nome da dieta
        ...(dietaTipo && { tipo: dietaTipo }),
        ...(dietaDescricao && { descricao: dietaDescricao }),
        ...(dietaCaloria && { consumo_caloria: parseInt(dietaCaloria) }),
    };

    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            message.style.color = 'red';
            message.textContent = 'Erro: Usuário não autenticado.';
            return;
        }

        const response = await fetch(`${apiUrl}/${dietaId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dietaData),
        });

        if (response.ok) {
            message.style.color = 'green';
            message.textContent = `Dieta com ID ${dietaId} atualizada com sucesso!`;
            updateDietForm.reset();
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao atualizar dieta: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
});
