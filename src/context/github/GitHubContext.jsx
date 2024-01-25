import { createContext, useReducer } from "react";
import GitHubReducer from "./GitHubReducer";
const GitHubContext = createContext()
export const GitHubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GitHubReducer, initialState)
    // get search results
    const searchUsers = async text => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`, headers => {
            if(process.env.GitHubAPItoken && process.env.GitHubAPItoken !== '') {
                headers = {
                    headers: {
                        Authorization: `token ${process.env.GitHubAPItoken}`
                    }
                }
            } else {
                headers = ''
            }
        })
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }
    // clear users from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    // set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GitHubContext.Provider>
}
export default GitHubContext