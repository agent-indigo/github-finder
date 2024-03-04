import {Helmet} from "react-helmet"
import {FaHome} from "react-icons/fa"
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found | GitHub Finder</title>
      </Helmet>
      <div className="hero">
        <div className="text-center hero-content">
          <div className="max-w-lg">
            <div className="text-8xl font-bold mb-8">Error 404</div>
            <p className="text-5xl mb-8">Page not found</p>
            <Link to='/' className="btn btn-primary btn-lg">
              <FaHome className="mr-2"/>
              <p>Back to Home</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default NotFound