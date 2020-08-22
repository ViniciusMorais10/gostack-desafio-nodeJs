const express = require("express");
const cors = require("cors");
const {request,response,json} = require("express");
const {uuid, isUuid} = require('uuidv4');


// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({
      error: "Invalid ID!"
    })
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // TODO
  
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const{title,url,techs} = request.body;

  const repository = {id:uuid(),title,url,techs,likes:0};
  
  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id",validateId, (request, response) => {
  // TODO
  const {title,url,techs} = request.body;
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0){
    return response.status(400).json({error:'Repository does not exists.'})
  }
  const newRepository = {
    id,
    title,
    url,
    techs,
    likes : repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = newRepository;

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0){
      return response.status(400).json({error:'Repository not found'});
  }

  if(repositoryIndex >=0){
  repositories.splice(repositoryIndex,1);
  }
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

const repositoryIndex = repositories.findIndex(repository => repository.id === id);

if (repositoryIndex < 0){
  return response.status(400).json({error:'Repository not found'});
}

repositories[repositoryIndex].likes++;

return response.json(repositories[repositoryIndex]);

});

module.exports = app;


