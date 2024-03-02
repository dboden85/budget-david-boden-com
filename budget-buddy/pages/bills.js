"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState, useContext } from "react";
import Loading from "../components/UI/Loading";

export default function Bills() {
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState();
  const [billsTotal, setBillsTotal] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMathing, setIsMathing] = useState(true);
  const [bills, setBills] = useState([]);

  // Pull bills down from the session variable
  useEffect(()=>{
    setBills(JSON.parse(sessionStorage.getItem('bills')));
  },[])


  // Total up the bill amounts
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
      let billsArr = [];
      bills.map(bill => {
        billsArr.push([bill.item, bill.amount])
      })
      var data = google.visualization.arrayToDataTable([
        ['Bills', 'Amount'],
        ...billsArr
      ]);

      var options = {
        title: 'My Bills',
        is3D: true,
        backgroundColor: '#183e44',
        fontSize: 14
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    }
  },[bills]);


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
