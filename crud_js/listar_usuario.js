const apiUrl = 'https://vivaleveapi.onrender.com/users/users';
const token = sessionStorage.getItem('authenticated'); // Pegue o token armazenado na sessão

async function listarUsuarios() {
    const message = document.getElementById('message');
    const usuariosTable = document.getElementById('usuariosTable').querySelector('tbody');
    message.textContent = ''; // Limpa mensagens anteriores
    usuariosTable.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Enviar o token no cabeçalho
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

            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.role}</td>
                `;
                usuariosTable.appendChild(row);
            });
        } else {
            const errorData = await response.json();
            message.style.color = 'red';
            message.textContent = `Erro ao listar usuários: ${errorData.detail || 'Erro desconhecido'}`;
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = `Erro: ${error.message}`;
    }
}

// Chama a função ao carregar a página
listarUsuarios();
