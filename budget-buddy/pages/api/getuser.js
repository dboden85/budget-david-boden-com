import DB from "@/database";

const handler = (req, res)=>{
    const {uname, pass} =  req.body;
    const q = 'SELECT * FROM users WHERE uname = ? AND password = ?;';
    
    DB.query(q,[uname, pass], (err, results) => {

        if(err){
            res.status(404).json({'message': 'Could not connect to the server!'});
            return;
        }
        
        if(results.length > 0){
            console.log('matched');
            res.status(200).json({'message': 'Matched', 'results': results[0].uid});
        }else{
            console.log('no matches');
            res.status(200).json({'message': 'Username or password is incorrect'});
        }
        
    })
}

export default handler;