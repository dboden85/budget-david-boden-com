import Card from "../UI/Card"

const BudgetInfo = ({paycheckAmount, billsTotal, monthlySavings, totalAllocations})=>{

    const unallocatedTotal = (paycheckAmount*4)-billsTotal-monthlySavings-totalAllocations;

    const items = [
        {
            id: 0,
            title: 'Paycheck Amount',
            amount: paycheckAmount.toFixed(2),
            icon: '../dollar.svg'
        },
        {
            id: 1,
            title: 'Total Bills',
            amount: billsTotal.toFixed(2),
            icon: '../calendar-check.svg'
        },
        {
            id: 2,
            title: 'Monthly Savings',
            amount: monthlySavings.toFixed(2),
            icon: '../dollar-invoice.svg'
        },
        {
            id: 3,
            title: 'Unallocated Funds',
            amount: unallocatedTotal.toFixed(2),
            icon: '../money.svg'
        },
    ]
    
    return(
        <>
        {
            items.map(item => {
                return(
                    <Card key={item.id}>
                        <div className="icon-container">
                            <img src={item.icon} />
                        </div>
                        <div className="info">
                            <p className="infoTitle">{item.title}</p>
                            <p className="amnt">{`$${item.amount}`}</p>
                        </div>
                    </Card>
                )
            })
        }
        </>
    )
}

export default BudgetInfo;