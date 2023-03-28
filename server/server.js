require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db/db");
const User = require("./db/userModel");
const Todo = require("./db/todoModel")
const app = express();
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// {
//     origin: "http://localhost:5173",
//     credentials: true,
// }

app.use(helmet());

// GET all todos
app.get("/api/v1/", async (req, res) => {
  try {
    const item = await req.query;
    if(item._id) {
      const todo = await Todo.find({ _id: item._id });
      res.status(200).send({
        message: "Here is your todo",
        todo,
      })
    } else {
      const todos = await Todo.find({user: req.query.userId})
      res.status(200).send({
      message: "Todos retrieved Successfully",
      todos,
    });
    }
    
  } catch (error) {
    res.send({
      message: "Can't retrieve data",
    })
  }
});

//DELETE todo
app.delete("/api/v1/:id", async (req, res) => {
  const { id } = await req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);

  // Remove reference to deleted todo from user's todos array
  await User.findOneAndUpdate({ todos: id }, { $pull: { todos: id } });
  
  res.send({
    message: "Todo deleted",
  });
});

//add Todo
app.post("/api/v1/add", async (req, res) => {
  try {
    const { title, description, userId } = await req.body;
    const todo = new Todo({
      title,
      description,
      user: userId,
    });
    const newTodo = await todo.save()
    if(newTodo) {
      await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id }})
    }
    res.status(201).send({
      message: "Todo Created Successfully",
      newTodo,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error creating a todo",
      error,
    })
  }
});

//edit Todo
app.put("/api/v1/:id", async (req, res) => {
  const { id } = await req.params;
  // const { title, description } = await req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true,})
  .then(res.status(200).send(
    {
      message: "Todo edited",
    },
  )).catch((error)=>{
    message: "Unsuccessful",
    error
  })
})

//REGISTER
app.post("/api/v1/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      user: req.body.userName,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).send({
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

//LOGIN
app.post("/api/v1/login", async (req, res) => {
  try {
    const { name, pw } = await req.body;
    const user = await User.findOne({ user: name });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(pw, user.password);
    if (!match) {
      return res.status(400).send({
        message: "Wrong password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.user,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      message: "Login Successful",
      username: user.user,
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(404).send({
      message: "Error loging in",
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
