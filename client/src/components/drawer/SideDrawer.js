import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { SET_VISIBLE } from "../../redux/actionTypes";

export default function SideDrawer() {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "50%",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={ `Cart ${cart.length} products ` }
      onClose={ () => {
        dispatch({
          type: SET_VISIBLE,
          payload: false,
        });
      } }
      visible={ drawer }>


      {cart && cart.map((p) => {
        return <div key={ p._id } className="row">
          <div className="col">
            { p.images[0] ? (
              <>
                <img alt="img" src={ p.images[0].url } style={ imageStyle } />
                <p className="text-center bg-secondary text-light">
                  { p.title } x { p.count }{ " " }
                </p>
              </>
            ) : (
                <>
                  <img alt="img" src={ laptop } style={ imageStyle } />
                  <p className="text-center bg-secondary text-light">
                    { p.title } x { p.count }{ " " }
                  </p>
                </>
              ) }
          </div>
        </div>;
      }) }


      <Link onClick={ () => {
        dispatch({
          type: SET_VISIBLE,
          payload: false,
        })
      } } to="/cart" >
        <button className="text-center btn btn-primary btn-raised btn-block">Go To Cart</button>
      </Link>
    </Drawer>
  );
}
