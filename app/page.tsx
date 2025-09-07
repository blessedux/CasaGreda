export default function HomePage() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#0f0e0d',
      color: '#eae7e3',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: 0
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%'
      }}>
        <img 
          src="/site_under_construction.webp" 
          alt="Casa Greda - Cerámica Ancestral Chilena" 
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            marginBottom: '30px'
          }}
        />
        <h1 style={{
          fontSize: '24px',
          fontWeight: 300,
          color: '#b8b2ab',
          letterSpacing: '0.5px'
        }}>
          Site Under Construction
        </h1>
      </div>
    </div>
  )
}
