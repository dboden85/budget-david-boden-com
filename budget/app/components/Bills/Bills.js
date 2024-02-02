import { useState } from "react";
import Card from "../UI/Card";

const Bills = ()=>{
    const [bills, setBills] = useState([
        {
            id: 0,
            item: 'Car Payment',
            amount: 300.00
        },
        {
            id: 1,
            item: 'Phone',
            amount: 100.00
        },
        {
            id: 2,
            item: 'Gym',
            amount: 10.00
        },
        {
            id: 3,
            item: 'Hello Fresh',
            amount: 240.00
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