import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import {useState, useEffect} from 'react';

export default function Savings() {
  const [userId, setUserId] = useState();
  const [userInfo, setInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    paycheck_amount: 0,
    savings_goal: 0,
    savings_per_paycheck: 0
  });

  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setUserId(userData);
    }

  },[])

  useEffect(()=>{

    if(userId){
      fetch('api/getuser?uid=' + userId)
      .then(res => {
        return res.json();
      })
      .then(data =>{
        if(data.results){
          setInfo(data.results);
        }else{
          throw(data.message)
        }
      })
      .catch(err => {
        console.error(err);
      })
    }

  },[userId])


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
          <p className="amount">${parseFloat(userInfo.savings_goal).toFixed(2)}</p>
        </Card>
        <Card>
          <h2>Amount Per Paycheck</h2>
          <p className="amount">${parseFloat(userInfo.savings_per_paycheck).toFixed(2)}</p>
          
        </Card>
      </div>
      </main>
    </>
  );
}