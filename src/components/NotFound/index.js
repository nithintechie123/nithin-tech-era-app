import {
  FailureViewContainer,
  NotFoundImageElement,
  FailureViewHeading,
  FailureViewDescription,
} from '../../styledComponents'

const NotFound = () => (
  <FailureViewContainer>
    <NotFoundImageElement
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <FailureViewHeading>Page Not Found</FailureViewHeading>
    <FailureViewDescription>
      We are sorry,the page you requested could not be found
    </FailureViewDescription>
  </FailureViewContainer>
)

export default NotFound
