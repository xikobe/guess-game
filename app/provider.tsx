'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GameLoopProvider } from './shared/contexts/GameLoopContext';

type ProviderProps = {
    children?: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
    const [client] = useState(new QueryClient());

    return (
        <>
            <QueryClientProvider client={client}>
                <GameLoopProvider>{children}</GameLoopProvider>
            </QueryClientProvider>
        </>
    );
}

export { Provider };
