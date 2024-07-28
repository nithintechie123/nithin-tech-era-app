import {Link} from 'react-router-dom'

import './index.css'

import {
  CourseItemContainer,
  ImageElement,
  CourseName,
} from '../../styledComponents'

const TechItem = props => {
  const {eachTechItemDetails} = props
  const {id, name, logoUrl} = eachTechItemDetails

  return (
    <Link to={`courses/${id}`} className="link-item">
      <CourseItemContainer>
        <ImageElement src={logoUrl} alt={name} />
        <CourseName>{name}</CourseName>
      </CourseItemContainer>
    </Link>
  )
}

export default TechItem
