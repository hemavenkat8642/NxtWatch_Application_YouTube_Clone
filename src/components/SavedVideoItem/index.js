import {Link} from 'react-router-dom'

const SavedVideoItem = props => {
  const {video, dark} = props

  return (
    <li
      style={{
        width: '100%',
        margin: '30px',
        marginBottom: '8px',
        backgroundColor: dark ? '#171717' : 'white',
        border: 0,
        borderRadius: '8px',
      }}
    >
      <Link
        to={`/videos/${video.id}`}
        style={{
          display: 'flex',
          textDecoration: 'none',
          color: dark ? 'white' : 'black',
        }}
      >
        <img
          style={{
            width: '406px',
            height: '225px',
            border: 0,
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
          src={video.thumbnailUrl}
          alt="video thumbnail"
        />
        <div
          style={{marginLeft: '20px', marginRight: '20px', marginTop: '5px'}}
        >
          <p style={{fontSize: '18px', margin: 0, fontWeight: 600}}>
            {video.title}
          </p>
          {video.channel ? (
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
          ) : null}
          <div
            style={{
              margin: 0,
              marginTop: '15px',
              marginBottom: '8px',
              fontSize: '13px',
              color: 'gray',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {video.publishedAt ? (
              <>
                <p>{video.viewCount}</p>{' '}
                <p style={{marginLeft: '4px', marginRight: '4px'}}>•</p>{' '}
                <p>{video.publishedAt}</p>
              </>
            ) : (
              <p>{video.viewCount}</p>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SavedVideoItem
