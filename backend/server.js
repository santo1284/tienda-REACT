// IMPORTACIONES NECESARIAS
const express = require('express');        // Framework web
const cors = require('cors');              // Cross-Origin Resource Sharing
require('dotenv').config();                // Variables de entorno

// CREAR APLICACIÓN EXPRESS
const app = express();
const PORT = process.env.PORT || 5000;    // Puerto del servidor

// MIDDLEWARE GLOBAL
app.use(cors());           // Permite peticiones desde http://localhost:3000
app.use(express.json());   // Parsea automáticamente JSON del body

// DATOS DE MOTOS CON INFORMACIÓN ESPECÍFICA Y VARIADA
const productos = [
  {
    id: 1,
    name: "Honda CBR 600RR 2023",
    price: 15500000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    category: "Deportivas",
    year: 2023,
    cc: 600,
    mileage: 0,
    condition: "Nueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "La Honda CBR 600RR 2023 representa la perfecta combinación entre potencia y tecnología. Equipada con un motor de 4 cilindros en línea que entrega una experiencia de conducción excepcional tanto en pista como en carretera. Incluye sistemas de asistencia electrónica como ABS, control de tracción y múltiples modos de conducción.",
    seller: "Concesionario Oficial Honda Garzón",
    availability: "Disponible",
    reservationPrice: 2300000,
    features: [
      "ABS de serie",
      "Control de tracción",
      "Modos de conducción",
      "Faros LED",
      "Tablero digital TFT",
      "Suspensión ajustable"
    ],
    included: [
      "Garantía de fábrica 2 años",
      "Manual del propietario",
      "Kit de herramientas completo",
      "Registro RUNT incluido",
      "Primera revisión gratuita"
    ],
    reviews: [
      {
        id: 1,
        user: "Santiago Rodríguez",
        rating: 5,
        comment: "Increíble moto deportiva, la potencia es impresionante y el manejo muy preciso. La compré nueva y ha sido una experiencia fantástica. Recomendada 100% para quienes buscan adrenalina.",
        date: "2024-02-15",
        verified: true
      },
      {
        id: 2,
        user: "Carolina Mesa",
        rating: 5,
        comment: "Excelente atención en el concesionario Honda. La moto es espectacular, aunque hay que tener experiencia para manejarla. Los sistemas electrónicos dan mucha confianza.",
        date: "2024-02-08",
        verified: true
      },
      {
        id: 3,
        user: "Miguel Ángel Torres",
        rating: 4,
        comment: "Muy buena moto, el consumo es razonable para ser una 600. La posición de manejo puede ser un poco agresiva para viajes largos, pero en ciudad y carretera se comporta excelente.",
        date: "2024-01-28",
        verified: true
      }
    ],
    averageRating: 4.7,
    location: "Garzón, Huila",
    sellerRating: 4.9,
    sellerVerified: true,
    negotiable: false
  },
  {
    id: 2,
    name: "Yamaha MT-07 2022",
    price: 12800000,
    image: "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500",
      "https://images.unsplash.com/photo-1544966503-7e5ac882d73e?w=500"
    ],
    category: "Naked",
    year: 2022,
    cc: 689,
    mileage: 8500,
    condition: "Seminueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "Yamaha MT-07 2022 en excelente estado, con solo 8,500 km recorridos. Esta naked es perfecta para la ciudad y viajes por carretera. Motor bicilíndrico de 689cc muy confiable y económico. Mantenimientos al día en concesionario oficial. Ideal para motociclistas intermedios que buscan versatilidad y diversión.",
    seller: "Motos Usadas Premium - Garzón",
    availability: "Disponible",
    reservationPrice: 1280000,
    features: [
      "Motor CP2 de 689cc",
      "ABS",
      "Tablero LCD multifunción",
      "Chasis de acero liviano",
      "Suspensión deportiva",
      "Escape de serie"
    ],
    included: [
      "Garantía mecánica 6 meses",
      "Historial de mantenimientos",
      "SOAT vigente hasta diciembre",
      "Tecnomecánica vigente",
      "Manual del propietario",
      "Llaves originales (2)"
    ],
    reviews: [
      {
        id: 4,
        user: "Andrés Felipe Gómez",
        rating: 5,
        comment: "Compré esta MT-07 hace 3 meses y estoy muy satisfecho. Es súper cómoda para el uso diario y tiene suficiente potencia para la carretera. El vendedor fue muy honesto con el estado de la moto.",
        date: "2024-02-20",
        verified: true
      },
      {
        id: 5,
        user: "Paola Herrera",
        rating: 4,
        comment: "Buena moto para iniciar en las naked de media cilindrada. El motor es muy noble y predecible. Solo tuve que cambiar las llantas pero por desgaste normal. Recomendada.",
        date: "2024-02-12",
        verified: true
      },
      {
        id: 6,
        user: "Luis Carlos Martín",
        rating: 5,
        comment: "Excelente relación calidad-precio. La moto estaba tal como se describía en la publicación. El proceso de compra fue muy transparente y rápido.",
        date: "2024-02-05",
        verified: true
      }
    ],
    averageRating: 4.7,
    location: "Garzón, Huila",
    sellerRating: 4.6,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 13200000
  },
  {
    id: 3,
    name: "Honda PCX 150 2023",
    price: 8900000,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500",
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500"
    ],
    category: "Scooter",
    year: 2023,
    cc: 149,
    mileage: 2100,
    condition: "Seminueva",
    transmission: "Automática",
    fuel: "Gasolina",
    description: "Honda PCX 150 2023 como nueva, con apenas 2,100 km. Perfect para el uso urbano diario en Garzón. Transmisión automática CVT, excelente economía de combustible (hasta 45 km/lt). Incluye baúl superior adicional y protector de piernas. Ideal para estudiantes, profesionales o como segunda moto para la ciudad.",
    seller: "Motos del Centro - Concesionario Multimarca",
    availability: "Disponible",
    reservationPrice: 890000,
    features: [
      "Transmisión automática CVT",
      "Sistema de frenado CBS",
      "Compartimiento bajo el asiento",
      "Gancho porta-objetos",
      "Tablero digital completo",
      "Baúl superior incluido"
    ],
    included: [
      "Garantía Honda 18 meses restantes",
      "Baúl superior Givi",
      "Protector de piernas",
      "Cargador USB integrado",
      "Manual del propietario",
      "Factura de compra original"
    ],
    reviews: [
      {
        id: 7,
        user: "Isabella Ramírez",
        rating: 5,
        comment: "Perfect para ir a la universidad todos los días. Muy económica en combustible y súper cómoda. El baúl es perfecto para mis cosas. La recomiendo totalmente para uso urbano.",
        date: "2024-02-18",
        verified: true
      },
      {
        id: 8,
        user: "Daniel Alejandro Cruz",
        rating: 4,
        comment: "Buena scooter para la ciudad. Es práctica y fácil de manejar. El único detalle es que en subidas muy empinadas se queda un poco corta de fuerza, pero para Garzón está perfecto.",
        date: "2024-02-10",
        verified: true
      },
      {
        id: 9,
        user: "María Fernanda López",
        rating: 5,
        comment: "La compré para ir al trabajo y ha sido la mejor decisión. Súper económica, cómoda y práctica. El vendedor fue muy amable y me explicó todo sobre el mantenimiento.",
        date: "2024-01-30",
        verified: true
      }
    ],
    averageRating: 4.7,
    location: "Garzón, Huila",
    sellerRating: 4.8,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 9200000
  },
  {
    id: 4,
    name: "Kawasaki Ninja 400 2021",
    price: 13200000,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    category: "Deportivas",
    year: 2021,
    cc: 399,
    mileage: 12000,
    condition: "Usada",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "Kawasaki Ninja 400 2021 en muy buen estado general. Ideal para iniciarse en el mundo de las deportivas. Motor paralelo twin de 399cc muy confiable y económico. Ha tenido un solo propietario, mantenimientos al día. Incluye slider de motor, protector de tanque y escape slip-on. Perfecta para aprender y crecer como piloto.",
    seller: "Kawasaki Huila - Motos Deportivas",
    availability: "Disponible",
    reservationPrice: 1320000,
    features: [
      "Motor paralelo twin 399cc",
      "ABS",
      "Asistente de embrague",
      "Posición de manejo cómoda",
      "Faros LED",
      "Escape slip-on Akrapovic"
    ],
    included: [
      "Garantía mecánica 3 meses",
      "Slider de motor instalado",
      "Protector de tanque",
      "Escape deportivo Akrapovic",
      "Manual del propietario",
      "Historial completo de servicios"
    ],
    reviews: [
      {
        id: 10,
        user: "Juan Sebastián Morales",
        rating: 4,
        comment: "Excelente moto para aprender sobre deportivas. No es muy agresiva pero tiene buen performance. Los accesorios que incluye son de calidad. El vendedor fue muy transparente con el historial.",
        date: "2024-02-14",
        verified: true
      },
      {
        id: 11,
        user: "Valentina Castillo",
        rating: 5,
        comment: "Mi primera deportiva y estoy encantada. Es perfecta para ir cogiendo experiencia sin ser peligrosa. El escape suena espectacular y se ve muy bien.",
        date: "2024-02-07",
        verified: false
      },
      {
        id: 12,
        user: "Ricardo Andrade",
        rating: 4,
        comment: "Buena opción en deportivas de entrada. El motor es muy noble y económico. Solo hay que estar pendiente del mantenimiento regular, pero es una moto muy confiable.",
        date: "2024-01-25",
        verified: true
      }
    ],
    averageRating: 4.3,
    location: "Neiva, Huila",
    sellerRating: 4.7,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 14000000
  },
  {
    id: 5,
    name: "Suzuki DR 200SE 2023",
    price: 7500000,
    image: "https://images.unsplash.com/photo-1544966503-7e5ac882d73e?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1544966503-7e5ac882d73e?w=500",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500"
    ],
    category: "Enduro",
    year: 2023,
    cc: 199,
    mileage: 0,
    condition: "Nueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "Suzuki DR 200SE 2023 completamente nueva, ideal para aventuras en los hermosos paisajes rurales del Huila. Motor de 199cc monocilíndrico, muy confiable y económico. Perfecta para caminos destapados, fincas y uso mixto ciudad-campo. Suspensión de largo recorrido para mayor comodidad en terrenos difíciles.",
    seller: "Suzuki Oficial Huila",
    availability: "Disponible",
    reservationPrice: 750000,
    features: [
      "Motor monocilíndrico 199cc",
      "Suspensión de largo recorrido",
      "Neumáticos todo terreno",
      "Tanque de combustible 13L",
      "Arranque eléctrico y kick",
      "Protector de motor incluido"
    ],
    included: [
      "Garantía de fábrica Suzuki 2 años",
      "Protector de motor",
      "Parrilla trasera",
      "Manual del propietario",
      "Kit de herramientas",
      "Primera revisión gratuita"
    ],
    reviews: [
      {
        id: 13,
        user: "Carlos Eduardo Paz",
        rating: 5,
        comment: "Perfecta para ir a mi finca los fines de semana. Se comporta muy bien en caminos destapados y en la ciudad también es cómoda. Muy buen consumo de combustible.",
        date: "2024-02-16",
        verified: true
      },
      {
        id: 14,
        user: "Luz Mary Vargas",
        rating: 5,
        comment: "La compré para mi esposo que trabaja en el campo. Es perfecta para los caminos rurales de la región. Muy resistente y confiable. El servicio en Suzuki es excelente.",
        date: "2024-02-09",
        verified: true
      }
    ],
    averageRating: 5.0,
    location: "Neiva, Huila",
    sellerRating: 4.9,
    sellerVerified: true,
    negotiable: false
  },
  {
    id: 6,
    name: "BMW G 310 GS 2022",
    price: 17900000,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
      "https://images.unsplash.com/photo-1544966503-7e5ac882d73e?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    category: "Adventure",
    year: 2022,
    cc: 313,
    mileage: 5600,
    condition: "Seminueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "BMW G 310 GS 2022 en estado impecable, con solo 5,600 km. La adventure compacta perfecta para explorar los paisajes del Huila. Incluye maletas laterales BMW originales, protectores y GPS Garmin. Un solo propietario, siempre guardada en garaje. Ideal para aventureros que buscan calidad alemana en formato accesible.",
    seller: "BMW Motorrad Colombia - Neiva",
    availability: "Reservada",
    reservationPrice: 2685000,
    features: [
      "Motor BMW 313cc",
      "ABS",
      "Pantalla LCD",
      "Suspensión invertida adelante",
      "Maletas laterales BMW originales",
      "Protectores de motor y tanque"
    ],
    included: [
      "Garantía BMW 12 meses restante",
      "Maletas laterales originales BMW",
      "GPS Garmin Montana 700",
      "Protectores completos",
      "Manual del propietario",
      "Historial de servicios BMW"
    ],
    reviews: [
      {
        id: 15,
        user: "Alejandro Rubio",
        rating: 5,
        comment: "Una joya de moto. La calidad BMW se siente en cada detalle. Las maletas originales son perfectas para viajes largos. Ya hice varios recorridos por el Huila y Caquetá sin problemas.",
        date: "2024-02-11",
        verified: true
      },
      {
        id: 16,
        user: "Diana Patricia Rojas",
        rating: 4,
        comment: "Excelente adventure para mujer. Es liviana y muy manejable. Los accesorios incluidos son de primera calidad. El precio está acorde con lo que ofrece.",
        date: "2024-01-28",
        verified: true
      }
    ],
    averageRating: 4.5,
    location: "Neiva, Huila",
    sellerRating: 4.9,
    sellerVerified: true,
    negotiable: false,
    reservedBy: "Cliente Premium",
    reservedDate: "2024-02-22"
  },
  {
    id: 7,
    name: "TVS Apache RTR 200 4V",
    price: 9200000,
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500",
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    category: "Street",
    year: 2023,
    cc: 197,
    mileage: 1800,
    condition: "Seminueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "TVS Apache RTR 200 4V 2023 prácticamente nueva, con solo 1,800 km. Naked street perfecta para jóvenes que buscan estilo y rendimiento. Motor de 4 válvulas muy eficiente, excelente para ciudad y carretera. Incluye escape deportivo y llantas deportivas. Diseño agresivo y moderno que llama la atención.",
    seller: "TVS Garzón - Motos Jóvenes",
    availability: "Disponible",
    reservationPrice: 920000,
    features: [
      "Motor 4 válvulas 197cc",
      "Escape deportivo",
      "Llantas deportivas",
      "Tablero digital completo",
      "Suspensión deportiva",
      "Frenos de disco adelante y atrás"
    ],
    included: [
      "Garantía TVS 12 meses restante",
      "Escape deportivo instalado",
      "Manual del propietario",
      "Llaves originales (2)",
      "Kit de herramientas",
      "SOAT vigente"
    ],
    reviews: [
      {
        id: 17,
        user: "Kevin Stiven Morales",
        rating: 5,
        comment: "Perfecta para jóvenes como yo. Tiene muy buena potencia para su cilindraje y se ve increíble. El escape deportivo suena genial. Muy recomendada para uso urbano.",
        date: "2024-02-13",
        verified: true
      },
      {
        id: 18,
        user: "Camila Andrea Díaz",
        rating: 4,
        comment: "Buena moto para el precio. Es cómoda y tiene buen rendimiento. El diseño me encanta y es fácil de manejar. Solo que el asiento podría ser un poquito más cómodo para viajes largos.",
        date: "2024-02-06",
        verified: true
      },
      {
        id: 19,
        user: "Julián Andrés Castro",
        rating: 5,
        comment: "Excelente relación precio-calidad. La moto está como nueva y el vendedor fue muy profesional. Ya llevo dos meses con ella y cero problemas.",
        date: "2024-01-20",
        verified: true
      }
    ],
    averageRating: 4.7,
    location: "Garzón, Huila",
    sellerRating: 4.5,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 9800000
  },
  {
    id: 8,
    name: "Bajaj Dominar 400 2022",
    price: 11500000,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
      "https://images.unsplash.com/photo-1544966503-7e5ac882d73e?w=500",
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500"
    ],
    category: "Touring",
    year: 2022,
    cc: 373,
    mileage: 7200,
    condition: "Usada",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "Bajaj Dominar 400 2022 perfecta para touring y viajes largos. Con 7,200 km bien cuidados. Motor Duke de 373cc muy confiable para recorridos extensos. Incluye maletas laterales, parabrisas touring alto y asiento de gel para mayor comodidad. Ha recorrido varias rutas colombianas sin inconvenientes.",
    seller: "Bajaj Neiva - Especialistas en Touring",
    availability: "Disponible",
    reservationPrice: 1150000,
    features: [
      "Motor Duke 373cc",
      "ABS",
      "Parabrisas touring alto",
      "Asiento de gel",
      "Maletas laterales incluidas",
      "Tablero digital completo"
    ],
    included: [
      "Garantía mecánica 4 meses",
      "Maletas laterales rígidas",
      "Parabrisas touring alto",
      "Asiento gel comfort",
      "Cargador USB 12V",
      "Manual del propietario"
    ],
    reviews: [
      {
        id: 20,
        user: "Fernando Galvis",
        rating: 5,
        comment: "Excelente moto para viajar. Ya hice varios recorridos largos y es muy cómoda. Las maletas son perfectas y el parabrisas protege muy bien del viento. Muy recomendada para touring.",
        date: "2024-02-17",
        verified: true
      },
      {
        id: 21,
        user: "Claudia Esperanza Ruiz",
        rating: 4,
        comment: "Buena moto para mi esposo que viaja mucho por trabajo. Es cómoda y tiene buen tanque de combustible. Los accesorios incluidos son de buena calidad.",
        date: "2024-02-04",
        verified: true
      },
      {
        id: 22,
        user: "Oscar Darío Medina",
        rating: 4,
        comment: "Sólida moto de viaje. El motor responde bien en carretera y subidas. Solo hay que estar pendiente del mantenimiento regular, pero es muy confiable para recorridos largos.",
        date: "2024-01-18",
        verified: true
      }
    ],
    averageRating: 4.3,
    location: "Neiva, Huila",
    sellerRating: 4.4,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 12200000
  },
  {
    id: 9,
    name: "AKT NKD 125 2023",
    price: 4200000,
    image: "https://images.unsplash.com/photo-1555502184-6e4b6e0b9f2b?w=500",
    additionalImages: [
      "https://images.unsplash.com/photo-1555502184-6e4b6e0b9f2b?w=500",
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?w=500",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
    ],
    category: "Urbana",
    year: 2023,
    cc: 125,
    mileage: 800,
    condition: "Seminueva",
    transmission: "Manual",
    fuel: "Gasolina",
    description: "AKT NKD 125 2023 ideal para estudiantes y uso urbano. Con apenas 800 km, prácticamente nueva. Motor 125cc muy económico en combustible (hasta 50 km/lt). Perfecta como primera moto o para movilizarse económicamente por la ciudad. Diseño juvenil y moderno. Mantenimiento muy económico y repuestos accesibles.",
    seller: "AKT Garzón - Motos Económicas",
    availability: "Disponible",
    reservationPrice: 420000,
    features: [
      "Motor 125cc económico",
      "Arranque eléctrico",
      "Freno de disco delantero",
      "Tablero analógico",
      "Parrilla trasera",
      "Diseño juvenil moderno"
    ],
    included: [
      "Garantía AKT 10 meses restante",
      "Manual del propietario",
      "Llaves originales (2)",
      "Kit de herramientas básico",
      "SOAT vigente",
      "Tecnomecánica vigente"
    ],
    reviews: [
      {
        id: 23,
        user: "Stephany Jiménez",
        rating: 5,
        comment: "Perfect para ir a la universidad. Muy económica en combustible y fácil de manejar. Es mi primera moto y estoy muy contenta con la compra. Recomendada para estudiantes.",
        date: "2024-02-19",
        verified: true
      },
      {
        id: 24,
        user: "Jhon Edwar Sánchez",
        rating: 4,
        comment: "Buena moto para el trabajo diario. Muy económica y confiable. El servicio técnico de AKT es bueno y los repuestos son baratos. Ideal para uso urbano.",
        date: "2024-02-12",
        verified: true
      },
      {
        id: 25,
        user: "Gloria Inés Ramírez",
        rating: 5,
        comment: "Se la compré a mi hija para la universidad y ha sido excelente. Muy segura y económica. El vendedor nos explicó todo muy bien sobre el mantenimiento.",
        date: "2024-02-01",
        verified: true
      }
    ],
    averageRating: 4.7,
    location: "Garzón, Huila",
    sellerRating: 4.3,
    sellerVerified: true,
    negotiable: true,
    originalPrice: 4500000
  }
];

