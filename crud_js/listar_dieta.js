const apiUrl = 'http://127.0.0.1:8000/dietas/dietas';// Substitua pela URL base da sua API
        const listarButton = document.getElementById('listarDietas');
        const dietasTable = document.getElementById('dietasTable').querySelector('tbody');
        const message = document.getElementById('message');

        listarButton.addEventListener('click', async () => {
            message.textContent = ''; // Limpa mensagens anteriores
            dietasTable.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const dietas = await response.json();

                    if (dietas.length === 0) {
                        message.style.color = 'blue';
                        message.textContent = 'Nenhuma dieta encontrada.';
                        return;
                    }

                    dietas.forEach(dieta => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${dieta.id}</td>
                            <td>${dieta.tipo}</td>
                            <td>${dieta.descricao}</td>
                            <td>${dieta.consumo_caloria}</td>
                        `;
                        dietasTable.appendChild(row);
                    });
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao listar dietas: ${errorData.detail || 'Erro desconhecido'}`;
                }
            } catch (error) {
                message.style.color = 'red';
                message.textContent = `Erro: ${error.message}`;
            }
        });