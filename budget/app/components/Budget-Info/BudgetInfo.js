import Card from "../UI/Card"

const BudgetInfo = ()=>{
    return(
        <>
            <Card>
                <div className="icon-container">
                    <img src="../dollar.svg" />
                </div>
                <div className="info">
                    <p className="infoTitle">Paycheck Amount</p>
                    <p className="amnt">$682.59</p>
                </div>
            </Card>
            <Card>
                <div className="icon-container">
                    <img src="../calendar-check.svg" />
                </div>
                <div className="info">
                    <p className="infoTitle">Monthly Take Home</p>
                    <p className="amnt">$2400</p>
                </div>
            </Card>
            <Card>
                <div className="icon-container">
                    <img src="../dollar-invoice.svg" />
                </div>
                <div className="info">
                    <p className="infoTitle">After Bills</p>
                    <p className="amnt">$2000</p>
                </div>
            </Card>
            <Card>
                <div className="icon-container">
                    <img src="../money.svg" />
                </div>
                <div className="info">
                    <p className="infoTitle">Unallocated Funds</p>
                    <p className="amnt">$.83</p>
                </div>
            </Card>
        </>
    )
}

export default BudgetInfo;