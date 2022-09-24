// Libraries
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

// Hooks
import { useAuth } from "../../hooks/useProvider";

const LoginRedirect = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const apiRef = useRef(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {

    if (apiRef.current) {
      fetch(`http://localhost:1337/api/auth/discord/callback${location.search}`)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .then((res) => res?.json())
      .then(
        (res) => {
          auth.login(res.jwt, res.user.username);
          navigate('/');
        },
        (err) => {
          setError(err.message);
        }
      );

      apiRef.current = false;
    }

  }, []);

  return (
    <div>
      <p>Redirect</p>
    </div>
  );
}

export default LoginRedirect;