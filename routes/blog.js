const express = require("express")
const routes = express.Router()
const app = express();

let postList = [{ author: "Mohamed", date: Date(), content: "blablabla" }, { author: "Jerry", date: Date(), content: "jajajajaja" }]
// app.use(express.urlencoded({ extended: true }))

routes.get("/", (req, res) => {
  // res.json({ "text": "Hello" })
  res.render("blog", { text: "best blog posts", posts: postList })
})
routes.post("/", (req, res) => {
  postList.push({ author: req.body.author, date: Date(), content: req.body.content })
  res.render("blog", { text: "best blog posts", posts: postList })

})
routes.post("/delete/:id", (req, res) => {
  console.log("tried to delete the post : " + req.params.id)
  postList.splice(req.params.id, 1);
  res.redirect("/")
})


module.exports = routes
