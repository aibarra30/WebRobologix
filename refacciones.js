// Robologix Automation - Lógica de Refacciones y Cotizador WhatsApp
const WHATSAPP_PHONE = '528444551869'; // WhatsApp oficial Robologix (+52 844 455 1869)

// Catálogo base de refacciones (disponible tanto en servidor web como en local file://)
const defaultProducts = [
  {
    "id": "RBL-000A",
    "sku": "A02B-0303-K150",
    "marca": "FANUC",
    "categoria": "Robótica Industrial",
    "nombre": "Adaptador Tarjetero Compact Flash FANUC CF Card (PCMCIA)",
    "descripcion": "Adaptador de tarjeta CF a ranura PCMCIA modelo A02B-0303-K150 para carga/descarga de programas, respaldo de parámetros e imágenes del sistema en controles CNC FANUC (Series 0i-MD, 0i-TD, 31i) y robots industriales FANUC.",
    "condicion": "Nuevo Sellado Antiestático",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/A02B-0303-K150.png",
    "tags": [
      "fanuc",
      "a02b-0303-k150",
      "tarjetero",
      "cf card",
      "pcmcia",
      "cnc",
      "0i-md",
      "robotica"
    ]
  },
  {
    "id": "RBL-000B",
    "sku": "A98L-0031-0026",
    "marca": "FANUC",
    "categoria": "Robótica Industrial",
    "nombre": "Batería de Litio 3V 1750mAh FANUC PLC / CNC y Robótica (A98L-0031-0026)",
    "descripcion": "Batería de litio de respaldo 3V 1750mAh modelo A98L-0031-0026 (formato prismático compacto con conector original y clip de sujeción). Mantiene el funcionamiento estable, protección de memoria SRAM, parámetros de maquinado y posición de encoders en controles CNC FANUC (Series 0i, 16i, 18i, 21i, 30i, 31i) y controladores de robots FANUC (R-30iA / R-30iB). Venta por pieza con fecha reciente.",
    "condicion": "Nueva (Fecha Reciente)",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Carga y Funcionamiento",
    "imagen": "assets/refacciones/A98L-0031-0026.png",
    "tags": [
      "fanuc",
      "a98l-0031-0026",
      "a98l00310026",
      "bateria fanuc",
      "litio",
      "3v",
      "1750mah",
      "cnc",
      "plc",
      "robotica",
      "encoder",
      "sram",
      "r-30ib",
      "0i-md"
    ]
  },
  {
    "id": "RBL-000C",
    "sku": "3HAC051036-001",
    "marca": "ABB",
    "categoria": "Robótica Industrial",
    "nombre": "Batería de Litio SAFT 3.6V 7.2Ah (7200mAh) para Robot ABB (3HAC051036-001 / REV02)",
    "descripcion": "Batería de litio SAFT de alta capacidad 3.6V 7.2Ah / 7200mAh (1S2P LS17500) modelo 3HAC051036-001 REV02 / 3HAC051036-001-C con arnés y conector original para controladores y brazos robóticos ABB (IRB 120, IRB 1200, IRB 910SC, IRC5 / OmniCore). Mantiene la calibración de la placa SMB y contadores de revolución evitando la pérdida de sincronización de ejes.",
    "condicion": "Nueva Sellada con Conector Original",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Carga y Funcionamiento",
    "imagen": "assets/refacciones/3HAC051036-001.png",
    "tags": [
      "abb",
      "3hac051036-001",
      "3hac051036",
      "3hac051036-001-c",
      "rev02",
      "bateria robot abb",
      "irb 120",
      "irb 1200",
      "irb 910sc",
      "saft",
      "7200mah",
      "ls17500",
      "smb",
      "robotica"
    ]
  },
  {
    "id": "RBL-001",
    "sku": "1769-L33ER",
    "marca": "Allen-Bradley",
    "categoria": "PLC y Controladores",
    "nombre": "Controlador CompactLogix 5370 L33ER",
    "descripcion": "Procesador CompactLogix con 2 MB de memoria, puertos duales EtherNet/IP DLR, soporte para 16 módulos de I/O locales y hasta 32 nodos Ethernet.",
    "condicion": "Nuevo Sellado en Caja",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "12 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-001_1769-L33ER.png",
    "tags": [
      "rockwell",
      "allen-bradley",
      "compactlogix",
      "ethernet/ip",
      "plc"
    ]
  },
  {
    "id": "RBL-002",
    "sku": "6ES7515-2AM02-0AB0",
    "marca": "Siemens",
    "categoria": "PLC y Controladores",
    "nombre": "CPU SIMATIC S7-1500 1515-2 PN",
    "descripcion": "Unidad central de procesamiento con pantalla display integrada, memoria de trabajo 500 KB código / 3 MB datos, 2 interfaces PROFINET (puerto 2x RJ45 switch + 1x RJ45 independiente).",
    "condicion": "Nuevo Sellado en Caja",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "12 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-002_6ES7515-2AM02-0A.png",
    "tags": [
      "siemens",
      "s7-1500",
      "tia portal",
      "profinet",
      "cpu"
    ]
  },
  {
    "id": "RBL-003",
    "sku": "1747-L552",
    "marca": "Allen-Bradley",
    "categoria": "PLC Legacy (Obsoletos)",
    "nombre": "Procesador SLC 5/05 32K Memoria",
    "descripcion": "Procesador modular SLC 500 con puerto Ethernet integrado y puerto RS-232. Probado 100% en banco con respaldo y batería nueva. Ideal para paros de emergencia en líneas legacy.",
    "condicion": "Seminuevo / Probado en Banco",
    "stock": "Disponible (Stock Crítico)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "6 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-003_1747-L552.png",
    "tags": [
      "rockwell",
      "slc 500",
      "legacy",
      "obsoleto",
      "1747-l552"
    ]
  },
  {
    "id": "RBL-004",
    "sku": "A06B-6114-H104",
    "marca": "FANUC",
    "categoria": "Robótica Industrial",
    "nombre": "Servomódulo SVM1-40i FANUC Alpha i",
    "descripcion": "Amplificador servo de 1 eje serie Alpha i para robots FANUC serie R-2000i / M-710iC. Probado bajo carga con parámetros de fábrica.",
    "condicion": "Reacondicionado Grado A",
    "stock": "Bajo Pedido Exprés (3-5 días)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "6 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-004_A06B-6114-H104.png",
    "tags": [
      "fanuc",
      "robotica",
      "servo amplificador",
      "alpha i",
      "a06b"
    ]
  },
  {
    "id": "RBL-005",
    "sku": "2711P-T10C22D9P",
    "marca": "Allen-Bradley",
    "categoria": "HMI y Pantallas",
    "nombre": "Panel HMI PanelView Plus 7 Performance 10.4\"",
    "descripcion": "Terminal gráfica de operador con pantalla táctil a color de 10.4 pulgadas, comunicación dual Ethernet con soporte DLR, alimentación 24V DC.",
    "condicion": "Nuevo en Caja",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "12 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-005_2711P-T10C22D9P.png",
    "tags": [
      "rockwell",
      "panelview",
      "hmi",
      "touch",
      "factorytalk"
    ]
  },
  {
    "id": "RBL-006",
    "sku": "20G1AND027AA0NNNNN",
    "marca": "Allen-Bradley",
    "categoria": "Variadores y Servos",
    "nombre": "Variador de Frecuencia PowerFlex 755 20 HP",
    "descripcion": "Inversor AC PowerFlex 755, 480V AC 3 fases, 27 Amperes, 20 HP / 15 kW, puerto Ethernet/IP integrado, control vectorial.",
    "condicion": "Nuevo Sellado",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "12 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-006_20G1AND027AA0NNN.png",
    "tags": [
      "powerflex",
      "variador",
      "vfd",
      "rockwell",
      "inversor"
    ]
  },
  {
    "id": "RBL-007",
    "sku": "IS5400-00",
    "marca": "Cognex",
    "categoria": "Visión Artificial y Sensores",
    "nombre": "Cámara de Visión Artificial Cognex In-Sight 5400",
    "descripcion": "Sistema de visión industrial autónomo con sensor monocromático de alta velocidad (640x480), carcasa IP67, conectividad Ethernet e interfaz para PLC.",
    "condicion": "Probado en Banco 100%",
    "stock": "Disponible (Stock Local)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "6 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-007_IS5400-00.png",
    "tags": [
      "cognex",
      "vision artificial",
      "in-sight",
      "camara",
      "inspeccion"
    ]
  },
  {
    "id": "RBL-008",
    "sku": "VUVG-L10-M52-MT-M5-1P3",
    "marca": "Festo",
    "categoria": "Neumática e IO-Link",
    "nombre": "Válvula Solenoide Festo Compacta 5/2 Vías",
    "descripcion": "Electroválvula direccional Festo serie VUVG, monoestable, conexión M5, 24V DC con piloto LED integrado y conexión rápida.",
    "condicion": "Nuevo en Empaque Original",
    "stock": "Disponible (+10 piezas)",
    "precio": 0,
    "moneda": "USD",
    "garantia": "12 Meses",
    "imagen": "assets/refacciones/SPEC_RBL-008_VUVG-L10-M52-MT-.png",
    "tags": [
      "festo",
      "neumatica",
      "valvula",
      "solenoide",
      "24v"
    ]
  },
  {
    "id": "RBL-009",
    "sku": "HM602-FORLIGHTING",
    "marca": "FORLIGHTING",
    "categoria": "Iluminación Industrial",
    "nombre": "Lámpara Industrial FORLIGHTING 13,000 Lúmenes",
    "descripcion": "Lámpara industrial de alta potencia FORLIGHTING de 13,000 lúmenes. Ideal para plantas industriales, bodegas y áreas de producción. No incluye instalación. Ref. cliente: HM602.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-009_HM602-FORLIGHTIN.png",
    "tags": [
      "forlighting",
      "lampara",
      "luminaria",
      "industrial",
      "led",
      "13000 lumenes",
      "iluminacion",
      "hm602"
    ]
  },
  {
    "id": "RBL-010",
    "sku": "HM604-FLEXIO-BASE",
    "marca": "s/d",
    "categoria": "PLC y Controladores",
    "nombre": "Base para Montaje FLEX I-O Serie A",
    "descripcion": "Base para montaje de módulos FLEX I-O Serie A de Allen-Bradley. Condición nueva sin caja. Ref. cliente: HM604.",
    "condicion": "Nuevo, sin caja",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-010_HM604-FLEXIO-BAS.png",
    "tags": [
      "flex i-o",
      "allen-bradley",
      "rockwell",
      "base montaje",
      "serie a",
      "plc",
      "hm604"
    ]
  },
  {
    "id": "RBL-011",
    "sku": "PV270R1D3T1NMMC4747",
    "marca": "Parker Hannifin",
    "categoria": "Hidráulica e Neumática",
    "nombre": "Bomba de Pistones Variable Parker Serie PV 270 cc/rev – Montaje SAE",
    "descripcion": "Bomba de pistones axiales de desplazamiento variable Parker PVplus, 270 cc/rev, con montaje SAE, hasta 350 bar continuo / 420 bar intermitente. Diseñada para prensas, grúas y aplicaciones de alta demanda. Cotizado en stock.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/PV270.png",
    "tags": [
      "parker",
      "parker hannifin",
      "pv270",
      "bomba pistones",
      "hidraulica",
      "sae",
      "variable displacement",
      "pvplus"
    ]
  },
  {
    "id": "RBL-012",
    "sku": "11019-A-SE-B",
    "marca": "GUSHER",
    "categoria": "Hidráulica e Neumática",
    "nombre": "Bomba GUSHER 185 GPM 50 PSI – Acero Inoxidable",
    "descripcion": "Bomba centrífuga GUSHER de 185 GPM a 50 PSI, cuerpo en acero inoxidable, descarga 1-1/2\" NPT. Ideal para líquidos corrosivos y aplicaciones industriales de proceso.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-012_11019-A-SE-B.png",
    "tags": [
      "gusher",
      "bomba centrifuga",
      "185 gpm",
      "50 psi",
      "acero inoxidable",
      "npt",
      "proceso industrial"
    ]
  },
  {
    "id": "RBL-013",
    "sku": "1.12NLP40.75",
    "marca": "s/d",
    "categoria": "Hidráulica e Neumática",
    "nombre": "Cilindro Compacto Doble Efecto Serie LP – 1-1/8\" x 3/4\" Carrera",
    "descripcion": "Cilindro neumático compacto de doble efecto, serie LP, diámetro 1-1/8\", carrera 3/4\". Diseño compacto para espacios reducidos. Cotizado en stock.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-013_1_12NLP40_75.png",
    "tags": [
      "cilindro",
      "neumatico",
      "doble efecto",
      "compacto",
      "serie lp",
      "1.12nlp40.75"
    ]
  },
  {
    "id": "RBL-014",
    "sku": "6220-2Z",
    "marca": "SKF",
    "categoria": "Rodamientos y Transmisión",
    "nombre": "Rodamiento Rígido de Bolas SKF 6220-2Z (100x180x34 mm)",
    "descripcion": "Rodamiento rígido de bolas de hilera simple con escudos metálicos en ambos lados (2Z). Diámetro interior 100 mm, exterior 180 mm, ancho 34 mm. Alta velocidad, bajo ruido y vibración. Condición: Nuevo.",
    "condicion": "Nuevo",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/6220-2Z.png",
    "tags": [
      "skf",
      "rodamiento",
      "balero",
      "6220-2z",
      "6220",
      "bolas",
      "100mm",
      "180mm",
      "bearing"
    ]
  },
  {
    "id": "RBL-015",
    "sku": "3HAC7998-2",
    "marca": "ABB",
    "categoria": "Robótica Industrial",
    "nombre": "Cable ABB Robot 3HAC7998-2",
    "descripcion": "Cable de robot ABB con número de parte 3HAC7998-2. Compatible con controladores ABB IRC5 y brazos robóticos de la serie IRB. Consultar compatibilidad exacta según modelo de robot.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-015_3HAC7998-2.png",
    "tags": [
      "abb",
      "robot",
      "cable",
      "3hac7998-2",
      "irc5",
      "irb",
      "robotica"
    ]
  },
  {
    "id": "RBL-016",
    "sku": "1FK7105-5AF71-1TH0",
    "marca": "Siemens",
    "categoria": "Variadores y Servos",
    "nombre": "Servomotor Síncrono SIEMENS SIMOTICS S-1FK7 de Alta Precisión (48 Nm)",
    "descripcion": "Servomotor síncrono industrial de alta precisión serie SIMOTICS S-1FK7, 3000 rpm, torque estático 48 Nm. Carcasa antracita compacta con brida cuadrada, conectores giratorios M40. Compatible con sistema de accionamiento SINAMICS S120.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-016_1FK7105-5AF71-1T.png",
    "tags": [
      "siemens",
      "servomotor",
      "1fk7105",
      "simotics",
      "1fk7",
      "s120",
      "sinamics",
      "48nm"
    ]
  },
  {
    "id": "RBL-017",
    "sku": "1FK7103-5AF",
    "marca": "Siemens",
    "categoria": "Variadores y Servos",
    "nombre": "Servomotor SIEMENS SIMOTICS S-1FK7103-5AF",
    "descripcion": "Motor / servomotor síncrono SIEMENS serie 1FK7103-5AF, parte de la familia SIMOTICS S-1FK7. Diseñado para aplicaciones de movimiento industrial de alta dinámica.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-017_1FK7103-5AF.png",
    "tags": [
      "siemens",
      "servomotor",
      "1fk7103",
      "simotics",
      "1fk7",
      "servo",
      "motor industrial"
    ]
  },
  {
    "id": "RBL-018",
    "sku": "3HAC022286-001",
    "marca": "ABB",
    "categoria": "Robótica Industrial",
    "nombre": "Tarjeta SMB (Serial Measurement Board) ABB DSQC 633 – 3HAC022286-001",
    "descripcion": "Placa de medición serial (SMB) ABB modelo DSQC 633, ref. 3HAC022286-001/005. Responsable del monitoreo y adquisición de señales de resolvers/encoders de los ejes del robot. Compatible con controladores IRC5 (IRB series).",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/3HAC022286-001.png",
    "tags": [
      "abb",
      "smb",
      "serial measurement board",
      "3hac022286-001",
      "3hac022286",
      "dsqc633",
      "dsqc 633",
      "irc5",
      "robotica"
    ]
  },
  {
    "id": "RBL-019",
    "sku": "SMB-BATTERY-ABB",
    "marca": "ABB",
    "categoria": "Robótica Industrial",
    "nombre": "Batería para Tarjeta SMB (Serial Measurement Board) ABB",
    "descripcion": "Batería de reemplazo para tarjeta SMB (Serial Measurement Board) de robots ABB. Mantiene los contadores de revolución y la calibración de ejes durante apagados de planta. Consultar compatibilidad con modelo de robot.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/3HAC051036-001.png",
    "tags": [
      "abb",
      "bateria smb",
      "serial measurement board",
      "robot abb",
      "mantenimiento robotica",
      "irc5"
    ]
  },
  {
    "id": "RBL-020A",
    "sku": "R911299915-NUEVO",
    "marca": "Bosch Rexroth",
    "categoria": "Variadores y Servos",
    "nombre": "Servomotor Bosch Rexroth MSK050C R911299915 – NUEVO en Caja Original",
    "descripcion": "Servomotor síncrono Bosch Rexroth IndraDyn S MSK050C-0600-NN-M1-UP1-NNNN (MNR: R911299915). Diseño compacto con enfriamiento por convección natural, conectores giratorios. NUEVO en caja original de fábrica.",
    "condicion": "Nuevo en caja original",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/R911299915.png",
    "tags": [
      "bosch rexroth",
      "rexroth",
      "msk050c",
      "r911299915",
      "servomotor",
      "indradyn",
      "msk050",
      "nuevo"
    ]
  },
  {
    "id": "RBL-020B",
    "sku": "R911299915-USADO",
    "marca": "Bosch Rexroth",
    "categoria": "Variadores y Servos",
    "nombre": "Servomotor Bosch Rexroth MSK050C R911299915 – USADO con 12 Meses de Garantía",
    "descripcion": "Servomotor síncrono Bosch Rexroth IndraDyn S MSK050C-0600-NN-M1-UP1-NNNN (MNR: R911299915). Diseño compacto con enfriamiento por convección natural, conectores giratorios. Unidad USADA con 12 meses de garantía.",
    "condicion": "Usado – Probado en Banco",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "12 Meses de Garantía",
    "imagen": "assets/refacciones/R911299915.png",
    "tags": [
      "bosch rexroth",
      "rexroth",
      "msk050c",
      "r911299915",
      "servomotor",
      "indradyn",
      "msk050",
      "usado",
      "garantia"
    ]
  },
  {
    "id": "RBL-021",
    "sku": "FANUC-MEM-IMAGE",
    "marca": "FANUC",
    "categoria": "Robótica Industrial",
    "nombre": "Memoria para Robot FANUC – Respaldo de Imagen + All of the Above",
    "descripcion": "Módulo de memoria para robot FANUC con respaldo completo de imagen del sistema y respaldo \"All of the Above\". Incluye todos los programas, parámetros y configuración del controlador. Consultar compatibilidad con serie de robot FANUC.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-021_FANUC-MEM-IMAGE.png",
    "tags": [
      "fanuc",
      "memoria",
      "robot fanuc",
      "respaldo imagen",
      "backup",
      "all of the above",
      "cnc"
    ]
  },
  {
    "id": "RBL-022",
    "sku": "250-PIN125",
    "marca": "s/d",
    "categoria": "Herramientas Industriales",
    "nombre": "Socket Pin 2-1/2\" Drive – Rango 120-255 / 4-5/8 a 10\"",
    "descripcion": "Socket tipo Pin para cuadro de 2-1/2\", rango de aplicación 120-255 / 4-5/8-10 pulgadas. Herramienta de impacto industrial para instalación y remoción de piezas de gran tamaño.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-022_250-PIN125.png",
    "tags": [
      "socket",
      "pin",
      "2-1/2 drive",
      "250-pin125",
      "herramienta",
      "impacto",
      "industrial"
    ]
  },
  {
    "id": "RBL-023",
    "sku": "250-RING147",
    "marca": "s/d",
    "categoria": "Herramientas Industriales",
    "nombre": "Socket Ring 2-1/2\" Drive – Hasta 4-1/2\" (115 mm)",
    "descripcion": "Socket tipo Ring para cuadro de 2-1/2\", capacidad hasta 4-1/2 pulgadas (115 mm). Herramienta de impacto industrial de alto torque para tuercas de gran diámetro.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-023_250-RING147.png",
    "tags": [
      "socket",
      "ring",
      "2-1/2 drive",
      "250-ring147",
      "herramienta",
      "impacto",
      "115mm",
      "industrial"
    ]
  },
  {
    "id": "RBL-024",
    "sku": "RUST-REVENGE-208L",
    "marca": "Rust Revenge",
    "categoria": "Mantenimiento Industrial",
    "nombre": "Rust Revenge – Líquido Removedor de Óxido (208 Litros / Tambo)",
    "descripcion": "Líquido removedor de óxido profesional marca Rust Revenge, presentación en tambo de 208 litros. Formulado para eliminar corrosión en piezas metálicas industriales sin dañar el metal base. Ideal para mantenimiento preventivo y correctivo en planta.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-024_RUST-REVENGE-208.png",
    "tags": [
      "rust revenge",
      "removedor oxido",
      "antioxidante",
      "mantenimiento",
      "208 litros",
      "tambo",
      "industrial"
    ]
  },
  {
    "id": "RBL-025",
    "sku": "SRV2KRARK",
    "marca": "APC by Schneider Electric",
    "categoria": "UPS y Energía",
    "nombre": "UPS APC Easy UPS 2kVA / 1.60kW Doble Conversión – Rack 2U con Rieles",
    "descripcion": "UPS online de doble conversión APC Easy UPS SRV2KRARK, 2000 VA / 1600 W, formato rack 2U. Onda sinusoidal pura, pantalla LCD multifunción, salidas NEMA 5-20R, comunicación USB/RS-232 y ranura para tarjeta de gestión. Incluye kit de rieles para rack.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SRV2KRARK.png",
    "tags": [
      "apc",
      "ups",
      "easy ups",
      "srv2krark",
      "2kva",
      "doble conversion",
      "rack",
      "schneider",
      "online"
    ]
  },
  {
    "id": "RBL-026",
    "sku": "AP9544",
    "marca": "APC by Schneider Electric",
    "categoria": "UPS y Energía",
    "nombre": "Tarjeta de Gestión de Red NMC3 APC para Easy UPS – AP9544",
    "descripcion": "Tarjeta de gestión de red Network Management Card 3 (NMC3) APC modelo AP9544. Permite monitoreo y gestión remota vía web browser, EcoStruxure IT y SNMP. Puerto Gigabit Ethernet RJ-45 y USB. Compatible con UPS Easy UPS On-Line de una fase.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/AP9544.png",
    "tags": [
      "apc",
      "nmc3",
      "ap9544",
      "tarjeta red",
      "snmp",
      "ups gestion",
      "remote monitoring",
      "schneider"
    ]
  },
  {
    "id": "RBL-027",
    "sku": "VICA-ALPHA-1K",
    "marca": "VICA",
    "categoria": "UPS y Energía",
    "nombre": "UPS VICA ALPHA 1K – 1000VA / 1000W Online Doble Conversión Torre/Rack",
    "descripcion": "UPS online de doble conversión VICA ALPHA 1K, 1000 VA / 1000 W. Factor de forma convertible Torre/Rack. Entrada NEMA 5-15P, 8 contactos NEMA 5-15R, onda senoidal pura, tiempo de transferencia cero. Baterías 12V/9Ah x2, puertos SNMP/USB/RS-232. Certificada NOM 001-SCFI-1993. SKU FR-1277. Garantía: 2 años fabricación / 1 año baterías.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "2 Años Defectos de Fabricación / 1 Año Baterías",
    "imagen": "assets/refacciones/SPEC_RBL-027_VICA-ALPHA-1K.png",
    "tags": [
      "vica",
      "ups",
      "alpha 1k",
      "1000va",
      "1000w",
      "doble conversion",
      "online",
      "senoidal",
      "fr-1277",
      "torre",
      "rack"
    ]
  },
  {
    "id": "RBL-028",
    "sku": "VICA-GAMMA-1K",
    "marca": "VICA",
    "categoria": "UPS y Energía",
    "nombre": "UPS VICA GAMMA 1K – 1000VA / 900W Online Doble Conversión Torre",
    "descripcion": "UPS online de doble conversión VICA GAMMA 1K, 1000 VA / 900 W. Formato torre. 3 contactos 5-15R con supresor de picos, entrada 5-15P, rango de voltaje amplio 60-145 VCA, factor de potencia ~0.99, salida 110/115/120/127 VCA, baterías 12V/9Ah x2, recarga 4h al 90%, puertos RS-232/USB. Certificada NOM 001-SCFI-1993. SKU FR-1795. Garantía: 2 años fabricación / 1 año baterías.",
    "condicion": "s/d",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "2 Años Defectos de Fabricación / 1 Año Baterías",
    "imagen": "assets/refacciones/SPEC_RBL-028_VICA-GAMMA-1K.png",
    "tags": [
      "vica",
      "ups",
      "gamma 1k",
      "1000va",
      "900w",
      "doble conversion",
      "online",
      "senoidal",
      "fr-1795",
      "torre",
      "supresor picos"
    ]
  },
  {
    "id": "RBL-029",
    "sku": "6ES7810-5CE18-0YB5",
    "marca": "Siemens",
    "categoria": "Software y Licencias",
    "nombre": "SIMATIC STEP 7 Professional V21/2021 SR4 Combo (con TIA Portal) – Licencia Flotante",
    "descripcion": "Software de ingeniería SIMATIC STEP 7 Professional V21/2021 SR4 Combo que incluye TIA Portal. Floating license para 1 usuario. Incluye software, documentación y llave de licencia. No. parte: 6ES7810-5CE18-0YB5.",
    "condicion": "Licencia Nueva",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-029_6ES7810-5CE18-0Y.png",
    "tags": [
      "siemens",
      "step 7",
      "tia portal",
      "6es7810-5ce18-0yb5",
      "plcsim",
      "software",
      "licencia",
      "simatic",
      "v21",
      "s7-1500"
    ]
  },
  {
    "id": "RBL-030",
    "sku": "6AV2102-0AA02-5AH5",
    "marca": "Siemens",
    "categoria": "Software y Licencias",
    "nombre": "SIMATIC WinCC Advanced V21 – Licencia Flotante (TIA Portal)",
    "descripcion": "Software de ingeniería SCADA/HMI SIMATIC WinCC Advanced V21 en TIA Portal. Floating license. Incluye software, documentación y llave de licencia. No. parte: 6AV2102-0AA02-5AH5.",
    "condicion": "Licencia Nueva",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-030_6AV2102-0AA02-5A.png",
    "tags": [
      "siemens",
      "wincc",
      "wincc advanced",
      "6av2102-0aa02-5ah5",
      "scada",
      "hmi",
      "software",
      "licencia",
      "tia portal",
      "v21"
    ]
  },
  {
    "id": "RBL-031",
    "sku": "6ES7833-1FA25-0YH5",
    "marca": "Siemens",
    "categoria": "Software y Licencias",
    "nombre": "SIMATIC STEP 7 Safety Advanced V21 – Licencia Flotante",
    "descripcion": "Herramienta de programación de seguridad S7 SIMATIC STEP 7 Safety Advanced V21. Floating license para 1 usuario. Software de ingeniería de seguridad funcional (SIL/PL). Incluye software, documentación y llave de licencia. No. parte: 6ES7833-1FA25-0YH5.",
    "condicion": "Licencia Nueva",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-031_6ES7833-1FA25-0Y.png",
    "tags": [
      "siemens",
      "step 7 safety",
      "6es7833-1fa25-0yh5",
      "safety",
      "sil",
      "pl",
      "software seguridad",
      "licencia",
      "tia portal"
    ]
  },
  {
    "id": "RBL-032",
    "sku": "6ES7823-1AE25-0YA5",
    "marca": "Siemens",
    "categoria": "Software y Licencias",
    "nombre": "TIA Portal Multiuser Engineering V21 – Licencia Flotante (Descarga)",
    "descripcion": "Opción de software de ingeniería colaborativa TIA Portal Multiuser Engineering V21. Floating license. Permite a múltiples ingenieros trabajar simultáneamente en un mismo proyecto. Incluye software y documentación STEP 7 / WinCC. No. parte: 6ES7823-1AE25-0YA5.",
    "condicion": "Licencia Nueva",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-032_6ES7823-1AE25-0Y.png",
    "tags": [
      "siemens",
      "tia portal",
      "multiuser",
      "6es7823-1ae25-0ya5",
      "colaborativo",
      "software",
      "licencia",
      "v21",
      "step 7",
      "wincc"
    ]
  },
  {
    "id": "RBL-033",
    "sku": "6ES7823-1FE07-0YA5",
    "marca": "Siemens",
    "categoria": "Software y Licencias",
    "nombre": "SIMATIC S7-PLCSIM Advanced V8.0 – Licencia Flotante (Descarga)",
    "descripcion": "Software de simulación avanzada SIMATIC S7-PLCSIM Advanced V8.0. Floating license. Permite simular S7-1500, ET200SP/pro y software/open controller; válida para 2 de máx. 16 instancias PLC. Incluye software, documentación y llave de licencia. No. parte: 6ES7823-1FE07-0YA5.",
    "condicion": "Licencia Nueva",
    "stock": "Disponible (Entrega Inmediata)",
    "precio": 0,
    "moneda": "MXN",
    "garantia": "Garantía de Funcionamiento",
    "imagen": "assets/refacciones/SPEC_RBL-033_6ES7823-1FE07-0Y.png",
    "tags": [
      "siemens",
      "plcsim",
      "s7-plcsim advanced",
      "6es7823-1fe07-0ya5",
      "simulacion",
      "s7-1500",
      "et200",
      "software",
      "licencia",
      "v8"
    ]
  }
];

