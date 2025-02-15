import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
const PORT = 5000;

let employee = []

try {
    employee = JSON.parse(fs.readFileSync('employeeData.json','utf8'))
    console.log(employee);
} catch {
    employee = [];
}

app.get('/data', (req,res)=> {
    fs.readFile('employeeData.json','utf8',(err,data)=>{
        res.send(data);
    })
})

// Route to handle form submission
app.post("/submit", (req, res) => {
    const {name,email,phone,role,joiningDate} = req.body;
    const newData = {name,email,phone,role,joiningDate}
    employee.push(newData);
    // Append the form data to a file
    fs.writeFileSync("employeeData.json", JSON.stringify(employee)); 

      res.status(200).json({ message: "Data saved successfully." });
    });

app.listen(PORT, ()=> console.log(`server listening on ${PORT}`));