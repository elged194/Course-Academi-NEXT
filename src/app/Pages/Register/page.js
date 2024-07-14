import "./Register.css";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <>
      <div className="register">
        <h2>Register</h2>
        <br />

        <form>
          <RegisterForm />
        </form>
      </div>
    </>
  );
};

export default Register;
