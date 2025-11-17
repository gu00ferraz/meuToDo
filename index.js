
import {configDb} from "./configdb.js"
import express from 'express'
import cors from "cors"
import rotas from "./rotas/rotas.js";

const app = express()
app.use(cors());
const port = 3000


//   TESTE
app.get('/', (req, res) => {
    
    res.send('Hello World, Gustavo!')
})


// INICIAR O SERVIDOR 

app.use(express.json());
app.use(rotas);

app.listen(port, () => {
    console.log(`EXEMPLO RODANDO NA PORTA: ${port}`)
    configDb()

})
