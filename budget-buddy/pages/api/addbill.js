import DB from "@/database";

const handler = (req, res)=>{
    const {uid, title, amount, due} =  req.body;
    console.log(uid)
    const q = 'INSERT INTO bills(user_id, bill_title, bill_amount, due_date) values(?, ?, ?, ?);';
    DB.query(q,[uid, title, amount, due], (err, results) => {
        try{
            console.log(results)
            res.status(200).json({'message': 'A new bill is added'});
        }catch{
            res.status(400).json({'message': 'There was an error'});
        }
    })

}

export default handler;