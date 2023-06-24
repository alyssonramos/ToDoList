window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/TodoList', {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Erro ao fazer a requisição');
      }
  
      const data = await response.json();
  
      const tableBody = document.querySelector('#data-table tbody');
  
      data.result.forEach((row) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${row.tarefaId}</td>
          <td><input type="text" value="${row.tarefaNome}" disabled></td>
          <td><input type="text" value="${row.tarefaDesc}" disabled></td>
          <td><input type="text" value="${row.tarefaFinal}" disabled></td>
          <td><input type="text" value="${row.tarefaData}" disabled></td>
          <td><input type="text" value="${row.tarefaPrioridade}" disabled></td>
          <td>
            <button class="delete-btn" data-id-tarefa="${row.tarefaId}">Excluir</button>
            <button class="edit-btn" data-id-tarefa="${row.tarefaId}">Editar</button>
          </td>
        `;
        tableBody.appendChild(newRow);
      });
  
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    
  });
  
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.dataset.idTarefa;
  
      try {
        const response = await fetch(`/api/tarefa/${id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Erro ao fazer a requisição');
        }
  
        // Remova a linha da tabela após a exclusão
        const tableRow = event.target.closest('tr');
        tableRow.remove();
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    }
  
    if (event.target.classList.contains('edit-btn')) {
      const id = event.target.dataset.idTarefa;
      const tableRow = event.target.closest('tr');
      const inputs = tableRow.querySelectorAll('input');
  
      // Habilita os inputs para edição
      inputs.forEach((input) => {
        input.removeAttribute('disabled');
      });
  
      // Altera o texto do botão para "Atualizar"
      event.target.textContent = 'Atualizar';
      event.target.classList.remove('edit-btn');
      event.target.classList.add('update-btn');
    }
  
    if (event.target.classList.contains('update-btn')) {
      const id = event.target.dataset.idTarefa;
      const tableRow = event.target.closest('tr');
      const inputs = tableRow.querySelectorAll('input');
  
      // Desabilita os inputs novamente após a atualização
      inputs.forEach((input) => {
        input.disabled = true;
      });
  
      // Obtém os novos valores dos inputs
      const novoNome = inputs[1].value;
      const novaDescricao = inputs[2].value;
      const novaFinalizada = inputs[3].value;
      const novaDataTermino = inputs[4].value;
      const novaPrioridade = inputs[5].value;
  
      try {
        const response = await fetch(`/api/tarefa/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: novoNome,
            descricao: novaDescricao,
            finalizada: novaFinalizada,
            data_termino: novaDataTermino,
            prioridade: novaPrioridade
          })
        });
  
        if (!response.ok) {
          throw new Error('Erro ao fazer a requisição');
        }
  
        // Altera o texto do botão de volta para "Editar"
        event.target.textContent = 'Editar';
        event.target.classList.remove('update-btn');
        event.target.classList.add('edit-btn');
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      }
    }
  });
  