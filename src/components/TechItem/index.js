import {Link} from 'react-router-dom'

import './index.css'

const TechItem = props => {
  const {eachTechItemDetails} = props
  const {id, name, logoUrl} = eachTechItemDetails

  return (
    <Link to={`courses/${id}`} className="link-item">
      <li className="course-item-container">
        <img className="image-element" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default TechItem
