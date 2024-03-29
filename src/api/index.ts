import httpClient from "./axiosConfig";

export const login = async (fd: FormData) => {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    body: fd,
  });
  const { token } = await res.json();
  localStorage.setItem("tumblr-token", token);
};

export const followById = async (id: string) => {
  try {
    const res = await httpClient.put("/user/follow/" + id);
    if (res) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export const likeByPostId = async (postId: string) => {
  try {
    const res = await httpClient.put("/post/like/" + postId);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (img: File) => {
  const fd = new FormData();
  fd.append("image", img);
  return (await httpClient.post("/post/upload", fd)).data.url;
};

export const uploadPost = async (form: HTMLFormElement, content: string) => {
  const fd = new FormData(form);
  fd.append("markDownContent", content);
  await httpClient.post("/post", fd);
};
