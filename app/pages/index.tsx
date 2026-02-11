type SetReply = React.Dispatch<React.SetStateAction<string>>;

export const sendMessage = async (
  msg: string,
  token: string,
  setReply: SetReply
) => {
  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: msg }),
    });

    if (!res.ok || !res.body) {
      throw new Error("Failed to connect with AI");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;

    while (!done) {
      const result = await reader.read();
      done = result.done;

      if (result.value) {
        const chunk = decoder.decode(result.value, { stream: true });
        setReply((prev) => prev + chunk);
      }
    }
  } catch (error) {
    console.error("Chat Error:", error);
    setReply("⚠️ AI response failed. Please try again.");
  }
};
