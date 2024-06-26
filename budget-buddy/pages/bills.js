import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useEffect, useState, useRef } from "react";
import Loading from "../components/UI/Loading";
import Auth from "@/components/UX/Auth";
import Image from 'next/image';

function Bills() {
  const billTitle = useRef('');
  const billAmount = useRef('');
  const dueDate = useRef('');
  const [userid, setUserid] = useState();
  const [billsTotal, setBillsTotal] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMathing, setIsMathing] = useState(true);
  const [bills, setBills] = useState([]);

  const fetchBills = (id)=>{
    fetch('/api/managebills?uid=' + id)
      .then(res => {
        return res.json();
      })
      .then(data =>{
        if(data.success){
          if(data.results){
            setBills([...data.results]);
          }else{
            setBills([])
          }
        }else{
          throw(data.message)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  // Pull user id from session var and get user info from db
  useEffect(()=>{
    const userData = sessionStorage.getItem('userInfo');

    if(userData){
      setUserid(userData);
    }

  },[])

  //load bills when userid is updated.
  useEffect(()=>{
    if(userid){
      fetchBills(userid);
    }
  }, [userid])

  // Total up the bill amounts and google chart
  useEffect(() => {

    //total of bills
    setIsMathing(true)
    let total = 0;
    bills.map(bill => {
      console.log(bill.amount)
      total += bill.amount;
    })

    console.log(total.toFixed(2))

    setBillsTotal(total.toFixed(2));
    setIsMathing(false);

    //remove the values from the refs
    billTitle.current.value = '';
    billAmount.current.value = '';
    
    //add info for the google chart
    // if(bills.length > 0){
    //   google.charts.load("current", {packages:["corechart"]});
    //   google.charts.setOnLoadCallback(drawChart);
    //   function drawChart() {
    //     let billsArr = [];
    //     bills.map(bill => {
    //       billsArr.push([bill.bill_title, bill.bill_amount])
    //     })
    //     var data = google.visualization.arrayToDataTable([
    //       ['Bills', 'Amount'],
    //       ...billsArr
    //     ]);

    //     var options = {
    //       title: 'My Bills',
    //       is3D: true,
    //       backgroundColor: '#183e44',
    //       fontSize: 14
    //     };

    //     var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    //     chart.draw(data, options);
    //   }
    // }


  }, [bills])

  // toggle add bill menu
  const openUpdateMenuHandler = () => {
    setIsFormOpen(prev => (!prev));
  }

  //add bill item form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();

    //capitalize first letter of bill title function
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

    fetch('/api/managebills', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify({
        uid: userid,
        title: title,
        amount: amount,
        due: due
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status){
        console.log(data.status);
        fetchBills(userid);
        }
    })

    setIsFormOpen(false);
  }

  //Delete Bill item
  const onDeleteHandler = (e)=>{
    e.preventDefault();

    let {index, id, title } = JSON.parse(e.target.dataset.info);

    if(confirm(`Remove ${title} from your bills?`)){

      fetch('/api/managebills?bid=' + id, {
        method: 'DELETE'
      })
      .then(res => {
        return res.json();
      })
      .then(data =>{
        if(data.success){
          console.log(data.message);
          fetchBills(userid);

        }else{
          throw(data.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
      
    }
  }

  // adding ordinal suffix to the due date.
  const ordSuffix = (day)=>{
    return day > 0 ? ['th', 'st', 'nd', 'rd'][
      (day > 3 && day < 21 || day % 10 > 3 ? 0 : day % 10 )
    ]
    : 'th (How can this be 0?)';
  }

  //form
  const AddBillItemsForm = ()=>{
    return (
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
    )
  }

    return (
      <Auth>
        <>
          <Header title="Bills" />
          <main>

            {isMathing ?
              <Loading />
              :
              <div className="row total-row">
                <p>Total:<br/><span>${billsTotal}</span></p>
              </div>
            }
            
            <div className="row">
              <Card>
                <h2>Bills</h2>
                <ul className="list-items">
                  {bills.length > 0 ?
                  bills.map((bill, i) => {

                    const data = JSON.stringify({index: i, id: bill.bid, title: bill.title});

                    return (
                    <li key={bill.bid}>
                      <p className="title">{bill.title}<br /><small>{`Due on the ${bill.due}${ordSuffix(bill.due)}.`}</small></p>
                      <p className="amount">{'$' + bill.amount.toFixed(2)}</p>
                      <div className="delete-container">
                        <Image alt="trash icon" data-info={data} onClick={onDeleteHandler} className="delete" src="../trash.svg" width="25" height="25"/>
                      </div>
                    </li>)
                  })
                  :
                  <p>There are no bills to show</p>
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
            <Image alt="plus icon" onClick={openUpdateMenuHandler} src="../plus.svg" width="35" height="35" />
          </div>

          <div className={isFormOpen ? 'open update-form' : 'update-form'}>
            <AddBillItemsForm/>
          </div>
        </>
      </Auth>
    );
}

export default Bills;