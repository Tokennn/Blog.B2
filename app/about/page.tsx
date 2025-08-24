'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, MapPin, Calendar, Award } from 'lucide-react'
import { gsap } from 'gsap'

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

  const openCVModal = () => {
    setShowCV(true)
    gsap.fromTo('.modal-backdrop',
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    gsap.fromTo('.modal-content',
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    )
  }

  const closeCVModal = () => {
    gsap.to('.modal-content',
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => setShowCV(false)
      }
    )
    gsap.to('.modal-backdrop',
      { opacity: 0, duration: 0.3 }
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            À Propos de Moi
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
                Passionné par l'innovation et l'excellence professionnelle, je combine expertise technique 
                et vision stratégique pour créer des solutions impactantes et durables.
              </p>
              <p>
                Avec une approche centrée sur l'humain et les résultats, je m'attache à transformer 
                les défis complexes en opportunités de croissance et d'apprentissage.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center text-gray-400">
                  <MapPin size={18} className="mr-2" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Award size={18} className="mr-2" />
                  <span>Expert</span>
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
                title: 'Directeur Innovation',
                company: 'TechCorp',
                description: 'Direction de l\'équipe innovation et développement de stratégies disruptives',
                side: 'left'
              },
              {
                year: '2022',
                title: 'Chef de Projet Senior',
                company: 'DigitalSolutions',
                description: 'Gestion de projets complexes et encadrement d\'équipes multidisciplinaires',
                side: 'right'
              },
              {
                year: '2020',
                title: 'Consultant Stratégique',
                company: 'ConsultingPro',
                description: 'Conseil en transformation digitale pour des entreprises du CAC 40',
                side: 'left'
              },
              {
                year: '2018',
                title: 'Analyste Business',
                company: 'StartupLab',
                description: 'Analyse de marché et développement de modèles économiques innovants',
                side: 'right'
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

        {/* CV Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-600">
            <h2 className="text-3xl font-bold mb-6 text-white">Mon CV Détaillé</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Consultez mon curriculum vitae complet pour découvrir l'ensemble de mon parcours, 
              mes formations et mes réalisations professionnelles.
            </p>
            <button 
              onClick={openCVModal}
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/25"
            >
              <Download className="mr-2" size={20} />
              Consulter mon CV
            </button>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      {showCV && (
        <div className="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="modal-content bg-gray-900 rounded-2xl border border-gray-600 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Mon CV</h2>
              <button 
                onClick={closeCVModal}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="text-gray-400 hover:text-white" size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-800/50 p-8 rounded-xl">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2">Votre Nom</h1>
                  <p className="text-xl text-gray-300 mb-4">Titre Professionnel</p>
                  <div className="flex justify-center space-x-6 text-gray-400">
                    <span>email@example.com</span>
                    <span>+33 1 23 45 67 89</span>
                    <span>Paris, France</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                      Expérience Professionnelle
                    </h2>
                    <div className="space-y-6 text-gray-300">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Directeur Innovation - TechCorp (2024)</h3>
                        <p className="mb-2">Direction stratégique et innovation</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Développement de la stratégie d'innovation</li>
                          <li>Management d'équipe de 15 personnes</li>
                          <li>Augmentation du ROI de 40%</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                      Formation
                    </h2>
                    <div className="text-gray-300">
                      <h3 className="text-xl font-semibold text-white">Master en Management - École Supérieure (2018)</h3>
                      <p>Spécialisation en Stratégie et Innovation</p>
                    </div>
                  </section>
                </div>

                <div className="mt-8 text-center">
                  <button className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300">
                    <Download className="mr-2" size={18} />
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}