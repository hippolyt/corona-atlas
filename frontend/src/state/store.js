import { makeStore } from './provider'

// taken from
// https://tannerlinsley.com/blog/react-hooks-the-rebirth-of-state-management

const [StoreProvider, useStore] = makeStore();

export { StoreProvider, useStore }
