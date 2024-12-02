import express from 'express'
const PORT = 8080
const app = express()
app.use(express.json())

app.get("/index", (req, res) => {
    res.status(200).json({Message: "Pokemoni"})
    res.download
})

app.get("/login")

app.get("/home")

app.get("subject/:id")

app.get("/discover")



/*
app.get(`/user`, (req, res) => {
    res.status(200).send({
        1: "Pokemoni",
        2: "Pokemoni 2"
    })
})

app.post("/user/:id", (req, res) => {
    const { id } = req.params
    const { logo } = req.body

    if (!logo) {
        res.status(418).send({ Message: "We need a logo 20000" })
    }
    res.send({
        eo: `theese are your ${id}, ${logo}`
    })
})
console.log("Pokeomoni")

app.listen(
    PORT,
    () => { console.log(`App started on port ${PORT}`) }
)

//Možemo napraviti router kao mala aplikacija u aplikaciji
/* Kopiraj sockete koje je fireship napravio */
//ejs pug?*/