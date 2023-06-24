const db = require("../database/db");

module.exports = {
  buscarTudo: () => {
    return new Promise((aceito, rejeitado) => {
      db.query("SELECT * FROM tarefa", (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },

  buscarUm: (nome) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "SELECT * FROM tarefa WHERE nome = ?",
        [nome],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          if (results.length > 0) aceito(results[0]);
          else aceito(false);
        }
      );
    });
  },

  inserir: (nome, descricao, finalizada, data_termino, prioridade) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "INSERT INTO tarefa (nome, descricao, finalizada, data_termino, prioridade) VALUES (?, ?, ?, ?, ?)",
        [nome, descricao, finalizada, data_termino, prioridade],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results.insertId);
        }
      );
    });
  },

  upload: (
    id,
    nome,
    descricao,
    finalizada,
    data_termino,
    prioridade
  ) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "UPDATE tarefa SET nome = ?, descricao = ?, finalizada = ?, data_termino = ?, prioridade= ? WHERE id = ?", //PAREI AQUI
        [nome, descricao, finalizada, data_termino, prioridade, id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "DELETE FROM tarefa WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },
};
