import Header from "../components/UI/Header";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Auth from '../components/UX/Auth';

function Dashboard() {
    const router = useRouter();
    const [userId, setUserId] = useState(0);
    const [userInfo, setInfo] = useState({
      fname: '',
      lname: '',
      email: '',
      paycheck_amount: 0,
      savings_goal: 0,
      savings_per_paycheck: 0
    });
    const [bills, setBills] = useState([]);
    const [paycheckItems, setPaycheckItems] = useState([]);
    const [billsTotal, setBillsTotal] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [totalPaycheckAllocations, setTotalPaycheckAllocations] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    //useEffect(() => {
      //const loggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
      
      //if (!loggedIn && router.pathname !== '/') {
        //router.push('/');
      //}
    //}, [isLoggedIn, router]);


    useEffect(()=>{
      const userData = JSON.parse(sessionStorage.getItem('userInfo'));
       
      if(userData){
        setUserId(userData);
        //fetch user information
        try{
          fetch('api/getuser?uid=' + userData)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            if(data.results){
              setInfo(data.results);
            }else{
              throw(data.message)
            }
          })
          .catch(err => {
            console.error(err);
          })
        }
        catch(err){
          console.error(err)
        }

      }

    }, [])

    useEffect(()=>{
      if(userId){
        // Fetch bills data from the database
        try{
          fetch('api/managebills?uid=' + userId)
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
            console.error(err);
          })
        }
        catch(err){
          console.error(err)
        }

        // Fetch paycheck items data from the database
        try{
          fetch('api/managepaycheckitems?uid=' + userId)
          .then(res => {
            return res.json();
          })
          .then(data =>{
            if(data.results){
              // console.log(data.message);
              setPaycheckItems([...data.results]);
            }else{
              throw('something is wrong: \n' + data.message);
            }
          })
          .catch(err => {
            console.error(err);
          })
        }
        catch(err){
          console.log(err);
        }
      }
    },[userId])

    useEffect(()=>{
      setMonthlySavings(userInfo.savings_per_paycheck  * 4);
    },[userInfo]);

    

    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row">
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

export default ()=>(
	<Auth>
		<Dashboard/>
	</Auth>
);
