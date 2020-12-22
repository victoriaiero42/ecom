import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {

    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && history.push('/');

    return () => clearInterval(interval);

  }, [count, history])
  return (
    <div className='container p-5 text-center'>
      <p> Redirecting you in { count } seconds</p>
    </div>
  )
}
