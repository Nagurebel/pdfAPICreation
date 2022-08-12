const express = require("express");
const app = express();
let cors = require('cors');

const PORT = process.env.PORT || 3000;

let pdfRouter = require('./router/pfd')


app.use(cors());

// Body-parser middleware
app.use(express.urlencoded({
    extended: true
}))

// Json middleware
app.use(express.json());

// router Middleware
app.use('/invoicebill', pdfRouter);

app.get('/',(req,res)=>{
     var dataToSendObj = {'title': 'Your Website Title', 'message': 'Hello'};
       res.status(200).json({
            error: false,
            message: 'pdf response successfully',
            products: [dataToSendObj]
        })
})

app.use((err, req, res, next) => {
    res.status(500).json({
        error: true,
        message: err.message,
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Listening to the server on http://localhost:${PORT}`);
})