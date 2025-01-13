const apiUrl = 'https://vivaleveapi.onrender.com/treinos/treinos'; // Substitua pela URL base da sua API
const updateForm = document.getElementById('updateTreinoForm');
const message = document.getElementById('message');

updateForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    message.textContent = ''; // Limpa mensagens anteriores

    const treinoId = document.getElementById('treinoId').value;

    // Criar objeto JSON com os campos preenchidos
    const treinoData = {
        nome: document.getElementById('nome').value || undefined,
        tipo: document.getElementById('tipo').value || undefined,
        descricao: document.getElementById('descricao').value || undefined,
        duracao: document.getElementById('duracao').value || undefined,
    };

    // Remover campos não preenchidos
    Object.keys(treinoData).forEach(key => {
        if (!treinoData[key]) delete treinoData[key];
    });

    const imagemInput = document.getElementById('imagem').files[0];
    if (imagemInput) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            treinoData.imagem = e.target.result;

            // Chamar a função de atualização com os dados completos
            await atualizarTreino(treinoId, treinoData);
        };
        reader.readAsDataURL(imagemInput); // Converter imagem para Base64
    } else {
        await atualizarTreino(treinoId, treinoData); // Sem imagem
    }
});

async function atualizarTreino(treinoId, treinoData) {
    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            message.style.color = 'red';
            message.textContent = 'Erro: Usuário não autenticado.';
            return;
        }

        const response = await fetch(`${apiUrl}/${treinoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(treinoData),
        });

        if (response.ok) {
            message.style.color = 'green';
            message.textContent = 'Treino atualizado com sucesso!';
            updateForm.reset();
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao atualizar treino: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
}
