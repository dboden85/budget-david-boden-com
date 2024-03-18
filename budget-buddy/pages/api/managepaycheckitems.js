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

        default:
            //do nothing
            break;
    }
}

export default handler;