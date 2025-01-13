const apiUrl = 'https://vivaleveapi.onrender.com/treinos/treinos'; // Substitua pela URL base da sua API
        const deleteForm = document.getElementById('deleteTreinoForm');
        const message = document.getElementById('message');

        deleteForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o recarregamento da página
            message.textContent = ''; // Limpa mensagens anteriores

            const treinoId = document.getElementById('treinoId').value;

            try {
                const response = await fetch(`${apiUrl}/${treinoId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    message.style.color = 'green';
                    message.textContent = 'Treino deletado com sucesso!';
                    deleteForm.reset();
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