import DB from "@/database";

const handler = (req, res)=>{
    const {user} =  req.body;
    const q = 'SELECT * FROM bills WHERE user_id = ?;';
    DB.query(q,[user], (err, results) => {
        try{
            if(results.length > 0){
            res.status(200).json({'message': 'Found Bills for user', 'results': results});
            }else{
            res.status(200).json({'message': 'No bills were found for user'});
            }
        }catch{
            res.status(400).json({'message': 'There was an error'});
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