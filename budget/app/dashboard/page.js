import Header from "../components/UI/Header";
import Card from "../components/UI/Card";

export default function Dashboard() {
    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row budget-info">
                <div className="overlay"></div>
                <Card>
                    <div className="icon-container">
                        <img src="../dollar.svg" />
                    </div>
                    <div className="info">
                        <p className="infoTitle">Paycheck Amount</p>
                        <p className="amnt">$600</p>
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
            </div>
            <div className="bills-info row">
                <Card>
                    <h2>Bills</h2>
                    <ul>
                        <li><p className="title">Car Payment</p><p className="amount">$300.00</p></li>
                        <li><p className="title">Phone</p><p className="amount">$100.00</p></li>
                        <li><p className="title">Gym</p><p className="amount">$10.00</p></li>
                        <li><p className="title">Hello Fresh</p><p className="amount">$240.00</p></li>
                        <li><p className="title">Google One</p><p className="amount">$1.99</p></li>
                        <li><p className="title">Audible</p><p className="amount">$15.00</p></li>
                    </ul>
                </Card>
                
                <Card>
                    <h2>Paycheck Allocations</h2>
                    <ul>
                        <li><p className="title">Savings</p><p className="amount">$300.00</p></li>
                        <li><p className="title">Guild Free Spending</p><p className="amount">$200.00</p></li>
                        <li><p className="title">Gas</p><p className="amount">$90.00</p></li>
                        <li><p className="title">Groceries</p><p className="amount">$50.00</p></li>
                        <li><p className="title">Child Allowance</p><p className="amount">$20.00</p></li>
                        <li><p className="title">Bills</p><p className="amount">$100.00</p></li>
                    </ul>
                </Card>
            </div>
            <div className="row">
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
            </div>
        </main>
      </>
    );
  }