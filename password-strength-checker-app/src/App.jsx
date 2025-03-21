import { useState, useMemo, useRef, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";

export default function App() {
  const [password, setPassword] = useState("");
  const isVisible = useRef(false);

  // Toggle password visibility without causing re-renders
  const toggleVisibility = useCallback(() => {
    isVisible.current = !isVisible.current;
    document.getElementById("passwordInput").type = isVisible.current
      ? "text"
      : "password";
  }, []);

  // Memoized password analysis
  const { strength, checkList } = useMemo(() => {
    let lowercaseCount = 0,
      uppercaseCount = 0,
      specialCount = 0,
      numberCount = 0;

    for (let char of password) {
      if (/[a-z]/.test(char)) lowercaseCount++;
      else if (/[A-Z]/.test(char)) uppercaseCount++;
      else if (/[0-9]/.test(char)) numberCount++;
      else specialCount++;
    }

    const checklist = {
      min_letters: password.length,
      lowercase: lowercaseCount,
      uppercase: uppercaseCount,
      special: specialCount,
      number: numberCount,
    };

    let score =
      (password.length >= 8 ? 1 : 0) +
      (lowercaseCount > 0 ? 1 : 0) +
      (uppercaseCount > 0 ? 1 : 0) +
      (specialCount > 0 ? 1 : 0) +
      (numberCount > 0 ? 1 : 0);

    let passwordStrength =
      password.length === 0
        ? ""
        : score <= 2
        ? "Weak"
        : score === 3
        ? "Medium"
        : score === 4
        ? "Strong"
        : "Very Strong";

    return { strength: passwordStrength, checkList: checklist };
  }, [password]);

  const strengthColors = {
    Weak: "bg-red-500",
    Medium: "bg-yellow-500",
    Strong: "bg-green-500",
    "Very Strong": "bg-green-800",
  };

  return (
    <main className="h-screen flex justify-center items-center bg-[#eee]">
      <div className="bg-white p-5 rounded-md shadow-sm flex flex-col gap-y-2 justify-center items-center">
        <h1 className="text-2xl font-semibold text-[#333]">
          Password Strength Checker
        </h1>
        <div className="flex items-center gap-x-2 border w-full py-1.5 px-2 rounded-md mt-4">
          <input
            id="passwordInput"
            type="password"
            placeholder="Enter password"
            className="outline-none border-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="text-[#464646]" onClick={toggleVisibility}>
            {isVisible.current ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Strength Meter */}
        {password.length > 0 && (
          <div className="w-full h-2 bg-gray-300 rounded-md mt-2 relative overflow-hidden">
            <div
              className={`h-full ${strengthColors[strength]} transition-all duration-500`}
              style={{
                width:
                  strength === "Weak"
                    ? "25%"
                    : strength === "Medium"
                    ? "50%"
                    : strength === "Strong"
                    ? "75%"
                    : "100%",
              }}
            ></div>
          </div>
        )}

        {/* Strength Label */}
        {password.length > 0 && (
          <p
            className={`w-full text-sm text-center font-semibold ${
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                ? "text-yellow-500"
                : strength === "Strong"
                ? "text-green-500"
                : "text-green-800"
            } mt-1`}
          >
            {strength}
          </p>
        )}

        <button className="w-full p-2 bg-[#222] hover:bg-[#464646] text-white font-semibold rounded-md transition-all ease mt-4">
          Submit
        </button>

        <div className="flex flex-col justify-center gap-x-2 border w-full py-1.5 px-2 rounded-md mt-2">
          <h3 className="text-sm mb-1 text-[#3a86ff] font-semibold">
            Key Instructions
          </h3>

          {[
            { label: "Minimum 8 characters", check: checkList["min_letters"] > 7 },
            { label: "At least 1 lowercase letter", check: checkList["lowercase"] > 0 },
            { label: "At least 1 uppercase letter", check: checkList["uppercase"] > 0 },
            { label: "At least 1 special character", check: checkList["special"] > 0 },
            { label: "At least 1 number", check: checkList["number"] > 0 },
          ].map((item, index) => (
            <span
              key={index}
              className={`flex items-center gap-x-2 text-sm ${
                item.check ? "text-[#2a9d8f]" : "text-[#ccc]"
              }`}
            >
              <span>{item.check ? <SiTicktick /> : <FaXmark />}</span>
              <p>{item.label}</p>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
