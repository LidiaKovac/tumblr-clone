import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = ():UserHook => {
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState<User | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState<string | null>(null);
    const doLogin = async (fd: FormData) => {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: fd,
      });
      const loginData = await res.json();
      if (loginData.token) {
        localStorage.setItem("tumblr-token", loginData.token);
        navigate("/");
        const userRes = await fetch("http://localhost:3001/user/me", {
          headers: {
            Authorization: "Bearer " + loginData.token,
          },
        });
        setUser(await userRes.json());
      } else setError(loginData.message);
    };
    return {user, doLogin, error};
};
