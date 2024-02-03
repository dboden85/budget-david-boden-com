"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState } from "react"; 

export default function Bills() {
  const[billTitle, setBillTitle] = useState('');
  const[billAmount, setBillAmount] = useState();
  const [bills, setBills] = useState([
    {
        id: 0,
        item: 'Car Payment',
        amount: 305.00
    },
    {
        id: 1,
        item: 'Phone',
        amount: 111.33
    },
    {
        id: 2,
        item: 'Gym',
        amount: 10.00
    },
    {
        id: 4,
        item: 'Google One',
        amount: 1.99
    },
    {
        id: 5,
        item: 'Audible',
        amount: 15.00
    }
])

    const onTitleChangeHandler = (e)=>{
      setBillTitle(e.target.value);
    }

    const onAmountChangeHandler = (e)=>{
      setBillAmount(e.target.value);
    }

    const onSubmitHandler = (e)=>{
      e.preventDefault();
      setBills(prev => (
          [...prev,{
          id: bills.length + 1,
          item: billTitle.trim(),
          amount: parseInt(billAmount)
        }
      ]))
    }

    return (
      <>
        <Header title="Bills"/>
        <main>
            <div className="hero-image" style={{backgroundImage: "url('/bills-bg.jpg')"}}></div>
            <div className="row update-bills">
              <Card>
                <h2>Bills</h2>
                <ul>
                    {bills.map(bill => {
                        return(<li key={bill.id}><p className="title">{bill.item}</p><p className="amount">{'$' + bill.amount.toFixed(2)}</p></li>)
                    })}
                </ul>
              </Card>
              <Card classes='form-container'>
                <form className="form" onSubmit={onSubmitHandler}>
                  <h2>Add Bill</h2>
                  <label>Bill Title</label>
                  <input onChange={onTitleChangeHandler} type="text"  />
                  <label>Amount</label>
                  <input onChange={onAmountChangeHandler} type="number"  />
                  <button>Submit</button>
                </form>
              </Card>
            </div>
        </main>
      </>
    );
  }