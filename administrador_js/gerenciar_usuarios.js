function ListarUsuario() {
    window.location.href = "/vivaleveFRONT/crud/listar_usuario.html";
}
function AtualizarUsuario() {
    window.location.href = "/vivaleveFRONT/crud/atualizar_usuario.html";
}
function DeletarUsuario() {
    window.location.href = "/vivaleveFRONT/crud/deletar_usuario.html";
}

function voltarParaHome() {
    window.location.href = "/vivaleveFRONT/crud/index.html";
  }

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userList = document.getElementById('users');
    const apiBaseURL = 'https://vivaleveapi.onrender.com/users/users'; // Substitua pela URL da sua API

    // Função para renderizar os usuários na lista
    async function fetchAndRenderUsers() {
        try {
            const response = await fetch(apiBaseURL); // GET: listar usuários
            if (!response.ok) throw new Error('Erro ao buscar usuários');
            const users = await response.json();

            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;

                // Botão de excluir
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => deleteUser(user.id);

                // Botão de editar
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => loadUserIntoForm(user);

                li.appendChild(editButton);
                li.appendChild(deleteButton);
                userList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Função para carregar usuário no formulário para edição
    function loadUserIntoForm(user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('username').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('submit-button').textContent = 'Atualizar';
    }

    // Função para criar ou atualizar um usuário
    async function saveUser(e) {
        e.preventDefault();
        const id = document.getElementById('user-id').value;
        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        const user = { name, email };
        try {
            if (id) {
                // PUT: Atualizar usuário
                const response = await fetch(`${apiBaseURL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });
                if (!response.ok) throw new Error('Erro ao atualizar usuário');
            } else {
                // POST: Criar novo usuário
                const response = await fetch(apiBaseURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });
                if (!response.ok) throw new Error('Erro ao criar usuário');
            }

            form.reset();
            document.getElementById('submit-button').textContent = 'Salvar';
            fetchAndRenderUsers();
        } catch (error) {
            console.error(error);
        }
    }

    // Função para deletar um usuário
    async function deleteUser(id) {
        try {
            const response = await fetch(`${apiBaseURL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Erro ao excluir usuário');
            fetchAndRenderUsers();
        } catch (error) {
            console.error(error);
        }
    }

    // Configurar o evento do formulário
    form.addEventListener('submit', saveUser);

    // Carregar e exibir usuários na inicialização
    fetchAndRenderUsers();
});
