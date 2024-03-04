import axios from "axios"
const GitHub = axios.create({
    baseURL: 'https://api.github.com'
})
export const searchUsers = async text => {
    const params = new URLSearchParams({
        q: text
    })
    const response = await GitHub.get(`/search/users?${params}`)
    return response.data.items
}
export const getUserAndRepos = async login => {
    const [user, repos] = await Promise.all([
        GitHub.get(`/users/${login}`),
        GitHub.get(`/users/${login}/repos`)
    ])
    return {
        user: user.data,
        repos: repos.data
    }
}