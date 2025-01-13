const apiUrl = 'http://127.0.0.1:8000/produtos/produtos'; // Substitua pela URL base da sua API
const productForm = document.getElementById('productForm');
const message = document.getElementById('message');

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Você precisa estar logado para realizar esta ação.");
        window.location.href = "login.html";
        return;
    }

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const descricao = document.getElementById('descricao').value;
    const imagemInput = document.getElementById('imagem');

    const produtoData = {
        nome,
        preco,
        descricao,
    };

    if (imagemInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = async () => {
            produtoData.img = reader.result;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`, // Adiciona o token
                    },
                    body: JSON.stringify(produtoData),
                });

                if (response.ok) {
                    message.style.color = 'green';
                    message.textContent = 'Produto criado com sucesso!';
                    productForm.reset();
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao criar produto: ${errorData.detail || 'Erro desconhecido'}`;
                }
            } catch (error) {
                message.style.color = 'red';
                message.textContent = `Erro: ${error.message}`;
            }
        };
        reader.readAsDataURL(imagemInput.files[0]);
    } else {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Adiciona o token
                },
                body: JSON.stringify(produtoData),
            });

            if (response.ok) {
                message.style.color = 'green';
                message.textContent = 'Produto criado com sucesso!';
                productForm.reset();
            } else {
                const errorData = await response.json();
                message.style.color = 'red';
                message.textContent = `Erro ao criar produto: ${errorData.detail || 'Erro desconhecido'}`;
            }
        } catch (error) {
            message.style.color = 'red';
            message.textContent = `Erro: ${error.message}`;
        }
    }
});
