import Card from "../UI/Card";

const MonthlyAllocations = ()=>{
    return(
        <Card>
            <h2>Monthly Allocations</h2>
            <ul>
                <li><p className="title">Savings</p><p className="amount">$1200.00</p></li>
                <li><p className="title">Guild Free Spending</p><p className="amount">$800.00</p></li>
                <li><p className="title">Gas</p><p className="amount">$360.00</p></li>
                <li><p className="title">Groceries</p><p className="amount">$200.00</p></li>
                <li><p className="title">Child Allowance</p><p className="amount">$80.00</p></li>
                <li><p className="title">Bills</p><p className="amount">$400.00</p></li>
            </ul>
        </Card>
    )
}

export default MonthlyAllocations;