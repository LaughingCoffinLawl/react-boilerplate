import { useState } from "react";

function App2() {
  const [inputText, setInputText] = useState({
    name: "",
    email: "",
  });

  const handleClearClick = () => {
    setInputText({
      name: "",
      email: "",
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputText.name}
        onChange={(e) => setInputText({ ...inputText, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={inputText.email}
        onChange={(e) => setInputText({ ...inputText, email: e.target.value })}
      />
      <button onClick={handleClearClick}>Clear</button>
    </div>
  );
}

export default App2;
