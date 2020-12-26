import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function AdminProductCard({ product, handleRemove }) {
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          src={ images && images.length ? images[0].url : laptop }
          style={ { height: "150px", objectFit: "cover" } }
          alt="img"
          className="p-1"
        />
      }
      actions={ [
        <Link to={ `/admin/product/${slug}` } >
          { " " }
          < EditOutlined className="text-warning" /> { " " }
        </Link >,
        <DeleteOutlined
          onClick={ () => handleRemove(slug) }
          className="text-danger"
        />,
      ] }>
      <Meta
        title={ title }
        description={ `${description && description.substring(0, 10)}...` }
        images={ images }
      />
    </Card>
  );
}
