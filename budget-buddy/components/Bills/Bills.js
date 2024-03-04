import { useEffect, useState } from "react";
import Card from "../UI/Card";

const Bills = ( {billsTotal, billsList} )=>{

    useEffect(()=>{
        let total = 0;
        billsList.map(bill => {
            total += bill.bill_amount;
        })
        billsTotal(total);
    },[billsList])

    return(
        <Card>
            <h2>Bills</h2>
            {billsList.length > 0 ?
                <ul>
                    {billsList.map(bill => {
                        return(<li key={bill.id}><p className="title">{bill.bill_title}</p><p className="amount">{'$' + bill.bill_amount.toFixed(2)}</p></li>)
                    })}
                </ul> 
                : 
                <p>There are no bills to list</p>
            }
        </Card>
    )
}

export default Bills;