"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useState, useEffect } from 'react';

export default function Paycheck() {
  const [paycheckItems, setPaycheckItems] = useState([]);
  const [userid, setUserid] = useState();

  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setUserid(userData[0].uid);

      fetch('/api/managepaycheckitems?uid=' + userData[0].uid)
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

  },[])


  const onDeleteHandler = (e)=>{
    alert('boop')
  }


  return (
    <>
      <Header title="Paycheck" />
      <main>
        <div className="hero-image" style={{backgroundImage: 'url("/bills-bg.jpg")'}}>
          <div className="overlay"></div>
            {/* {isMathing ?
            <Loading />
            :
            <div className="row total-row">
              <p>Total: <span>${billsTotal.toFixed(2)}</span></p>
            </div>
          } */}
          
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
                  <p className="amount">{'$' + item.amount.toFixed(2)}</p>
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
          <Card>
            <h2>Graph will go here</h2>
            {/* {bills.length > 0 ? 
              <div id="piechart_3d" style={{width: '100%', minHeight: 'calc(100% - 67px)'}}></div>
              :
              <p>No data to show</p>
            } */}

            
          </Card>
        </div>
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