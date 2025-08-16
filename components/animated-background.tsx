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

      {/* Premium floating elements */}
      <div className="absolute inset-0">
        {/* Large professional shapes */}
        <div
          className="absolute w-[32rem] h-[32rem] opacity-[0.03] animate-float"
          style={{
            top: '5%',
            left: '10%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 65%)',
            borderRadius: '60% 40% 70% 30%',
            animationDuration: '12s',
            animationDelay: '0s'
          }}
        />

        <div
          className="absolute w-[28rem] h-[28rem] opacity-[0.025] animate-float"
          style={{
            top: '55%',
            right: '15%',
            background: 'radial-gradient(circle, #ff6600 0%, transparent 65%)',
            borderRadius: '40% 60% 30% 70%',
            animationDuration: '15s',
            animationDelay: '3s'
          }}
        />

        <div
          className="absolute w-[24rem] h-[24rem] opacity-[0.02] animate-float"
          style={{
            bottom: '15%',
            left: '20%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 60%)',
            borderRadius: '70% 30% 40% 60%',
            animationDuration: '18s',
            animationDelay: '6s'
          }}
        />
      </div>

      {/* Premium micro particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-10 animate-float"
            style={{
              background: i % 2 === 0 ? '#0099cc' : '#ff6600',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
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

      {/* Subtle premium lines */}
      <div className="absolute inset-0">
        <div
          className="absolute h-px opacity-5 animate-pulse"
          style={{
            top: '30%',
            left: '0%',
            right: '0%',
            background: 'linear-gradient(90deg, transparent 0%, #0099cc 30%, #ff6600 70%, transparent 100%)',
            animationDuration: '8s'
          }}
        />

        <div
          className="absolute h-px opacity-5 animate-pulse"
          style={{
            top: '70%',
            left: '0%',
            right: '0%',
            background: 'linear-gradient(90deg, transparent 0%, #ff6600 30%, #0099cc 70%, transparent 100%)',
            animationDuration: '12s',
            animationDelay: '4s'
          }}
        />
      </div>
    </div>
  )
})
