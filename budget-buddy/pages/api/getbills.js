import DB from "@/database";

const handler = (req, res)=>{
    const {user} =  req.body;
    const DUMMYDB = {
        uid: 1,
        info: [
            {
                id: 0,
                item: 'Car Payment',
                amount: 305.00
            },
            {
                id: 1,
                item: 'Phone',
                amount: 111.33
            },
            {
                id: 2,
                item: 'Gym',
                amount: 10.00
            },
            {
                id: 4,
                item: 'Google One',
                amount: 1.99
            },
            {
                id: 5,
                item: 'Audible',
                amount: 15.00
            }
        ]
    } 

    const {uid} = DUMMYDB;

    if( uid === user ){
        res.status(200).json({'message': 'Bills Retrieved', results: DUMMYDB.info});
    }

}

export default handler;