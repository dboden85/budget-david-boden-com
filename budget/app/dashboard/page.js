import Header from "../components/UI/Header";
import Card from "../components/UI/Card";

export default function Dashboard() {
    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="budget-info">
                <Card>
                    <p>Expected Paycheck Amount</p>
                    <p>$600</p>
                </Card>
                <Card>
                    <p>Expected Monthly Take Home</p>
                    <p>$2400</p>
                </Card>
                <Card>
                    <p>Bills Total</p>
                    <p>$400</p>
                </Card>
                <Card>
                    <p>Unallocated</p>
                    <p>$.83</p>
                </Card>
            </div>
            <div className="bills-info">
                <h2>Bills</h2>
                <Card>
                    <p>Car Payment - $300.00</p>
                    <p>Phone - $100.00</p>
                    <p>Gym - $10.00</p>
                    <p>Hello Fresh - $240.00</p>
                    <p>Google One - $1.99</p>
                    <p>Audible - $15.00</p>
                </Card>
            </div>
        </main>
      </>
    );
  }