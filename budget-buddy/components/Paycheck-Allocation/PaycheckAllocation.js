import { useState, useEffect } from "react";
import Card from "../UI/Card";

const PaycheckAllocations = ( {paycheckItems, billsTotal, savings, totalAllocations} )=>{


    savings = savings ? parseInt(savings) : 0.00;

    useEffect(()=>{
        let total = 0;

        paycheckItems.map(item =>{
            total += item.amount;
        })
        totalAllocations(total*4);
    },[paycheckItems]);
    
    const allocatedBills = billsTotal/4;

    return(
        <Card>
            <h2>Paycheck Allocations</h2>
            <ul>
                <li><p className="title">Savings</p><p className="amount">{`$${savings.toFixed(2)}`}</p></li>
                <li><p className="title">Bills</p><p className="amount">{`$${allocatedBills.toFixed(2)}`}</p></li>
                {paycheckItems.map(item => {
                    return(
                        <li key={item.id}><p className="title">{item.title}</p><p className="amount">{'$' + item.amount.toFixed(2)}</p></li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default PaycheckAllocations;