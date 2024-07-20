const express = require('express')
const cors = require('cors')
const rootRouter = require("./routes/index")
const app = express()
app.use(cors());
const PORT = 3000;
//body-parser
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});