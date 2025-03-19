import { useRef, useState } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function resetTimer() {
    stopTimer();
    setTime(0);
    
  }

  return (
    <main className="h-screen bg-[#222] flex flex-col gap-y-10 justify-center items-center">
      <h1 className="text-6xl text-[#eda95b]">Stop Watch</h1>
      <div className="w-[30%] h-[30%] bg-[#2a2a2a] rounded-lg flex flex-col gap-y-4 justify-center items-center">
        <h1 className="text-8xl text-center text-white font-semibold">{time} <p className="text-base">seconds</p></h1>

        <div className="button-container py-3 px-5 w-full flex justify-center gap-x-5">
          <button onClick={startTimer} className="p-3 w-20 rounded-md bg-[#333] text-[#ccc] hover:border transition-all ease">
            Start
          </button>
          <button onClick={stopTimer} className="p-3 w-20 rounded-md bg-[#333] text-[#ccc] hover:border transition-all ease">
            Stop
          </button>
          <button onClick={resetTimer} className="p-3 w-20 rounded-md bg-[#333] text-[#ccc] hover:border transition-all ease">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
