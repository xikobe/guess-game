"use client"
import React, { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { GameLoopProvider } from "./shared/contexts/GameLoopContext"

function Provider({ children }: any) {
    const [client] = useState(new QueryClient())

    return (
        <>
            <QueryClientProvider client={client}>
                <GameLoopProvider>
                    {children}
                </GameLoopProvider>
            </QueryClientProvider>
        </>
    )
}

export { Provider }