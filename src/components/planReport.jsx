import { Outlet } from "react-router-dom";

const PlanReport = () => {
  return (
    <>
      <main>
        <h1>Plan-Wise Billing Report</h1>
      </main>
      <Outlet />
    </>
  );
};
export default PlanReport;
