import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../fucns/sub";
import { getCategories } from "../../../fucns/category";
// import { Link } from "react-router-dom";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
// import LocalSearch from "../../../components/forms/LocalSearch";

export default function SubUpdate({ match, history }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');
  // const [category, setCategory] = useState("");

  const loadSub = useCallback(() =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    }), [match.params.slug]);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, [loadSub]);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));



  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push('/admin/sub')
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          { loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
              <h4>Update sub category</h4>
            ) }

          <div className="form-group">
            <label>Parent category</label>
            <select name="category" className="form-control" onChange={ (e) => setParent(e.target.value) }>
              <option>Please, select</option>
              { categories.length > 0 &&
                categories.map((c) => (
                  <option key={ c._id } value={ c._id } selected={ c._id === parent }>
                    {c.name }
                  </option>
                )) }
            </select>
          </div>

          {/* { JSON.stringify(category) } */ }
          <CategoryForm
            handleSubmit={ handleSubmit }
            name={ name }
            setName={ setName }
          />
        </div>
      </div>
    </div>
  );
}