// RUTAS DE LA API

// Ruta de prueba - Verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ 
    message: '🏍️ Mi Moto del Pueblo - Backend funcionando!',
    location: 'Garzón, Huila',
    timestamp: new Date().toISOString(),
    totalProducts: productos.length
  });
});

// Ruta para obtener todas las motos
app.get('/api/products', (req, res) => {
  try {
    // Simula una respuesta de base de datos
    res.json(productos);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ 
      error: error.message,
      message: 'Error al obtener motos'
    });
  }
});

// Ruta para obtener moto por ID con información completa
app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const moto = productos.find(p => p.id === parseInt(id));
    
    if (!moto) {
      return res.status(404).json({
        message: 'Moto no encontrada'
      });
    }
    
    // Retornar información completa del producto
    res.json(moto);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al obtener la moto'
    });
  }
});

// Ruta para obtener solo las reseñas de un producto
app.get('/api/products/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    const moto = productos.find(p => p.id === parseInt(id));
    
    if (!moto) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      productId: moto.id,
      productName: moto.name,
      reviews: moto.reviews,
      averageRating: moto.averageRating,
      totalReviews: moto.reviews.length
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al obtener las reseñas'
    });
  }
});

// Ruta para agregar una reseña a un producto
app.post('/api/products/:id/reviews', (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;
    
    // Validaciones
    if (!user || !rating || !comment) {
      return res.status(400).json({
        message: 'Usuario, calificación y comentario son obligatorios'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'La calificación debe estar entre 1 y 5'
      });
    }
    
    const moto = productos.find(p => p.id === parseInt(id));
    
    if (!moto) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }
    
    // Crear nueva reseña
    const newReview = {
      id: Date.now(),
      user: user,
      rating: parseInt(rating),
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      verified: false // Las nuevas reseñas inician como no verificadas
    };
    
    // Agregar reseña al producto
    moto.reviews.push(newReview);
    
    // Recalcular promedio de calificación
    const totalRating = moto.reviews.reduce((sum, review) => sum + review.rating, 0);
    moto.averageRating = parseFloat((totalRating / moto.reviews.length).toFixed(1));
    
    res.status(201).json({
      message: 'Reseña agregada exitosamente',
      review: newReview,
      newAverageRating: moto.averageRating
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: 'Error al agregar reseña'
    });
  }
});

