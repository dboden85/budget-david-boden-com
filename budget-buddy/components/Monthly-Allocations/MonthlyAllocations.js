import Card from "../UI/Card";

const MonthlyAllocations = ({monthlySavings, billsTotal, paycheckItems})=>{
    return(
        <Card>
            <h2>Monthly Allocations</h2>
            {monthlySavings || billsTotal || paycheckItems.length !== 0 ? (
                <ul>
                    {monthlySavings !== 0 && (
                        <li key="savings"><p className="title">Savings</p><p className="amount">{`$${monthlySavings.toFixed(2)}`}</p></li>
                    )}
                    
                    {billsTotal !== 0 && (
                        <li key="bills"><p className="title">Bills</p><p className="amount">{`$${billsTotal.toFixed(2)}`}</p></li>
                    )}
                    
                    {paycheckItems.map(item =>{
                        return(
                        <li key={item.pid}><p className="title">{item.title}</p><p className="amount">{'$' + (item.amount * 4).toFixed(2)}</p></li>
                        )
                    })}
                </ul>
            )
        :
            <p>No monthly allocations to list</p>
        }
            
        </Card>
    )
}

export default MonthlyAllocations;