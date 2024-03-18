"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState, useRef } from "react";
import Loading from "../components/UI/Loading";

export default function Bills() {
  const billTitle = useRef('');
  const billAmount = useRef('');
  const dueDate = useRef('');
  const [userid, setUserid] = useState({});
  const [billsTotal, setBillsTotal] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMathing, setIsMathing] = useState(true);
  const [bills, setBills] = useState([]);

  // Pull user info from session var
  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setUserid(userData[0].uid);
    }

  },[])

  // pull bills data from db
  useEffect(()=>{

    fetch('/api/managebills?uid=' + userid)
    .then(res => {
      return res.json();
    })
    .then(data =>{
      if(data.results){
        setBills([...data.results]);
      }else{
        throw(data.message)
      }
    })
    .catch(err => {
      console.log(err);
    })

  }, [userid])


  // Total up the bill amounts
  useEffect(() => {
    setIsMathing(true)
    let total = 0;
    bills.map(bill => {
      total += bill.bill_amount;
    })
    setBillsTotal(total);
    setIsMathing(false);
    billTitle.current.value = '';
    billAmount.current.value = '';if(bills.length > 0){
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        let billsArr = [];
        bills.map(bill => {
          billsArr.push([bill.bill_title, bill.bill_amount])
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
    }


  }, [bills])

  // toggle add bill menu
  const openUpdateMenuHandler = () => {
    setIsFormOpen(prev => (!prev));
  }

  //add bill item form submit handler
  const onSubmitHandler = (e) => {
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

    const title = capitalizeFirstLetter(billTitle.current.value);
    const amount = parseFloat(billAmount.current.value);
    const due = parseInt(dueDate.current.value);

    setBills(prev => (
      [...prev, {
        bid: bills.length + 1,
        bill_title: title,
        bill_amount: amount,
        due_date: due
      }
      ])) 

      fetch('/api/managebills', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          uid: userid,
          title: title,
          amount: parseFloat(billAmount.current.value),
          due: due
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.message){
          console.log(data.message);
        }
      })

    setIsFormOpen(false);
  }

  //Delete Bill item
  const onDeleteHandler = (e)=>{
    e.preventDefault();

    let {index, id, title } = JSON.parse(e.target.dataset.info);

    if(confirm(`Remove ${title} from your bills?`)){
      bills.splice(index, 1);
      setBills([...bills]);
    }

    fetch('/api/managebills?uid=' + id, {
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

  // adding ordinal suffix to the due date.
  const ordSuffix = (day)=>{
    return day > 0 ? ['th', 'st', 'nd', 'rd'][
      (day > 3 && day < 21 || day % 10 > 3 ? 0 : day % 10 )
    ]
    : 'th (How can this be 0?)';
  }


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
              {bills.length > 0 ?
              bills.map((bill, i) => {

                const data = JSON.stringify({index: i, id: bill.bid, title: bill.bill_title});

                return (
                <li key={bill.bid}>
                  <p className="title">{bill.bill_title}<br /><small>{`Due on the ${bill.due_date}${ordSuffix(bill.due_date)}.`}</small></p>
                  <p className="amount">{'$' + bill.bill_amount.toFixed(2)}</p>
                  <div className="delete-container">
                    <img data-info={data} onClick={onDeleteHandler} className="delete" src="../trash.svg" width="25px" height="25px"/>
                  </div>
                </li>)
              })
              :
              <p>There are no bills to show</p>
            }
            </ul>
          </Card>
          <Card>
            <h2>Graph will go here</h2>
            {bills.length > 0 ? 
              <div id="piechart_3d" style={{width: '100%', minHeight: 'calc(100% - 67px)'}}></div>
              :
              <p>No data to show</p>
            }

            
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
          <input ref={billTitle} type="text" />
          <label>Amount</label>
          <input ref={billAmount} type="number" step=".01" />
          <label>Due</label>
          <input ref={dueDate} type="number" step="1" min="1" max="31"/>
          <button>Add Bill</button>
        </form>
      </div>
    </>
  );
}
