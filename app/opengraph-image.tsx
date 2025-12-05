import { ImageResponse } from 'next/og'
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from './constants/wedding-data'

export const runtime = 'edge'

export const alt = "You're Invited to Our Wedding"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Wedding details - UPDATE THESE to match your page.tsx
  const groomName = GROOM_NAME
  const brideName = BRIDE_NAME
  const weddingDate = WEDDING_DATE.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative glows */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(74,144,217,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(74,144,217,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 60%)',
            borderRadius: '50%',
          }}
        />

        {/* Outer border frame */}
        <div
          style={{
            position: 'absolute',
            top: '25px',
            left: '25px',
            right: '25px',
            bottom: '25px',
            border: '2px solid rgba(74,144,217,0.4)',
            borderRadius: '20px',
            display: 'flex',
          }}
        />

        {/* Inner decorative border */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid rgba(74,144,217,0.2)',
            borderRadius: '15px',
            display: 'flex',
          }}
        />

        {/* Corner decorations - top left */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #4a90d9',
            borderLeft: '2px solid #4a90d9',
            borderTopLeftRadius: '10px',
          }}
        />
        {/* Corner decorations - top right */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #4a90d9',
            borderRight: '2px solid #4a90d9',
            borderTopRightRadius: '10px',
          }}
        />
        {/* Corner decorations - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #4a90d9',
            borderLeft: '2px solid #4a90d9',
            borderBottomLeftRadius: '10px',
          }}
        />
        {/* Corner decorations - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #4a90d9',
            borderRight: '2px solid #4a90d9',
            borderBottomRightRadius: '10px',
          }}
        />

        {/* Top decorative element with ring */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '15px',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #4a90d9)',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid rgba(74,144,217,0.5)',
            }}
          >
            <span style={{ fontSize: '40px' }}>💍</span>
          </div>
          <div
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(90deg, #4a90d9, transparent)',
            }}
          />
        </div>

        {/* You're Invited text */}
        <div
          style={{
            color: 'rgba(74,144,217,0.9)',
            fontSize: '22px',
            letterSpacing: '10px',
            textTransform: 'uppercase',
            marginBottom: '25px',
          }}
        >
          You&apos;re Invited To
        </div>

        {/* Names */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              background: 'linear-gradient(135deg, #4a90d9 0%, #7fb3d5 50%, #4a90d9 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: '600',
              lineHeight: '1.1',
              textShadow: '0 0 40px rgba(74,144,217,0.3)',
            }}
          >
            {groomName}
          </div>
          <div
            style={{
              fontSize: '50px',
              color: '#4a90d9',
              fontStyle: 'italic',
              margin: '5px 0',
            }}
          >
            &
          </div>
          <div
            style={{
              fontSize: '68px',
              background: 'linear-gradient(135deg, #4a90d9 0%, #7fb3d5 50%, #4a90d9 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: '600',
              lineHeight: '1.1',
              textShadow: '0 0 40px rgba(74,144,217,0.3)',
            }}
          >
            {brideName}
          </div>
        </div>

        {/* Decorative divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            margin: '25px 0',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #4a90d9)',
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              border: '2px solid #4a90d9',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, #4a90d9, transparent)',
            }}
          />
        </div>

        {/* Date */}
        <div
          style={{
            color: '#7fb3d5',
            fontSize: '28px',
            fontStyle: 'italic',
          }}
        >
          {weddingDate}
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: '55px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ color: 'rgba(74,144,217,0.5)', fontSize: '20px' }}>✨</span>
          <span
            style={{
              color: 'rgba(74,144,217,0.7)',
              fontSize: '16px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Tap to Open Your Invitation
          </span>
          <span style={{ color: 'rgba(74,144,217,0.5)', fontSize: '20px' }}>✨</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
