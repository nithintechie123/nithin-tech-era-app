import {withRouter, Link} from 'react-router-dom'

import {HeaderContainer, WebsiteLogo} from '../../styledComponents'

const Header = () => (
  <HeaderContainer>
    <Link to="/">
      <WebsiteLogo
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </HeaderContainer>
)

export default withRouter(Header)
