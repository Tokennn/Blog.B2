'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Briefcase, User, Building, FileText, Lightbulb } from 'lucide-react'
import { gsap } from 'gsap'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.timeline()
        .fromTo('.hero-title', 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.8 }
        )
        .fromTo('.hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo('.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        )

      // Cards animation
      gsap.fromTo('.feature-card',
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.cards-container',
            start: 'top 80%',
            end: 'bottom 20%'
          }
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">V1</span>
            <Lightbulb className="text-yellow-400" size={48} />
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez parcours, expériences et  vision professionnelle
          </p>
          <div className="hero-cta">
            <Link 
              href="/about" 
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/25"
            >
              Découvrir mon profil
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={cardsRef} className="cards-container py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Explorez les sections
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: User,
                title: 'À Propos',
                description: 'Mon parcours, mes compétences et mon CV interactif',
                href: '/about',
                color: 'from-gray-600 to-gray-700'
              },
              {
                icon: Building,
                title: 'Entreprise',
                description: 'Présentation de mon environnement professionnel',
                href: '/company',
                color: 'from-gray-700 to-gray-800'
              },
              {
                icon: FileText,
                title: 'Posts',
                description: 'Mes analyses et réflexions professionnelles',
                href: '/posts',
                color: 'from-gray-800 to-gray-900'
              },
              {
                icon: Briefcase,
                title: 'Contact',
                description: 'Prenons contact pour échanger',
                href: '/contact',
                color: 'from-white to-gray-200'
              }
            ].map((feature, index) => (
              <Link key={index} href={feature.href}>
                <div className="feature-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer group">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={feature.title === 'Contact' ? 'text-black' : 'text-white'} size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}