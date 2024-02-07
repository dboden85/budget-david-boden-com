"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useState, useEffect } from 'react';

export default function Paycheck() {


  return (
    <>
      <Header title="Paycheck" />
      <main>
        
      </main>

      {/* <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
        <img onClick={openUpdateMenuHandler} src="../plus.svg" width="35px" height="35px" />
      </div>

      <div className={isFormOpen ? 'open update-form' : 'update-form'}>
        <form className="form" onSubmit={onSubmitHandler}>
          <h2>Add Item</h2>
          <label>Item Title</label>
          <input onChange={onTitleChangeHandler} type="text" value={expenseTitle} />
          <label>Amount</label>
          <input onChange={onAmountChangeHandler} type="number" value={expenseAmount} />
          <button>Add Item</button>
        </form>
      </div> */}
    </>
  );
}