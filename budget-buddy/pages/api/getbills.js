import DB from "@/database";

const handler = (req, res)=>{
    const q = 'SELECT * FROM bills;';
    DB.query(q,(err, results) => {
        if(err){
            console.log(err);
            return;
        }

        if(results){
            res.status(200).json({"bills": results});
        }else{
            res.status(200).json('No bills to show');
        }


    })

}

export default handler;