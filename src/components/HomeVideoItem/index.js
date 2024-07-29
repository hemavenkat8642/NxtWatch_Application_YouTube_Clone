import {Link} from 'react-router-dom'

const HomeVideoItem = props => {
  const {video, dark} = props

  return (
    <li
      style={{
        width: '270px',
        margin: '10px',
        backgroundColor: dark ? '#00000030' : 'white',
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
          style={{
            width: '100%',
            height: 'auto',
            border: 0,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
          src={video.thumbnailUrl}
          alt="video thumbnail"
        />
        <div
          style={{display: 'flex', alignItems: 'flex-start', padding: '5px'}}
        >
          <img
            src={video.channel.profileImageUrl}
            alt="channel logo"
            style={{width: '30px', height: 'auto', marginRight: '10px'}}
          />
          <div>
            <p style={{fontWeight: 500, fontSize: '13px', margin: 0}}>
              {video.title}
            </p>
            <p
              style={{
                margin: 0,
                marginTop: '8px',
                marginBottom: '8px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'gray',
              }}
            >
              {video.channel.name}
            </p>
            <div
              style={{
                margin: 0,
                marginTop: '8px',
                marginBottom: '8px',
                fontSize: '13px',
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p>{video.viewCount}</p>{' '}
              <p style={{marginLeft: '4px', marginRight: '4px'}}>•</p>{' '}
              <p>{video.publishedAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default HomeVideoItem
