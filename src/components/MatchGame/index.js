import {Component} from 'react'
import Header from '../Header'
import ImageItem from '../ImageItem'
import './index.css'

const initialValues = {
  timer: 60,
  initialActiveTab: 'FRUIT',
  showResult: false,
  score: 0,
}

class MatchGame extends Component {
  state = {
    score: initialValues.score,
    timer: initialValues.timer,
    activeTab: initialValues.initialActiveTab,
    activeThumbnail: {},
    showResult: initialValues.showResult,
  }

  componentDidMount() {
    const {imagesList} = this.props
    // const index = Math.floor(Math.random() * imagesList.length)
    // const image = imagesList[index]
    this.timerId = setInterval(this.updateTimer, 1000)

    this.setState({activeThumbnail: imagesList[0]})
  }

  updateTimer = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({showResult: true})
    }
  }

  renderRandomImage = () => {
    const {imagesList} = this.props
    const index = Math.floor(Math.random() * imagesList.length)
    const image = imagesList[index]
    return image
  }

  onChangeTab = tabId => {
    this.setState({activeTab: tabId})
  }

  onCheckGame = id => {
    console.log(id)
    const {activeThumbnail} = this.state
    if (activeThumbnail.id === id) {
      const image = this.renderRandomImage()
      this.setState(prevState => ({
        score: prevState.score + 1,
        activeThumbnail: image,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({showResult: true})
    }
  }

  restartGame = () => {
    this.setState({
      score: initialValues.score,
      timer: initialValues.timer,
      showResult: initialValues.showResult,
    })
    this.timerId = setInterval(this.updateTimer, 1000)
  }

  renderGameOverCard = () => {
    const {score} = this.state
    return (
      <div className="game-over-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
        />
        <p>YOUR SCORE</p>
        <p>{score}</p>
        <div className="restart-button-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          <button type="button" onClick={this.restartGame}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {timer, score, activeTab, activeThumbnail, showResult} = this.state
    const {imagesList, tabsList} = this.props
    const filterImageList = imagesList.filter(
      eachImage => eachImage.category === activeTab,
    )

    return (
      <div className="match-game-container">
        <Header score={score} timer={timer} />
        {showResult ? (
          this.renderGameOverCard()
        ) : (
          <>
            <img src={activeThumbnail.imageUrl} alt="match" className="match" />

            <ul className="tabs-container">
              {tabsList.map(eachTab => {
                const {tabId, displayText} = eachTab
                const className = tabId === activeTab ? 'active' : null
                const onClickTab = () => {
                  this.onChangeTab(tabId)
                }

                return (
                  <li key={tabId} onClick={onClickTab}>
                    <button type="button" className={className}>
                      {displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
            <ul className="images-container">
              {filterImageList.map(eachImage => {
                const {id} = eachImage
                return (
                  <ImageItem
                    key={id}
                    imageDetails={eachImage}
                    onCheckGame={this.onCheckGame}
                  />
                )
              })}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default MatchGame
