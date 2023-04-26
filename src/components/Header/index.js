import './index.css'

const Header = props => {
  const {score, timer} = props

  return (
    <nav>
      <div className="nav-icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
        />
      </div>

      <ul className="nav-content-container">
        <li>
          <p>Score:</p>
          <p> {score}</p>
        </li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
            alt="timer"
          />
          <p className="timer">{timer} sec</p>
        </li>
      </ul>
    </nav>
  )
}

export default Header
