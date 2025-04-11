const products = [
  {
    id: "A1B",
    title: "Smartphone Pro Max Ultra",
    description: "Smartphone de última generación con cámara de 108MP y pantalla AMOLED de 120Hz.",
    rating: "4.8",
    reviewCount: "1250",
    category: "Móviles",
    imageUrl: "https://source.unsplash.com/random/300x400?smartphone"
  },
  {
    id: "C2D",
    title: "Laptop Gaming Elite",
    description: "Laptop gaming con RTX 3080, procesador i9 y pantalla de 240Hz.",
    rating: "4.7",
    reviewCount: "980",
    category: "Laptops",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+laptop"
  },
  {
    id: "E3F",
    title: "Auriculares Inalámbricos Premium",
    description: "Auriculares con cancelación de ruido activa y sonido surround 7.1.",
    rating: "4.6",
    reviewCount: "2100",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?headphones"
  },
  {
    id: "G4H",
    title: "Smartwatch Fitness Pro",
    description: "Smartwatch con monitor cardíaco, GPS y resistencia al agua 50m.",
    rating: "4.5",
    reviewCount: "1750",
    category: "Wearables",
    imageUrl: "https://source.unsplash.com/random/300x400?smartwatch"
  },
  {
    id: "I5J",
    title: "Tablet Ultra HD",
    description: "Tablet con pantalla 4K, lápiz digital y teclado desmontable.",
    rating: "4.9",
    reviewCount: "890",
    category: "Tablets",
    imageUrl: "https://source.unsplash.com/random/300x400?tablet"
  },
  {
    id: "K6L",
    title: "Cámara Mirrorless 4K",
    description: "Cámara mirrorless con sensor full frame y grabación 4K 60fps.",
    rating: "4.8",
    reviewCount: "640",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?camera"
  },
  {
    id: "M7N",
    title: "Monitor Curvo Gaming",
    description: "Monitor curvo de 34 pulgadas con 144Hz y FreeSync Premium.",
    rating: "4.7",
    reviewCount: "1120",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+monitor"
  },
  {
    id: "O8P",
    title: "Teclado Mecánico RGB",
    description: "Teclado mecánico con switches Cherry MX y iluminación RGB personalizable.",
    rating: "4.6",
    reviewCount: "2300",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?mechanical+keyboard"
  },
  {
    id: "Q9R",
    title: "Ratón Gaming Pro",
    description: "Ratón gaming con sensor óptico de 16000 DPI y 8 botones programables.",
    rating: "4.5",
    reviewCount: "1850",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+mouse"
  },
  {
    id: "S0T",
    title: "Altavoz Bluetooth Premium",
    description: "Altavoz Bluetooth con sonido 360° y resistencia al agua IPX7.",
    rating: "4.8",
    reviewCount: "950",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?bluetooth+speaker"
  },
  {
    id: "U1V",
    title: "Proyector 4K HDR",
    description: "Proyector 4K con HDR10+ y sonido Dolby Atmos integrado.",
    rating: "4.7",
    reviewCount: "720",
    category: "Video",
    imageUrl: "https://source.unsplash.com/random/300x400?projector"
  },
  {
    id: "W2X",
    title: "Disco Duro SSD 2TB",
    description: "SSD NVMe de 2TB con velocidades de lectura de 7000MB/s.",
    rating: "4.9",
    reviewCount: "1500",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?ssd"
  },
  {
    id: "Y3Z",
    title: "Router WiFi 6",
    description: "Router WiFi 6 con cobertura de hasta 300m² y 8 antenas.",
    rating: "4.6",
    reviewCount: "1100",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?router"
  },
  {
    id: "A4B",
    title: "Impresora 3D Pro",
    description: "Impresora 3D con cama caliente y resolución de 50 micras.",
    rating: "4.5",
    reviewCount: "680",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?3d+printer"
  },
  {
    id: "C5D",
    title: "Drone 4K Pro",
    description: "Drone con cámara 4K, 30 minutos de vuelo y seguimiento automático.",
    rating: "4.8",
    reviewCount: "520",
    category: "Drones",
    imageUrl: "https://source.unsplash.com/random/300x400?drone"
  },
  {
    id: "E6F",
    title: "Consola Gaming Next-Gen",
    description: "Consola de última generación con SSD de 1TB y ray tracing.",
    rating: "4.9",
    reviewCount: "3200",
    category: "Consolas",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+console"
  },
  {
    id: "G7H",
    title: "Controlador Gaming Elite",
    description: "Controlador con gatillos ajustables y paneles traseros intercambiables.",
    rating: "4.7",
    reviewCount: "890",
    category: "Gaming",
    imageUrl: "https://source.unsplash.com/random/300x400?gamepad"
  },
  {
    id: "I8J",
    title: "Micrófono Streaming Pro",
    description: "Micrófono USB con filtro pop y soporte anti-vibración.",
    rating: "4.6",
    reviewCount: "740",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?microphone"
  },
  {
    id: "K9L",
    title: "Webcam 4K Pro",
    description: "Webcam 4K con HDR y seguimiento automático.",
    rating: "4.5",
    reviewCount: "1120",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?webcam"
  },
  {
    id: "M0N",
    title: "Monitor Portátil USB-C",
    description: "Monitor portátil de 15.6 pulgadas con conexión USB-C y HDR.",
    rating: "4.7",
    reviewCount: "680",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?portable+monitor"
  },
  {
    id: "O1P",
    title: "Cargador Inalámbrico Fast",
    description: "Cargador inalámbrico de 15W con ventilación activa.",
    rating: "4.4",
    reviewCount: "2100",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?wireless+charger"
  },
  {
    id: "Q2R",
    title: "Power Bank 20000mAh",
    description: "Power bank con carga rápida de 45W y 2 puertos USB-C.",
    rating: "4.6",
    reviewCount: "1850",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?powerbank"
  },
  {
    id: "S3T",
    title: "Adaptador USB-C Hub",
    description: "Hub USB-C con 4 puertos USB-A, HDMI y lector de tarjetas.",
    rating: "4.5",
    reviewCount: "2300",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?usb+hub"
  },
  {
    id: "U4V",
    title: "Estación de Carga Magsafe",
    description: "Estación de carga con soporte Magsafe y carga rápida de 15W.",
    rating: "4.7",
    reviewCount: "950",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?charging+station"
  },
  {
    id: "W5X",
    title: "Funda Smartphone Premium",
    description: "Funda de cuero genuino con soporte para tarjetas y protección militar.",
    rating: "4.3",
    reviewCount: "2800",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?phone+case"
  },
  {
    id: "Y6Z",
    title: "Tarjeta Gráfica RTX 4090",
    description: "Tarjeta gráfica de última generación con 24GB GDDR6X y ray tracing.",
    rating: "4.9",
    reviewCount: "450",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?graphics+card"
  },
  {
    id: "A7B",
    title: "Procesador Ryzen 9 7950X",
    description: "Procesador de 16 núcleos y 32 hilos con arquitectura Zen 4.",
    rating: "4.8",
    reviewCount: "320",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?processor"
  },
  {
    id: "C8D",
    title: "Memoria RAM DDR5 32GB",
    description: "Kit de memoria RAM DDR5 de 32GB con velocidades de 6000MHz.",
    rating: "4.7",
    reviewCount: "780",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?ram"
  },
  {
    id: "E9F",
    title: "Placa Base X670E",
    description: "Placa base con chipset X670E y soporte para PCIe 5.0.",
    rating: "4.6",
    reviewCount: "420",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?motherboard"
  },
  {
    id: "G0H",
    title: "Fuente de Alimentación 1200W",
    description: "Fuente de alimentación 80+ Platinum con ventilador silencioso.",
    rating: "4.8",
    reviewCount: "560",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?power+supply"
  },
  {
    id: "I1J",
    title: "Disipador CPU AIO 360mm",
    description: "Refrigeración líquida con radiador de 360mm y RGB.",
    rating: "4.7",
    reviewCount: "890",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?cpu+cooler"
  },
  {
    id: "K2L",
    title: "Caja Gaming Full Tower",
    description: "Caja con panel lateral de cristal templado y control RGB.",
    rating: "4.6",
    reviewCount: "670",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?pc+case"
  },
  {
    id: "M3N",
    title: "Monitor OLED 4K 48\"",
    description: "Monitor OLED con resolución 4K y tasa de refresco de 120Hz.",
    rating: "4.9",
    reviewCount: "230",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?oled+monitor"
  },
  {
    id: "O4P",
    title: "Monitor Ultrawide 49\"",
    description: "Monitor ultrawide con resolución 5120x1440 y 240Hz.",
    rating: "4.8",
    reviewCount: "180",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+monitor"
  },
  {
    id: "Q5R",
    title: "Monitor Portátil 17\"",
    description: "Monitor portátil de 17 pulgadas con resolución 4K y HDR.",
    rating: "4.7",
    reviewCount: "340",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?portable+monitor"
  },
  {
    id: "S6T",
    title: "Monitor Curvo 1000R",
    description: "Monitor curvo con radio de 1000R y resolución 3440x1440.",
    rating: "4.6",
    reviewCount: "290",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?curved+monitor"
  },
  {
    id: "U7V",
    title: "Monitor Gaming 360Hz",
    description: "Monitor gaming con tasa de refresco de 360Hz y G-Sync.",
    rating: "4.9",
    reviewCount: "150",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+monitor"
  },
  {
    id: "W8X",
    title: "Monitor Profesional 32\"",
    description: "Monitor profesional con calibración de fábrica y 99% Adobe RGB.",
    rating: "4.8",
    reviewCount: "210",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?professional+monitor"
  },
  {
    id: "Y9Z",
    title: "Monitor Touch 27\"",
    description: "Monitor táctil con resolución 4K y soporte para lápiz digital.",
    rating: "4.7",
    reviewCount: "180",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+monitor"
  },
  {
    id: "A0B",
    title: "Monitor HDR 1000",
    description: "Monitor con certificación HDR 1000 y 1000 nits de brillo.",
    rating: "4.6",
    reviewCount: "130",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?hdr+monitor"
  },
  {
    id: "C1D",
    title: "Monitor 8K 32\"",
    description: "Monitor con resolución 8K y soporte para HDR10+.",
    rating: "4.9",
    reviewCount: "90",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?8k+monitor"
  },
  {
    id: "E2F",
    title: "Monitor Curvo 1000R 49\"",
    description: "Monitor ultrawide curvo con radio de 1000R y resolución 5120x1440.",
    rating: "4.8",
    reviewCount: "120",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+curved+monitor"
  },
  {
    id: "G3H",
    title: "Monitor Gaming OLED 48\"",
    description: "Monitor gaming OLED con resolución 4K y 120Hz.",
    rating: "4.7",
    reviewCount: "85",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+oled+monitor"
  },
  {
    id: "I4J",
    title: "Monitor Profesional 4K 32\"",
    description: "Monitor profesional con resolución 4K y calibración de fábrica.",
    rating: "4.6",
    reviewCount: "110",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?professional+4k+monitor"
  },
  {
    id: "K5L",
    title: "Monitor Touch 4K 27\"",
    description: "Monitor táctil con resolución 4K y soporte para lápiz digital.",
    rating: "4.5",
    reviewCount: "95",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+4k+monitor"
  },
  {
    id: "M6N",
    title: "Monitor HDR 2000",
    description: "Monitor con certificación HDR 2000 y 2000 nits de brillo.",
    rating: "4.9",
    reviewCount: "75",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?hdr2000+monitor"
  },
  {
    id: "O7P",
    title: "Monitor 8K 48\"",
    description: "Monitor con resolución 8K y soporte para HDR10+.",
    rating: "4.8",
    reviewCount: "60",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?8k+48+monitor"
  },
  {
    id: "Q8R",
    title: "Monitor Curvo 1000R 55\"",
    description: "Monitor ultrawide curvo con radio de 1000R y resolución 7680x2160.",
    rating: "4.7",
    reviewCount: "45",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+55+monitor"
  },
  {
    id: "S9T",
    title: "Monitor Gaming OLED 55\"",
    description: "Monitor gaming OLED con resolución 8K y 120Hz.",
    rating: "4.6",
    reviewCount: "40",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+oled+55+monitor"
  },
  {
    id: "T0U",
    title: "Smart TV OLED 65\"",
    description: "Smart TV OLED con resolución 8K, HDR10+ y sistema operativo Android TV.",
    rating: "4.9",
    reviewCount: "320",
    category: "Televisores",
    imageUrl: "https://source.unsplash.com/random/300x400?oled+tv"
  },
  {
    id: "V1W",
    title: "Soundbar 7.1.2",
    description: "Soundbar con Dolby Atmos, subwoofer inalámbrico y tecnología de sonido espacial.",
    rating: "4.8",
    reviewCount: "280",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?soundbar"
  },
  {
    id: "X2Y",
    title: "Cámara de Seguridad 4K",
    description: "Cámara de seguridad con visión nocturna, detección de movimiento y almacenamiento en la nube.",
    rating: "4.7",
    reviewCount: "450",
    category: "Seguridad",
    imageUrl: "https://source.unsplash.com/random/300x400?security+camera"
  },
  {
    id: "Z3A",
    title: "Robot Aspirador Pro",
    description: "Robot aspirador con mapeo láser, control por app y limpieza automática de mopa.",
    rating: "4.6",
    reviewCount: "890",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?robot+vacuum"
  },
  {
    id: "B4C",
    title: "Aire Acondicionado Smart",
    description: "Aire acondicionado inteligente con WiFi, control por voz y modo eco.",
    rating: "4.5",
    reviewCount: "670",
    category: "Climatización",
    imageUrl: "https://source.unsplash.com/random/300x400?air+conditioner"
  },
  {
    id: "D5E",
    title: "Purificador de Aire HEPA",
    description: "Purificador de aire con filtro HEPA, sensor de calidad del aire y modo nocturno silencioso.",
    rating: "4.8",
    reviewCount: "420",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?air+purifier"
  },
  {
    id: "F6G",
    title: "Cafetera Expresso Automática",
    description: "Cafetera expresso con molinillo integrado, espumador de leche y 15 niveles de molienda.",
    rating: "4.7",
    reviewCount: "530",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?espresso+machine"
  },
  {
    id: "H7I",
    title: "Batidora Profesional",
    description: "Batidora de 1500W con 12 velocidades, vaso de cristal y accesorios para múltiples usos.",
    rating: "4.6",
    reviewCount: "780",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?blender"
  },
  {
    id: "J8K",
    title: "Horno Inteligente",
    description: "Horno con control WiFi, 12 modos de cocción y limpieza pirolítica.",
    rating: "4.9",
    reviewCount: "310",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+oven"
  },
  {
    id: "L9M",
    title: "Lavadora Smart",
    description: "Lavadora con carga frontal, 10kg de capacidad y control por app.",
    rating: "4.8",
    reviewCount: "460",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?washing+machine"
  },
  {
    id: "N0O",
    title: "Secadora Heat Pump",
    description: "Secadora con bomba de calor, sensor de humedad y 8kg de capacidad.",
    rating: "4.7",
    reviewCount: "290",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?dryer"
  },
  {
    id: "P1Q",
    title: "Lavavajillas Integrable",
    description: "Lavavajillas con 14 cubiertos, programa eco y display LED.",
    rating: "4.6",
    reviewCount: "380",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?dishwasher"
  },
  {
    id: "R2S",
    title: "Frigorífico No Frost",
    description: "Frigorífico combi con tecnología No Frost y dispensador de agua y hielo.",
    rating: "4.9",
    reviewCount: "240",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?refrigerator"
  },
  {
    id: "T3U",
    title: "Vitrocerámica Inducción",
    description: "Placa de inducción con 4 zonas de cocción y control táctil.",
    rating: "4.8",
    reviewCount: "520",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?induction+cooktop"
  },
  {
    id: "V4W",
    title: "Microondas Grill",
    description: "Microondas con función grill, 25L de capacidad y 10 niveles de potencia.",
    rating: "4.7",
    reviewCount: "410",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?microwave"
  },
  {
    id: "X5Y",
    title: "Aspirador Sin Cable",
    description: "Aspirador inalámbrico con 45 minutos de autonomía y filtro HEPA.",
    rating: "4.6",
    reviewCount: "630",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?cordless+vacuum"
  },
  {
    id: "Z6A",
    title: "Plancha de Vapor",
    description: "Plancha de vapor con 2400W de potencia y sistema anti-cal.",
    rating: "4.5",
    reviewCount: "570",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?steam+iron"
  },
  {
    id: "B7C",
    title: "Cepillo Dental Eléctrico",
    description: "Cepillo dental con 5 modos de limpieza y temporizador de 2 minutos.",
    rating: "4.8",
    reviewCount: "890",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?electric+toothbrush"
  },
  {
    id: "D8E",
    title: "Máquina de Afeitar",
    description: "Máquina de afeitar con 5 hojas y sistema de limpieza automática.",
    rating: "4.7",
    reviewCount: "720",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?electric+razor"
  },
  {
    id: "F9G",
    title: "Secador de Pelo Profesional",
    description: "Secador de pelo con 2000W, 3 velocidades y 2 temperaturas.",
    rating: "4.6",
    reviewCount: "480",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?hair+dryer"
  },
  {
    id: "H0I",
    title: "Plancha de Pelo",
    description: "Plancha de pelo con placas de cerámica y temperatura ajustable.",
    rating: "4.5",
    reviewCount: "560",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?hair+straightener"
  },
  {
    id: "J1K",
    title: "Báscula Inteligente",
    description: "Báscula con medición de grasa corporal y sincronización con apps de fitness.",
    rating: "4.8",
    reviewCount: "340",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+scale"
  },
  {
    id: "L2M",
    title: "Tensiómetro Digital",
    description: "Tensiómetro de brazo con detección de arritmia y memoria para 2 usuarios.",
    rating: "4.7",
    reviewCount: "290",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?blood+pressure+monitor"
  },
  {
    id: "N3O",
    title: "Termómetro Digital",
    description: "Termómetro digital con medición en 1 segundo y memoria de últimas lecturas.",
    rating: "4.6",
    reviewCount: "420",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?digital+thermometer"
  },
  {
    id: "P4Q",
    title: "Masajeador Eléctrico",
    description: "Masajeador con 6 cabezales intercambiables y 3 niveles de intensidad.",
    rating: "4.5",
    reviewCount: "380",
    category: "Bienestar",
    imageUrl: "https://source.unsplash.com/random/300x400?massager"
  }
];

export default products; 