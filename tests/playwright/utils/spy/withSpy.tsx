import React, {
  useCallback,
  useState,
} from 'react';
import type { ComponentType } from 'react';
import { serializeSpyValue } from './_helpers/serializeSpyValue';
import { SpyContext } from './_context/SpyContext';

/**
 * Wrap a story so that it can register spies with `useSpy`.
 *
 * The recorded values of every spy are rendered into a hidden input with `data-testid` equal to the spy name,
 * so that specs can assert them with `toHaveValue()`.
 */
export const withSpy = <Props extends object>(Story: ComponentType<Props>) => {
  const StoryWithSpy = (props: Props) => {
    const [spies, setSpies] = useState<Record<string, unknown[]>>({});
    const registerSpy = useCallback((name: string, calls: unknown[]) => {
      setSpies((previousSpies) => ({
        ...previousSpies,
        [name]: calls,
      }));
    }, []);

    return (
      <SpyContext.Provider value={registerSpy}>
        <Story {...props} />
        <form hidden>
          {Object.entries(spies).map(([name, calls]) => (
            <input
              data-testid={name}
              key={name}
              readOnly
              value={serializeSpyValue(calls)}
            />
          ))}
        </form>
      </SpyContext.Provider>
    );
  };

  StoryWithSpy.displayName = `withSpy(${Story.displayName || Story.name})`;

  return StoryWithSpy;
};
