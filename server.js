const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require(__dirname + '/models/index.js') 

//тест подключения
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use (bodyParser.json())

//get Data from DB
app.get('/todos', async (request, response) => {
  let todos = await db.Todos.findAll();
  response.send(todos);
})

//add Data to DB
app.post('/todos', async (request, response) => {
  let todo = request.body
  let sameTodo = await db.Todos.findAll(
    {where: {text: todo.text}
  })
  if (sameTodo.length > 0) {return} 
  db.Todos.create(todo)
  response.send(todo)
})

//delete data
app.delete('/todos/:id', async (request, response) => {
  let todo = await db.Todos.findAll(
    {where: {id: request.params.id}
  })
  db.Todos.remove(todo);
  response.send(todo); 
}) 
//delete all (notwork)
app.delete('/todos', (request, response) => {
  todos = todos.filter(todo => !todo.done)
  response.send(todos);
})    
 //toggle  
app.put('/todos/:id', async (request, response) => {
  let todo = await db.Todos.findOne({
    where: {id: request.params.id}
  })
  if (todo) { 
    await db.Todos.update(request.body, {
      where: {id: request.params.id}
    });
  }
  response.send(request.params.id);
})

/* for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == request.params.id) {
      todos[i] = request.body;
      response.send(todos[i]);
      return;
    }
    /*if (request.body[i].edit) {
      todos[i].text =todo[i].text;
      todos[i].edit = false;
    }*/
/*response.status(404).send({ error: `Not found todo with id: ${request.params.id}.` });
})*/

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
