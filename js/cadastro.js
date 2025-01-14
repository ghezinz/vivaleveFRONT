document.getElementById('formCadastro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');

  mensagem.textContent = '';
  mensagem.style.color = 'red';

  // Monta o objeto de dados para envio
  const data = {
    name,
    email,
    username,
    password,
  };

  try {
    const response = await fetch('https://vivaleveapi.onrender.com/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = 'Usuário cadastrado com sucesso!';
      document.getElementById('formCadastro').reset();
    } else {
      const errorData = await response.json();
      mensagem.textContent = `Erro ao cadastrar usuário: ${
        errorData.detail || 'Erro desconhecido'
      }`;
      console.error('Detalhes do erro:', errorData);
    }
  } catch (error) {
    mensagem.textContent = `Erro: ${error.message}`;
    console.error('Erro no cadastro:', error);
  }
});
