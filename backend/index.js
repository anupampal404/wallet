const express = require('express')
const cors = require('cors')
const rootRouter = require("./routes/index")
const app = express()
app.use(cors());
const port = process.env.PORT || 3000;
//body-parser
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});
