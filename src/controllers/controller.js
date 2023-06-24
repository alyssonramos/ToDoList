const service = require('../services/service');

module.exports = {
    buscarTudo: async(req, res) =>{
        let json = {error:'', result:[]}

        let list = await service.buscarTudo();

        for(let i in list){
            json.result.push({
                tarefaId: list[i].id,
                tarefaNome: list[i].nome,
                tarefaDesc: list[i].descricao,
                tarefaFinal: list[i].finalizada,
                tarefaData: list[i].data_termino,
                tarefaPrioridade: list[i].prioridade
            })
        }
        res.json(json);
    },

    buscarUm: async(req, res) =>{
        let json = {error:'', result:{}}

        let nome = req.params.nome;
        let list = await service.buscarUm(nome);

        if(list){
            json.result = list;
        }
        res.json(json);
    },


    inserir: async(req, res) =>{
        let json = {error:'', result:[]}

        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let finalizada = req.body.finalizada;
        let data_termino = req.body.data_termino;
        let prioridade = req.body.prioridade;

        if(nome && descricao && finalizada && data_termino && prioridade){
            let listId = await service.inserir(nome, descricao, finalizada, data_termino, prioridade);
            json.result = {
                id: listId,
                nome,
                descricao,
                finalizada,
                data_termino,
                prioridade
            }
            return res.redirect("/api/");
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    upload: async(req, res) =>{
        let json = {error:'', result:[]}

        let id = req.params.id;
        let nome = req.body.nome;
        let descricao = req.body.descricao;
        let finalizada = req.body.finalizada;
        let data_termino = req.body.data_termino;
        let prioridade = req.body.prioridade;

        if(id && nome && descricao && finalizada && data_termino && prioridade){
            await service.upload(id, nome, descricao, finalizada, data_termino, prioridade);
            json.result = {
                id,
                nome,
                descricao,
                finalizada,
                data_termino,
                prioridade
            }
        }else{
            json.error = 'Campos não enviados!!';
        }
        res.json(json);
    },

    delete: async(req, res) =>{
        let json = {error:'', result:[]}

        let id = req.params.id;
        await service.delete(id);
        
        res.json(json);
    }

}