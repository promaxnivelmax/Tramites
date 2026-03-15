import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';
import { FileText, Share2, Download, Zap, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-8 text-sm font-medium"
            >
              <Zap className="w-4 h-4" />
              <span>Rápido, fácil, genera pdf y comparte</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
            >
              Crea tu Hoja de Vida en minutos
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Cv Builder es la herramienta definitiva para diseñar un currículum profesional, moderno y optimizado para sistemas ATS. Destaca entre los candidatos hoy mismo.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-500/25">
                  Crear mi CV ahora
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-sm">
                  Ya tengo cuenta
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Por qué elegir Cv Builder?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Diseñado para facilitarte la vida y ayudarte a conseguir el trabajo de tus sueños con herramientas profesionales.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: 'Plantillas Modernas', desc: 'Elige entre diseños masculinos, femeninos y optimizados para ATS.' },
              { icon: Download, title: 'Exporta a PDF', desc: 'Descarga tu hoja de vida en formato PDF con un solo clic, lista para enviar.' },
              { icon: Share2, title: 'Comparte tu Enlace', desc: 'Obtén un enlace público para compartir tu perfil con reclutadores al instante.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'María Gómez', role: 'Diseñadora Gráfica', text: 'Gracias a Cv Builder pude organizar mi experiencia de forma clara. El diseño femenino es hermoso y muy profesional.' },
              { name: 'Carlos Rodríguez', role: 'Ingeniero de Software', text: 'La plantilla ATS me ayudó a pasar los filtros automáticos de las empresas. ¡Conseguí 3 entrevistas en una semana!' }
            ].map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
              >
                <div className="absolute top-8 right-8 text-indigo-100">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14.592C16.666 13.926 16.8 13.21 16.8 12.48V3H24V12.48C24 15.54 22.868 18.46 20.84 20.66L14.017 21ZM0 21L2.393 14.592C2.649 13.926 2.783 13.21 2.783 12.48V3H9.983V12.48C9.983 15.54 8.851 18.46 6.823 20.66L0 21Z" />
                  </svg>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{test.name}</h4>
                    <p className="text-sm text-slate-500">{test.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic leading-relaxed">"{test.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Encuéntranos</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Trámites y Servicios está ubicado en el corazón de Barrancabermeja. Visítanos o contáctanos para asesoría personalizada.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Dirección</h4>
                    <p className="text-slate-600">Calle 52 A No. 34 H 101 Local 1 Primero de Mayo<br/>Barrancabermeja, Santander</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">WhatsApp</h4>
                    <a href="https://wa.me/573052319414" target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                      305 231 9414
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.468233772274!2d-73.8647!3d7.0683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDQnMDYuMCJOIDczwrA1MSc1Mi45Ilc!5e0!3m2!1sen!2sco!4v1620000000000!5m2!1sen!2sco" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Mapa de ubicación"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
