import './index.css'

const ImageItem = props => {
  const {imageDetails, onCheckGame} = props
  const {thumbnailUrl, id} = imageDetails
  const onClickItem = () => {
    onCheckGame(id)
  }
  return (
    <li className="image-item" onClick={onClickItem}>
      <button type="button">
        <img src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
