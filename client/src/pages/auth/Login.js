import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from '../../firebase1';
// import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from '../../redux/actionTypes'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../fucns/auth';

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('admin/dashboard');
    } else {
      history.push('user/history');
    }
  }

  let { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    };

  }, [history, user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
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
            roleBasedRedirect(res);
          }
        )
        .catch(err => console.log(err));

      // history.push('/');

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
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
              roleBasedRedirect(res);
            }
          )
          .catch(err => console.log(err));


        // history.push('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
  }

  const loginForm = () => (
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          autoFocus
          placeholder="your email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          autoFocus
          placeholder="your password"
        />
      </div>
      <br />

      <Button
        onClick={ handleSubmit }
        className="mb-3"
        type="primary"
        block
        shape="round"
        icon={ <MailOutlined /> }
        disabled={ !email || password.length < 6 }>
        { " " }
        login with email password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          { loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4> }
          { loginForm() }

          <Button
            onClick={ googleLogin }
            className="mb-3"
            type="danger"
            block
            shape="round"
            icon={ <GoogleOutlined /> }
          >
            { " " }
        login with google
      </Button>
          <Link to="/forgot/password" className="float-right text-danger">forgot password</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
