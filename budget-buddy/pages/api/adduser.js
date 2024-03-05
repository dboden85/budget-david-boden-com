import DB from "@/database";

const handler = (req, res)=>{
    const {fname, lname, email, uname, pass} =  req.body;
    const q = 'INSERT INTO users(fname, lname, email, uname, password) VALUES(?, ?, ?, ?, ?);';
    DB.query(q,[fname, lname, email, uname, pass], (err, results) => {
        try{
            console.log(results)
            res.status(200).json({'message': 'A new user is added'});
        }catch{
            res.status(400).json({'message': 'There was an error'});
        }
    })

}

export default handler;