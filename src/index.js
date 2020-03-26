const express = require("express");
const mongoose = require("mongoose");
var Course;
var Login;
var login;
async function Logger() {
  const l = await Login.find({
    username: login.username,
    password: login.password
  });
  console.log(l.length);
  if (l.length === 1) return "OK";
  else return "NOK";
}
mongoose
  .connect(
    "mongodb+srv://ramit:905197LKKS@cluster0-zol4l.gcp.mongodb.net/webtech?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MOngoDB");
    performDBOps();
  })
  .catch(err => console.error("cannot connect"));

async function performDBOps() {
  let DBSchema = await new mongoose.Schema({
    name: String,
    link: String,
    year: String,
    semester: String,
    tag: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  });
  let LoginSchema = await new mongoose.Schema({
    username: String,
    password: String
  });
  Course = mongoose.model("Course", DBSchema);
  Login = mongoose.model("Login", LoginSchema);
}

const app = express();
app.post("/", (req, res) => {
  const course = new Course({
    name: req.query.name,
    link: req.query.link,
    year: req.query.year,
    semester: req.query.sem,
    tag: req.query.tag,
    isPublished: true
  });
  course.save();

  res.send("Entry Recorded");
});

app.post("/register", (req, res) => {
  const login = new Login({
    username: req.query.username,
    password: req.query.password
  });
  login.save();

  res.send("Registered User");
});

app.post("/login", (req, res) => {
  login = new Login({
    username: req.query.username,
    password: req.query.password
  });
  Logger().then(alert => res.send(alert));
});

const port = 3000;

app.listen(port);
