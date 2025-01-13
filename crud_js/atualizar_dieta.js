const apiUrl = 'https://vivaleveapi.onrender.com/dietas/dietas'; // Substitua pela URL base da sua API
const updateDietForm = document.getElementById('updateDietForm');
const message = document.getElementById('message');

updateDietForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const dietaId = document.getElementById('dietaId').value.trim();
    const dietaTipo = document.getElementById('dietaTipo').value.trim();
    const dietaDescricao = document.getElementById('dietaDescricao').value.trim();
    const dietaCaloria = document.getElementById('dietaCaloria').value.trim();
    const dietaImagem = document.getElementById('dietaImagem').files[0];

    if (!dietaId) {
        message.style.color = 'red';
        message.textContent = 'Por favor, insira o ID da dieta.';
        return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Você precisa estar logado para realizar esta ação.");
        window.location.href = "login.html";
        return;
    }

    const dietaData = {
        ...(dietaTipo && { tipo: dietaTipo }),
        ...(dietaDescricao && { descricao: dietaDescricao }),
        ...(dietaCaloria && { consumo_caloria: parseInt(dietaCaloria) }),
    };

    if (dietaImagem) {
        const reader = new FileReader();
        reader.onload = async () => {
            dietaData.img = reader.result;

            try {
                const response = await fetch(`${apiUrl}/${dietaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
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
        };
        reader.readAsDataURL(dietaImagem);
    } else {
        try {
            const response = await fetch(`${apiUrl}/${dietaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
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
    }
});
