// const session = require("express-session");
// const genFunc = require("connect-pg-simple");
// const cookieParser = require("cookie-parser");
// const PostgresqlStore = genFunc(session);
// const sessionStore = new PostgresqlStore({
//     conString: "postgres://postgres:postgres@localhost:5432/fotytodo",
// });

// //Alternative store if DB won't work [don't use in production]
// // const store = new session.MemoryStore();
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     next();
// });


// app.use(
//   session({
//     secret: "smellytruhelis",
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1day ( 1 second = 1000 milliseconds)
//       sameSite: "lax",
//       secure: false,
//     },
//   })
// );

// const checkAuth = (req, res, next) => {
//   if (req.session.auth) {
//     return next();
//   } else {
//     res.send("a nu poshel von, idzi login!!");
//   }
// };

// const checkAuth = (req, res, next) => {
//     if (req.session.authenticated) {
//         console.log("MiddleWare fired");
//         return next();
//     } else {
//         res.send("a nu poshel von, idzi login!!");
//     }
// };