// Ruta para filtrar motos por categoría
app.get('/api/products/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const motos = productos.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json(motos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al filtrar motos'
    });
  }
});

// Ruta para filtrar motos disponibles
app.get('/api/products/filter/available', (req, res) => {
  try {
    const motosDisponibles = productos.filter(p => p.availability === 'Disponible');
    res.json(motosDisponibles);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al obtener motos disponibles'
    });
  }
});

// Ruta para filtrar por rango de precios
app.get('/api/products/filter/price', (req, res) => {
  try {
    const { min, max } = req.query;
    let motos = productos;
    
    if (min) {
      motos = motos.filter(p => p.price >= parseInt(min));
    }
    
    if (max) {
      motos = motos.filter(p => p.price <= parseInt(max));
    }
    
    res.json(motos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al filtrar por precio'
    });
  }
});

// Ruta para agregar una moto (POST)
app.post('/api/products', (req, res) => {
  try {
    const { 
      name, price, image, additionalImages, category, year, cc, 
      mileage, condition, transmission, fuel, 
      description, seller, features, included 
    } = req.body;
    
    // Validaciones básicas
    if (!name || !price || !category || !seller) {
      return res.status(400).json({ 
        message: 'Nombre, precio, categoría y vendedor son obligatorios' 
      });
    }

    // Crear nueva moto
    const newMoto = {
      id: productos.length + 1,
      name,
      price: parseFloat(price),
      image: image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      additionalImages: additionalImages || [image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
      category,
      year: year || new Date().getFullYear(),
      cc: cc || 125,
      mileage: mileage || 0,
      condition: condition || 'Usada',
      transmission: transmission || 'Manual',
      fuel: fuel || 'Gasolina',
      description: description || 'Moto en excelente estado',
      seller: seller,
      availability: 'Disponible',
      reservationPrice: Math.round(parseFloat(price) * 0.1),
      features: features || ['Económica', 'Confiable'],
      included: included || ['Manual del propietario', 'Llaves originales'],
      reviews: [],
      averageRating: 0,
      location: 'Garzón, Huila',
      sellerRating: 4.0,
      sellerVerified: false,
      negotiable: true
    };

    // Agregar a la lista
    productos.push(newMoto);
    
    // Responder con la moto creada
    res.status(201).json(newMoto);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      message: 'Error al crear moto'
    });
  }
});

