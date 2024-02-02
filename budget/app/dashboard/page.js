"use client"; // This is a client component
import Header from "../components/UI/Header";
import Card from "../components/UI/Card";
import BudgetInfo from "../components/Budget-Info/BudgetInfo";
import Bills from "../components/Bills/Bills";
import PaycheckAllocations from "../components/Paycheck-Allocation/PaycheckAllocation";
import MonthlyAllocations from "../components/Monthly-Allocations/MonthlyAllocations";

export default function Dashboard() {
    return (
      <>
        <Header title="Dashboard"/>
        <main>
            <div className="row budget-info">
                {/* <div className="overlay"></div> */}
                <BudgetInfo />
            </div>
            <div className="bills-info row">
                <Bills />
                <PaycheckAllocations />
            </div>
            <div className="row">
                <MonthlyAllocations />
            </div>
        </main>
      </>
    );
  }