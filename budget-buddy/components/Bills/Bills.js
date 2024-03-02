import { useEffect, useState } from "react";
import Card from "../UI/Card";

const Bills = ( {billsTotal, billsList} )=>{

    useEffect(()=>{
        let total = 0;
        billsList.map(bill => {
            total += bill.amount;
        })
        billsTotal(total);
    },[billsList])

    return(
        <Card>
            <h2>Bills</h2>
            {billsList.length > 0 ?
                <ul>
                    {billsList.map(bill => {
                        return(<li key={bill.id}><p className="title">{bill.item}</p><p className="amount">{'$' + bill.amount}</p></li>)
                    })}
                </ul> 
                : 
                <p>There are no bills to list</p>
            }
        </Card>
    )
}

export default Bills;