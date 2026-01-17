export const sendMessage = async (msg: string, setReply: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      Authorization: token!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    setReply((prev: string) => prev + decoder.decode(value));
  }
};
