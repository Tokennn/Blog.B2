'use client'

import { useEffect, useRef } from 'react'
import { Building, Users, Target, Award, TrendingUp, Globe } from 'lucide-react'
import { gsap } from 'gsap'

export default function Company() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      )

      gsap.fromTo('.company-card',
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.company-grid',
            start: 'top 80%'
          }
        }
      )

      gsap.fromTo('.stat-item',
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 70%'
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
            L'entreprise
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez l'environnement exceptionnel dans lequel j'évolue et les valeurs qui nous animent au quotidien
          </p>
        </div>

        {/* Company Overview */}
        <div className="company-grid grid lg:grid-cols-2 gap-12 mb-20">
          <div className="company-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-white/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mr-4">
                <Building className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Kalitys</h2>
                <p className="text-gray-400">Leader de votre solution digitale</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Kalitys est une entreprise innovante spécialisée dans la solution digitale 
              des entreprises avec accompagnement de leur clients dans leur évolution technologique 
              avec des solutions sur-mesure. 
            </p>
            <div className="flex flex-wrap gap-3">
              {['Innovation', 'Excellence', 'Collaboration'].map((value) => (
                <span key={value} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div className="company-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-white/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mr-4">
                <Users className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white">Environnement de Travail</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong className="text-white">Équipe dynamique</strong> de 30+ collaborateurs passionnés</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong className="text-white">Bureaux modernes</strong> basé à Paris , Lyon , Nantes , Bordeaux et Aix-en-Provence avec espaces collaboratifs</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong className="text-white">Culture d'innovation</strong> avec des projets internes</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p><strong className="text-white">Ergonomie</strong> avec open space et bureaux qui comporte deux écran par poste ainsi qu'un téléphone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="company-grid grid md:grid-cols-3 gap-8 mb-20">
          <div className="company-card text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-white/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mx-auto mb-6">
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Transformer les défis technologiques en opportunités de croissance 
              pour nos clients et partenaires.
            </p>
          </div>

          <div className="company-card text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-white/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-6">
              <Award className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Valeurs</h3>
            <p className="text-gray-300 leading-relaxed">
              Excellence, intégrité et innovation guident chacune de nos actions 
              et décisions au quotidien.
            </p>
          </div>

          <div className="company-card text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-white/50 transition-all duration-300">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center mx-auto mb-6">
              <Globe className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              Être le partenaire de référence pour l'innovation technologique 
              en France et à l'international.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-section bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-600 mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Nos Chiffres Clés</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '30+', label: 'Collaborateurs', icon: Users },
              { number: '500+', label: 'Projets Réalisés', icon: Award },
              { number: '98%', label: 'Satisfaction Client', icon: TrendingUp }

            ].map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Context Section */}
        <div className="company-card bg-gray-900/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Contexte Professionnel</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed">
            <p>
              Dans un environnement technologique en constante évolution, Kalitys se positionne comme 
              un acteur clé de la transformation digitale. Son approche collaborative et notre culture 
              d'innovation permettent de relever les défis les plus complexe pour tous types de clients.
            </p>
            <p>
              Mon rôle au sein de cette équipe me permet de développer et paramétrer des solutions 
              innovantes tout en bénéficiant d'un cadre qui favorise l'épanouissement 
              professionnel et personnel.
            </p>
            <p>
              L'entreprise investit continuellement dans la formation et le développement de ses équipes, 
              créant un écosystème propice à l'apprentissage et à la croissance. Cette philosophie 
              se reflète dans la qualité de nos livrables et la satisfaction de nos clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}