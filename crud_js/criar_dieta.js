const apiUrl = 'http://127.0.0.1:8000/dietas/dietas'; // Substitua pela URL base da sua API
const dietaForm = document.getElementById('dietaForm');
const message = document.getElementById('message');

dietaForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = ''; // Limpa mensagens anteriores

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("Você precisa estar logado para realizar esta ação.");
        window.location.href = "login.html";
        return;
    }

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const consumoCaloria = parseFloat(document.getElementById('consumoCaloria').value);
    const imagemInput = document.getElementById('imagem');

    const dietaData = {
        nome,
        tipo,
        descricao,
        consumo_caloria: consumoCaloria,
    };

    if (imagemInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = async () => {
            dietaData.img = reader.result;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`, // Adiciona o token
                    },
                    body: JSON.stringify(dietaData),
                });

                if (response.ok) {
                    message.style.color = 'green';
                    message.textContent = 'Dieta criada com sucesso!';
                    dietaForm.reset();
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao criar dieta: ${errorData.detail || 'Erro desconhecido'}`;
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
                body: JSON.stringify(dietaData),
            });

            if (response.ok) {
                message.style.color = 'green';
                message.textContent = 'Dieta criada com sucesso!';
                dietaForm.reset();
            } else {
                const errorData = await response.json();
                message.style.color = 'red';
                message.textContent = `Erro ao criar dieta: ${errorData.detail || 'Erro desconhecido'}`;
            }
        } catch (error) {
            message.style.color = 'red';
            message.textContent = `Erro: ${error.message}`;
        }
    }
});
