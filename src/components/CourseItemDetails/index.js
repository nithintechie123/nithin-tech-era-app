import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

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

  onClickRetryBtn = () => {
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
      <div className="detailed-course-container">
        <img className="course-image-element" src={imageUrl} alt={name} />
        <div className="name-desc-container">
          <h1 className="course-name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-image-element"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for .
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
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
      <div className="course-item-details-container">
        {this.renderContent()}
      </div>
    )
  }
}

export default CourseItemDetails
