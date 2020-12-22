import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { LOGGED_IN_USER } from '../../redux/actionTypes';
import { createOrUpdateUser } from '../../fucns/auth';

function RegisterComplete({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password required.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);

      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');

        let user = auth.currentUser

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then(
            res => {
              dispatch({
                type: LOGGED_IN_USER,
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            }
          )
          .catch(err => console.log(err));

        history.push('/');
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  }

  const completeRegitrationForm = () => (
    <form onSubmit={ handleSubmit }>
      <input type="email" className="form-control" value={ email } disabled />
      <input type="password" className="form-control" value={ password } onChange={ (e) => setPassword(e.target.value) } autoFocus placeholder='password' />
      <button type="submit" className="btn btn-raised">Complete Registration</button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          { completeRegitrationForm() }
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete;
