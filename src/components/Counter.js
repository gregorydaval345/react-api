import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      Count: {count}
      <div>
        <button onClick={() => setCount(count + 1)}>Smash Counter</button>
      </div>
    </div>
  );
}
