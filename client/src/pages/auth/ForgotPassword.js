import React, { useEffect, useState } from "react";
import { auth } from '../../firebase1';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// import { LOGGED_IN_USER } from '../../redux/actionTypes';
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));


  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    };

  }, [history, user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REGISTER_REDIRECT,
      handleCodeInApp: true,
    }

    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('check your email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);

        toast.error(error.message);
      })
  }

  return <div className="container col-md-6 offset-md-3 p-5">
    { loading ? <h4 className="text-danger">loading</h4> : <h4>forgot password</h4> }

    <form onSubmit={ handleSubmit }>
      <input type="email"
        className="form-control"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        placeholder="type your email"
        autoFocus
      />
      <br />
      <button className="btn btn-raised" disabled={ !email }>submit</button>
    </form>
  </div>
};

export default ForgotPassword;