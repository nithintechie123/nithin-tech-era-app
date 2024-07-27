import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  HomeContainer,
  CoursesHeading,
  TechItemsContainer,
  LoaderContainer,
} from '../../styledComponents'

import TechItem from '../TechItem'

class Home extends Component {
  state = {coursesList: [], isLoading: false}

  componentDidMount = () => {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({coursesList: formattedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderTechItem = () => {
    const {coursesList} = this.state
    return (
      <TechItemsContainer>
        {coursesList.map(eachItem => (
          <TechItem key={eachItem.id} eachTechItemDetails={eachItem} />
        ))}
      </TechItemsContainer>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <HomeContainer>
        <CoursesHeading>Courses</CoursesHeading>
        {isLoading ? this.renderLoader() : this.renderTechItem()}
      </HomeContainer>
    )
  }
}

export default Home
