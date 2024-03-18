import DB from "@/database";
import { useRouter } from 'next/router'

const handler = (req, res)=>{

    let q = ''; //query based on request method

    const rBody = req.body;
    const params = req.query;

    switch(req.method){
        case 'GET':

            console.log('Req Method: ' + req.method)

            q = 'SELECT * FROM bills WHERE user_id = ?;';
            DB.query(q,[params.uid], (err, results) => {

                if(err){
                    res.status(404).json({'message': 'Could not connect to the server!\n' + err});
                    return;
                }
                
                if(results.length > 0){
                    console.log('matched');
                    res.status(200).json({'message': 'Found Bills for user', 'results': results});
                }else{
                    console.log('no matches');
                    res.status(200).json({'message': 'No bills were found for user'});
                }
                
            })

            break;

        case 'POST':

            console.log('Req Method: ' + req.method)

            let {uid, title, amount, due} =  rBody;
            q = 'INSERT INTO bills(user_id, bill_title, bill_amount, due_date) values(?, ?, ?, ?);';
            DB.query(q,[uid, title, amount, due], (err, results) => {
                try{
                    res.status(200).json({'message': 'A new bill is added'});
                }catch{
                    res.status(400).json({'message': 'There was an error'});
                }
            })

            break;

        case 'DELETE':

            console.log(req.method)
            console.log(req.query)

            console.log('Req Method: ' + req.method);
            
            q = 'DELETE FROM bills WHERE bid = ?;';

            console.log('Delete request ran')

            DB.query(q, [params.uid], (err, results) => {
                if(err){
                    res.status(200).json({'message': err, success: 0})
                    return;
                }

                res.status(200).json({'message': 'The bill is deleted.', success: 1})


            })

            break;

        default:
            //do nothing
            break;
    }

}

export default handler;