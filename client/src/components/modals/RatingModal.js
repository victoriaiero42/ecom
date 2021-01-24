import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

export default function RatingModal({ children }) {
  const { user } = useSelector(state => ({ ...state }))
  const [modalVisible, setModalVisible] = useState(false)
  const history = useHistory();
  let params = useParams();
  // console.log(params);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true)
    } else {
      history.push({
        pathname: "/login",
        state: {
          from: `/product/${params.slug}`
        }
      })
    }
  }

  return (
    <>
      <div onClick={ handleModal }>
        <StarOutlined className="text-danger" /> <be />
        { user ? 'Leave rating' : 'Login to leave rating' }
      </div>
      <Modal
        title="Leave you rating"
        centered
        visible={ modalVisible }
        onOk={ () => {
          setModalVisible(false)
          toast.success('Thanks for your review. ')
        } }
        onCancel={ () => {
          setModalVisible(false)

        } }
      >
        { children }
      </Modal>
    </>
  )
}
