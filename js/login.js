document.getElementById('formLogin').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const mensagem = document.getElementById('mensagem');
  
    mensagem.textContent = '';
  
    try {
        const response = await fetch('http://127.0.0.1:8000/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log("Resposta da API:", data);  // Exibe a resposta completa da API no console

            // Verifique a estrutura da resposta e acesse o access_token corretamente
            if (data && data.access_token) {
                localStorage.setItem('authToken', data.access_token);  // Armazena o access_token
                if (data.refresh_token) {
                    localStorage.setItem('refreshToken', data.refresh_token);  // Armazena o refresh_token, se necessário
                }
                mensagem.style.color = 'green';
                mensagem.textContent = 'Login bem-sucedido!';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                mensagem.textContent = 'Access Token não encontrado na resposta';
                console.error('Estrutura inesperada da resposta:', data);  // Exibe a resposta completa caso não encontre o access_token
            }
        } else {
            const errorData = await response.json();
            console.error("Erro na resposta:", errorData);  // Exibe erro caso a resposta não seja bem-sucedida
            mensagem.textContent = `Erro: ${errorData.detail || 'Credenciais inválidas'}`;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        mensagem.textContent = `Erro: ${error.message}`;
    }
});

