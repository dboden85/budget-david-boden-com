"use client"; // This is a client component
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";
import { useEffect, useState, useContext } from "react";
import {UserContext} from "../components/contexts/user-context/UserContext";

export default function Dashboard() {
    const [paycheckAmount, setPaycheckAmount] = useState(682.59)
    const [billsTotal, setBillsTotal] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(1244);
    const [totalPaycheckAllocations, setTotalPaycheckAllocations] = useState(0);
    const {userInfo} = useContext(UserContext);

    console.log(userInfo);

    const {paycheck_amount} = userInfo;

    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row hero-image" style={{backgroundImage: "url('/budgeting-bg.jpg')"}}>
                <div className="overlay"></div>
                <div className="budget-info">
                  <BudgetInfo paycheckAmount={paycheck_amount} billsTotal={billsTotal} monthlySavings={monthlySavings} totalAllocations={totalPaycheckAllocations}/>
                </div>
            </div>
            <div className="bills-info row">
                <Bills billsTotal={setBillsTotal}/>
                <PaycheckAllocations billsTotal={billsTotal} savings={monthlySavings} totalAllocations={setTotalPaycheckAllocations}/>
            </div>
            <div className="row">
                <MonthlyAllocations />
            </div>
        </main>
      </>
    );
  }