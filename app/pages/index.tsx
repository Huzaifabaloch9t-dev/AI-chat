const sendMessage = async (msg: string, token: string, setReply: any) => {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { Authorization: token },
    body: JSON.stringify({ message: msg }),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    setReply((prev: string) => prev + decoder.decode(value));
  }
};
