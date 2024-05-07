import DB from "@/database";
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
            const getLastId = 'SELECT uid fROM users where uid = LAST_INSERT_ID()';

	    bcrypt.hash(pass, saltRounds, (hashErr, hash) => {
		
		if(hashErr){
			res.status(400).json({'message': 'Error hashing password' + hashErr});
			return;
		}

            	DB.query(q,[fname, lname, email], (err, results) => {
                	if(err){
                    		res.status(400).json({'message': 'There was an error. \n' + err});
                    		return;
                	}

                	DB.query(q2, [uname, hash], (uErr, results) => {
                    		if(uErr){
                        		res.status(400).json({'message': 'There was an error. \n' + uErr});
                        		return;
                    		}
                    
                    		DB.query(getLastId, (bErr, bResults)=>{

                        		if(bErr){
                            			res.status(400).json({'message': 'There was an error. \n' + bErr});
                            			return;
                        		}

					console.log(bResults[0].uid);
 
                        		res.status(200).json({'message': 'A new user is added', 'uid': bResults[0].uid, 'success': 1});

                    		})
                    
                	})

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
