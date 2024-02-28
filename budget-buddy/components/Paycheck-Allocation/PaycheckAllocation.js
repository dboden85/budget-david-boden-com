import { useState, useEffect } from "react";
import Card from "../UI/Card";

const PaycheckAllocations = ( {billsTotal, savings, totalAllocations} )=>{
    const [items, setItems] = useState(
        [
            {
                id: 1,
                item: 'Guilt Free Spending',
                amount: 100.00
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
            }
        ]
    )

    useEffect(()=>{
        let total = 0;

        items.map(item =>{
            total += item.amount;
        })
        console.log(total*4)
        totalAllocations(total*4);
    },[items]);
    
    const allocatedBills = billsTotal/4;
    const allocatedSavings = savings/4;

    return(
        <Card>
            <h2>Paycheck Allocations</h2>
            <ul>
                <li><p className="title">Savings</p><p className="amount">{`$${allocatedSavings.toFixed(2)}`}</p></li>
                <li><p className="title">Bills</p><p className="amount">{`$${allocatedBills.toFixed(2)}`}</p></li>
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