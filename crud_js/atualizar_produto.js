const apiUrl = 'https://vivaleveapi.onrender.com/produtos/produtos'; // Substitua pela URL base da sua API
const updateProductForm = document.getElementById('updateProductForm');
const message = document.getElementById('message');

updateProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const productId = document.getElementById('productId').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productImage = document.getElementById('productImage').files[0];

    if (!productId) {
        message.style.color = 'red';
        message.textContent = 'Por favor, insira o ID do produto.';
        return;
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Você precisa estar logado para realizar esta ação.");
        window.location.href = "login.html";
        return;
    }

    const productData = {
        ...(productName && { nome: productName }),
        ...(productPrice && { preco: parseFloat(productPrice) }),
        ...(productDescription && { descricao: productDescription }),
    };

    if (productImage) {
        const reader = new FileReader();
        reader.onload = async () => {
            productData.img = reader.result;

            try {
                const response = await fetch(`${apiUrl}/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(productData),
                });

                if (response.ok) {
                    message.style.color = 'green';
                    message.textContent = `Produto com ID ${productId} atualizado com sucesso!`;
                    updateProductForm.reset();
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao atualizar produto: ${errorData.detail || 'Erro desconhecido'}`;
                }
            } catch (error) {
                message.style.color = 'red';
                message.textContent = `Erro: ${error.message}`;
            }
        };
        reader.readAsDataURL(productImage);
    } else {
        try {
            const response = await fetch(`${apiUrl}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                message.style.color = 'green';
                message.textContent = `Produto com ID ${productId} atualizado com sucesso!`;
                updateProductForm.reset();
            } else {
                const errorData = await response.json();
                message.style.color = 'red';
                message.textContent = `Erro ao atualizar produto: ${errorData.detail || 'Erro desconhecido'}`;
            }
        } catch (error) {
            message.style.color = 'red';
            message.textContent = `Erro: ${error.message}`;
        }
    }
});
