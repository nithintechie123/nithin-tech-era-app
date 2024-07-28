import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  HomeContainer,
  CoursesHeading,
  HomeTechContainer,
  TechItemsContainer,
  LoaderContainer,
  FailureViewContainer,
  FailureImageElement,
  FailureViewHeading,
  FailureViewDescription,
  RetryBtn,
} from '../../styledComponents'

import TechItem from '../TechItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
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
      this.setState({
        coursesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderFailureView = () => (
    <FailureViewContainer>
      <FailureImageElement
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureViewHeading>Oops! Something Went Wrong</FailureViewHeading>
      <FailureViewDescription>
        We cannot seem to find the page you are looking for .
      </FailureViewDescription>
      <RetryBtn>Retry</RetryBtn>
    </FailureViewContainer>
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

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeContainer>
        <CoursesHeading>Courses</CoursesHeading>
        <HomeTechContainer>{this.renderContent()}</HomeTechContainer>
      </HomeContainer>
    )
  }
}

export default Home
