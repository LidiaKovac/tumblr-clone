export const login = async (fd: FormData) => {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    body: fd,
  });
  const {token} = await res.json()
  localStorage.setItem("tumblr-token", token)
};
