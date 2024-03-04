import DB from "@/database";

const handler = (req, res)=>{
    const {user} =  req.body;
    const q = 'SELECT * FROM paycheck_items WHERE user_id = ?;';
    DB.query(q,[user], (err, results) => {
        try{
            if(results.length > 0){
            res.status(200).json({'message': 'Found Paycheck Items for user', 'results': results});
            }else{
            res.status(200).json({'message': 'No Paycheck Items were found for user'});
            }
        }catch{
            res.status(400).json({'message': 'There was an error'});
        }
    })
    // const DUMMYDB = {
    //     uid: 1,
    //     info: [
    //         {
    //             id: 1,
    //             item: 'Guilt Free Spending',
    //             amount: 100.00
    //         },
    //         {
    //             id: 2,
    //             item: 'Gas',
    //             amount: 90.00
    //         },
    //         {
    //             id: 3,
    //             item: 'Groceries',
    //             amount: 50.00
    //         },
    //         {
    //             id: 4,
    //             item: 'Kid\'s Allowance',
    //             amount: 20.00
    //         }
    //     ]
    // } 

    const {uid} = DUMMYDB;

    if( uid === user ){
        res.status(200).json({'message': 'Paycheck Items Retrieved', results: DUMMYDB.info});
    }

}

export default handler;