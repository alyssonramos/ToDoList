const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('../controllers/controller');

router.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname + "/../views/index.html"));
});
router.use(express.static(path.join(__dirname, "/../public")));
router.get('/TodoList', controller.buscarTudo); //Read all
router.get('/tarefa/:nome', controller.buscarUm); //Read one
router.post('/tarefa', controller.inserir); //Create
router.put('/tarefa/:id', controller.upload); //Upload
router.delete('/tarefa/:id', controller.delete); //Delete

module.exports = router;