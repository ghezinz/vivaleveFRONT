document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://vivaleveapi.onrender.com/users/users';
    const listarButton = document.getElementById('listarUsuarios');
    const usuariosTable = document.getElementById('usuariosTable').querySelector('tbody');
    const message = document.getElementById('message');

    listarButton.addEventListener('click', async () => {
        message.textContent = ''; // Limpa mensagens anteriores
        usuariosTable.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            alert('Sessão expirada. Faça login novamente.');
            window.location.href = '/vivaleveFRONT/login.html';
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const usuarios = await response.json();

                if (usuarios.length === 0) {
                    message.style.color = 'blue';
                    message.textContent = 'Nenhum usuário encontrado.';
                    return;
                }

                usuariosTable.parentElement.style.display = ''; // Exibe a tabela

                usuarios.forEach(usuario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.usuario}</td>
                        <td><img src="${usuario.imagem || ''}" alt="Imagem do usuário" style="width: 50px; height: 50px;"></td>
                    `;
                    usuariosTable.appendChild(row);
                });
            } else {
                if (response.status === 401) {
                    alert('Sessão expirada. Faça login novamente.');
                    window.location.href = '/login.html';
                } else {
                    const errorData = await response.json();
                    message.style.color = 'red';
                    message.textContent = `Erro ao listar usuários: ${errorData.detail || 'Erro desconhecido'}`;
                }
            }
        } catch (error) {
            message.style.color = 'red';
            message.textContent = `Erro: ${error.message}`;
        }
    });
});
