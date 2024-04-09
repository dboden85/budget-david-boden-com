import DB from "@/database";

const handler = (req, res)=>{

    let q = ''; //query based on request method
    const { method, body, query } = req;

    console.log('Req Method: ' + req.method)
    const params = req.query;

    switch(method){
        case 'GET':

            break;

        case 'POST':

            if(body.form === 'goal'){
                q = 'Update user_info SET savings_goal = ? WHERE userid = ?;';

                DB.query(q, [body.amount, body.uid], err => {
                    if(err){
                        res.status(500).json({'message': err, status: 0});
                        return;
                    }

                    res.status(200).json({'message': 'Savings goal is updated!', status: 1});
                    
                })
            }else if(body.form === 'amount'){
                q = 'Update user_info SET savings_per_paycheck = ? WHERE userid = ?;';

                DB.query(q, [body.amount, body.uid], err => {
                    if(err){
                        res.status(500).json({'message': err, status: 0});
                        return;
                    }

                    res.status(200).json({'message': 'Savings per paycheck is updated!', status: 1});
                    
                })
            }

            break;
        
        case 'DELETE':

            break;

        case 'PUT':

            break;

        default:
            //do nothing
            break;
    }
}

export default handler;