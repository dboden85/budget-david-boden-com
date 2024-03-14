import DB from "@/database";

const handler = (req, res)=>{
    if(req.method = 'POST'){
        const {uid, title, amount, due} =  req.body;
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

    if(req.method = 'DELETE'){
        const {id} = req.body;
        const q = 'DELETE FROM bills WHERE bid = ?;';

        console.log('Delete request ran')

        DB.query(q, [id], (err, results) => {
            if(err){
                res.status(200).json({'message': err, success: 0})
                return;
            }

            res.status(200).json({'message': 'The bill is deleted.', success: 1})


        })
    }

}

export default handler;