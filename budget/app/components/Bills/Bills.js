import { useEffect, useState } from "react";
import Card from "../UI/Card";

const Bills = ( {billsTotal} )=>{
    const [bills, setBills] = useState([
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
    ])

    useEffect(()=>{
        let total = 0;

        bills.map(bill =>{
            total += bill.amount;
        })
        billsTotal(total);
    },[bills]);

    return(
        <Card>
            <h2>Bills</h2>
            <ul>
                {bills.map(bill => {
                    return(<li key={bill.id}><p className="title">{bill.item}</p><p className="amount">{'$' + bill.amount}</p></li>)
                })}
            </ul>
        </Card>
    )
}

export default Bills;