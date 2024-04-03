import DB from "@/database";

const handler = (req, res)=>{
    let q = ''; //query based on request method
    const { method, body, query } = req;

    switch (method) {

        case 'GET':

            q = 'SELECT fname, lname, email, paycheck_amount, savings_goal, savings_per_paycheck FROM user_info WHERE userid = ?;';
            DB.query(q, [query.uid], (err, results) => {
                if (err) {
                    return res.status(404).json({ 'message': 'Could not connect to the server!\n' + err });
                }
                
                if (results.length > 0) {
                    console.log('matched user');
                    return res.status(200).json({ 'message': 'User found', 'results': results[0] });
                } else {
                    console.log('no matches');
                    return res.status(200).json({ 'message': 'No user was found' });
                }
            });

            break;

        case 'POST':

            const {uname, pass} =  body;
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

            break;

        default:
            return res.status(405).end(`Method ${method} Not Allowed`);

    }
}

export default handler;