  // URL da API
  const apiUrl = 'http://127.0.0.1:8000/users/users'; // Substitua pela URL da sua API

  // Referência ao formulário e mensagem
  const form = document.getElementById('deleteForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita recarregar a página

      const userId = document.getElementById('userId').value;

      // Valida se o ID é válido
      if (!userId || isNaN(userId)) {
          message.textContent = 'Por favor, insira um ID válido.';
          message.style.color = 'red';
          return;
      }

      try {
          // Realiza a requisição DELETE
          const response = await fetch(`${apiUrl}/${userId}`, {
              method: 'DELETE',
          });

          if (response.ok) {
              message.textContent = `Usuário com ID ${userId} deletado com sucesso!`;
              message.style.color = 'green';
          } else if (response.status === 404) {
              message.textContent = `Usuário com ID ${userId} não encontrado.`;
              message.style.color = 'red';
          } else {
              throw new Error('Erro ao deletar o usuário.');
          }
      } catch (error) {
          message.textContent = `Erro: ${error.message}`;
          message.style.color = 'red';
      }

      // Limpa o campo do ID após a submissão
      form.reset();
  });