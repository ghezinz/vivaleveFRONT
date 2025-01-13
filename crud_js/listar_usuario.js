document.getElementById('listarUsuarios').addEventListener('click', async () => {
    const apiUrl = 'https://vivaleveapi.onrender.com/users/users'; // Defina aqui a URL da API
    const errorMessage = document.getElementById('error-message');
    const usuariosTable = document.getElementById('usuariosTable');
    const tbody = usuariosTable.querySelector('tbody');

    // Limpa mensagens de erro e tabela
    errorMessage.textContent = '';
    tbody.innerHTML = '';
    usuariosTable.style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
        }
        const usuarios = await response.json();

        if (usuarios.length === 0) {
            errorMessage.textContent = 'Nenhum usuário encontrado.';
            return;
        }

        usuarios.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>
                    <img 
                        src="${user.image || 'https://via.placeholder.com/50'}" 
                        alt="Imagem de ${user.name}" 
                        style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;"
                    >
                </td>
            `;
            tbody.appendChild(row);
        });

        usuariosTable.style.display = 'table';
    } catch (error) {
        errorMessage.textContent = `Erro: ${error.message}`;
    }
});
