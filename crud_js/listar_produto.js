const apiUrl = 'https://vivaleveapi.onrender.com/produtos/produtos'; // Substitua pela URL base da sua API
        const listButton = document.getElementById('listButton');
        const productTableBody = document.querySelector('#productTable tbody');
        const message = document.getElementById('message');

        listButton.addEventListener('click', async () => {
            message.textContent = ''; // Limpa mensagens anteriores
            productTableBody.innerHTML = ''; // Limpa a tabela

            try {
                const response = await fetch(apiUrl);

                if (response.ok) {
                    const produtos = await response.json();

                    if (produtos.length > 0) {
                        produtos.forEach(produto => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${produto.id}</td>
                                <td>${produto.nome}</td>
                                <td>${produto.preco}</td>
                                <td>${produto.descricao}</td>
                            `;
                            productTableBody.appendChild(row);
                        });
                    } else {
                        message.style.color = 'red';
                        message.textContent = 'Nenhum produto encontrado.';
                    }
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao listar produtos: ${errorData.detail || 'Erro desconhecido'}`;
                }
            } catch (error) {
                message.style.color = 'red';
                message.textContent = `Erro: ${error.message}`;
            }
        });