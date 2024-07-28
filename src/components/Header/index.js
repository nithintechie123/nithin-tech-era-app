import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <Link to="/">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </nav>
)

export default withRouter(Header)
