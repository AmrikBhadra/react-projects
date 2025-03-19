import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");

  const maxcharacter = 50;

  // calculate the remaining count in more optimised way
  const remainingCharacterCount = useMemo(()=> maxcharacter - text.length, [text]);

  function handleChange(e) {
    if (e.target.value.length <= maxcharacter) {
      setText(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setText("");
    textAreaRef.current.style.height = "20px";
  }

  useEffect(() => {
    if (textAreaRef.current) {

      textAreaRef.current.focus(); // when the textarea renders, automatically cursor appears

      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <main className="min-h-screen bg-[#222] flex justify-center items-center py-5">
      <div className="w-1/2">
        <div className="text-container w-full bg-[#333] rounded-md p-3 flex flex-col">
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleChange}
            placeholder="Write your content here"
            className="w-full h-[20px] flex-1 bg-transparent outline-none resize-none placeholder:text-[#ebebeb77] text-[#eee]"
            
          ></textarea>
        </div>

        <div className="mt-2 w-full flex justify-between pr-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-2 ml-1 px-8 py-2.5 rounded-md bg-[#4cc9f0] text-white font-semibold hover:bg-[#0096c7] transition-all ease"
          >
            Submit
          </button>
          <p className={`${(remainingCharacterCount < 10) ? "text-[#ff0000]" : "text-[#eee]"}`}>{text.length}/{maxcharacter}</p>
        </div>
      </div>
    </main>
  );
}
