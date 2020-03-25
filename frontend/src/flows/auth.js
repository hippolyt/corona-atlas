import { useState } from 'react'

export function useLogin() {
    const [state, setState] = useState({
        isLoading: false,
        isDone: false,
        error: null
    })

    const initiateLogin = (email) => {
        setState({
            isDone: false,
            isLoading: true,
            error: null
        })
        fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status != 200) {
                res.json().then(e => {
                    setState({
                        isLoading: false,
                        isDone: false,
                        error: e.message
                    })
                }).catch((e) => {
                    setState({
                        isLoading: false,
                        isDone: false,
                        error: e.message
                    })
                })
            }

            setState({
                isLoading: false,
                isDone: true,
                error: null
            })
        }).catch((e) => {
            setState({
                isLoading: false,
                isDone: false,
                error: e.message
            })
        })
    }

    return { ...state, initiateLogin }
}
