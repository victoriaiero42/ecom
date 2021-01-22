import React, { useEffect, useState } from "react";
import { getCategory } from "../../fucns/category";
import ProductCard from "../../components/cards/ProductCard";

export default function CategoryHome({ match }) {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then(res => {
        console.log(res.data);
        setCategory(res.data.category)
        setProducts(res.data.products)
        setLoading(false)
      })
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          { loading ? (<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">Loading...</h4>) : (<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">{ products.length } products in "{category.name }" category.</h4>) }
        </div>
      </div>

      <div className='row'>
        {products.map((p) => (
        <div className='col' key={p._id}>
          <ProductCard product={p}/>
        </div>
        ))}
      </div>
    </div> 
  )
}
