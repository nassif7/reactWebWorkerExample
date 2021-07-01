import React from "react";
import "./styles.css";

const WithWorker = () => {
  const [count, setCount] = React.useState(0);
  const [lazyCount, setLazyCount] = React.useState(0);
  const worker: Worker = React.useMemo(() => new Worker("worker.js"), []);

  React.useEffect(() => {
    worker.onmessage = (event: MessageEvent) => {
      if (event && event.data) {
        setLazyCount(event.data);
      }
    };
  }, [worker]);

  const increase = () => {
    worker.postMessage({ msg: "increase", count: lazyCount });
  };

  return (
    <div className="App">
      <h2>With Worker</h2>
      <p>
        The UI will still be responding as expedcted since we moved the running
        process from the main app to the worker
      </p>
      <button onClick={() => setCount(count + 1)}>count {count}</button>
      <br />
      <button onClick={() => increase()}>lazy count {lazyCount}</button>
    </div>
  );
};

const WithOutWorker = () => {
  const [count, setCount] = React.useState(0);
  const [lazyCount, setLazyCount] = React.useState(0);

  const increase = () => {
    const start = Date.now();
    while (Date.now() < start + 3000) {}
    setLazyCount(lazyCount + 1);
  };

  return (
    <div className="App">
      <h2>With out Worker</h2>
      <p>
        The whole UI will be blocked without the worker the app will not
        responed unless the running operation is finished
      </p>
      <button onClick={() => setCount(count + 1)}>count {count}</button>
      <br />
      <button onClick={() => increase()}>lazy count {lazyCount}</button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <WithWorker />
      <hr />
      <WithOutWorker />
    </div>
  );
}
