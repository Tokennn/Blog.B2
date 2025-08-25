'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle } from 'lucide-react'
import { gsap } from 'gsap'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      )

      gsap.fromTo('.contact-card',
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%'
          }
        }
      )

      gsap.fromTo('.contact-info',
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-sidebar',
            start: 'top 80%'
          }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    
    gsap.fromTo('.success-message',
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    )
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="page-title text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Contactez-moi
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Une question, un projet ou simplement envie d'échanger ? N'hésitez pas à me contacter
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="contact-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyer un message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-white focus:ring-1 focus:ring-white text-white transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-white focus:ring-1 focus:ring-white text-white transition-colors"
                        placeholder="votre.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-white focus:ring-1 focus:ring-white text-white transition-colors"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-white focus:ring-1 focus:ring-white text-white transition-colors resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/25"
                  >
                    <Send className="mr-2" size={20} />
                    Envoyer le message
                  </button>
                </form>
              ) : (
                <div className="success-message text-center py-12">
                  <CheckCircle className="mx-auto text-white mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                  <p className="text-gray-400">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-sidebar space-y-8">
            <div className="contact-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="contact-info flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-400">quentin.contreau@ynov.com</p>
                  </div>
                </div>

                {/* <div className="contact-info flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Téléphone</h4>
                    <p className="text-gray-400">+33 1 23 45 67 89</p>
                  </div>
                </div> */}

                <div className="contact-info flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Localisation</h4>
                    <p className="text-gray-400">Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Réseaux sociaux</h3>
              
              <div className="space-y-4">
                <a 
                  href="https://www.linkedin.com/in/quentin-c-752996294/" 
                  className="contact-info flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center mr-3">
                    <Linkedin className="text-white" size={18} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a 
                  href="https://github.com/Tokennn" 
                  className="contact-info flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center mr-3">
                    <Github className="text-white" size={18} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="contact-card bg-gradient-to-r from-white/20 to-gray-200/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
              <h3 className="text-xl font-bold text-white mb-4">Disponibilité</h3>
              <p className="text-gray-300 leading-relaxed">
                Je réponds généralement dans les 24h. Pour les projets urgents, 
                n'hésitez pas à le préciser dans votre message 👍
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}