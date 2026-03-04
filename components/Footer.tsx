'use client'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="max-container container-px"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Left */}
        <span
          style={{
            fontSize: '12px',
            color: '#555',
            fontFamily: 'var(--font-jetbrains)',
          }}
        >
          © {year} Edge Alpha
        </span>

        {/* Center */}
        <span
          className="hidden sm:block"
          style={{
            fontSize: '12px',
            color: '#555',
          }}
        >
          Built for founders who want to know.
        </span>

        {/* Right */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {[
            { label: 'Twitter', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Contact', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="interactive"
              style={{
                fontSize: '12px',
                color: '#555',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ededed')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
