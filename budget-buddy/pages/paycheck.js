"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useState, useEffect, useRef } from 'react';

export default function Paycheck() {
  const [userId, setUserId] = useState();
  const [userInfo, setInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    paycheck_amount: 0,
    savings_goal: 0,
    savings_per_paycheck: 0
  });
  const [paycheckItems, setPaycheckItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [paycheckAmount, setPaycheckAmount] = useState(0);
  const checkAmount = useRef();
  const [whichForm, setWhichForm] = useState('none');

  // refs
  const paycheckItemTitle = useRef();
  const paycheckItemAmount = useRef();

  // pull user session variable
  useEffect(()=>{
    const userData = sessionStorage.getItem('userInfo');

    if(userData){
      setUserId(userData);
      // fetchPaycheck(userData);

      try{
        fetch('api/getuser?uid=' + userData)
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
      catch(err){
        console.error(err)
      }
    }

  },[])

  useEffect(()=>{

    if(userId){
      // function to retrieve paycheck items.
      fetch('/api/managepaycheckitems?uid=' + userId)
      .then(res => {
        return res.json();
      })
      .then(data =>{
        if(data.results){
          setPaycheckItems([...data.results]);
        }else{
          throw(data.message)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }

  },[userId])

  // toggle add paycheck menu
  const openUpdateMenuHandler = () => {
    isFormOpen && setWhichForm('none'); 
    setIsFormOpen(prev => (!prev));
  }

  // choose which handler.
  const payCheckItemsForm = ()=>{
    setWhichForm('items');
  }

  const payCheckAmountForm = ()=>{
    setWhichForm('amount');
  }

  //add paycheck item form submit handler
  const itemChangeHandler = (e) => {
    e.preventDefault();

    const capitalizeFirstLetter = (words)=>{
      const wArray = words.split(' ');
      wArray.map((word, i) =>{
        word = word.charAt(0).toUpperCase() + word.slice(1);
        wArray.splice(i, 1, word);
      })

      words = wArray.join(' ');
      return words;
    }

    const title = capitalizeFirstLetter(paycheckItemTitle.current.value);
    const amount = parseFloat(paycheckItemAmount.current.value);

      fetch('/api/managepaycheckitems', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          uid: userId,
          title: title,
          amount: amount
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.message){
          console.log(data.message);
          setPaycheckItems(prev => [...prev, {pid: title, title: title, amount: amount}])
        }
      })

    setIsFormOpen(false);
  }

  const amountChangeHandler = (e)=>{
    e.preventDefault();

    const amount = parseFloat(checkAmount.current.value).toFixed(2);

    fetch('/api/managepaycheckitems', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        uid: userId,
        amount: amount
      })
    })
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        console.log(data.message);
        setPaycheckAmount(amount)
      }else{
        throw(data.message);
      }
    })
    .catch(err =>{
      console.error(err);
    })

  }

  // Delete paycheck item handler
  const onDeleteHandler = (e)=>{
    let {index, id, title } = JSON.parse(e.target.dataset.info);

    if(confirm(`Remove ${title} from your bills?`)){
      paycheckItems.splice(index, 1);
      setPaycheckItems([...paycheckItems]);
    }

    fetch('/api/managepaycheckitems?pid=' + id, {
      method: 'DELETE'
    })
    .then(res => {
      return res.json();
    })
    .then(data =>{
      if(data.success){
        console.log(data.message);
      }else{
        throw(data.message);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  // Forms
  const ChangeItemsForm = ()=>{
    return (
      <form className="form" onSubmit={itemChangeHandler}>
        <label>Item Title</label>
        <input ref={paycheckItemTitle} type="text"/>
        <label>Amount</label>
        <input ref={paycheckItemAmount} type="number" step=".01" />
        <button>Add Item</button>
      </form>
    )
  }

  const ChangeAmountForm = ()=>{
    return (
      <form className="form" onSubmit={amountChangeHandler}>
        <label>Paycheck Amount</label>
        <input ref={checkAmount} type="text" step="0.1"/>
        <button type="submit">Update Amount</button>
      </form>
    )
  }

  const WhichFormButtons = ()=>{
    return (
      <div className="formButtons">
          <button onClick={payCheckItemsForm}>Add Paycheck Item</button>
          <button onClick={payCheckAmountForm}>Update Paycheck Amount</button>
      </div>
    )
  }


  return (
    <>
      <Header title="Paycheck" />
      <main>
        <div>
            <div className="row total-row">
              <p>Paycheck Amount: <span>${parseFloat(userInfo.paycheck_amount).toFixed(2)}</span></p>
            </div>
        </div>
          
        <div className="row">
          <Card>
            <h2>Paycheck Items</h2>
            <ul className="list-items">
              {paycheckItems.length > 0 ?
              paycheckItems.map((item, i) => {


                const data = JSON.stringify({index: i, id: item.pid, title: item.title});

                return (

                <li key={item.pid}>
                  <p className="title">{item.title}</p>
                  <p className="amount">{'$' + parseFloat(item.amount).toFixed(2)}</p>
                  <div className="delete-container">
                    <img data-info={data} onClick={onDeleteHandler} className="delete" src="../trash.svg" width="25px" height="25px"/>
                  </div>
                </li>)
              })
              :
              <p>There are no paycheck items to show</p>
            }
            </ul>
          </Card>
          {/* <Card>
            <h2>Graph will go here</h2>
            {bills.length > 0 ? 
              <div id="piechart_3d" style={{width: '100%', minHeight: 'calc(100% - 67px)'}}></div>
              :
              <p>No data to show</p>
            }

            
          </Card> */}
        </div>
      </main>

      <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
        <img onClick={openUpdateMenuHandler} src="../plus.svg" width="35px" height="35px" />
      </div>

      <div className={isFormOpen ? 'open update-form' : 'update-form'}>
        <h2>Update Paycheck</h2>

        {whichForm === 'items' &&  <ChangeItemsForm />}

        {whichForm === 'amount' &&  <ChangeAmountForm />}

        {whichForm === 'none' &&  <WhichFormButtons />}
        
      </div>
    </>
  );
}