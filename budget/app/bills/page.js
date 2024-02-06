"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState } from "react"; 

export default function Bills() {
  const[billTitle, setBillTitle] = useState('');
  const[billAmount, setBillAmount] = useState();
  const [billsTotal, setBillsTotal] = useState(0);
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(()=>{
    let total = 0;
    bills.map(bill =>{
      total += bill.amount;
    })
    setBillsTotal(total);
  },[bills])

  const openUpdateMenuHandler = ()=>{
    setIsFormOpen(prev =>(!prev));
  }

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
      setIsFormOpen(false);
      setBillAmount('');
      setBillTitle('');
    }



    return (
      <>
        <Header title="Bills"/>
        <main>
            <div className="row total-row">
              <p>Total Bills: <span>${billsTotal.toFixed(2)}</span></p>
            </div>
            <div className="row update-bills">
              <Card>
                <h2>Bills</h2>
                <ul>
                    {bills.map(bill => {
                        return(<li key={bill.id}><p className="title">{bill.item}</p><p className="amount">{'$' + bill.amount.toFixed(2)}</p></li>)
                    })}
                </ul>
              </Card>
              <Card>
                <h2>Graph will go here</h2>
                
              </Card>
            </div>
        </main>

        <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
          <img onClick={openUpdateMenuHandler} src="../plus.svg" width="35px" height="35px"/>
        </div>

        <div className={isFormOpen ? 'open update-form' : 'update-form'}>
          <form className="form" onSubmit={onSubmitHandler}>
            <h2>Add Bill</h2>
            <label>Bill Title</label>
            <input onChange={onTitleChangeHandler} type="text" value={billTitle} />
            <label>Amount</label>
            <input onChange={onAmountChangeHandler} type="number"  value={billAmount}/>
            <button>Add Bill</button>
          </form>
        </div>
      </>
    );
  }
