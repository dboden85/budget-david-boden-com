import { useState } from "react";
import Card from "../UI/Card";

const PaycheckAllocations = ()=>{
    const [items, setItems] = useState(
        [
            {
                id: 0,
                item: 'Savings',
                amount: 300.00
            },
            {
                id: 1,
                item: 'Guilt Free Spending',
                amount: 200.00
            },
            {
                id: 2,
                item: 'Gas',
                amount: 90.00
            },
            {
                id: 3,
                item: 'Groceries',
                amount: 50.00
            },
            {
                id: 4,
                item: 'Kid\'s Allowance',
                amount: 20.00
            },
            {
                id: 5,
                item: 'Bills',
                amount: 100.00
            },
        ]
    )
    return(
        <Card>
            <h2>Paycheck Allocations</h2>
            <ul>
                <li><p className="title">Going Out</p><p className="amount">$100.00</p></li>
                {items.map(item => {
                    return(
                        <li key={item.id}><p className="title">{item.item}</p><p className="amount">{'$' + item.amount}</p></li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default PaycheckAllocations;