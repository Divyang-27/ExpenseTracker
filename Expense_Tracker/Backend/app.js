const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/databse.js');

const User = require('./models/user.js');
const Expense = require('./models/expense.js');

const userRoutes = require('./routes/user.js');
const expenseRoutes = require('./routes/expense.js');
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use('/user', userRoutes);
app.use('/user/expense', expenseRoutes);

Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expense);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
