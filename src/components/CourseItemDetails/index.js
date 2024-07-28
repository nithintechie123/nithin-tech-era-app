import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  DetailedCourseContainer,
  CourseItemDetailsContainer,
  CourseImageElement,
  NameDescriptionContainer,
  CourseName,
  Description,
  LoaderContainer,
  FailureViewContainer,
  FailureImageElement,
  FailureViewHeading,
  FailureViewDescription,
  RetryBtn,
} from '../../styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetailsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetailsData()
  }

  getCourseDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      console.log(courseDetails)

      const updatedData = {
        id: courseDetails.id,
        description: courseDetails.description,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
      }

      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseDetails = () => {
    const {courseDetailsList} = this.state
    const {name, description, imageUrl} = courseDetailsList

    return (
      <DetailedCourseContainer>
        <CourseImageElement src={imageUrl} alt={name} />
        <NameDescriptionContainer>
          <CourseName>{name}</CourseName>
          <Description>{description}</Description>
        </NameDescriptionContainer>
      </DetailedCourseContainer>
    )
  }

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

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
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
      <CourseItemDetailsContainer>
        {this.renderContent()}
      </CourseItemDetailsContainer>
    )
  }
}

export default CourseItemDetails
