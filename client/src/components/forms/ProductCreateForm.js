import React, { memo } from "react";
import { Select } from "antd";
const { Option } = Select;

function ProductCreateForm({
  handleSubmit,
  handleChange,
  values,
  handleCatgegoryChange,
  showSub,
  subOptions,
  setValues,
}) {
  const {
    title,
    description,
    price,
    categories,
    // category,
    // subs,
    quantity,
    // images,
    shipping,
    colors,
    brand,
    color,
    brands,
  } = values;

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={ title }
            onChange={ handleChange }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={ description }
            onChange={ handleChange }
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={ price }
            onChange={ handleChange }
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            type="text"
            name="shipping"
            className="form-control"
            value={ shipping }
            onChange={ handleChange }>
            <option>Please, select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={ quantity }
            onChange={ handleChange }
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <select
            type="text"
            name="color"
            className="form-control"
            value={ color }
            onChange={ handleChange }>
            <option>Please, select</option>
            { colors.map((c) => (
              <option key={ c } value={ c }>
                {c }
              </option>
            )) }
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select
            type="text"
            name="brand"
            className="form-control"
            value={ brand }
            onChange={ handleChange }>
            <option>Please, select</option>
            { brands.map((b) => (
              <option key={ b } value={ b }>
                {b }
              </option>
            )) }
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={ handleCatgegoryChange }>
            <option>Please, select</option>
            { categories.length > 0 &&
              categories.map((c) => (
                <option key={ c._id } value={ c._id }>
                  {c.name }
                </option>
              )) }
          </select>
        </div>

        { showSub && <div>
          <label>Sub Category</label>
          <Select
            mode="multiple"
            style={ { width: "100%" } }
            placeholder="Please, select"
            value={ values.subs }
            onChange={ (value) => setValues({ ...values, subs: value }) }
            name="subs">
            { subOptions.length && subOptions.map((s) => <Option key={ s._id } value={ s._id }>{ s.name }</Option>) }
          </Select>
        </div> }
        <br />
        <button className="btn btn-outline-info">save</button>
      </form>
    </div>
  );
}

export default memo(ProductCreateForm);
