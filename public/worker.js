function increase(count) {
  const start = Date.now();
  while (Date.now() < start + 2000) {}
  return count + 1;
}

onmessage = async ($event) => {
  if ($event && $event.data && $event.data.msg === "increase") {
    const newCounter = increase($event.data.count);
    postMessage(newCounter);
  }
};
