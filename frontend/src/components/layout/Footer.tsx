import React from 'react';
import log from '../../img/image.png';
import 'boxicons'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUMNA 1: INFORMACIÓN DE LA EMPRESA */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white"><img src={log} alt="logo" /></span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mi Moto del Pueblo</h3>
                <p className="text-sm text-orange-400 font-medium">Garzón, Huila - Colombia</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              La plataforma más confiable de compra, venta y servicios de motocicletas en Garzón, Huila. 
              Conectamos motociclistas con las mejores oportunidades del mercado, garantizando seguridad 
              y transparencia en cada transacción.
            </p>
            
            {/* ESTADÍSTICAS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-gray-400">Motos publicadas</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-sm text-gray-400">Clientes satisfechos</div>
              </div>
            </div>
            {/* REDES SOCIALES */}
        
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon:<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAMVJREFUSEvtltENgzAMRC+b0E3KJnSSlknKJnQTOkp7FZGsKBA3ECIkW0J8AH7x2YfsUClcJS5OD77Oyr2D+6KgWyom7A7AQz2E8EuqhbngBsC0kLwomFDCY1EMHKv29ZWcl4++hNTs6SgSqyoMD5LT4w7AUyRipW2qQgNrpV6b4lDFAcAtJX0J8APAblP9T8XVwJxw6emo6lqp5cdmJ/uBpCz8e27DpZHJ7HSYnbj6yH2LG4hfazWtyp5qdfK1F3PsdG7wBxb4MR/TodsdAAAAAElFTkSuQmCC"  className="w-6 h-6 filter invert sepia saturate-200 hue-rotate-270"/> , color: 'hover:bg-blue-600', href: 'https://facebook.com/mimotodelpueblo' },
                { name: 'Instagram', icon:<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAb9JREFUSEvllktOA0EMRJ2TACcBDsL3IsBJ+FyEz5Yte+AkwEOuyHTcMx56ESFaijKZ2FV22e3ulW1prbbEa3+CeNfM+MythzkD/p/L+MLMDvxTwcPmzQ1vvvCvek49YsiuQ4YC0/dUEPhqYX8Ygln/0SN+dVJkI+qSfI6qchA4QUC+10aaEeNw6mREu3QdeQmfXDXIkf0sAmXEypYoK9JGPEjv/AVE+N9nWWfEH+7YKwNSngQZAb918GN/BuLcSUlkQ+4WHFAMqWkmM11+mWgPsLqYMoH7YmbPjgcueOteaYmpB9JkxJEU8ncPYN97gp+8b7cQeOD+ilhKAP4DwMkVMJlT27gLhoiV7UZ3Btm1G9qsh4gFSjaQZ6tXpiHi1Llhp6kIsFVliHhrUsfmyuSWzFnzDWUMoKTkGTkfXeqdsLez7aRJOLmdpgaIJlY2QHp7mPfpCO5NrvRECacP0jI4CIY9q5GZdXs6grN5XOng6oml8szOagDVwb15XSXFTkmUjkXkw0EyLr0IQIjv4ouAHEXO75GrTzu7vxWbuuzFczfeoypSx2MytZ+7ZcqperXFvnQ/qxJXslxk8/+IPwEhHY4f8DCRSgAAAABJRU5ErkJggg=="  className="w-6 h-6 filter invert sepia saturate-200 hue-rotate-270"/>, color: 'hover:bg-pink-600', href: 'https://instagram.com/mimotodelpueblo' },
                { name: 'WhatsApp', icon:<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAcxJREFUSEvllutNBDEMhH2dQCdQCVAJUAlQyUEl0AncJ2UkX3acZPlzQkRarbTxejzjR3KIC63DhXDjTwJfRQTPV3t2ibeHMSB3EXHTngwE+HtEfJyCeV2JYBX48eTsKTkEiMWbQPogbmcqzIBheUySwgZWsMsLOwIgQMmP7XPFfgSMI0BZAMFitpQOqcPbgo+AAQW8/HkQhYImFQ9GobKdlNOeKQ57mSt8+QD8ujdyjLPE/KBC+mz5Q/IV8FwfsD6rdgd8HxEvTSIZ69uefGMrEpsaccCAApTZ6psUy3ujgoM1Sm3kdsCSNO/9ljFByd9ZsA7420SoyHG0t8rVHWe10QOX0jT5kbxskUJzlzrbTo6xfOYWyf1JERG0m9MudRbYStOQ82TKBwOsWHzrRyVElqparHAAK7f6QyPb5P9UlBtfrrhGec4A2BEAzrX6/JdDp5rVknszcQx9XQg0XGQiH1a5Ctj23uxoSvv5kNjMaexGszpHqjN2ho0dhabLQTnXR7MaYN0wcKSKfTO3i/4cnva6A1ZuMjsc4TwXkU6t/uqzNNlGI1N9KobVZU+3THrVqWHT40YmAKvnrVjPcr/Zn132djtc/eH/Af8ATz+KHx4A1f8AAAAASUVORK5CYII="  className="w-6 h-6 filter invert sepia saturate-200 hue-rotate-270"/>, color: 'hover:bg-green-600', href: 'https://wa.me/573001234567' },
                { name: 'TikTok', icon:<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVhJREFUSEvVlo1NAzEMRn2bwCSlm8AktJPAJoVJgE24J9WViWI7zV0UEamqepfk5fvqnywyaSyTuLIV/CQiB3P4HxF5bxGzFfy6Qk4G9C0ijzPAMI8i8pHB91YMD6tfZoBhYv85go9QrLwQPhLMAQg2/m++/zgwGqzqgRN0t/EvwA9rxPJhaLrU8hhlPH82ArsUl5uznzoVFRAOqZXts6xokdUs/HJSogUcprIHjqCtirvAl6tN3uIhigmKt4JIHlIKyUXc4Ddj1yYB1EYkEGpvrfDvCiagNG2yujsUjFqvudfc6e7H9ygu5za1RJsWNpbKiPZuFbWU2wSm2gC3g8DCco3m2hzmN90+PMUoAWwDTFsc3+VzPWCzWg+sm3vlslZUcAK16khYtSIw7zw7y02jPHcPkPVjbC1bnN0svVtlNTezRlucztMrTbauW3H3xtnCzOpsfff7X8AeVB8K2yaFAAAAAElFTkSuQmCC"  className="w-6 h-6 filter invert sepia saturate-200 hue-rotate-270"/>, color: 'hover:bg-purple-400', href: 'https://tiktok.com/@mimotodelpueblo' }
              ].map(({ name, icon, color, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 ${color} transform hover:scale-105`}
                  aria-label={name}
                >
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/products', label: 'Catálogo de Motos' },
                { to: '/vender', label: 'Vender mi Moto' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/taller', label: 'Taller Mecánico' },
                { to: '/alquiler', label: 'Alquiler' },
                { to: '/financiacion', label: 'Financiación' },
                { to: '/about', label: 'Nosotros' }
              ].map(({ to, label }) => (
                <li key={to}>
                  <a 
                    href={to} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUMNA 3: INFORMACIÓN DE CONTACTO */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
            
            <div className="space-y-4">
              {[
                { 
                  icon: '📍', 
                  title: 'Ubicación', 
                  content: 'Centro de Garzón\nHuila, Colombia\nFrente al parque principal' 
                },
                { 
                  icon: '📞', 
                  title: 'Teléfono', 
                  content: '+57 300 123 4567\n+57 8 875 1234' 
                },
                { 
                  icon: '✉️', 
                  title: 'Email', 
                  content: 'info@mimotodelpueblo.com\nventas@mimotodelpueblo.com' 
                },
                { 
                  icon: '🕒', 
                  title: 'Horarios', 
                  content: 'Lun - Vie: 8AM - 6PM\nSáb: 8AM - 4PM\nDom: 9AM - 1PM' 
                }
              ].map(({ icon, title, content }) => (
                <div key={title} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{icon}</span>
                  </div>
                  <div>
                    <h6 className="font-medium text-white text-sm">{title}</h6>
                    <p className="text-gray-400 text-sm whitespace-pre-line">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* SECCIÓN DE SERVICIOS PRINCIPALES */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">Nuestros Servicios</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🛒', title: 'Compra/Venta', desc: 'Motos nuevas y usadas' },
              { icon: '🔧', title: 'Taller Mecánico', desc: 'Reparación y mantenimiento' },
              { icon: '📋', title: 'Alquiler', desc: 'Alquiler por días/meses' },
              { icon: '💳', title: 'Financiación', desc: 'Crédito hasta 60 meses' }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* LÍNEA SEPARADORA */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* COPYRIGHT */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Mi Moto del Pueblo. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Plataforma diseñada especialmente para Garzón, Huila 🏍️
              </p>
            </div>
            
            {/* BADGES DE CONFIANZA */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-green-400">🔒</span>
                <span className="text-xs font-medium text-gray-300">Transacciones Seguras</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400">🛡️</span>
                <span className="text-xs font-medium text-gray-300">Verificación de Documentos</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-orange-400">⭐</span>
                <span className="text-xs font-medium text-gray-300">98% Satisfacción</span>
              </div>
            </div>
          </div>
        </div>

        {/* LLAMADA A LA ACCIÓN FINAL */}
        <div className="mt-8 text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            ¿Tienes una moto para vender? 🏍️
          </h3>
          <p className="text-orange-100 mb-4">
            Publícala gratis en nuestra plataforma y conecta con cientos de compradores interesados
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/vender"
              className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>📝</span>
              <span>Publicar Gratis</span>
            </a>
            <a 
              href="https://wa.me/573001234567?text=Hola,%20quiero%20vender%20mi%20moto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>💬</span>
              <span>Contactar Asesor</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;