import {useState, useContext} from "react"
import GitHubContext from '../../context/github/GitHubContext'
import AlertContext from '../../context/alert/AlertContext'
import {searchUsers} from '../../context/github/GitHubActions'
const UserSearch = () => {
  const [text, setText] = useState('')
  const {users, dispatch} = useContext(GitHubContext)
  const {setAlert} = useContext(AlertContext)
  const handleChange = event => setText(event.target.value)
  const handleSubmit = async event => {
    event.preventDefault()
    if(text === '') {
      setAlert('No search query entered.', 'error')
    } else {
      dispatch({
        type: 'SET_LOADING'
      })
      const users = await searchUsers(text)
      dispatch({
        type: 'GET_USERS',
        payload: users
      })
      setText('')
    }
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 outline input input-lg"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users && users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
export default UserSearch