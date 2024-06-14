import { Outlet } from "react-router-dom";

const AllocationReport = () => {
  return (
    <>
      <main>
        <h1>Allocation Wise Report</h1>
      </main>
      <Outlet />
    </>
  );
};
export default AllocationReport;
