const express = require('express')
const cors = require('cors')
const rootRouter = require("./routes/index")
const app = express()
app.use(cors());
const PORT = 3000;
//body-parser
app.use(express.json({
    orign : ["money-wallet-client.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});