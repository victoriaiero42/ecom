import React from "react";
import { Link } from "react-router-dom";

export default function ProductListItems({ product }) {
  const { price, category } = product;
  // const { slug } = category;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li>

      {category && <li className="list-group-item">
        Category:  { " " }
        <Link to={ `/category/${category.slug}` } className="label label-default label-pill pull-xs-right">
          { " " }
          { category.name }
        </Link>
      </li> }

      {category.subs && <li className="list-group-item">
        Subcategory:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li> }

      <li className="list-group-item">
        Price:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li>

      <li className="list-group-item">
        Price:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li>

      <li className="list-group-item">
        Price:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li>

      <li className="list-group-item">
        Price:  { " " }
        <span className="label label-default label-pill pull-xs-right">
          { " " }
               $ { price }
        </span>
      </li>
    </ul>
  );
}
