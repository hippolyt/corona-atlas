import React, { createContext, useMemo, useState, useContext } from 'react'

// taken from
// https://tannerlinsley.com/blog/react-hooks-the-rebirth-of-state-management

export function makeStore() {
    const context = createContext()

    const Provider = ({ initialValue = {}, children }) => {
        const [state, setState] = useState(initialValue)
        const contextValue = useMemo(() => [state, setState], [state])
        return <context.Provider value={contextValue}>{children}</context.Provider>
    }

    const useStore = () => useContext(context)

    return [Provider, useStore]
}
