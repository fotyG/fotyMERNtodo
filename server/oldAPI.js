LOGIN
// try {
//   const user = await db.query("SELECT * FROM users WHERE username = $1;", [
//     name,
//   ]);
//   if (!user.rows.length) return res.send("User not found");

//   if (user.rows[0].password === pw) {
//     console.log("HOmyak vernuLsa!!");
//     const token = jwt.sign({ name }, "secrettruhel", {
//       expiresIn: "1hr",
//     });
//     res.send({ user: name, token });
//   } else {
//     console.log("shoto ne tak");
//     res.send({ failure: "Login failed" });
//   }
// } catch (error) {
//   console.log(error);
// }

REGISTER
 // const { userName, password } = await req.body;

  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);

  // try {
  //     const signUp = await db.query(
  //         "INSERT INTO users (username, password) VALUES ($1, $2)",
  //         [userName, hashedPassword]
  //     );
  //     res.send({
  //         status: "tilox",
  //     });
  // } catch (error) {
  //     console.log(error);
  // }

GETALLTODOS
// const todos = await db.query("SELECT * FROM todos;");
  // console.log(todos.rows);
  // console.log(req.session);

  // res.send(todos.rows);

ADDTODO
// try {
  //   const { title, description } = await req.body;
  //   const newTodo = await db.query(
  //     "INSERT INTO todos (title, description) VALUES ($1, $2)",
  //     [title, description]
  //   ); //Try returning all or smth here later for better response
  //   res.send(`${newTodo} was successfully added`);
  // } catch (error) {
  //   console.log(error);
  // }

  DELETETODO
  // console.log(req.params)
  // const deleted = await db.query("DELETE FROM todos WHERE todo_id = $1;", [id]);
  // res.send("sukasess");