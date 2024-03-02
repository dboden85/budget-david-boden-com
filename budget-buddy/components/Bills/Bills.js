import { useEffect, useState } from "react";
import Card from "../UI/Card";

const Bills = ( props )=>{

    useEffect(()=>{
        let total = 0;
        props.billsList.map(bill => {
            total += bill.amount;
        })
        props.billsTotal(total);
    },[props.billsList])

    useEffect(()=>{
        console.log(props.billsList);
    },[props.billsList])

    return(
        <Card>
            <h2>Bills</h2>
            <ul>
                {props.billsList.map(bill => {
                    return(<li key={bill.id}><p className="title">{bill.item}</p><p className="amount">{'$' + bill.amount}</p></li>)
                })}
            </ul>
        </Card>
    )
}

export default Bills;