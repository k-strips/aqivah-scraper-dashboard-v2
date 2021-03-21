// import loading from 'assets/loading.svg';

export default function Loading({ show }) {

  if (!show) return null;

  return <div style={{
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.7)',
    zIndex: '5',
  }}>
    <img src={'/loading.svg'} alt='Loading..' width='70px' height='70px' />
    <br />
    <h4 style={{
      textAlign: 'center',
      color: 'white',
    }}>Just a moment..</h4>
  </div>;
}