import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store";

export const useLogin = (): UserHook => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState<string | null>(null);
  const doLogin = async (fd: FormData) => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: fd,
    });
    const loginData = await res.json();
    console.log(loginData);
    if (loginData.token) {
      localStorage.setItem("tumblr-token", loginData.token);
      await dispatch(fetchMe());
      navigate("/");
    } else setError(loginData.message);
  };
  return { doLogin, error };
};
