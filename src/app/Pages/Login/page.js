import "./Login.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>

      <form>
        <LoginForm />
      </form>
    </div>
  );
};

export default Login;
