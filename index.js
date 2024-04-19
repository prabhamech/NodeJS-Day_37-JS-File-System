import express from 'express'
import fs from 'fs'
import path from 'path';
import { format } from 'date-fns';


const PORT=8000;
let app=express()
app.use(express.json())
app.get('/',(req,res)=>{
    let today=format(new Date(),'dd-MM-yyyy-HH-mm-ss')
    const filePath = `DateTime/${today}.txt`;
    fs.writeFileSync(filePath,`${today}`,'utf8')
    let data=fs.readFileSync(filePath,'utf8')
    try {
        res.status(200).send(data)
        
    } catch (error) {
        req.res(500).send('Internel server error')
        
    }
})
//New endpoint to retrieve all text files in a folder
app.get("/getTextFiles", (req, res) => {
    const folderPath = "DateTime";  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occured while listing the files from directory");
      } else {
        const textFiles = files.filter((file) => path.extname(file) === ".txt");
        res.status(200).json(textFiles);
      }
    });
  });

app.listen(PORT,()=>console.log(`App is Listening to ${PORT}`))