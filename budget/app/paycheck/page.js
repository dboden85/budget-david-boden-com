"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useState, useEffect } from 'react';

export default function Paycheck() {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState();
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseItems, setExpenseItems] = useState(
    [
      {
        id: 1,
        item: 'Guilt Free Spending',
        amount: 100.00
      },
      {
        id: 2,
        item: 'Gas',
        amount: 90.00
      },
      {
        id: 3,
        item: 'Groceries',
        amount: 50.00
      },
      {
        id: 4,
        item: 'Kid\'s Allowance',
        amount: 20.00
      }
    ]
  )

  useEffect(() => {
    let total = 0;
    expenseItems.map(item => {
      total += item.amount;
    })
    setExpensesTotal(total);
  }, [expenseItems])

  const openUpdateMenuHandler = () => {
    setIsFormOpen(prev => (!prev));
  }

  const onTitleChangeHandler = (e) => {
    setExpenseTitle(e.target.value);
  }

  const onAmountChangeHandler = (e) => {
    setExpenseAmount(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setExpenseItems(prev => (
      [...prev, {
        id: expenseItems.length + 1,
        item: expenseTitle.trim(),
        amount: parseInt(expenseAmount)
      }
      ]))
    setIsFormOpen(false);
    setExpenseAmount('');
    setExpenseTitle('');
  }


  return (
    <>
      <Header title="Bills" />
      <main>
        <div className="row total-row">
          <p>Total: <span>${expensesTotal.toFixed(2)}</span></p>
        </div>
        <div className="row update-bills">
          <Card>
            <h2>Bills</h2>
            <ul>
              {expenseItems.map(item => {
                return (<li key={item.id}><p className="title">{item.item}</p><p className="amount">{'$' + item.amount.toFixed(2)}</p></li>)
              })}
            </ul>
          </Card>
          <Card>
            <h2>Graph will go here</h2>

          </Card>
        </div>
      </main>

      <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
        <img onClick={openUpdateMenuHandler} src="../plus.svg" width="35px" height="35px" />
      </div>

      <div className={isFormOpen ? 'open update-form' : 'update-form'}>
        <form className="form" onSubmit={onSubmitHandler}>
          <h2>Add Bill</h2>
          <label>Bill Title</label>
          <input onChange={onTitleChangeHandler} type="text" value={expenseTitle} />
          <label>Amount</label>
          <input onChange={onAmountChangeHandler} type="number" value={expenseAmount} />
          <button>Add Bill</button>
        </form>
      </div>
    </>
  );
}