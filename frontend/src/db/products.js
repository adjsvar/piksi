const products = [
  {
    id: "a1b",
    title: "Smartphone Pro Max Ultra",
    description: "Smartphone de última generación con cámara de 108MP y pantalla AMOLED de 120Hz.",
    rating: "4.8",
    reviewCount: "1250",
    category: "Móviles",
    imageUrl: "https://source.unsplash.com/random/300x400?smartphone"
  },
  {
    id: "c2d",
    title: "Laptop Gaming Elite",
    description: "Laptop gaming con RTX 3080, procesador i9 y pantalla de 240Hz.",
    rating: "4.7",
    reviewCount: "980",
    category: "Laptops",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+laptop"
  },
  {
    id: "e3f",
    title: "Auriculares Inalámbricos Premium",
    description: "Auriculares con cancelación de ruido activa y sonido surround 7.1.",
    rating: "4.6",
    reviewCount: "2100",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?headphones"
  },
  {
    id: "g4h",
    title: "Smartwatch Fitness Pro",
    description: "Smartwatch con monitor cardíaco, GPS y resistencia al agua 50m.",
    rating: "4.5",
    reviewCount: "1750",
    category: "Wearables",
    imageUrl: "https://source.unsplash.com/random/300x400?smartwatch"
  },
  {
    id: "i5j",
    title: "Tablet Ultra HD",
    description: "Tablet con pantalla 4K, lápiz digital y teclado desmontable.",
    rating: "4.9",
    reviewCount: "890",
    category: "Tablets",
    imageUrl: "https://source.unsplash.com/random/300x400?tablet"
  },
  {
    id: "k6l",
    title: "Cámara Mirrorless 4K",
    description: "Cámara mirrorless con sensor full frame y grabación 4K 60fps.",
    rating: "4.8",
    reviewCount: "640",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?camera"
  },
  {
    id: "m7n",
    title: "Monitor Curvo Gaming",
    description: "Monitor curvo de 34 pulgadas con 144Hz y FreeSync Premium.",
    rating: "4.7",
    reviewCount: "1120",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+monitor"
  },
  {
    id: "o8p",
    title: "Teclado Mecánico RGB",
    description: "Teclado mecánico con switches Cherry MX y iluminación RGB personalizable.",
    rating: "4.6",
    reviewCount: "2300",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?mechanical+keyboard"
  },
  {
    id: "q9r",
    title: "Ratón Gaming Pro",
    description: "Ratón gaming con sensor óptico de 16000 DPI y 8 botones programables.",
    rating: "4.5",
    reviewCount: "1850",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+mouse"
  },
  {
    id: "s0t",
    title: "Altavoz Bluetooth Premium",
    description: "Altavoz Bluetooth con sonido 360° y resistencia al agua IPX7.",
    rating: "4.8",
    reviewCount: "950",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?bluetooth+speaker"
  },
  {
    id: "u1v",
    title: "Proyector 4K HDR",
    description: "Proyector 4K con HDR10+ y sonido Dolby Atmos integrado.",
    rating: "4.7",
    reviewCount: "720",
    category: "Video",
    imageUrl: "https://source.unsplash.com/random/300x400?projector"
  },
  {
    id: "w2x",
    title: "Disco Duro SSD 2TB",
    description: "SSD NVMe de 2TB con velocidades de lectura de 7000MB/s.",
    rating: "4.9",
    reviewCount: "1500",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?ssd"
  },
  {
    id: "y3z",
    title: "Router WiFi 6",
    description: "Router WiFi 6 con cobertura de hasta 300m² y 8 antenas.",
    rating: "4.6",
    reviewCount: "1100",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?router"
  },
  {
    id: "a4b",
    title: "Impresora 3D Pro",
    description: "Impresora 3D con cama caliente y resolución de 50 micras.",
    rating: "4.5",
    reviewCount: "680",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?3d+printer"
  },
  {
    id: "c5d",
    title: "Drone 4K Pro",
    description: "Drone con cámara 4K, 30 minutos de vuelo y seguimiento automático.",
    rating: "4.8",
    reviewCount: "520",
    category: "Drones",
    imageUrl: "https://source.unsplash.com/random/300x400?drone"
  },
  {
    id: "e6f",
    title: "Consola Gaming Next-Gen",
    description: "Consola de última generación con SSD de 1TB y ray tracing.",
    rating: "4.9",
    reviewCount: "3200",
    category: "Consolas",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+console"
  },
  {
    id: "g7h",
    title: "Controlador Gaming Elite",
    description: "Controlador con gatillos ajustables y paneles traseros intercambiables.",
    rating: "4.7",
    reviewCount: "890",
    category: "Gaming",
    imageUrl: "https://source.unsplash.com/random/300x400?gamepad"
  },
  {
    id: "i8j",
    title: "Micrófono Streaming Pro",
    description: "Micrófono USB con filtro pop y soporte anti-vibración.",
    rating: "4.6",
    reviewCount: "740",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?microphone"
  },
  {
    id: "k9l",
    title: "Webcam 4K Pro",
    description: "Webcam 4K con HDR y seguimiento automático.",
    rating: "4.5",
    reviewCount: "1120",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?webcam"
  },
  {
    id: "m0n",
    title: "Monitor Portátil USB-C",
    description: "Monitor portátil de 15.6 pulgadas con conexión USB-C y HDR.",
    rating: "4.7",
    reviewCount: "680",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?portable+monitor"
  },
  {
    id: "o1p",
    title: "Cargador Inalámbrico Fast",
    description: "Cargador inalámbrico de 15W con ventilación activa.",
    rating: "4.4",
    reviewCount: "2100",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?wireless+charger"
  },
  {
    id: "q2r",
    title: "Power Bank 20000mAh",
    description: "Power bank con carga rápida de 45W y 2 puertos USB-C.",
    rating: "4.6",
    reviewCount: "1850",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?powerbank"
  },
  {
    id: "s3t",
    title: "Adaptador USB-C Hub",
    description: "Hub USB-C con 4 puertos USB-A, HDMI y lector de tarjetas.",
    rating: "4.5",
    reviewCount: "2300",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?usb+hub"
  },
  {
    id: "u4v",
    title: "Estación de Carga Magsafe",
    description: "Estación de carga con soporte Magsafe y carga rápida de 15W.",
    rating: "4.7",
    reviewCount: "950",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?charging+station"
  },
  {
    id: "w5x",
    title: "Funda Smartphone Premium",
    description: "Funda de cuero genuino con soporte para tarjetas y protección militar.",
    rating: "4.3",
    reviewCount: "2800",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?phone+case"
  },
  {
    id: "y6z",
    title: "Tarjeta Gráfica RTX 4090",
    description: "Tarjeta gráfica de última generación con 24GB GDDR6X y ray tracing.",
    rating: "4.9",
    reviewCount: "450",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?graphics+card"
  },
  {
    id: "a7b",
    title: "Procesador Ryzen 9 7950X",
    description: "Procesador de 16 núcleos y 32 hilos con arquitectura Zen 4.",
    rating: "4.8",
    reviewCount: "320",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?processor"
  },
  {
    id: "c8d",
    title: "Memoria RAM DDR5 32GB",
    description: "Kit de memoria RAM DDR5 de 32GB con velocidades de 6000MHz.",
    rating: "4.7",
    reviewCount: "780",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?ram"
  },
  {
    id: "e9f",
    title: "Placa Base X670E",
    description: "Placa base con chipset X670E y soporte para PCIe 5.0.",
    rating: "4.6",
    reviewCount: "420",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?motherboard"
  },
  {
    id: "g0h",
    title: "Fuente de Alimentación 1200W",
    description: "Fuente de alimentación 80+ Platinum con ventilador silencioso.",
    rating: "4.8",
    reviewCount: "560",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?power+supply"
  },
  {
    id: "i1j",
    title: "Disipador CPU AIO 360mm",
    description: "Refrigeración líquida con radiador de 360mm y RGB.",
    rating: "4.7",
    reviewCount: "890",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?cpu+cooler"
  },
  {
    id: "k2l",
    title: "Caja Gaming Full Tower",
    description: "Caja con panel lateral de cristal templado y control RGB.",
    rating: "4.6",
    reviewCount: "670",
    category: "Componentes",
    imageUrl: "https://source.unsplash.com/random/300x400?pc+case"
  },
  {
    id: "m3n",
    title: "Monitor OLED 4K 48\"",
    description: "Monitor OLED con resolución 4K y tasa de refresco de 120Hz.",
    rating: "4.9",
    reviewCount: "230",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?oled+monitor"
  },
  {
    id: "o4p",
    title: "Monitor Ultrawide 49\"",
    description: "Monitor ultrawide con resolución 5120x1440 y 240Hz.",
    rating: "4.8",
    reviewCount: "180",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+monitor"
  },
  {
    id: "q5r",
    title: "Monitor Portátil 17\"",
    description: "Monitor portátil de 17 pulgadas con resolución 4K y HDR.",
    rating: "4.7",
    reviewCount: "340",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?portable+monitor"
  },
  {
    id: "s6t",
    title: "Monitor Curvo 1000R",
    description: "Monitor curvo con radio de 1000R y resolución 3440x1440.",
    rating: "4.6",
    reviewCount: "290",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?curved+monitor"
  },
  {
    id: "u7v",
    title: "Monitor Gaming 360Hz",
    description: "Monitor gaming con tasa de refresco de 360Hz y G-Sync.",
    rating: "4.9",
    reviewCount: "150",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+monitor"
  },
  {
    id: "w8x",
    title: "Monitor Profesional 32\"",
    description: "Monitor profesional con calibración de fábrica y 99% Adobe RGB.",
    rating: "4.8",
    reviewCount: "210",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?professional+monitor"
  },
  {
    id: "y9z",
    title: "Monitor Touch 27\"",
    description: "Monitor táctil con resolución 4K y soporte para lápiz digital.",
    rating: "4.7",
    reviewCount: "180",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+monitor"
  },
  {
    id: "a0b",
    title: "Monitor HDR 1000",
    description: "Monitor con certificación HDR 1000 y 1000 nits de brillo.",
    rating: "4.6",
    reviewCount: "130",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?hdr+monitor"
  },
  {
    id: "c1d",
    title: "Monitor 8K 32\"",
    description: "Monitor con resolución 8K y soporte para HDR10+.",
    rating: "4.9",
    reviewCount: "90",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?8k+monitor"
  },
  {
    id: "e2f",
    title: "Monitor Curvo 1000R 49\"",
    description: "Monitor ultrawide curvo con radio de 1000R y resolución 5120x1440.",
    rating: "4.8",
    reviewCount: "120",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+curved+monitor"
  },
  {
    id: "g3h",
    title: "Monitor Gaming OLED 48\"",
    description: "Monitor gaming OLED con resolución 4K y 120Hz.",
    rating: "4.7",
    reviewCount: "85",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+oled+monitor"
  },
  {
    id: "i4j",
    title: "Monitor Profesional 4K 32\"",
    description: "Monitor profesional con resolución 4K y calibración de fábrica.",
    rating: "4.6",
    reviewCount: "110",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?professional+4k+monitor"
  },
  {
    id: "k5l",
    title: "Monitor Touch 4K 27\"",
    description: "Monitor táctil con resolución 4K y soporte para lápiz digital.",
    rating: "4.5",
    reviewCount: "95",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+4k+monitor"
  },
  {
    id: "m6n",
    title: "Monitor HDR 2000",
    description: "Monitor con certificación HDR 2000 y 2000 nits de brillo.",
    rating: "4.9",
    reviewCount: "75",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?hdr2000+monitor"
  },
  {
    id: "o7p",
    title: "Monitor 8K 48\"",
    description: "Monitor con resolución 8K y soporte para HDR10+.",
    rating: "4.8",
    reviewCount: "60",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?8k+48+monitor"
  },
  {
    id: "q8r",
    title: "Monitor Curvo 1000R 55\"",
    description: "Monitor ultrawide curvo con radio de 1000R y resolución 7680x2160.",
    rating: "4.7",
    reviewCount: "45",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+55+monitor"
  },
  {
    id: "s9t",
    title: "Monitor Gaming OLED 55\"",
    description: "Monitor gaming OLED con resolución 8K y 120Hz.",
    rating: "4.6",
    reviewCount: "40",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+oled+55+monitor"
  },
  {
    id: "t0u",
    title: "Smart TV OLED 65\"",
    description: "Smart TV OLED con resolución 8K, HDR10+ y sistema operativo Android TV.",
    rating: "4.9",
    reviewCount: "320",
    category: "Televisores",
    imageUrl: "https://source.unsplash.com/random/300x400?oled+tv"
  },
  {
    id: "v1w",
    title: "Soundbar 7.1.2",
    description: "Soundbar con Dolby Atmos, subwoofer inalámbrico y tecnología de sonido espacial.",
    rating: "4.8",
    reviewCount: "280",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?soundbar"
  },
  {
    id: "x2y",
    title: "Cámara de Seguridad 4K",
    description: "Cámara de seguridad con visión nocturna, detección de movimiento y almacenamiento en la nube.",
    rating: "4.7",
    reviewCount: "450",
    category: "Seguridad",
    imageUrl: "https://source.unsplash.com/random/300x400?security+camera"
  },
  {
    id: "z3a",
    title: "Robot Aspirador Pro",
    description: "Robot aspirador con mapeo láser, control por app y limpieza automática de mopa.",
    rating: "4.6",
    reviewCount: "890",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?robot+vacuum"
  },
  {
    id: "b4c",
    title: "Aire Acondicionado Smart",
    description: "Aire acondicionado inteligente con WiFi, control por voz y modo eco.",
    rating: "4.5",
    reviewCount: "670",
    category: "Climatización",
    imageUrl: "https://source.unsplash.com/random/300x400?air+conditioner"
  },
  {
    id: "d5e",
    title: "Purificador de Aire HEPA",
    description: "Purificador de aire con filtro HEPA, sensor de calidad del aire y modo nocturno silencioso.",
    rating: "4.8",
    reviewCount: "420",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?air+purifier"
  },
  {
    id: "f6g",
    title: "Cafetera Expresso Automática",
    description: "Cafetera expresso con molinillo integrado, espumador de leche y 15 niveles de molienda.",
    rating: "4.7",
    reviewCount: "530",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?espresso+machine"
  },
  {
    id: "h7i",
    title: "Batidora Profesional",
    description: "Batidora de 1500W con 12 velocidades, vaso de cristal y accesorios para múltiples usos.",
    rating: "4.6",
    reviewCount: "780",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?blender"
  },
  {
    id: "j8k",
    title: "Horno Inteligente",
    description: "Horno con control WiFi, 12 modos de cocción y limpieza pirolítica.",
    rating: "4.9",
    reviewCount: "310",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+oven"
  },
  {
    id: "l9m",
    title: "Lavadora Smart",
    description: "Lavadora con carga frontal, 10kg de capacidad y control por app.",
    rating: "4.8",
    reviewCount: "460",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?washing+machine"
  },
  {
    id: "n0o",
    title: "Secadora Heat Pump",
    description: "Secadora con bomba de calor, sensor de humedad y 8kg de capacidad.",
    rating: "4.7",
    reviewCount: "290",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?dryer"
  },
  {
    id: "p1q",
    title: "Lavavajillas Integrable",
    description: "Lavavajillas con 14 cubiertos, programa eco y display LED.",
    rating: "4.6",
    reviewCount: "380",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?dishwasher"
  },
  {
    id: "r2s",
    title: "Frigorífico No Frost",
    description: "Frigorífico combi con tecnología No Frost y dispensador de agua y hielo.",
    rating: "4.9",
    reviewCount: "240",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?refrigerator"
  },
  {
    id: "t3u",
    title: "Vitrocerámica Inducción",
    description: "Placa de inducción con 4 zonas de cocción y control táctil.",
    rating: "4.8",
    reviewCount: "520",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?induction+cooktop"
  },
  {
    id: "v4w",
    title: "Microondas Grill",
    description: "Microondas con función grill, 25L de capacidad y 10 niveles de potencia.",
    rating: "4.7",
    reviewCount: "410",
    category: "Electrodomésticos",
    imageUrl: "https://source.unsplash.com/random/300x400?microwave"
  },
  {
    id: "x5y",
    title: "Aspirador Sin Cable",
    description: "Aspirador inalámbrico con 45 minutos de autonomía y filtro HEPA.",
    rating: "4.6",
    reviewCount: "630",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?cordless+vacuum"
  },
  {
    id: "z6a",
    title: "Plancha de Vapor",
    description: "Plancha de vapor con 2400W de potencia y sistema anti-cal.",
    rating: "4.5",
    reviewCount: "570",
    category: "Hogar",
    imageUrl: "https://source.unsplash.com/random/300x400?steam+iron"
  },
  {
    id: "b7c",
    title: "Cepillo Dental Eléctrico",
    description: "Cepillo dental con 5 modos de limpieza y temporizador de 2 minutos.",
    rating: "4.8",
    reviewCount: "890",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?electric+toothbrush"
  },
  {
    id: "d8e",
    title: "Máquina de Afeitar",
    description: "Máquina de afeitar con 5 hojas y sistema de limpieza automática.",
    rating: "4.7",
    reviewCount: "720",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?electric+razor"
  },
  {
    id: "f9g",
    title: "Secador de Pelo Profesional",
    description: "Secador de pelo con 2000W, 3 velocidades y 2 temperaturas.",
    rating: "4.6",
    reviewCount: "480",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?hair+dryer"
  },
  {
    id: "h0i",
    title: "Plancha de Pelo",
    description: "Plancha de pelo con placas de cerámica y temperatura ajustable.",
    rating: "4.5",
    reviewCount: "560",
    category: "Cuidado Personal",
    imageUrl: "https://source.unsplash.com/random/300x400?hair+straightener"
  },
  {
    id: "j1k",
    title: "Báscula Inteligente",
    description: "Báscula con medición de grasa corporal y sincronización con apps de fitness.",
    rating: "4.8",
    reviewCount: "340",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+scale"
  },
  {
    id: "l2m",
    title: "Tensiómetro Digital",
    description: "Tensiómetro de brazo con detección de arritmia y memoria para 2 usuarios.",
    rating: "4.7",
    reviewCount: "290",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?blood+pressure+monitor"
  },
  {
    id: "n3o",
    title: "Termómetro Digital",
    description: "Termómetro digital con medición en 1 segundo y memoria de últimas lecturas.",
    rating: "4.6",
    reviewCount: "420",
    category: "Salud",
    imageUrl: "https://source.unsplash.com/random/300x400?digital+thermometer"
  },
  {
    id: "p4q",
    title: "Masajeador Eléctrico",
    description: "Masajeador con 6 cabezales intercambiables y 3 niveles de intensidad.",
    rating: "4.5",
    reviewCount: "380",
    category: "Bienestar",
    imageUrl: "https://source.unsplash.com/random/300x400?massager"
  },
  {
    id: "d9e",
    title: "Monitor Gaming Curvo 49\"",
    description: "Monitor super ultra wide con resolución 5120x1440 y 240Hz.",
    rating: "4.9",
    reviewCount: "420",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?ultrawide+monitor"
  },
  {
    id: "f0g",
    title: "Teclado Mecánico 60%",
    description: "Teclado compacto con switches hot-swappable y RGB.",
    rating: "4.7",
    reviewCount: "890",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?60+keyboard"
  },
  {
    id: "h1i",
    title: "Mouse Pad Gaming XL",
    description: "Alfombrilla de ratón con superficie de control y base antideslizante.",
    rating: "4.5",
    reviewCount: "1200",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?mousepad"
  },
  {
    id: "j2k",
    title: "Auriculares Gaming 7.1",
    description: "Auriculares con sonido surround virtual y micrófono retráctil.",
    rating: "4.6",
    reviewCount: "1500",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+headset"
  },
  {
    id: "l3m",
    title: "Webcam 1080p Pro",
    description: "Webcam con autofoco y micrófono con cancelación de ruido.",
    rating: "4.4",
    reviewCount: "980",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?webcam+pro"
  },
  {
    id: "n4o",
    title: "Micrófono USB Condensador",
    description: "Micrófono de estudio con patrón polar cardioide.",
    rating: "4.8",
    reviewCount: "670",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?condenser+mic"
  },
  {
    id: "p5q",
    title: "Monitor Vertical 27\"",
    description: "Monitor con rotación 90° y resolución 2K.",
    rating: "4.6",
    reviewCount: "540",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?vertical+monitor"
  },
  {
    id: "r6s",
    title: "Hub USB-C 8 en 1",
    description: "Hub con puertos USB-C, HDMI, Ethernet y SD.",
    rating: "4.5",
    reviewCount: "1100",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?usb+c+hub"
  },
  {
    id: "t7u",
    title: "Cargador GaN 100W",
    description: "Cargador compacto con 4 puertos y carga rápida.",
    rating: "4.7",
    reviewCount: "850",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?gan+charger"
  },
  {
    id: "v8w",
    title: "SSD Externo 2TB",
    description: "SSD portátil con USB 3.2 y resistencia al agua.",
    rating: "4.8",
    reviewCount: "720",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?external+ssd"
  },
  {
    id: "x9y",
    title: "Router Mesh WiFi 6",
    description: "Sistema mesh con cobertura de hasta 500m².",
    rating: "4.6",
    reviewCount: "430",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?mesh+router"
  },
  {
    id: "z0a",
    title: "Switch Gaming 8 Puertos",
    description: "Switch con priorización de tráfico gaming.",
    rating: "4.5",
    reviewCount: "290",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?network+switch"
  },
  {
    id: "b1c",
    title: "NAS 4 Bahías",
    description: "NAS con RAID y procesador Intel.",
    rating: "4.7",
    reviewCount: "380",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?nas"
  },
  {
    id: "d2e",
    title: "Impresora Láser Color",
    description: "Impresora con WiFi y escáner integrado.",
    rating: "4.4",
    reviewCount: "560",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?laser+printer"
  },
  {
    id: "f3g",
    title: "Escáner Documentos",
    description: "Escáner automático con alimentador de documentos.",
    rating: "4.6",
    reviewCount: "410",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?document+scanner"
  },
  {
    id: "h4i",
    title: "Drone Mini 4K",
    description: "Drone compacto con cámara 4K y control por gestos.",
    rating: "4.5",
    reviewCount: "890",
    category: "Drones",
    imageUrl: "https://source.unsplash.com/random/300x400?mini+drone"
  },
  {
    id: "j5k",
    title: "Gimbal 3 Ejes",
    description: "Gimbal estabilizador para smartphones y cámaras.",
    rating: "4.7",
    reviewCount: "620",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?gimbal"
  },
  {
    id: "l6m",
    title: "Cámara Acción 4K",
    description: "Cámara resistente al agua con estabilización electrónica.",
    rating: "4.8",
    reviewCount: "780",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?action+camera"
  },
  {
    id: "n7o",
    title: "Micrófono Lavalier",
    description: "Micrófono de solapa con transmisión inalámbrica.",
    rating: "4.6",
    reviewCount: "450",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?lavalier+mic"
  },
  {
    id: "p8q",
    title: "Monitor Curvo 34\"",
    description: "Monitor ultrawide con resolución 3440x1440.",
    rating: "4.7",
    reviewCount: "520",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?curved+monitor"
  },
  {
    id: "r9s",
    title: "Teclado Split Ergonómico",
    description: "Teclado dividido con reposamuñecas integrado.",
    rating: "4.5",
    reviewCount: "380",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?ergonomic+keyboard"
  },
  {
    id: "t0u",
    title: "Ratón Vertical",
    description: "Ratón ergonómico con diseño vertical.",
    rating: "4.6",
    reviewCount: "420",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?vertical+mouse"
  },
  {
    id: "v1w",
    title: "Tableta Gráfica Pro",
    description: "Tableta con pantalla 4K y lápiz sin batería.",
    rating: "4.8",
    reviewCount: "290",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?drawing+tablet"
  },
  {
    id: "x2y",
    title: "Monitor Touch 24\"",
    description: "Monitor táctil con resolución Full HD.",
    rating: "4.4",
    reviewCount: "340",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+monitor"
  },
  {
    id: "z3a",
    title: "Cámara Web 360°",
    description: "Cámara con visión de 360° y seguimiento automático.",
    rating: "4.7",
    reviewCount: "210",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?360+camera"
  },
  {
    id: "b4c",
    title: "Altavoz Smart",
    description: "Altavoz con asistente de voz y sonido 360°.",
    rating: "4.6",
    reviewCount: "780",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+speaker"
  },
  {
    id: "d5e",
    title: "Auriculares True Wireless",
    description: "Auriculares con cancelación de ruido y carga inalámbrica.",
    rating: "4.8",
    reviewCount: "950",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?true+wireless"
  },
  {
    id: "f6g",
    title: "Cargador Magsafe Duo",
    description: "Cargador para iPhone y Apple Watch.",
    rating: "4.5",
    reviewCount: "620",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?magsafe+duo"
  },
  {
    id: "h7i",
    title: "Power Bank Solar",
    description: "Power bank con panel solar integrado.",
    rating: "4.4",
    reviewCount: "430",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?solar+powerbank"
  },
  {
    id: "j8k",
    title: "Hub Thunderbolt 4",
    description: "Hub con 4 puertos Thunderbolt 4.",
    rating: "4.7",
    reviewCount: "290",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?thunderbolt+hub"
  },
  {
    id: "abc123",
    title: "Monitor Gaming 240Hz",
    description: "Monitor gaming con resolución 2K y tasa de refresco de 240Hz.",
    rating: "4.8",
    reviewCount: "890",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+monitor"
  },
  {
    id: "xyz789",
    title: "Teclado Mecánico 65%",
    description: "Teclado compacto con switches hot-swappable y RGB.",
    rating: "4.7",
    reviewCount: "1200",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?mechanical+keyboard"
  },
  {
    id: "123abc",
    title: "Mouse Pad XL",
    description: "Alfombrilla de ratón con superficie de control y base antideslizante.",
    rating: "4.5",
    reviewCount: "1500",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?mousepad"
  },
  {
    id: "456def",
    title: "Auriculares Gaming 7.1",
    description: "Auriculares con sonido surround virtual y micrófono retráctil.",
    rating: "4.6",
    reviewCount: "2100",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+headset"
  },
  {
    id: "789ghi",
    title: "Webcam 1080p",
    description: "Webcam con autofoco y micrófono con cancelación de ruido.",
    rating: "4.4",
    reviewCount: "980",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?webcam"
  },
  {
    id: "jkl456",
    title: "Micrófono USB",
    description: "Micrófono de estudio con patrón polar cardioide.",
    rating: "4.8",
    reviewCount: "670",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?microphone"
  },
  {
    id: "mno789",
    title: "Monitor Vertical",
    description: "Monitor con rotación 90° y resolución 2K.",
    rating: "4.6",
    reviewCount: "540",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?vertical+monitor"
  },
  {
    id: "pqr123",
    title: "Hub USB-C",
    description: "Hub con puertos USB-C, HDMI, Ethernet y SD.",
    rating: "4.5",
    reviewCount: "1100",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?usb+hub"
  },
  {
    id: "stu456",
    title: "Cargador GaN",
    description: "Cargador compacto con 4 puertos y carga rápida.",
    rating: "4.7",
    reviewCount: "850",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?gan+charger"
  },
  {
    id: "vwx789",
    title: "SSD Externo",
    description: "SSD portátil con USB 3.2 y resistencia al agua.",
    rating: "4.8",
    reviewCount: "720",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?external+ssd"
  },
  {
    id: "yza123",
    title: "Router Mesh",
    description: "Sistema mesh con cobertura de hasta 500m².",
    rating: "4.6",
    reviewCount: "430",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?mesh+router"
  },
  {
    id: "bcd456",
    title: "Switch Gaming",
    description: "Switch con priorización de tráfico gaming.",
    rating: "4.5",
    reviewCount: "290",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?network+switch"
  },
  {
    id: "efg789",
    title: "NAS 4 Bahías",
    description: "NAS con RAID y procesador Intel.",
    rating: "4.7",
    reviewCount: "380",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?nas"
  },
  {
    id: "hij123",
    title: "Impresora Láser",
    description: "Impresora con WiFi y escáner integrado.",
    rating: "4.4",
    reviewCount: "560",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?laser+printer"
  },
  {
    id: "klm456",
    title: "Escáner Documentos",
    description: "Escáner automático con alimentador de documentos.",
    rating: "4.6",
    reviewCount: "410",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?document+scanner"
  },
  {
    id: "nop789",
    title: "Drone Mini",
    description: "Drone compacto con cámara 4K y control por gestos.",
    rating: "4.5",
    reviewCount: "890",
    category: "Drones",
    imageUrl: "https://source.unsplash.com/random/300x400?mini+drone"
  },
  {
    id: "qrs123",
    title: "Gimbal 3 Ejes",
    description: "Gimbal estabilizador para smartphones y cámaras.",
    rating: "4.7",
    reviewCount: "620",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?gimbal"
  },
  {
    id: "tuv456",
    title: "Cámara Acción",
    description: "Cámara resistente al agua con estabilización electrónica.",
    rating: "4.8",
    reviewCount: "780",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?action+camera"
  },
  {
    id: "wxy789",
    title: "Micrófono Lavalier",
    description: "Micrófono de solapa con transmisión inalámbrica.",
    rating: "4.6",
    reviewCount: "450",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?lavalier+mic"
  },
  {
    id: "zab123",
    title: "Monitor Curvo",
    description: "Monitor ultrawide con resolución 3440x1440.",
    rating: "4.7",
    reviewCount: "520",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?curved+monitor"
  },
  {
    id: "cde456",
    title: "Teclado Split",
    description: "Teclado dividido con reposamuñecas integrado.",
    rating: "4.5",
    reviewCount: "380",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?ergonomic+keyboard"
  },
  {
    id: "fgh789",
    title: "Ratón Vertical",
    description: "Ratón ergonómico con diseño vertical.",
    rating: "4.6",
    reviewCount: "420",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?vertical+mouse"
  },
  {
    id: "ijk123",
    title: "Tableta Gráfica",
    description: "Tableta con pantalla 4K y lápiz sin batería.",
    rating: "4.8",
    reviewCount: "290",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?drawing+tablet"
  },
  {
    id: "lmn456",
    title: "Monitor Touch",
    description: "Monitor táctil con resolución Full HD.",
    rating: "4.4",
    reviewCount: "340",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?touch+monitor"
  },
  {
    id: "opq789",
    title: "Cámara Web 360°",
    description: "Cámara con visión de 360° y seguimiento automático.",
    rating: "4.7",
    reviewCount: "210",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?360+camera"
  },
  {
    id: "rst123",
    title: "Altavoz Smart",
    description: "Altavoz con asistente de voz y sonido 360°.",
    rating: "4.6",
    reviewCount: "780",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?smart+speaker"
  },
  {
    id: "uvw456",
    title: "Auriculares True Wireless",
    description: "Auriculares con cancelación de ruido y carga inalámbrica.",
    rating: "4.8",
    reviewCount: "950",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?true+wireless"
  },
  {
    id: "xyz789",
    title: "Cargador Magsafe",
    description: "Cargador para iPhone y Apple Watch.",
    rating: "4.5",
    reviewCount: "620",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?magsafe+charger"
  },
  {
    id: "123abc",
    title: "Power Bank Solar",
    description: "Power bank con panel solar integrado.",
    rating: "4.4",
    reviewCount: "430",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?solar+powerbank"
  },
  {
    id: "456abc",
    title: "Hub Thunderbolt",
    description: "Hub con 4 puertos Thunderbolt 4.",
    rating: "4.7",
    reviewCount: "290",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?thunderbolt+hub"
  },
  {
    id: "789def",
    title: "Monitor OLED",
    description: "Monitor OLED con resolución 4K y 120Hz.",
    rating: "4.9",
    reviewCount: "450",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?oled+monitor"
  },
  {
    id: "abc456",
    title: "Teclado Gaming",
    description: "Teclado gaming con switches mecánicos y RGB.",
    rating: "4.7",
    reviewCount: "890",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+keyboard"
  },
  {
    id: "def789",
    title: "Mouse Gaming",
    description: "Mouse gaming con sensor óptico de alta precisión.",
    rating: "4.6",
    reviewCount: "1200",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+mouse"
  },
  {
    id: "ghi123",
    title: "Auriculares Bluetooth",
    description: "Auriculares con cancelación de ruido y 30h de batería.",
    rating: "4.8",
    reviewCount: "1500",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?bluetooth+headphones"
  },
  {
    id: "jkl456",
    title: "Webcam Pro",
    description: "Webcam profesional con HDR y seguimiento facial.",
    rating: "4.5",
    reviewCount: "780",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+webcam"
  },
  {
    id: "mno789",
    title: "Micrófono Studio",
    description: "Micrófono de estudio con patrón polar ajustable.",
    rating: "4.7",
    reviewCount: "420",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?studio+mic"
  },
  {
    id: "pqr123",
    title: "Monitor 4K",
    description: "Monitor 4K con HDR y 144Hz.",
    rating: "4.8",
    reviewCount: "650",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?4k+monitor"
  },
  {
    id: "stu456",
    title: "Hub USB",
    description: "Hub USB con 7 puertos y carga rápida.",
    rating: "4.6",
    reviewCount: "890",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?usb+hub"
  },
  {
    id: "vwx789",
    title: "Cargador Múltiple",
    description: "Cargador con 4 puertos y carga rápida de 100W.",
    rating: "4.7",
    reviewCount: "540",
    category: "Accesorios",
    imageUrl: "https://source.unsplash.com/random/300x400?multi+charger"
  },
  {
    id: "yza123",
    title: "SSD NVMe",
    description: "SSD NVMe de 2TB con velocidades de 7000MB/s.",
    rating: "4.9",
    reviewCount: "780",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?nvme+ssd"
  },
  {
    id: "bcd456",
    title: "Router Gaming",
    description: "Router gaming con QoS y priorización de tráfico.",
    rating: "4.6",
    reviewCount: "320",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+router"
  },
  {
    id: "efg789",
    title: "Switch Gaming",
    description: "Switch gaming con 8 puertos y QoS.",
    rating: "4.5",
    reviewCount: "210",
    category: "Redes",
    imageUrl: "https://source.unsplash.com/random/300x400?gaming+switch"
  },
  {
    id: "hij123",
    title: "NAS Pro",
    description: "NAS con 4 bahías y procesador Intel.",
    rating: "4.7",
    reviewCount: "180",
    category: "Almacenamiento",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+nas"
  },
  {
    id: "klm456",
    title: "Impresora 3D Pro",
    description: "Impresora 3D con cama caliente y resolución de 50 micras.",
    rating: "4.8",
    reviewCount: "290",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?3d+printer"
  },
  {
    id: "nop789",
    title: "Escáner Pro",
    description: "Escáner profesional con alimentador automático.",
    rating: "4.6",
    reviewCount: "150",
    category: "Impresión",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+scanner"
  },
  {
    id: "qrs123",
    title: "Drone Pro",
    description: "Drone profesional con cámara 4K y seguimiento.",
    rating: "4.7",
    reviewCount: "420",
    category: "Drones",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+drone"
  },
  {
    id: "tuv456",
    title: "Gimbal Pro",
    description: "Gimbal profesional con seguimiento facial.",
    rating: "4.8",
    reviewCount: "310",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+gimbal"
  },
  {
    id: "wxy789",
    title: "Cámara Pro",
    description: "Cámara profesional con sensor full frame.",
    rating: "4.9",
    reviewCount: "280",
    category: "Fotografía",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+camera"
  },
  {
    id: "zab123",
    title: "Micrófono Pro",
    description: "Micrófono profesional con patrón polar ajustable.",
    rating: "4.7",
    reviewCount: "190",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+microphone"
  },
  {
    id: "cde456",
    title: "Monitor Pro",
    description: "Monitor profesional con calibración de fábrica.",
    rating: "4.8",
    reviewCount: "340",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+monitor"
  },
  {
    id: "fgh789",
    title: "Teclado Pro",
    description: "Teclado profesional con switches mecánicos.",
    rating: "4.6",
    reviewCount: "420",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+keyboard"
  },
  {
    id: "ijk123",
    title: "Mouse Pro",
    description: "Mouse profesional con sensor de alta precisión.",
    rating: "4.7",
    reviewCount: "380",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+mouse"
  },
  {
    id: "lmn456",
    title: "Auriculares Pro",
    description: "Auriculares profesionales con cancelación de ruido.",
    rating: "4.8",
    reviewCount: "290",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+headphones"
  },
  {
    id: "opq789",
    title: "Webcam Pro",
    description: "Webcam profesional con HDR y seguimiento.",
    rating: "4.6",
    reviewCount: "210",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+webcam"
  },
  {
    id: "rst123",
    title: "Monitor Gaming Pro",
    description: "Monitor gaming profesional con 240Hz.",
    rating: "4.9",
    reviewCount: "180",
    category: "Monitores",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+gaming+monitor"
  },
  {
    id: "uvw456",
    title: "Teclado Gaming Pro",
    description: "Teclado gaming profesional con switches mecánicos.",
    rating: "4.7",
    reviewCount: "250",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+gaming+keyboard"
  },
  {
    id: "xyz789",
    title: "Mouse Gaming Pro",
    description: "Mouse gaming profesional con sensor óptico.",
    rating: "4.8",
    reviewCount: "190",
    category: "Periféricos",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+gaming+mouse"
  },
  {
    id: "123abc",
    title: "Auriculares Gaming Pro",
    description: "Auriculares gaming profesionales con sonido surround.",
    rating: "4.7",
    reviewCount: "230",
    category: "Audio",
    imageUrl: "https://source.unsplash.com/random/300x400?pro+gaming+headset"
  }
];

export default products; 