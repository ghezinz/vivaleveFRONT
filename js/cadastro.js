document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const img = document.getElementById('img').files[0];
    const mensagem = document.getElementById('mensagem');
  
    mensagem.textContent = '';
    mensagem.style.color = 'red';
  
    if (senha !== confirmarSenha) {
      mensagem.textContent = 'As senhas não coincidem!';
      return;
    }
  
    const formData = new FormData();
    formData.append('name', nome);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', senha);
    if (img) {
      formData.append('img', img);
    }
  
    try {
      const response = await fetch('https://vivaleveapi.onrender.com/users/signup', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        mensagem.style.color = 'green';
        mensagem.textContent = 'Usuário cadastrado com sucesso!';
        document.getElementById('formCadastro').reset();
      } else {
        const errorData = await response.json();
        mensagem.textContent = `Erro ao cadastrar usuário: ${errorData.detail || 'Erro desconhecido'}`;
      }
    } catch (error) {
      mensagem.textContent = `Erro: ${error.message}`;
    }
  });
  
