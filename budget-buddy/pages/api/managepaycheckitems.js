import DB from "@/database";

const handler = (req, res)=>{

    let q = ''; //query based on request method

    const rBody = req.body;
    const params = req.query;

    switch(req.method){
        case 'GET':

            console.log('Req Method: ' + req.method)

            q = 'SELECT * FROM paycheck_items WHERE user_id = ?;';
            DB.query(q,[params.uid], (err, results) => {

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

            console.log('Req Method: ' + req.method)

            const {uid, title, amount} = rBody;

            q = 'INSERT INTO paycheck_items(title, amount, user_id) VALUES(?, ?, ?);';
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

            console.log('Req Method: ' + req.method);
            
            q = 'DELETE FROM paycheck_items WHERE bid = ?;';

            DB.query(q, [params.pid], (err, results) => {
                if(err){
                    res.status(200).json({'message': err, success: 0})
                    return;
                }

                res.status(200).json({'message': 'The paycheck item is deleted.', success: 1})


            })

            break;

        default:
            //do nothing
            break;
    }
}

export default handler;