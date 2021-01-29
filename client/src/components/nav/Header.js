import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../redux/actionTypes";
import Search from '../forms/Search';

const { SubMenu, Item, ItemGroup } = Menu;

function Header() {
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();

  let { user, cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu onClick={ handleClick } selectedKeys={ [current] } mode="horizontal">
      <Item key="home" icon={ <AppstoreOutlined /> }>
        <Link to="/">Home </Link>
      </Item>

      <Item key="shop" icon={ <ShoppingOutlined /> }>
        <Link to="/shop">Shop </Link>
      </Item>

      <Item key="cart" icon={ <ShoppingCartOutlined /> }>
        <Link to="/cart">Cart { cart.length } </Link>
      </Item>

      {!user && (
        <Item key="register" className="float-right" icon={ <UserAddOutlined /> }>
          <Link to="/register">register</Link>
        </Item>
      ) }

      {!user && (
        <Item key="login" className="float-right" icon={ <UserOutlined /> }>
          <Link to="/login">login</Link>
        </Item>
      ) }

      {user && (
        <SubMenu
          key="SubMenu"
          icon={ <SettingOutlined /> }
          title={ user.email && user.email.split("@")[0] }
          className="float-right">
          <ItemGroup>
            { user && user.role === "subscriber" && (
              <Item Item key="setting:1">
                <Link to='/user/history'>Dashboard</Link>

              </Item>
            ) }

            { user && user.role === "admin" && (
              <Item Item key="setting:1">
                <Link to='/admin/dashboard'>Dashboard</Link>

              </Item>
            ) }
            <Item icon={ <LogoutOutlined /> } onClick={ logout }>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      ) }

      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  );
}

export default Header;
