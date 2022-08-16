var path = require("path");
var pdf = require('html-pdf');
var fs = require('fs');
var handlebars = require("handlebars");

let getPdf = async (req, res, next) => {
    try {
        // let  { first_name, last_name, invoiceNo, itemName } = req.body
        // let data={
        //     first_name:req.body[0].first_name,
        //     last_name:req.body[0].last_name,
        //     invoiceNo:req.body[0].invoiceNo,
        //     itemName:req.body[0].itemName
        // }
        let data = req.body
        for (let i = 0; i < data.length; i++) {
            // console.log("data", data[i]);
            if (data[i].length === 0) {
                console.log("data not found");
            } else {
                const filePath = path.join(__dirname + '/index.html'); //file path
                const source = fs.readFileSync(filePath, 'utf-8').toString(); //file reading
                const template = handlebars.compile(source);//store file source in template
                // for (let i = 0; i < res.length; i++) {
                //     // console.log(res[i]);
                    // if (data[i] === 0) {
                    //     console.log("No data found");
                    // } else {
                        const replace = { //replace the mysql data in this variavle
                            companyName: data[i].companyName,
                            companyAdress: data[i].companyAdress,
                            invoiceNo: data[i].invoiceNo,
                            item: data[i].item
                        };
                        // console.log("replace", replace);



                        const htmlToSend = template(replace);//pass the repalce object in template 
                        // console.log("htmlToSend",htmlToSend);
                        var html;
                        const d_t = new Date();
                        let year = d_t.getFullYear();
                        let month = d_t.getMonth();
                        let day = d_t.getDate();
                        let hour = d_t.getHours();
                        let minute = d_t.getMinutes();
                        let millisec = d_t.getMilliseconds();

                        var baseFileName = `${year}${month}${hour}${minute}${millisec}`;

                        // var fileName=`updatefile${year}${month}${hour}${minute}${millisec}.html`
                        var fileName = path.join(`updatefile${baseFileName}.html`);
                        fs.writeFileSync(fileName, htmlToSend, 'utf8', function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");

                        });
                        html = fs.readFileSync(fileName, 'utf8'); //to your html file
                        console.log("html", html);
                        // }, 0)
                        var options = {
                            format: 'Letter',
                            timeout: 540000
                        };
                        var gerrateddoc = path.basename(`pdfFile${baseFileName}.pdf`)
                        console.log("gerrateddoc",gerrateddoc);
                        pdf.create(html, options).toFile(`./${gerrateddoc}`, function (err, data) {
                            if (err) return console.log(err);
                           
                            let sendData=path.basename(`${data.filename}`)
                            // console.log("data",sendData);
                            res.status(200).json({
                                error: false,
                                message: 'pdf response successfully',
                                products: [{sendData}]
                            })
                            getres(sendData)
                        });
                        // res.status(200).json({
                        //     error: false,
                        //     message: 'pdf response successfully',
                        //     products: gerrateddoc
                        // })
                    // }
                // }
            }

        }
    } catch (err) {
        next(err)
    }
}

let getres=(data=>{
    console.log("getres",data);
})


module.exports = { getPdf }