"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/UI/Loading";
import {UserContext} from "../components/contexts/user-context/UserContext";

export default function Bills() {
  const {userInfo} = useContext(UserContext);
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState();
  const [billsTotal, setBillsTotal] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMathing, setIsMathing] = useState(true);
  const [bills, setBills] = useState([
    {
      id: 0,
      item: 'Car Payment',
      amount: 305.00,
      due: 15
    },
    {
      id: 1,
      item: 'Phone',
      amount: 111.33,
      due: 21
    },
    {
      id: 2,
      item: 'Gym',
      amount: 10.00,
      due: 17
    },
    {
      id: 4,
      item: 'Google One',
      amount: 1.99,
      due: 1
    },
    {
      id: 5,
      item: 'Audible',
      amount: 15.00,
      due: 23
    }
  ])


  useEffect(() => {
    setIsMathing(true)
    let total = 0;
    bills.map(bill => {
      total += bill.amount;
    })
    setBillsTotal(total);
    setIsMathing(false);
  }, [bills])

  const openUpdateMenuHandler = () => {
    setIsFormOpen(prev => (!prev));
  }


  const onTitleChangeHandler = (e) => {
    setBillTitle(e.target.value);
  }


  const onAmountChangeHandler = (e) => {
    setBillAmount(e.target.value);
  }

  //testing context
  useEffect(()=>{
    console.log(userInfo);
  },[]);

  //add bill item form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setBills(prev => (
      [...prev, {
        id: bills.length + 1,
        item: billTitle.trim(),
        amount: parseInt(billAmount)
      }
      ]))
    setIsFormOpen(false);
    setBillAmount('');
    setBillTitle('');
  }

  //Delete Bill item
  const onDeleteHandler = (e)=>{
    let index = e.target.dataset.index
    if(confirm('Remove this bill?')){
      bills.splice(index, 1);
      setBills([...bills]);
    }
  }

  //add chart
  useEffect(()=>{
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
      ]);

      var options = {
        title: 'My Daily Activities',
        is3D: true,
        backgroundColor: '#183e44',
        fontSize: 14
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    }
  }, []);


  return (
    <>
      <Header title="Bills" />
      <main>
        <div className="hero-image" style={{backgroundImage: 'url("/bills-bg.jpg")'}}>
        <div className="overlay"></div>
          {isMathing ?
          <Loading />
          :
          <div className="row total-row">
            <p>Total: <span>${billsTotal.toFixed(2)}</span></p>
          </div>
        }
        
        </div>
        
        <div className="row">
          <Card>
            <h2>Bills</h2>
            <ul className="list-items">
              {bills.map((bill, i) => {
                return (
                <li key={bill.id}>
                  <p className="title">{bill.item}</p>
                  <p className="amount">{'$' + bill.amount.toFixed(2)}</p>
		  <small>{`Due on the ${bill.due}.`}</small>
                  <div className="delete-container">
                    <img onClick={onDeleteHandler} className="delete" src="../trash.svg" width="25px" height="25px"/>
                  </div>
                </li>)
              })}
            </ul>
          </Card>
          <Card>
            <h2>Graph will go here</h2>
            <div id="piechart_3d" style={{width: '100%', minHeight: 'calc(100% - 67px)'}}></div>
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
          <input onChange={onTitleChangeHandler} type="text" value={billTitle} />
          <label>Amount</label>
          <input onChange={onAmountChangeHandler} type="number" value={billAmount} />
          <button>Add Bill</button>
        </form>
      </div>
    </>
  );
}
