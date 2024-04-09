import DB from "@/database";

const handler = (req, res)=>{

    let q = ''; //query based on request method
    const { method, body, query } = req;

    console.log('Req Method: ' + req.method)
    const params = req.query;

    switch(method){
        case 'GET':

            q = 'SELECT * FROM paycheck_items WHERE userid = ?;';
            DB.query(q,[query.uid], (err, results) => {

                if(err){
                    res.status(404).json({'message': 'Could not connect to the server!\n' + err});
                    return;
                }

                if(results.length > 0){
                    console.log('matched');
                    res.status(200).json({'message': 'Found Paycheck Items for user', 'results': results});
                }else{
                    console.log('no matches');
                    res.status(200).json({'message': 'No Paycheck Items were found for user'});
                }
            })

            break;

        case 'POST':

            const {uid, title, amount} = body;

            q = 'INSERT INTO paycheck_items(title, amount, userid) VALUES(?, ?, ?);';
            DB.query(q,[title, amount, uid], (err, results) => {

                if(err){
                    res.status(404).json({'message': 'Could not connect to the server!\n' + err});
                    return;
                }

                try{
                    res.status(200).json({'message': 'A new paycheck item is added'});
                }catch{
                    res.status(400).json({'message': 'There was an error'});
                }
            })

            break;
        
        case 'DELETE':

            console.log(req.query)
            
            q = 'DELETE FROM paycheck_items WHERE pid = ?;';

            DB.query(q, [query.pid], (err, results) => {
                if(err){
                    res.status(200).json({'message': err, success: 0})
                    return;
                }

                res.status(200).json({'message': 'The paycheck item is deleted.', success: 1})


            })

            break;

        case 'PUT':

            q = 'UPDATE user_info SET paycheck_amount = ? WHERE userid = ?;'

            DB.query(q, [body.amount, body.uid], (err)=>{
                if(err){
                    res.status(500).json({'message': err})
                    return;
                }

                res.status(200).json({'message': 'Paycheck Amount is updated!', 'success': 1});
            })

            break;

        default:
            //do nothing
            break;
    }
}

export default handler;