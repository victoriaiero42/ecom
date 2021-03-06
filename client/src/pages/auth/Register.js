import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function Register({ history }) {
  const [email, setEmail] = useState('');

  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    console.log(process.env);

    if (user && user.token) {
      history.push('/')
    };

  }, [history, user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Follow the link to complete registration.`);

    window.localStorage.setItem('emailForRegistration', email);

    setEmail('')
  }

  const registerForm = () => (
    <form onSubmit={ handleSubmit }>
      <input type="email" className="form-control" value={ email } onChange={ (e) => setEmail(e.target.value) } autoFocus placeholder="your email" />

      <br />

      <button type="submit" className="btn btn-raised">register</button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          { registerForm() }
        </div>
      </div>
    </div>
  )
}

export default Register
