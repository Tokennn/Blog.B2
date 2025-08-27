'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, MapPin, Calendar, Award, Eye, EyeOff } from 'lucide-react'
import { gsap } from 'gsap'

// Composant CV Preview interactif
function CVPreview() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    // L'effet de flou est maintenant géré directement dans le style de l'iframe
    gsap.to(cvRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsHovered(false)
      // L'effet de flou est maintenant géré directement dans le style de l'iframe
      gsap.to(cvRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleClick = () => {
    setIsClicked(!isClicked)
    if (!isClicked) {
      gsap.to(cvRef.current, {
        filter: 'blur(0px)',
        scale: 1.1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      })
    } else {
      gsap.to(cvRef.current, {
        filter: 'blur(8px)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-600">
        <h2 className="text-3xl font-bold mb-6 text-white">Mon CV</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Survolez ou cliquez sur l'aperçu pour révéler mon CV complet
        </p>
        
        {/* Aperçu du CV en petit et flou */}
        <div 
          ref={cvRef}
          className="relative inline-block cursor-pointer transform transition-all duration-300"
          style={{ filter: 'blur(8px)' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Votre CV réel - Remplacez le chemin par celui de votre fichier */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 w-64 h-80 overflow-hidden">
            {/* Option 1: Si vous avez un PDF de votre CV */}
            <iframe 
              src="/CV.pdf#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&menubar=0&scrollbar=0&resizable=0&scrollbar=0" 
              title="Aperçu de mon CV"
              className="w-full h-full border-0"
              style={{ 
                filter: isHovered ? 'blur(0px)' : 'blur(8px)',
                transition: 'filter 0.3s ease-in-out',
                overflow: 'hidden'
              }}
              frameBorder="0"
              scrolling="no"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onError={(e) => {
                // Fallback si le PDF n'existe pas
                const target = e.currentTarget
                const fallback = target.nextElementSibling as HTMLElement
                if (target && fallback) {
                  target.style.display = 'none'
                  fallback.style.display = 'flex'
                }
              }}
            />
            
            {/* Option 2: Fallback avec placeholder stylisé */}
            <div className="hidden w-full h-full flex-col items-center justify-center p-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/20 rounded w-32"></div>
                  <div className="h-3 bg-white/15 rounded w-24"></div>
                  <div className="h-3 bg-white/15 rounded w-28"></div>
                </div>
                <div className="space-y-1 mt-4">
                  <div className="h-2 bg-white/15 rounded w-full"></div>
                  <div className="h-2 bg-white/15 rounded w-3/4"></div>
                  <div className="h-2 bg-white/15 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicateur d'interaction */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Suppression de tous les indicateurs d'interaction */}
          </div>
        </div>

        {/* Bouton de téléchargement */}
        <div className="mt-8">
          <a 
            href="/CV.pdf" 
            download="CV_Quentin_Contreau.pdf"
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <Download className="mr-2" size={18} />
            Télécharger CV complet
          </a>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [showCV, setShowCV] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      )

      gsap.fromTo('.profile-section',
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.profile-sections',
            start: 'top 80%'
          }
        }
      )

      gsap.fromTo('.timeline-item',
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%'
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            À Propos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez mon parcours professionnel, mes compétences et ma passion pour l'excellence
          </p>
        </div>

        {/* Profile Sections */}
        <div className="profile-sections grid lg:grid-cols-2 gap-12 mb-20">
          {/* Présentation */}
          <div className="profile-section bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">Présentation</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Passionné par l'innovation le design et l'expérience utilisateur, je combine expertise technique 
                et vision stratégique pour créer des solutions impactantes et durables. (Surtout ici en fonction de la demande du client)
              </p>
              <p>
                Avec une approche centrée sur l'humain et les résultats, je m'attache à transformer 
                Ules défis complexes en opportunités de croissance et d'apprentissage dans un domaine qu ime passionne depuis des années.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center text-gray-400">
                  <MapPin size={18} className="mr-2" />
                  <span>Lyon, France</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Award size={18} className="mr-2" />
                  <span>Intermédiaire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div className="profile-section bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">Compétences Clés</h2>
            <div className="space-y-4">
              {[
                { skill: 'Leadership & Management', level: 95 },
                { skill: 'Innovation Stratégique', level: 90 },
                { skill: 'Gestion de Projet', level: 92 },
                { skill: 'Communication', level: 88 },
                { skill: 'Analyse & Résolution', level: 94 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.skill}</span>
                    <span className="text-white">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Mon Parcours</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-white to-gray-700"></div>
            
            {[
              {
                year: '2024',
                title: 'Chef de projet',
                company: 'Kalitys',
                description: 'Partie de la direction de l\'équipe technique et développement',
                side: 'left'
              },
              {
                year: '2022',
                title: 'Chef de Projet',
                company: 'Kalitys',
                description: 'Partie de la direction de l\'équipe technique et développement',
                side: 'right'
              },
              {
                year: '2020',
                title: 'Technicien',
                company: 'Xefi',
                description: 'Technicien en informatique',
                side: 'left'
              }
            ].map((item, index) => (
              <div key={index} className={`timeline-item flex items-center mb-12 ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${item.side === 'left' ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-white/50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Calendar size={16} className="text-white mr-2" />
                      <span className="text-white font-semibold">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 mb-3 font-medium">{item.company}</p>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-black rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CV Section Interactive */}
        <CVPreview />
      </div>
    </div>
  )
}