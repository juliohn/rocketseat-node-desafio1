# rocketseat-node-desafio1
Projeto de desafio do primeiro modulo node bootcamp 7 => 25/06/2019

rotas[

            GET /projects // - Lista os projetos e suas respectivas tasks

            PUT /projects/:id - Altera o title do projeto do id que veio por parametro{
               -Recebe um json como parametro como este : { "title":"Projeto Alterado 3"}
            }

            POST /projects  // - Insere um novo projeto sem task {
               - Recebe um json como parametro como este : {"id":"5",	"title":"Novo Projeto id 5"}
            }


            POST /projects/:id/tasks // - Insere uma nova task para um projeto {
               - Recebe um json como parametro como este : {"title":"Nova Task para Projeto id 1"}
            }

            DELETE /projects/:id  // - Deleta quando encontrar o id passando no parametro, senao, informa que id nao foi encontrado{
            }

           [Middlewares]  // - Para as acoes de insert task via POST, update project via PUT, e Delete Project via Delete, existe
           um middleware que valida se o id informado existe, senao existir, gera uma mensagem de erro.
   
  ] 
