const express = require('express');
const server = express();

server.use(express.json());

let contLogs = 0;
// - Middlewares
function ValidateProject(req,res,next){
    const { id } = req.params;
    const project = projects.find(item => item.id === id);

    if(!project){
        return res.status(404).json({"error":"Projeto nao encontrado" });
    }
    return next();
}

function countLog(req,res,next){
    contLogs ++;
    console.log('Total de chamadas a api : '+ contLogs);
    return next(); 
}

server.use(countLog);

const projects = [
    {
        id:"1",
        title:"Projeto 1",
        task:['task1','task2'],
    },
    {
        id:"2",
        title:"Projeto 2",
        task:['task1','task2'],
    },
    {
        id:"3",
        title:"Projeto 3",
        task:['task1','task2']
    }

];


// - Lista todos os projetos
server.get('/projects',(req,res) => {
    return res.json(projects);
});

// - Altera o title do projeto do id que veio por parametro
server.put('/projects/:id',ValidateProject,(req,res) => {
    const { id } = req.params;
    const { title } = req.body;
   
    /*
        Aqui usa o find para buscar pelo id, e retorna apenas o objeto alterado
        const project = projects.find(item => item.id === id);
        project.title = title;
        return res.json(project);
    */

    // - Aqui faco um laco e altero o indice onde o id for igual ao enviado, e retorno todos os projetos novamente
    projects.forEach((item, i) => {
            if(item.id === id){
                projects[i].title = title;    
            }
        }
    );

    return res.json(projects);
});



// - Insere um novo projeto sem task
server.post('/projects',(req,res) => {

    const { id,title } = req.body;
    const project = {
        "id":id,
        "title":title,
        "task":[]
    };
    projects.push(project);
    return res.json(projects);
})


// - Insere uma nova  task ao projeto passado (id)
server.post('/projects/:id/tasks',ValidateProject,(req,res) => {

    const { id } = req.params;
    const { title } = req.body;

    // - Aqui faco um laco e insiro uma nova task onde o id for igual ao enviado, e retorno todos os projetos novamente
    projects.forEach((item, i) => {
            if(item.id === id){
                projects[i].task.push(title);    
            }
        }
    );

    return res.json(projects);
})



// - Deleta quando encontrar o id passando no parametro, senao, informa que id nao foi encontrado
server.delete('/projects/:id',ValidateProject,(req,res) => {
    const { id } = req.params;
    const index = projects.findIndex(item => item.id === id);
    projects.splice(index,1);
    return res.json(projects);
})


server.listen(3000);
