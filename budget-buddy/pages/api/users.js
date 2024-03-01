import DB from "@/database";

const handler = (req, res)=>{
    const {uname, pass} =  req.body;
    // const q = 'SELECT * FROM users WHERE uname = ? AND password = ?;';
    // DB.query(q,[uname, pass], (err, results) => {
    //     try{
    //         if(results.length > 0){
    //         console.log('matched');
    //         res.status(200).json({'message': 'Matched', 'results': results});
    //         }else{
    //         console.log('no matches');
    //         res.status(200).json({'message': 'There were no matches'});
    //         }
    //     }catch{
    //         res.status(400).json({'message': 'There was an error'});
    //     }
    // })
    const DUMMYDB = {
        username: 'dboden',
        password: 'pass'
    }

    const {username, password} = DUMMYDB;

    if(username === uname && password === pass){
        res.status(200).json({'message': 'Matched', results: {uid: 1, fname: 'David', lname: 'Boden', paycheck_amount: 2000.00, savings_goal: 20000, savings_per_paycheck: 311}});
    }

}

export default handler;