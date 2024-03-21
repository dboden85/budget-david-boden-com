import DB from "@/database";

const handler = (req, res) => {
    let q = ''; //query based on request method
    const { method, body, query } = req;

    switch (method) {
        case 'GET':
            console.log('Req Method: ' + method);
            q = 'SELECT * FROM bills WHERE user_id = ?;';
            DB.query(q, [query.uid], (err, results) => {
                if (err) {
                    return res.status(404).json({ 'message': 'Could not connect to the server!\n' + err });
                }
                
                if (results.length > 0) {
                    console.log('matched');
                    return res.status(200).json({ 'message': 'Found Bills for user', 'results': results });
                } else {
                    console.log('no matches');
                    return res.status(200).json({ 'message': 'No bills were found for user' });
                }
            });
            break;

        case 'POST':
            console.log('Req Method: ' + method);
            const { uid, title, amount, due } = body;
            q = 'INSERT INTO bills(user_id, bill_title, bill_amount, due_date) values(?, ?, ?, ?);';
            DB.query(q, [uid, title, amount, due], (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                    
                return res.status(200).json({ 'message': 'A new bill is added' });
                
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