let products = [...defaultProducts];
let cart = JSON.parse(localStorage.getItem('rbl_refacciones_cart')) || [];
let activeCategory = 'todos';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountBadges = document.querySelectorAll('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartSubtotalAmount = document.getElementById('cart-subtotal-amount');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
const plantLocationInput = document.getElementById('plant-location');
const plantCompanyInput = document.getElementById('plant-company');

// Inicializar Catálogo
async function initApp() {
  try {
    const res = await fetch('productos.json');
    if (res.ok) {
      products = await res.json();
    } else {
      console.warn('Cargando productos fallback...');
      products = defaultProducts;
    }
  } catch (err) {
    console.warn('Error al cargar productos.json:', err);
    products = defaultProducts;
  }

  setupEventListeners();
  renderProducts();
  updateCartUI();
}

// Event Listeners
function setupEventListeners() {
  // Buscador en vivo
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Filtros de Categoría
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Toggle Carrito
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Mobile Burger Menu
  const burger = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  }

  // Botón de WhatsApp Checkout
  if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', handleWhatsAppCheckout);
  }
}

// Generador de slugs canónicos para fichas de refacciones
function slugProducto(item) {
  const marca = item.marca || '';
  const sku = item.sku || '';
  return `${marca}-${sku}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Renderizar Productos
function renderProducts() {
  if (!productsGrid) return;

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'todos' ||
      p.categoria.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.marca.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSearch =
      p.sku.toLowerCase().includes(searchQuery) ||
      p.nombre.toLowerCase().includes(searchQuery) ||
      p.descripcion.toLowerCase().includes(searchQuery) ||
      p.marca.toLowerCase().includes(searchQuery) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery)));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3 style="font-family: var(--font-heading); color: #fff; margin-bottom: 10px;">🔍 No se encontraron refacciones con ese criterio</h3>
        <p style="color: var(--text-muted);">¿Buscas un número de parte específico (FANUC, ABB, Siemens, Allen-Bradley)?</p>
        <p style="margin-top: 15px;">
          <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hola,%20busco%20la%20refacción:%20${encodeURIComponent(searchQuery)}" target="_blank" class="btn-whatsapp" style="display: inline-block; font-size: 0.85rem; padding: 0.6rem 1.4rem;">
            📲 Consultar disponibilidad directa en WhatsApp
          </a>
        </p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered
    .map((item) => {
      let badgeClass = 'badge-nuevo';
      if (item.condicion.toLowerCase().includes('seminuevo') || item.condicion.toLowerCase().includes('banco')) {
        badgeClass = 'badge-seminuevo';
      } else if (item.condicion.toLowerCase().includes('obsoleto') || item.categoria.toLowerCase().includes('legacy')) {
        badgeClass = 'badge-obsoleto';
      }

      const slug = slugProducto(item);
      return `
      <article class="product-card">
        <a href="/refacciones/${slug}" style="text-decoration: none; color: inherit; display: block;">
          <div class="product-img-wrapper">
            <img src="${item.imagen}" alt="${item.nombre}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80'">
            <span class="product-brand-tag">${item.marca}</span>
            <span class="product-badge-condition ${badgeClass}">${item.condicion}</span>
          </div>
        </a>
        <div class="product-body">
          <span class="product-sku">N/P: ${item.sku}</span>
          <a href="/refacciones/${slug}" style="text-decoration: none; color: inherit; display: block;">
            <h3 class="product-title">${item.nombre}</h3>
          </a>
          <p class="product-desc">${item.descripcion}</p>
          
          <div class="product-meta">
            <span class="product-stock">● ${item.stock}</span>
            <span>Garantía: ${item.garantia}</span>
          </div>

          <div class="product-footer">
            <div class="product-price-box">
              <span class="price-label">Disponibilidad</span>
              <span class="price-val" style="color: var(--primary-color); font-family: var(--font-heading); font-size: 0.9rem;">⚡ A Cotizar</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart('${item.id}')">
              <span>+ Añadir a Cotización</span>
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join('');
}

