const PORT = 3000

const express = require("express")
const app = express();
const blogRoute = require("./routes/blog")

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use("/blog", blogRoute)

app.get('/', (req, res) => {
  res.redirect('/blog')
})

app.listen(PORT)
console.log(`server started on port ${PORT} `)
