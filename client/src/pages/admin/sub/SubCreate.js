import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSubs, removeSub } from "../../../fucns/sub";
import { getCategories } from "../../../fucns/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

export default function SubCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);

            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h4>Create sub category</h4>
            ) }

          <div className="form-group">
            <label>Parent category</label>
            <select name="category" className="form-control" onChange={ (e) => setCategory(e.target.value) }>
              <option>Please, select</option>
              { categories.length > 0 &&
                categories.map((c) => (
                  <option key={ c._id } value={ c._id }>
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
          <LocalSearch keyword={ keyword } setKeyword={ setKeyword } />
          { subs.filter(searched(keyword)).map((s) => {
            return (
              <div className="alert alert-secondary" key={ s._id }>
                {s.name }{ " " }
                <span
                  onClick={ () => handleRemove(s.slug) }
                  className="btn btn-sm float-right">
                  <DeleteOutlined className="text-danger" />
                </span>{ " " }
                <span className="btn btn-sm float-right">
                  <Link to={ `/admin/sub/${s.slug}` }>
                    <EditOutlined className="text-warning" />
                  </Link>
                </span>
              </div>
            );
          }) }
        </div>
      </div>
    </div>
  );
}
