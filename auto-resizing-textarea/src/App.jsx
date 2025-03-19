import { useEffect, useRef, useState } from "react";

export default function App() {
  const textAreaRef = useRef(null);
  const [text, setText] = useState(""); 

  function handleChange(e){
    e.preventDefault();
    setText(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    setText("");
    textAreaRef.current.style.height = '20px';
  }

  useEffect(() => {

    // check if the textarea is rendered or not
     if(textAreaRef.current){

      // this will allow to shrink when we delete some content
      textAreaRef.current.style.height = 'auto';

      // set height = scrollHeight  (height of textarea to fit all content, without enabling scrolling)
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
     }    
  }, [text])
  

  return (
    <main className="min-h-screen bg-[#222] flex flex-col gap-y-4 justify-center items-center">
      <div className="text-container w-[50%] bg-[#333] rounded-md p-3 flex flex-col">
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleChange}
          placeholder="Write your content here"
          className="w-full h-[20px] bg-transparent outline-none resize-none text-[#eee] placeholder:text-[#ebebeb77]"
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit} className="mt-3 px-8 py-2.5 rounded-md bg-[#4cc9f0] text-white font-semibold hover:bg-[#0096c7] transition-all ease">Submit</button>
    </main>
  );
}
