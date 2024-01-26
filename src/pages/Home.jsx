import { Helmet } from "react-helmet"
import UserResults from "../components/users/UserResults"
import UserSearch from "../components/users/UserSearch"
const Home = () => {
  return (
    <>
      <Helmet>
        <title>GitHub Finder</title>
      </Helmet>
      <UserSearch/>
      <UserResults/>
    </>
  )
}
export default Home