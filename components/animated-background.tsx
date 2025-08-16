"use client"

import { memo } from "react"

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Professional gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(0, 153, 204, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(255, 102, 0, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 45% 85%, rgba(0, 153, 204, 0.04) 0%, transparent 35%),
            radial-gradient(circle at 75% 15%, rgba(255, 102, 0, 0.04) 0%, transparent 35%),
            linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(248, 250, 252, 1) 100%)
          `
        }}
      />

      {/* Static premium elements */}
      <div className="absolute inset-0">
        {/* Large static shapes */}
        <div
          className="absolute w-[32rem] h-[32rem] opacity-[0.015]"
          style={{
            top: '5%',
            left: '10%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 70%)',
            borderRadius: '60% 40% 70% 30%'
          }}
        />

        <div
          className="absolute w-[28rem] h-[28rem] opacity-[0.012]"
          style={{
            top: '55%',
            right: '15%',
            background: 'radial-gradient(circle, #ff6600 0%, transparent 70%)',
            borderRadius: '40% 60% 30% 70%'
          }}
        />

        <div
          className="absolute w-[24rem] h-[24rem] opacity-[0.01]"
          style={{
            bottom: '15%',
            left: '20%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 65%)',
            borderRadius: '70% 30% 40% 60%'
          }}
        />
      </div>

      {/* Professional grid overlay */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 153, 204, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 153, 204, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Subtle static accent lines */}
      <div className="absolute inset-0">
        <div
          className="absolute h-px opacity-3"
          style={{
            top: '30%',
            left: '10%',
            right: '10%',
            background: 'linear-gradient(90deg, transparent 0%, #0099cc 50%, transparent 100%)'
          }}
        />

        <div
          className="absolute h-px opacity-3"
          style={{
            top: '70%',
            left: '10%',
            right: '10%',
            background: 'linear-gradient(90deg, transparent 0%, #ff6600 50%, transparent 100%)'
          }}
        />
      </div>
    </div>
  )
})
