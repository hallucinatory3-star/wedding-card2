import { ImageResponse } from 'next/og'
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from './constants/wedding-data'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          background: 'linear-gradient(135deg, #0B3D2E 0%, #1a5c4a 50%, #0B3D2E 100%)',
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
            background: 'radial-gradient(circle, rgba(237,211,164,0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(237,211,164,0.15) 0%, transparent 70%)',
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
            border: '2px solid rgba(237,211,164,0.4)',
            borderRadius: '20px',
            display: 'flex',
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #eed3a4',
            borderLeft: '2px solid #eed3a4',
            borderTopLeftRadius: '10px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #eed3a4',
            borderRight: '2px solid #eed3a4',
            borderTopRightRadius: '10px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #eed3a4',
            borderLeft: '2px solid #eed3a4',
            borderBottomLeftRadius: '10px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #eed3a4',
            borderRight: '2px solid #eed3a4',
            borderBottomRightRadius: '10px',
          }}
        />

        {/* Ring icon */}
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
              background: 'linear-gradient(90deg, transparent, #eed3a4)',
            }}
          />
          <span style={{ fontSize: '50px' }}>💍</span>
          <div
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(90deg, #eed3a4, transparent)',
            }}
          />
        </div>

        {/* You're Invited text */}
        <div
          style={{
            color: '#eed3a4',
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
              color: '#eed3a4',
              fontWeight: '600',
              lineHeight: '1.1',
            }}
          >
            {groomName}
          </div>
          <div
            style={{
              fontSize: '50px',
              color: '#eed3a4',
              fontStyle: 'italic',
              margin: '5px 0',
            }}
          >
            &
          </div>
          <div
            style={{
              fontSize: '68px',
              color: '#eed3a4',
              fontWeight: '600',
              lineHeight: '1.1',
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
              background: 'linear-gradient(90deg, transparent, #eed3a4)',
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              border: '2px solid #eed3a4',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, #eed3a4, transparent)',
            }}
          />
        </div>

        {/* Date */}
        <div
          style={{
            color: '#eed3a4',
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
          <span style={{ color: 'rgba(237,211,164,0.7)', fontSize: '20px' }}>💚</span>
          <span
            style={{
              color: '#eed3a4',
              fontSize: '16px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Tap to Open Your Invitation
          </span>
          <span style={{ color: 'rgba(237,211,164,0.7)', fontSize: '20px' }}>💚</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
