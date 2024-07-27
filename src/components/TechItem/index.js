import {
  CourseItemContainer,
  ImageElement,
  CourseName,
} from '../../styledComponents'

const TechItem = props => {
  const {eachTechItemDetails} = props
  const {name, logoUrl} = eachTechItemDetails

  return (
    <CourseItemContainer>
      <ImageElement src={logoUrl} alt={name} />
      <CourseName>{name}</CourseName>
    </CourseItemContainer>
  )
}

export default TechItem
