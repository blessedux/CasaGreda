"use client"

export default function HomePage() {
  const whatsappMessage = encodeURIComponent("¡Quiero más información sobre los platos de greda porfavor!")
  const whatsappUrl = `https://wa.me/+56965519504?text=${whatsappMessage}`

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
            marginBottom: '40px'
          }}
        />
        
        <h1 style={{
          fontSize: '36px',
          fontWeight: 600,
          color: '#c0a38b',
          letterSpacing: '1px',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Tradición en tu mesa
        </h1>
        
        {/* Deployment test - visible change */}
        <div style={{
          backgroundColor: '#25D366',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '20px',
          display: 'inline-block'
        }}>
          ✅ Sitio actualizado - {new Date().toLocaleString('es-CL')}
        </div>
        
        <h2 style={{
          fontSize: '20px',
          fontWeight: 300,
          color: '#b8b2ab',
          letterSpacing: '0.5px',
          marginBottom: '40px'
        }}>
          Sitio en mantención, vuelva pronto
        </h2>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#25D366',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#20BA5A'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(37, 211, 102, 0.4)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#25D366'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 211, 102, 0.3)'
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          ¡Contáctame ahora!
        </a>
      </div>
    </div>
  )
}
