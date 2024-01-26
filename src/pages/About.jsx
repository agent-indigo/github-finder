import { Helmet } from "react-helmet"
const About = () => {
  return (
    <>
      <Helmet>
        <title>About | GitHub Finder</title>
      </Helmet>
      <h1 className="text-6xl mb-4">GitHub Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href='https://www.udemy.com/course/modern-react-front-to-back/'>
          {' '}
          React Front To Back
        </a>{' '}
        course on O'Reilly by
        <strong>
          <a href='https://traversymedia.com'> Brad Traversy</a>
        </strong>
        .
      </p>
      <p className='text-lg'>
        Version <span>1.0.0</span>
      </p>
      <p className='text-lg'>Layout By: <a className="text-blue-800" href='https://twitter.com/hassibmoddasser'>Hassib Moddasser</a></p>
      <p className="text-lg">Modified by: <a className="text-blue-800" href="https://github.com/agent-indigo">Braden Hynes (agent-indigo)</a></p>
    </>
  )
}
export default About