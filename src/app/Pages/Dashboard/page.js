import "./Dashboard.css";
import Users from "./Users";
import Products from "./Products";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 style={{ textAlign: "center" }} className="title">
        Dashboard
      </h2>

      <div className="LoginEnabled">
        <button>Activate Login</button>

        <table>
          <thead>
            <tr>
              <th>Number of subscribers</th>
            </tr>

            <tr>
              <th>Number of products</th>
            </tr>
          </thead>
        </table>

        <br />
      </div>

      <Users />
      <br />
      <Products />
    </div>
  );
};

export default Dashboard;
