const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')

var todos = [
  {id: 1, text: "Learn JavaScript", done: false, edit: false},
  {id: 2, text: "Learn Vue", done: false, edit: false},
  {id: 3, text: "Play around in JSFiddle", done: false, edit: false},
  {id: 4, text: "Build something awesome", done: true, edit: false},
]

var id = todos.length + 1;

app.use(cors());
app.use (bodyParser.json())



app.get('/todos', (request, response) => {
  response.send(todos);
})

app.post('/todos', (request, response) => {
  let todo = request.body
  todo.id = id++;
  for (let i = 0; i < todos.length; i++) {
    if (todo.text == todos[i].text) {
      response.status(400).send({ error: 'Duplicate name!' });
      return;
    }
  }
  todos.push(todo)
  response.send(todo)
})


app.delete('/todos/:id', (request, response) => {
  todos = todos.filter(todo => todo.id != request.params.id)
  response.send(todos); 
}) 

app.delete('/todos', (request, response) => {
  todos = todos.filter(todo => !todo.done)
  response.send(todos);
})    
    


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
