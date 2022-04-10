import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => --current);
    }, 1000);
    if (count === 0) {
      navigate("/login");
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting You in {count}</p>
    </div>
  );
};

export default LoadingToRedirect;
