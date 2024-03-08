import Header from "../components/UI/Header";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";
import Auth from '../components/UX/Auth';
import { useEffect, useState } from "react";

function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [bills, setBills] = useState([]);
    const [paycheckItems, setPaycheckItems] = useState([]);
    const [billsTotal, setBillsTotal] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [totalPaycheckAllocations, setTotalPaycheckAllocations] = useState(0);

    useEffect(()=>{
      const userInfoData = JSON.parse(sessionStorage.getItem('userInfo'));

      if(userInfoData){
        setUserInfo(userInfoData[0]);
      }
    }, [])


    // Pull the user info from the session variable
    useEffect(()=>{
      const billsData = JSON.parse(sessionStorage.getItem('bills'));
      const paycheckItemsData = JSON.parse(sessionStorage.getItem('paycheckItems'));
    
      if (billsData) {
        setBills(billsData);
      } else {
        // Fetch bills data from the database
        fetch('api/getbills/', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify({
              user: userInfo.uid
          })
        })
        .then(res => {
          return res.json();
        })
        .then(data =>{
          if(data.results){
            setBills([...data.results]);
            sessionStorage.setItem('bills', JSON.stringify(data.results))
          }else{
            throw(data.message)
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      if (paycheckItemsData) {
        setPaycheckItems(paycheckItemsData);
      } else {
        // Fetch paycheck items data from the database
        fetch('api/getpaycheckitems', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify({
              user: userInfo.uid
          })
        })
        .then(res => {
          return res.json();
        })
        .then(data =>{
          if(data.results){
            // console.log(data.message);
            setPaycheckItems([...data.results]);
            sessionStorage.setItem('paycheckItems', JSON.stringify(data.results))
          }else{
            console.log('something is wrong: \n' + data.message)
          }
        })
        .catch(err => {
          console.log("There was an issue retrieving the paycheck items" + err);
        })
    }
    },[userInfo])

    useEffect(()=>{
      console.log("User Info: " + userInfo);
      console.log("bills: " + bills);
      console.log("paycheck items: " + paycheckItems);
    },[])

    // Set Monthly Savings
    useEffect(()=>{
      if(userInfo.savings_per_paycheck){
        setMonthlySavings(userInfo.savings_per_paycheck * 4);
      }
    }, [userInfo])

    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row hero-image" style={{backgroundImage: "url('/budgeting-bg.jpg')"}}>
                <div className="overlay"></div>
                <div className="budget-info">
                  <BudgetInfo 
                    paycheckAmount={userInfo.paycheck_amount} 
                    billsTotal={billsTotal} 
                    monthlySavings={monthlySavings} 
                    totalAllocations={totalPaycheckAllocations}
                  />
                </div>
            </div>
            <div className="bills-info row">
                <Bills 
                  billsTotal={setBillsTotal} 
                  billsList={bills} 
                />
                <PaycheckAllocations 
                  paycheckItems={paycheckItems}
                  billsTotal={billsTotal} 
                  savings={userInfo.savings_per_paycheck} 
                  totalAllocations={setTotalPaycheckAllocations}
                />
            </div>
            <div className="row">
                <MonthlyAllocations 
                  paycheckItems={paycheckItems}
                  billsTotal={billsTotal}
                  monthlySavings={monthlySavings}
                />
            </div>
        </main>
      </>
    );
  }
export default Dashboard;