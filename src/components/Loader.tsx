
import React, { useEffect, useState } from "react";

const Loader = ({ onFinish }) => {
  const [fade, setFade] = useState("opacity-0");

  useEffect(() => {
    // Step 1: Fade in
    setTimeout(() => setFade("opacity-100"), 500);

    // Step 2: Fade out after 2s
    setTimeout(() => setFade("opacity-0"), 2000);

    // Step 3: Remove loader after fade-out (3s)
    setTimeout(() => onFinish(), 3000);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <img
        src="/loader.png"   // <-- keep logo.png in /public
        alt="Logo"
        className={`w-50 h-40 transition-opacity duration-1000 ${fade}`}
      />
    </div>
  );
};

export default Loader;
