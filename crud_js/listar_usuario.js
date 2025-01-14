const apiUrl = 'https://vivaleveapi.onrender.com/users/users'; // Substitua pela URL da sua API
const listarUsuariosBtn = document.getElementById('listarUsuarios');
const usuariosTableBody = document.querySelector('#usuariosTable tbody');
const message = document.getElementById('error-message');

// Adicione o token ao cabeçalho
const token = localStorage.getItem('authtoken');

listarUsuariosBtn.addEventListener('click', async () => {
    message.textContent = ''; // Limpa mensagens anteriores
    usuariosTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const usuarios = await response.json();

            if (usuarios.length === 0) {
                message.textContent = 'Nenhum usuário encontrado.';
                return;
            }

            // Preenche a tabela com os dados dos usuários
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.username}</td>
                    <td><img src="${usuario.imagem}" alt="${usuario.nome}" width="50" height="50"></td>
                `;
                usuariosTableBody.appendChild(row);
            });

            document.getElementById('usuariosTable').style.display = 'table'; // Exibe a tabela
        } else {
            message.textContent = 'Erro ao listar usuários. Tente novamente.';
        }
    } catch (error) {
        message.textContent = `Erro: ${error.message}`;
    }
});
