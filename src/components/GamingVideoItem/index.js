import {Link} from 'react-router-dom'

const GamingVideoItem = props => {
  const {video, dark} = props

  return (
    <li
      style={{
        width: '270px',
        margin: '10px',
        backgroundColor: dark ? '#171717' : 'white',
        border: 0,
        borderRadius: '8px',
      }}
    >
      <Link
        to={`/videos/${video.id}`}
        style={{
          textDecoration: 'none',
          color: dark ? 'white' : 'black',
        }}
      >
        <img
          style={{width: '100%', height: 'auto'}}
          src={video.thumbnailUrl}
          alt="video thumbnail"
        />
        <div style={{padding: '10px'}}>
          <p style={{fontWeight: 600, fontSize: '15px', margin: 0}}>
            {video.title}
          </p>
          <p
            style={{
              margin: 0,
              marginTop: '10px',
              marginBottom: '8px',
              fontSize: '13px',
              color: 'gray',
            }}
          >
            {video.viewCount} Watching Worldwide
          </p>
        </div>
      </Link>
    </li>
  )
}

export default GamingVideoItem
