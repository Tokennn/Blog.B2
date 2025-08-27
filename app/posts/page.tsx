'use client'

import { useState, useEffect, useRef } from 'react'
import { X, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react'
import { gsap } from 'gsap'

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  views: number
  category: string
  content: {
    description: string
    knowledge: string[]
    difficulties: string[]
    learnings: string[]
  }
}

const posts: Post[] = [
  {
    id: 1,
    title: "Transformation Digitale : Retour d'expérience",
    excerpt: "Analyse approfondie d'un projet de transformation digitale majeur et des apprentissages clés",
    date: "15 Nov 2024",
    readTime: "8 min",
    views: 342,
    category: "Stratégie",
    content: {
      description: "Ce projet de transformation digitale a impliqué la refonte complète du système. L'objectif était d'améliorer l'efficacité opérationnelle tout en modernisant l'expérience des utilisateurs.",
      knowledge: [
        "Architecture microservices",
        "Méthodologie Agile/Scrum",
        "Change management",
        "Cloud Computing (AWS)",
        "DevOps et CI/CD"
      ],
      difficulties: [
        "Résistance au changement des équipes",
        "Intégration avec les systèmes legacy",
        "Gestion des données sensibles",
        "Coordination des équipes multiculturelles"
      ],
      learnings: [
        "L'importance de la communication transparente",
        "La nécessité d'impliquer les utilisateurs finaux dès le début",
        "L'impact positif de la formation continue",
        "La valeur d'une approche itérative"
      ]
    }
  },
  // {
  //   id: 2,
  //   title: "Leadership en Situation de Crise",
  //   excerpt: "Comment maintenir la cohésion d'équipe et la productivité durant une période difficile",
  //   date: "02 Nov 2024",
  //   readTime: "6 min",
  //   views: 298,
  //   category: "Management",
  //   content: {
  //     description: "Pendant la crise sanitaire, j'ai dû adapter mon style de leadership pour maintenir l'engagement et la performance de mon équipe en télétravail. Cette expérience a transformé ma vision du management moderne.",
  //     knowledge: [
  //       "Leadership empathique",
  //       "Communication digitale",
  //       "Gestion d'équipe à distance",
  //       "Outils collaboratifs",
  //       "Psychologie organisationnelle"
  //     ],
  //     difficulties: [
  //       "Maintenir la culture d'entreprise à distance",
  //       "Identifier les signaux de détresse des collaborateurs",
  //       "Équilibrer productivité et bien-être",
  //       "Gérer les différences de situation personnelle"
  //     ],
  //     learnings: [
  //       "La flexibilité comme clé du succès",
  //       "L'importance de l'écoute active",
  //       "La nécessité de redéfinir les métriques de performance",
  //       "La valeur des rituels d'équipe adaptés au digital"
  //     ]
  //   }
  // },
  {
    id: 3,
    title: "Innovation Produit : De l'Idée au Marché",
    excerpt: "Processus complet de développement d'un produit innovant avec une approche user-centric",
    date: "28 Oct 2024",
    readTime: "10 min",
    views: 421,
    category: "Innovation",
    content: {
      description: "Développement d'une solution IoT révolutionnaire pour optimiser la consommation énergétique des entreprises. Ce projet a nécessité une approche multidisciplinaire et une forte orientation client.",
      knowledge: [
        "Design Thinking",
        "Internet des Objets (IoT)",
        "Analyse de données",
        "UX/UI Design",
        "Go-to-market strategy"
      ],
      difficulties: [
        "Validation du marché cible",
        "Contraintes techniques de l'IoT",
        "Respect des réglementations",
        "Financement du projet"
      ],
      learnings: [
        "L'importance du prototypage rapide",
        "La nécessité d'itérer basé sur les feedbacks utilisateurs",
        "La valeur des partenariats stratégiques",
        "L'impact du timing sur le succès d'un produit"
      ]
    }
  }
]

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      )

      gsap.fromTo('.post-card',
        { y: 60, opacity: 0, scale: 0.95, rotationY: -15 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 0.8, 
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.posts-grid',
            start: 'top 80%'
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const openPostModal = (post: Post) => {
    setSelectedPost(post)
    
    // Animation du backdrop avec effet de parallaxe
    gsap.fromTo('.modal-backdrop',
      { 
        opacity: 0,
        scale: 1.1,
        backdropFilter: 'blur(0px)'
      },
      { 
        opacity: 1, 
        scale: 1,
        backdropFilter: 'blur(10px)',
        duration: 0.5,
        ease: 'power2.out'
      }
    )

    // Animation du contenu principal avec rebond et rotation
    gsap.fromTo('.modal-content',
      { 
        opacity: 0, 
        scale: 0.7, 
        y: 100,
        rotationX: -15,
        rotationY: 5
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6, 
        ease: 'back.out(1.7)'
      }
    )

    // Animation des éléments internes avec délai progressif
    gsap.fromTo('.modal-header-content',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power2.out' }
    )

    gsap.fromTo('.modal-title',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    )

    gsap.fromTo('.modal-section',
      { 
        y: 30, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.4, 
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
      }
    )

    gsap.fromTo('.modal-list-item',
      { 
        x: -20, 
        opacity: 0,
        scale: 0.9
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.3, 
        stagger: 0.05,
        delay: 0.6,
        ease: 'back.out(1.7)'
      }
    )
  }

  const closePostModal = () => {
    // Animation de sortie du contenu avec effet de rotation
    gsap.to('.modal-content',
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50,
        rotationX: 15,
        rotationY: -5,
        duration: 0.4, 
        ease: 'power2.in'
      }
    )

    // Animation de sortie des éléments internes
    gsap.to('.modal-header-content, .modal-title, .modal-section, .modal-list-item',
      { 
        opacity: 0, 
        y: -20,
        duration: 0.2,
        ease: 'power2.in'
      }
    )

    // Animation de sortie du backdrop
    gsap.to('.modal-backdrop',
      { 
        opacity: 0,
        scale: 1.1,
        backdropFilter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setSelectedPost(null)
      }
    )
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Stratégie': 'from-gray-600 to-gray-700',
      'Management': 'from-gray-700 to-gray-800',
      'Innovation': 'from-gray-800 to-gray-900'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Mes Analyses Professionnelles
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez mes réflexions et retours d'expérience sur mes missions et apprentissages professionnels
          </p>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="post-card bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-white/50 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              onClick={() => openPostModal(post)}
            >
              {/* Category Badge */}
              <div className="p-6 pb-0">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)} transform transition-transform group-hover:scale-110`}>
                  {post.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Meta Information removed: date, read time, views */}
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-600">
          <h2 className="text-3xl font-bold text-white mb-4">Intéressé par mes expériences ?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour échanger sur ces sujets ou discuter de collaborations potentielles.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/25"
          >
            Prenons contact
          </a>
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div ref={modalRef} className="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="modal-content bg-gray-900 rounded-2xl border border-gray-600 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-black/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="modal-header-content flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(selectedPost.category)}`}>
                  {selectedPost.category}
                </span>
              </div>
              <button 
                onClick={closePostModal}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-90"
              >
                <X className="text-gray-400 hover:text-white" size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <h1 className="modal-title text-3xl font-bold text-white mb-6">{selectedPost.title}</h1>
              
              {/* Description */}
              <div className="modal-section mb-8">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-white mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-white">Description du Projet</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{selectedPost.content.description}</p>
              </div>

              {/* Knowledge */}
              <div className="modal-section mb-8">
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-white mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-white">Connaissances Mobilisées</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedPost.content.knowledge.map((item, index) => (
                    <div key={index} className="modal-list-item flex items-center bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
                      <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulties */}
              <div className="modal-section mb-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-gray-400 mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-white">Difficultés Rencontrées</h2>
                </div>
                <div className="space-y-3">
                  {selectedPost.content.difficulties.map((item, index) => (
                    <div key={index} className="modal-list-item flex items-start bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learnings */}
              <div className="modal-section">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-white mr-2" size={20} />
                  <h2 className="text-xl font-semibold text-white">Apprentissages Clés</h2>
                </div>
                <div className="space-y-3">
                  {selectedPost.content.learnings.map((item, index) => (
                    <div key={index} className="modal-list-item flex items-start bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-200 hover:scale-105">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}