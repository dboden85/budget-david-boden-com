import Card from "../UI/Card";

const MonthlyAllocations = ({monthlySavings, billsTotal, paycheckItems})=>{
    return(
        <Card>
            <h2>Monthly Allocations</h2>
            <ul>
                <li><p className="title">Savings</p><p className="amount">{`$${monthlySavings.toFixed(2)}`}</p></li>
                <li><p className="title">Bills</p><p className="amount">{`$${billsTotal.toFixed(2)}`}</p></li>
                {paycheckItems.map(item =>{
                    return(
                    <li key={item.id}><p className="title">{item.title}</p><p className="amount">{'$' + (item.amount * 4).toFixed(2)}</p></li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default MonthlyAllocations;