// Carrito de compras
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQty(productId, change) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('rbl_refacciones_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCountBadges.forEach((badge) => (badge.textContent = totalCount));

  if (cartTotalAmount) cartTotalAmount.textContent = `${totalCount} pieza(s)`;
  if (cartSubtotalAmount) cartSubtotalAmount.textContent = `${cart.length} modelo(s)`;

  if (cart.length === 0) {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #777;">
          <p style="font-size: 2.2rem; margin-bottom: 0.5rem;">🛒</p>
          <p style="font-family: var(--font-heading); color: #fff; font-size: 0.95rem;">Tu lista de cotización está vacía.</p>
          <p style="font-size: 0.8rem; margin-top: 4px; color: var(--text-muted);">Selecciona las refacciones que necesitas para solicitar precio y entrega.</p>
        </div>
      `;
    }
    if (whatsappCheckoutBtn) whatsappCheckoutBtn.disabled = true;
    return;
  }

  if (whatsappCheckoutBtn) whatsappCheckoutBtn.disabled = false;

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80'">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.nombre}</h4>
          <div class="cart-item-sku">N/P: ${item.sku} (${item.marca})</div>
          <div style="color: var(--primary-color); font-size: 0.78rem; margin-top: 2px;">⚡ Cotizar por WhatsApp</div>
          
          <div class="cart-qty-controls">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
            <span style="font-weight: bold; font-size: 0.9rem; color: #fff;">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Eliminar">🗑️</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }
}

function openCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  }
}

function closeCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  }
}

// Generador de Mensaje de WhatsApp
function handleWhatsAppCheckout() {
  if (cart.length === 0) return;

  const company = plantCompanyInput ? plantCompanyInput.value.trim() || 'No especificada' : 'No especificada';
  const location = plantLocationInput ? plantLocationInput.value.trim() || 'Saltillo / Ramos Arizpe' : 'Saltillo / Ramos Arizpe';
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);

  let message = `⚡ *SOLICITUD DE COTIZACIÓN Y DISPONIBILIDAD - ROBOLOGIX*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🏢 *Empresa/Planta:* ${company}\n`;
  message += `📍 *Ubicación de Entrega:* ${location}\n`;
  message += `📦 *Total de Piezas Solicitadas:* ${totalCount} pza(s)\n\n`;
  message += `📋 *DESGLOSE DE REFACCIONES:*\n`;

  cart.forEach((item, index) => {
    message += `\n${index + 1}. *${item.nombre}*\n`;
    message += `   • *N/P (SKU):* \`${item.sku}\`\n`;
    message += `   • *Marca:* ${item.marca}\n`;
    message += `   • *Condición:* ${item.condicion}\n`;
    message += `   • *Cantidad:* ${item.qty} pza(s)\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `❓ *¿Me podrías apoyar con la cotización formal, tiempo de entrega y disponibilidad en planta?*\n`;
  message += `Agradezco su pronta atención.`;

  const whatsappURL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

// Fallback Data

// Iniciar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
