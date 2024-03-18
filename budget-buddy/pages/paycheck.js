"use client";
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import { useState, useEffect, useRef } from 'react';

export default function Paycheck() {
  const [paycheckItems, setPaycheckItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userid, setUserid] = useState();

  // refs
  const paycheckItemTitle = useRef();
  const paycheckItemAmount = useRef();

  useEffect(()=>{
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));

    if(userData){
      setUserid(userData[0].uid);

      fetch('/api/managepaycheckitems?pid=' + userData[0].uid)
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

  // toggle add paycheck menu
  const openUpdateMenuHandler = () => {
    setIsFormOpen(prev => (!prev));
  }

  //add paycheck item form submit handler
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

    const title = capitalizeFirstLetter(paycheckItemTitle.current.value);
    const amount = parseFloat(paycheckItemAmount.current.value);

    setPaycheckItems(prev => (
      [...prev, {
        pid: paycheckItems.length + 1,
        title: title,
        amount: amount
      }
      ])) 

      fetch('/api/managepaycheckitems', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          uid: userid,
          title: title,
          amount: amount
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

      <div className={isFormOpen ? 'open update-form-icon' : 'update-form-icon'}>
        <img onClick={openUpdateMenuHandler} src="../plus.svg" width="35px" height="35px" />
      </div>

      <div className={isFormOpen ? 'open update-form' : 'update-form'}>
        <form className="form" onSubmit={onSubmitHandler}>
          <h2>Add Item</h2>
          <label>Item Title</label>
          <input ref={paycheckItemTitle} type="text"/>
          <label>Amount</label>
          <input ref={paycheckItemAmount} type="number" step=".01" />
          <button>Add Item</button>
        </form>
      </div>
    </>
  );
}