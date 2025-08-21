import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Estado para mostrar si se envió el mensaje
  const [messageSent, setMessageSent] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí podrías enviar los datos a un backend
    console.log('📧 Datos del formulario:', formData);
    
    // Simular envío exitoso
    setMessageSent(true);
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-lime-100 text-lime-800 rounded-full px-4 py-2 mb-6">
              <span className="text-lg">📞</span>
              <span className="font-medium">Contáctanos</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ¿Necesitas <span className="text-lime-500">ayuda?</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Estamos aquí para resolver todas tus dudas y brindarte la mejor atención personalizada
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ✉️ Envíanos un Mensaje
              </h2>
              <p className="text-gray-600">
                Completa el formulario y te responderemos en menos de 24 horas
              </p>
            </div>
            
            {/* MENSAJE DE ÉXITO */}
            {messageSent && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">¡Mensaje enviado exitosamente!</p>
                  <p className="text-sm text-green-600">Te responderemos pronto</p>
                </div>
              </div>
            )}
            
            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NOMBRE */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-3">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              
              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-3">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              {/* ASUNTO */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-3">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="¿De qué se trata tu mensaje?"
                  required
                />
              </div>
              
              {/* MENSAJE */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-3">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all duration-200 text-gray-700 resize-none"
                  placeholder="Cuéntanos en detalle cómo podemos ayudarte..."
                  required
                />
              </div>
              
              {/* BOTÓN ENVIAR */}
              <button 
                type="submit" 
                className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>📨 Enviar Mensaje</span>
              </button>
            </form>
          </div>
          
          {/* COLUMNA DERECHA: INFORMACIÓN DE CONTACTO */}
          <div className="space-y-8">
            
            {/* INFORMACIÓN DE CONTACTO */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <span className="text-3xl">📍</span>
                <span>Información de Contacto</span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Dirección</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Calle Principal #123<br />
                      Centro, Ciudad<br />
                      Código Postal 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Teléfono</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Lun - Vie: 9AM - 6PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@mitienda.com</p>
                    <p className="text-sm text-gray-500">Respuesta en 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Horarios de Atención</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                      Sábados: 10:00 AM - 4:00 PM<br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* REDES SOCIALES */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <span className="text-3xl">🌐</span>
                <span>Síguenos</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Facebook', icon: '📘', color: 'bg-blue-500 hover:bg-blue-600', href: '#' },
                  { name: 'Twitter', icon: '🐦', color: 'bg-blue-400 hover:bg-blue-500', href: '#' },
                  { name: 'Instagram', icon: '📷', color: 'bg-pink-500 hover:bg-pink-600', href: '#' },
                  { name: 'LinkedIn', icon: '💼', color: 'bg-blue-600 hover:bg-blue-700', href: '#' }
                ].map(({ name, icon, color, href }) => (
                  <a 
                    key={name}
                    href={href} 
                    className={`${color} text-white p-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold`}
                  >
                    <span className="text-xl">{icon}</span>
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* MÉTODOS DE CONTACTO RÁPIDO */}
            <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-3xl p-8 border border-lime-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                💬 Contacto Rápido
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Necesitas ayuda inmediata? Usa nuestros canales de atención rápida
              </p>
              
              <div className="space-y-3">
                <a 
                  href="tel:+1555123456"
                  className="flex items-center space-x-3 bg-white p-4 rounded-xl hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Llamar Ahora</p>
                    <p className="text-sm text-gray-500">Atención inmediata</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@mitienda.com"
                  className="flex items-center space-x-3 bg-white p-4 rounded-xl hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Email Directo</p>
                    <p className="text-sm text-gray-500">Respuesta en 24h</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;