// Ruta para reservar un vehículo
app.post('/api/products/:id/reserve', (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientPhone, clientEmail } = req.body;
    
    const moto = productos.find(p => p.id === parseInt(id));
    
    if (!moto) {
      return res.status(404).json({
        message: 'Moto no encontrada'
      });
    }
    
    if (moto.availability !== 'Disponible') {
      return res.status(400).json({
        message: 'Esta moto ya está reservada'
      });
    }
    
    // Cambiar estado a reservada
    moto.availability = 'Reservada';
    moto.reservedBy = clientName || 'Cliente';
    moto.reservedDate = new Date().toISOString().split('T')[0];
    moto.reservedContact = {
      name: clientName,
      phone: clientPhone,
      email: clientEmail
    };
    
    res.json({
      message: 'Vehículo reservado exitosamente',
      reservation: {
        productId: moto.id,
        productName: moto.name,
        reservationPrice: moto.reservationPrice,
        reservedBy: moto.reservedBy,
        reservedDate: moto.reservedDate
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al reservar vehículo'
    });
  }
});

// Ruta para obtener estadísticas avanzadas
app.get('/api/stats', (req, res) => {
  try {
    const disponibles = productos.filter(p => p.availability === 'Disponible').length;
    const reservadas = productos.filter(p => p.availability === 'Reservada').length;
    
    const stats = {
      total_motos: productos.length,
      motos_disponibles: disponibles,
      motos_reservadas: reservadas,
      categorias: [...new Set(productos.map(p => p.category))],
      precio_promedio: Math.round(productos.reduce((sum, p) => sum + p.price, 0) / productos.length),
      precio_minimo: Math.min(...productos.map(p => p.price)),
      precio_maximo: Math.max(...productos.map(p => p.price)),
      motos_nuevas: productos.filter(p => p.condition === 'Nueva').length,
      motos_seminuevas: productos.filter(p => p.condition === 'Seminueva').length,
      motos_usadas: productos.filter(p => p.condition === 'Usada').length,
      promedio_calificaciones: parseFloat((productos.reduce((sum, p) => sum + p.averageRating, 0) / productos.length).toFixed(1)),
      total_reseñas: productos.reduce((sum, p) => sum + p.reviews.length, 0),
      location: 'Garzón, Huila, Colombia',
      vendedores_verificados: productos.filter(p => p.sellerVerified).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error al obtener estadísticas'
    });
  }
});

// Ruta para buscar motos por texto
app.get('/api/search', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        message: 'Parámetro de búsqueda requerido'
      });
    }
    
    const searchTerm = q.toLowerCase();
    const resultados = productos.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.seller.toLowerCase().includes(searchTerm)
    );
    
    res.json({
      searchTerm: q,
      totalResults: resultados.length,
      results: resultados
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Error en la búsqueda'
    });
  }
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🏍️ Mi Moto del Pueblo - Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Ubicación: Garzón, Huila, Colombia`);
  console.log(`📡 API disponible en http://localhost:${PORT}`);
  console.log(`🏍️ Motos disponibles: ${productos.filter(p => p.availability === 'Disponible').length}`);
  console.log(`📊 Estadísticas en http://localhost:${PORT}/api/stats`);
  console.log(`🔍 Búsqueda en http://localhost:${PORT}/api/search?q=honda`);
  console.log(`⭐ Total de reseñas: ${productos.reduce((sum, p) => sum + p.reviews.length, 0)}`);
});