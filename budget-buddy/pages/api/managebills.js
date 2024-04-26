import DB from "@/database";

const handler = (req, res) => {
    let q = ''; //query based on request method
    const { method, body, query } = req;

    switch (method) {
        case 'GET':
            console.log('Req Method: ' + method);
            q = 'SELECT * FROM bills WHERE userid = ?;';
            DB.query(q, [query.uid], (err, results) => {
                if (err) {
                    return res.status(404).json({ 'message': 'Could not connect to the server!\n' + err });
                }
                
                if (results.length > 0) {
                    console.log('matched');
                    return res.status(200).json({ 'message': 'Found Bills for user', 'results': results, 'success': 1 });
                } else {
                    console.log('no matches');
                    return res.status(200).json({ 'message': 'No bills were found for user', 'success': 1 });
                }
            });
            break;

        case 'POST':
            console.log('Req Method: ' + method);
            const { uid, title, amount, due } = body;
            q = 'INSERT INTO bills(userid, title, amount, due) values(?, ?, ?, ?);';
            DB.query(q, [uid, title, amount, due], (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                    
                return res.status(200).json({ 'message': 'A new bill is added', 'status': 1 });
                
            });
            break;

        case 'DELETE':
            console.log('Req Method: ' + method);
            q = 'DELETE FROM bills WHERE bid = ?;';
            DB.query(q, [query.bid], (err, results) => {
                if (err) {
                    return res.status(200).json({ 'message': err, success: 0 });
                }

                return res.status(200).json({ 'message': 'The bill is deleted.', success: 1 });
            });
            break;

        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default handler;
