import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";
import Auth from '../components/UX/Auth';
import { useEffect, useState, useContext } from "react";

function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [paycheckAmount, setPaycheckAmount] = useState(682.59)
    const [bills, setBills] = useState([]);
    const [billsTotal, setBillsTotal] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(1244);
    const [totalPaycheckAllocations, setTotalPaycheckAllocations] = useState(0);

    useEffect(()=>{
      setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    },[])

    useEffect(()=>{
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
          console.log(data.message);
          // console.log(data.results)
          setBills([...data.results]);
        }else{
          console.log('something is wrong')
        }
      })
      .catch(err => {
        console.log(err);
      })
    },[userInfo.uid])

    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row hero-image" style={{backgroundImage: "url('/budgeting-bg.jpg')"}}>
                <div className="overlay"></div>
                <div className="budget-info">
                  <BudgetInfo paycheckAmount={userInfo.paycheck_amount} billsTotal={billsTotal} monthlySavings={monthlySavings} totalAllocations={totalPaycheckAllocations}/>
                </div>
            </div>
            <div className="bills-info row">
                <Bills billsTotal={setBillsTotal} billsList={bills} />
                <PaycheckAllocations billsTotal={billsTotal} savings={monthlySavings} totalAllocations={setTotalPaycheckAllocations}/>
            </div>
            <div className="row">
                <MonthlyAllocations />
            </div>
        </main>
      </>
    );
  }
export default Dashboard;