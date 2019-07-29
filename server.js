const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')

const Sequelize = require('sequelize'); //Подключаем библиотеку
const Model = Sequelize.Model;
const config =  {
  username: 'postgres',
  password: 111111, 
  database: 'postgres', // Имя базы данных
  host: '127.0.0.1', // Адрес субд, для postreSQL всегда локалхост
  dialect: 'postgres',
  } // Говорим, какую СУБД будем юзать
 /* dialectOptions: {
    multipleStatements: true
  },
  logging: console.log, // Включаем логи запросов, нужно передать именно функцию, либо false
  storage: './test_db.db', // Путь к файлу БД
  operatorsAliases: Sequelize.Op // Передаём алиасы параметров (дальше покажу нафига)
}*/
let sequelize = new Sequelize(config); // Создаём подключение

//тест подключения
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//описываем модель данных
let Todos = sequelize.define('todos', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER
  },
  text: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  done: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

/*let todo = {
    text: 'Java Learn',
    done: false
  }
Todos.create(todo); 
sequelize.sync();*/ 


//var id = todos.length + 1;
Todos.destroy;

app.use(cors());
app.use (bodyParser.json())



app.get('/todos', async (request, response) => {
    await Todos.findAll().then(dbTodo => {
    response.send(dbTodo);
  })
})

app.post('/todos', async (request, response) => {
  let todo = request.body
  let sameTodo = await Todos.findAll(
    {where: {text: todo.text}
  })
  if (sameTodo.length > 0) { return} 
  Todos.create(todo)
  response.send(todo)
})

//delete
app.delete('/todos/:id', (request, response) => {
  todos = todos.filter(todo => todo.id != request.params.id)
  response.send(todos); 
}) 
//delete all
app.delete('/todos', (request, response) => {
  todos = todos.filter(todo => !todo.done)
  response.send(todos);
})    
 //toggle   
app.put('/todos/:id', (request, response) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == request.params.id) {
      todos[i] = request.body;
      response.send(todos[i]);
      return;
    }
    /*if (request.body[i].edit) {
      todos[i].text =todo[i].text;
      todos[i].edit = false;
    }*/
  }
  response.status(404).send({ error: `Not found todo with id: ${request.params.id}.` });
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
