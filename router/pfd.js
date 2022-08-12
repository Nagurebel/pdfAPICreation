let express = require('express');


let pdfRouter = express.Router();

let pdfController = require('../controllers/pdfControllers');

pdfRouter.get('/getInvoiceBillPdf',pdfController.getPdf);


module.exports = pdfRouter;