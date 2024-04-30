import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import {useState, useEffect, useRef} from 'react';
import Auth from "@/components/UX/Auth";
import Image from 'next/image';

function Savings() {
  const [userId, setUserId] = useState();
  const [userInfo, setInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    paycheck_amount: 0,
    savings_goal: 0,
    savings_per_paycheck: 0
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [whichForm, setWhichForm] = useState('none');
  const formAmount = useRef(0);

  
  //pull user info from session storage
  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setUserId(userData);
    }

  },[])

  //fetch data from the database
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

  // toggle update savings menu
  const openUpdateMenuHandler = () => {
    isFormOpen && setWhichForm('none'); 
    setIsFormOpen(prev => (!prev));
  }

  const chooseSavingsGoalForm = ()=>{
    setWhichForm('goal')
  }

  const chooseSavingsAmountForm = ()=>{
    setWhichForm('amount')
  }

  const updateSavings = (e)=>{
    e.preventDefault();

    fetch('/api/managesavings', {
      method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
      body: JSON.stringify({
        uid: userId,
        form: whichForm,
        amount: formAmount.current.value
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status){
        console.log(data.message)
        if(whichForm === 'goal'){
          setInfo(prev => ({...prev, savings_goal: formAmount.current.value}));
        }else if(whichForm === 'amount'){
          setInfo(prev => ({...prev, savings_per_paycheck: formAmount.current.value}))
        }
        setWhichForm('none');
        setIsFormOpen(false);
      }else{
        throw(data.message);
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  const WhichFormButtons = ()=>{
    return (
      <div className="formButtons">
          <button onClick={chooseSavingsGoalForm}>Set Savings Goal</button>
          <button onClick={chooseSavingsAmountForm}>Set Savings Amount</button>
      </div>
    )
  }

  const ChangeGoalForm = ()=>{
    return (
      <form className="form" onSubmit={updateSavings}>
        <label>Set Savings Goal</label>
        <input ref={formAmount} type="text" step="0.1"/>
        <button type="submit">Update Goal</button>
      </form>
    )
  }

  const ChangeAmountForm = ()=>{
    return (
      <form className="form" onSubmit={updateSavings}>
        <label>Set Savings Amount Per Month</label>
        <input ref={formAmount} type="text" step="0.1"/>
        <button type="submit">Update Amount</button>
      </form>
    )
  }

  return (
    <Auth>
      <>
        <Header title="Savings"/>
        <main>        
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
        <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
          <Image alt="plus icon" onClick={openUpdateMenuHandler} src="../plus.svg" width="35" height="35" />
        </div>

        <div className={isFormOpen ? 'open update-form' : 'update-form'}>
          <h2>Update Savings</h2>

          {whichForm === 'none' &&  <WhichFormButtons />}

          {whichForm === 'goal' &&  <ChangeGoalForm />}

          {whichForm === 'amount' &&  <ChangeAmountForm />}
          
        </div>
      </>
    </Auth>
  );
}

export default Savings;
