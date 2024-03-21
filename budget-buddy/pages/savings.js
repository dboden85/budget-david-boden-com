import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import {useState, useEffect} from 'react';

export default function Savings() {
  const [savingsGoal, setSavingsGoal] = useState(0);

  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setSavingsGoal(userData[0].savings_goal)
    }

  },[])


    return (
      <>
        <Header title="Savings"/>
        <main>
        {/* <div className="hero-image" style={{backgroundImage: 'url("/bills-bg.jpg")'}}>
          <div className="overlay"></div>
            <div className="row total-row">
              <p>Paycheck Amount: <span>${parseFloat(paycheckAmount).toFixed(2)}</span></p>
            </div>
        </div> */}
          
        <div className="row">
          <Card>
            <h2>Savings Goal</h2>
            <p className="amount">${parseFloat(savingsGoal).toFixed(2)}</p>
          </Card>
          <Card>
            <h2>Amount Per Paycheck</h2>
            <p className="amount">$320.00</p>
            
          </Card>
        </div>
        </main>
      </>
    );
  }