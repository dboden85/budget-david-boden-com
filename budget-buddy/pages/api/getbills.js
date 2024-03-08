import DB from "@/database";

const handler = (req, res)=>{
    const {user} =  req.body;
    const q = 'SELECT * FROM bills WHERE user_id = ?;';
    DB.query(q,[user], (err, results) => {

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
    // const DUMMYDB = {
    //     uid: 1,
    //     info: [
    //         {
    //             id: 0,
    //             item: 'Car Payment',
    //             amount: 305.00
    //         },
    //         {
    //             id: 1,
    //             item: 'Phone',
    //             amount: 111.33
    //         },
    //         {
    //             id: 2,
    //             item: 'Gym',
    //             amount: 10.00
    //         },
    //         {
    //             id: 4,
    //             item: 'Google One',
    //             amount: 1.99
    //         },
    //         {
    //             id: 5,
    //             item: 'Audible',
    //             amount: 15.00
    //         }
    //     ]
    // } 

    // const {uid} = DUMMYDB;

    // if( uid === user ){
    //     res.status(200).json({'message': 'Bills Retrieved', results: DUMMYDB.info});
    // }

}

export default handler;