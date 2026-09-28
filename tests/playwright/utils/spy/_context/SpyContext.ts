import React from 'react';

export type RegisterSpy = (name: string, calls: unknown[]) => void;

// Provides the `registerSpy(name, calls)` function of the enclosing `withSpy` story
export const SpyContext = React.createContext<RegisterSpy | null>(null);
