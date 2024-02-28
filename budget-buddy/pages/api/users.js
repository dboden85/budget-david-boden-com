import DB from "@/database";

const handler = (req, res)=>{
    const {uname, pass} =  req.body;
    const q = 'SELECT * FROM users WHERE uname = ? AND password = ?;';
    DB.query(q,[uname, pass], (err, results) => {
        try{
            if(results.length > 0){
            console.log('matched');
            res.status(200).json({'message': 'Matched', 'results': results});
            }else{
            console.log('no matches');
            res.status(200).json({'message': 'There were no matches'});
            }
        }catch{
            res.status(400).json({'message': 'There was an error'});
        }
    })
}

export default handler;