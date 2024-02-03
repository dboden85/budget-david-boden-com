"use client"; // This is a client component
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [paycheckAmount, setPaycheckAmount] = useState(682.59)
    const [billsTotal, setBillsTotal] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(1244);
    const [totalPaycheckAllocations, setTotalPaycheckAllocations] = useState(0);

    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row budget-info hero-image" style={{backgroundImage: "url('/budget-bg.jpg')"}}>
                {/* <div className="overlay"></div> */}
                <BudgetInfo paycheckAmount={paycheckAmount} billsTotal={billsTotal} monthlySavings={monthlySavings} totalAllocations={totalPaycheckAllocations}/>
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