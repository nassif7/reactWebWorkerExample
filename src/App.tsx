import React from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = React.useState(0);
  const [lazyCount, setLazyCount] = React.useState(0);
  const worker: Worker = React.useMemo(() => new Worker("worker.js"), []);

  React.useEffect(() => {
    worker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data) {
        setLazyCount($event.data);
      }
    };
  }, [worker]);

  function increase() {
    worker.postMessage({ msg: "increase", count: lazyCount });
  }

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>count {count}</button>
      <br />
      <button onClick={() => increase()}>lazy count {lazyCount}</button>
    </div>
  );
}
