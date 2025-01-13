 // URL da API
 const apiUrl = 'https://vivaleveapi.onrender.com/treinos/treinos'; // Substitua pela URL da sua API

 // Referências aos elementos da página
 const listarTreinosBtn = document.getElementById('listarTreinos');
 const treinoTableBody = document.querySelector('#treinoTable tbody');
 const message = document.getElementById('message');

 listarTreinosBtn.addEventListener('click', async () => {
     // Limpa mensagens e tabela
     message.textContent = '';
     treinoTableBody.innerHTML = '';

     try {
         // Requisição GET para a API de treinos
         const response = await fetch(apiUrl);
         
         if (response.ok) {
             const treinos = await response.json();

             if (treinos.length === 0) {
                 message.textContent = 'Nenhum treino encontrado.';
                 return;
             }

             // Preenche a tabela com os dados dos treinos
             treinos.forEach(treino => {
                 const row = document.createElement('tr');

                 row.innerHTML = `
                     <td>${treino.id}</td>
                     <td>${treino.nome}</td>
                     <td>${treino.tipo}</td>
                     <td>${treino.descricao}</td>
                     <td>${treino.duracao}</td>
                 `;

                 treinoTableBody.appendChild(row);
             });
         } else {
             message.textContent = 'Erro ao listar treinos. Tente novamente.';
         }
     } catch (error) {
         message.textContent = `Erro: ${error.message}`;
     }
 });