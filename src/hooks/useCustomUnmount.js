import { useState } from "react";

const useCustomUnmount = () => {
  const [mount, setMount] = useState(true);

  const unmountHandler = (callback, timeToUnmount) => {
    setMount(false);
    const timeout = setTimeout(() => {
      callback();
      return clearTimeout(timeout);
    }, timeToUnmount);
  };

  return [mount, unmountHandler];
};

export default useCustomUnmount;
