import { Outlet } from "react-router-dom";
import "./allotmentHistory.css";
const AllHis = () => {
  return (
    <>
      <main className="allotmentHistory">
        <h1>Allotment History</h1>
        <table class="table table-striped historyTable">
          <thead>
            <tr>
              <th scope="col">SL.No</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">CUG No.</th>
              <th scope="col">Operator</th>
              <th scope="col">Division</th>
              <th scope="col">Department</th>
              <th scope="col">Allotment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>dvsvse</td>
              <td>csdcvsdvsde</td>
              <td>dvsvse</td>
              <td>csdcvsdvsde</td>
            </tr>
          </tbody>
        </table>
      </main>
      <Outlet />
    </>
  );
};
export default AllHis;
