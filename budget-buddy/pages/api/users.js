import DB from "@/database";

const handler = (req, res)=>{ 

    let q = ''; //query based on request method
    const { method, body, query } = req;



    switch (method) {
        case 'GET':

            

            break;

        case 'POST':

            const {fname, lname, email, uname, pass} = body;
            q = 'INSERT INTO user_info(fname, lname, email) VALUES(?, ?, ?);';
            const q2 = 'INSERT INTO users(uname, password) VALUES(?, ?);';

            DB.query(q,[fname, lname, email], (err, results) => {
                if(err){
                    res.status(400).json({'message': 'There was an error. \n' + err});
                    return;
                }

                DB.query(q2, [uname, pass], (err, results) => {
                    if(err){
                        res.status(400).json({'message': 'There was an error. \n' + err});
                        return;
                    }
                    
                    res.status(200).json({'message': 'A new user is added'});
                })

            })

            break;

        case 'DELETE':
            break;

        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }


}

export default handler;