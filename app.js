if(process.env.NODE_ENV !="production"){
require('dotenv').config();
//console.log(process.env.secret);
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodoverride = require("method-override");
const expresserror = require("./utils/expresserror.js")
const listingRouter  = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");

const dburl = process.env.ATLASDB_URL;

async function startServer() {
  try {
    await mongoose.connect(dburl);
    console.log("Successfully connected to DB.");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    // Exit so the process doesn't run with a partially-initialized app
    process.exit(1);
  }
}

startServer();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error", (err) => {
  console.log("error in mongo session store", err);
});

const sessionOptions= {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized: true,
  cookie: {
    // `expires` should be a Date and `maxAge` is milliseconds
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }

}


app.use(session(sessionOptions))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  
  next();
})


app.get("/", (req, res) => {
  res.redirect("/listings");
});



app.use("/listings",listingRouter);
//reviews
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

app.use((req, res, next) => {
  next(new expresserror(404, "Page not found!"));
});


// Error handler middleware
app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something went wrong." } = err;
  res.status(statuscode).render("error.ejs", { statuscode, message });
});

// server started inside `startServer()` after DB connection

