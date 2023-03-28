// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
//   if (!user.rows.length) {
//     return done(new Error("no user"));
//   }
//   done(null, user.rows[0]);
// });

// passport.use(
//   new LocalStrategy(function verify(username, password, cb) {
//     db.query("SELECT * FROM users where username = $1", [username], function (err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false, { message: "Incorrect username or password."}); }

//       function checkPw(err, password) {
//         if (err) { return cb(err); }
//         if (user.password !== password) { return cb(null, false, { message: "Incorrect username or password." })
//       }
//         return cb(null, user);
//       }});
//     })
//   );
