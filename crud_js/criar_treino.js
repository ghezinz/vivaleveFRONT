const apiUrl = 'https://vivaleveapi.onrender.com/treinos/treinos'; // URL da API
        const treinoForm = document.getElementById('treinoForm');
        const message = document.getElementById('message');

        treinoForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita o recarregamento da página
            message.textContent = ''; // Limpa mensagens anteriores

            const formData = new FormData(treinoForm);
            const treinoData = Object.fromEntries(formData.entries()); // Converte para JSON
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Inclui o token de autenticação
                    },
                    body: JSON.stringify(treinoData)
                });

                if (response.ok) {
                    message.style.color = 'green';
                    message.textContent = 'Treino criado com sucesso!';
                    treinoForm.reset();
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao criar treino: ${errorData.detail || 'Erro desconhecido'}`;
                }
            } catch (error) {
                message.style.color = 'red';
                message.textContent = `Erro: ${error.message}`;
            }
        });