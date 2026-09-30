import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SpyContext } from './_context/SpyContext';

const firstArgument = (...args: unknown[]) => args[0];

/**
 * Register a spy named `name` in the enclosing `withSpy` story and return the spy function.
 *
 * Every call of the spy appends one value to the hidden input with `data-testid` equal to `name`, stored as a JSON
 * array. The value is `select(...args)`, which returns the first argument of the call by default, e.g. the input holds
 * `[true,false]` after `spy(true, 'Label')` and `spy(false, 'Label')`. Pass a custom `select` to record other
 * arguments, as the recorded values must be serializable to JSON.
 */
export const useSpy = <Args extends unknown[]>(
  name: string,
  select: (...args: Args) => unknown = firstArgument,
) => {
  const registerSpy = useContext(SpyContext);
  const [calls, setCalls] = useState<unknown[]>([]);

  if (!registerSpy) {
    throw new Error(`Spy "${name}" must be used in a story wrapped with \`withSpy\`.`);
  }

  useEffect(() => {
    registerSpy(name, calls);
  }, [calls, name, registerSpy]);

  return useCallback((...args: Args) => {
    setCalls((previousCalls) => [...previousCalls, select(...args)]);
  }, [select]);
};
