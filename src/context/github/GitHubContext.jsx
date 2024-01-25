import { createContext, useReducer } from "react"
import GitHubReducer from "./GitHubReducer"
const GitHubContext = createContext()
export const GitHubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
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
    // get a single user
    const getUser = async login => {
        setLoading()
        const response = await fetch(`https://api.github.com/users/${login}`, headers => {
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
        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }
    // get user's repositories
    const getUserRepos = async login => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, headers => {
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
        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }
    // clear users from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})
    // set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    return <GitHubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GitHubContext.Provider>
}
export default GitHubContext