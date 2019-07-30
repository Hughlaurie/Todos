'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    text: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};