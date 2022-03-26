import { useRef } from 'react';

const useWillMount = (fn: () => void) => {
  const willMount = useRef(true)

  if (willMount.current && fn && typeof fn === 'function') {
    fn()
  }

  willMount.current = false
}

export default useWillMount;
