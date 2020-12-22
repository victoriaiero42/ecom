import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase1";
import { toast } from "react-toastify";

export default function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
          className="form-control"
          placeholder="Enter your password"
          disabled={ loading }
          value={ password }
        />
        <button
          className="btn btn-primary"
          disabled={ !password || password.length < 6 || loading }>
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          { loading ? (
            <h1 className="text-danger">Loading..</h1>
          ) : (
              <h1>Password Update</h1>
            ) }
          { passwordUpdateForm() }
        </div>
      </div>
    </div>
  );
}
