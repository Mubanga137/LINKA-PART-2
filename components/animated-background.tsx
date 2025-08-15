"use client"

import { memo } from "react"

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 153, 204, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 102, 0, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0, 153, 204, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 20%, rgba(255, 102, 0, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 153, 204, 0.05) 0%, rgba(255, 102, 0, 0.05) 100%)
          `
        }}
      />
      
      {/* Flowing abstract patterns */}
      <div className="absolute inset-0">
        {/* Large flowing shapes */}
        <div 
          className="absolute w-96 h-96 opacity-10 animate-float"
          style={{
            top: '10%',
            left: '15%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 70%)',
            borderRadius: '60% 40% 70% 30%',
            animationDuration: '8s',
            animationDelay: '0s'
          }}
        />
        
        <div 
          className="absolute w-80 h-80 opacity-8 animate-float"
          style={{
            top: '60%',
            right: '20%',
            background: 'radial-gradient(circle, #ff6600 0%, transparent 70%)',
            borderRadius: '40% 60% 30% 70%',
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
        
        <div 
          className="absolute w-64 h-64 opacity-6 animate-float"
          style={{
            bottom: '20%',
            left: '25%',
            background: 'radial-gradient(circle, #0099cc 0%, transparent 60%)',
            borderRadius: '70% 30% 40% 60%',
            animationDuration: '12s',
            animationDelay: '4s'
          }}
        />
      </div>
      
      {/* Particle animations */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-float"
            style={{
              background: i % 2 === 0 ? '#0099cc' : '#ff6600',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Subtle moving lines */}
      <div className="absolute inset-0">
        <div 
          className="absolute h-px opacity-10 animate-pulse"
          style={{
            top: '25%',
            left: '0%',
            right: '0%',
            background: 'linear-gradient(90deg, transparent 0%, #0099cc 50%, transparent 100%)',
            animationDuration: '4s'
          }}
        />
        
        <div 
          className="absolute h-px opacity-10 animate-pulse"
          style={{
            top: '75%',
            left: '0%',
            right: '0%',
            background: 'linear-gradient(90deg, transparent 0%, #ff6600 50%, transparent 100%)',
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
      </div>
    </div>
  )
})
