import os
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Dimensions for Landscape Letter: 11 x 8.5 inches = 792 x 612 points
PAGE_WIDTH, PAGE_HEIGHT = landscape(letter)

# Color Palette
COLOR_BG = colors.HexColor("#0B0F19")        # Deep Dark Charcoal
COLOR_CARD = colors.HexColor("#141C2E")      # Card Navy Background
COLOR_PRIMARY = colors.HexColor("#00F3FF")   # Neon Cyan
COLOR_SECONDARY = colors.HexColor("#FF6600") # Electric Orange
COLOR_TEXT_LIGHT = colors.HexColor("#FFFFFF")# Pure White
COLOR_TEXT_MUTED = colors.HexColor("#94A3B8")# Muted Slate Gray
COLOR_BORDER = colors.HexColor("#1E293B")    # Slate Border
COLOR_ACCENT = colors.HexColor("#10B981")    # Emerald Green

class NumberedCanvas(canvas.Canvas):
    """Custom Canvas to draw dark tech background, header banner, footer page numbers and accents."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # 1. Background Fill
        self.setFillColor(COLOR_BG)
        self.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=True, stroke=False)
        
        # 2. Header Bar (Only on page 2+)
        if self._pageNumber > 1:
            # Top accent line
            self.setFillColor(COLOR_PRIMARY)
            self.rect(0, PAGE_HEIGHT - 6, PAGE_WIDTH, 6, fill=True, stroke=False)
            
            # Top header text
            self.setFont("Helvetica-Bold", 9)
            self.setFillColor(COLOR_PRIMARY)
            self.drawString(36, PAGE_HEIGHT - 25, "ROBOLOGIX AUTOMATION")
            
            self.setFont("Helvetica", 9)
            self.setFillColor(COLOR_TEXT_MUTED)
            self.drawRightString(PAGE_WIDTH - 36, PAGE_HEIGHT - 25, "PRESENTACIÓN CORPORATIVA | SALTILLO, COAHUILA")
            
            # Subtle header line
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.75)
            self.line(36, PAGE_HEIGHT - 32, PAGE_WIDTH - 36, PAGE_HEIGHT - 32)
        else:
            # Cover page decorative elements
            self.setFillColor(COLOR_PRIMARY)
            self.rect(0, PAGE_HEIGHT - 10, PAGE_WIDTH, 10, fill=True, stroke=False)
            self.setFillColor(COLOR_SECONDARY)
            self.rect(0, 0, 10, PAGE_HEIGHT, fill=True, stroke=False)

        # 3. Footer Bar (All pages)
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.75)
        self.line(36, 35, PAGE_WIDTH - 36, 35)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_TEXT_MUTED)
        self.drawString(36, 20, "© 2026 Robologix Automation • www.rbl-automation.com • Tel/WhatsApp: +52 844 455 1869")
        
        page_text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(PAGE_WIDTH - 36, 20, page_text)
        
        self.restoreState()


def create_presentation_pdf(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=landscape(letter),
        leftMargin=36,
        rightMargin=36,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Custom Typography Styles
    style_cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=36,
        leading=42,
        textColor=COLOR_PRIMARY,
        spaceAfter=10
    )

    style_cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=24,
        textColor=COLOR_TEXT_LIGHT,
        spaceAfter=15
    )

    style_cover_lead = ParagraphStyle(
        'CoverLead',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=18,
        textColor=COLOR_TEXT_MUTED,
        spaceAfter=30
    )

    style_slide_title = ParagraphStyle(
        'SlideTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=COLOR_PRIMARY,
        spaceAfter=6
    )

    style_slide_subtitle = ParagraphStyle(
        'SlideSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=COLOR_TEXT_MUTED,
        spaceAfter=15
    )

    style_card_title = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=COLOR_PRIMARY,
        spaceAfter=6
    )

    style_card_title_orange = ParagraphStyle(
        'CardTitleOrange',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=COLOR_SECONDARY,
        spaceAfter=6
    )

    style_body = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=COLOR_TEXT_LIGHT
    )

    style_body_muted = ParagraphStyle(
        'BodyMuted',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_TEXT_MUTED
    )

    style_bullet = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=COLOR_TEXT_LIGHT,
        leftIndent=12
    )

    story = []

    # =========================================================================
    # SLIDE 1: PORTADA (COVER SLIDE)
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("ROBOLOGIX AUTOMATION", style_cover_title))
    story.append(Paragraph("Integración de Celdas Robóticas, Programación de PLC y Capacitación Especializada", style_cover_subtitle))
    story.append(HRFlowable(width="100%", thickness=2, color=COLOR_SECONDARY, spaceBefore=5, spaceAfter=20))
    
    lead_text = """
    <b>Soluciones de Ingeniería Industrial &amp; Automatización en Coahuila</b><br/>
    Optimizando la productividad, eficiencia OEE y continuidad operativa en las principales plantas automotrices y de manufactura de Saltillo, Ramos Arizpe, Arteaga y la Región Sureste.
    """
    story.append(Paragraph(lead_text, style_cover_lead))
    story.append(Spacer(1, 25))

    # Meta Info Cards Table for Cover
    cover_card_1 = [
        Paragraph("<b>SERVICIOS CLAVE</b>", style_card_title),
        Paragraph("• Programación de PLC (Studio 5000 &amp; TIA Portal)<br/>• Celdas Robóticas (FANUC, ABB, KUKA)<br/>• Sistemas SCADA &amp; HMI<br/>• Control de Movimiento &amp; Servos", style_body)
    ]
    cover_card_2 = [
        Paragraph("<b>CAPACITACIÓN STPS DC-3</b>", style_card_title_orange),
        Paragraph("• Cursos Prácticos Presenciales<br/>• Certificación Oficial DC-3 de la STPS<br/>• Racks con Equipos Industriales Reales<br/>• Entrenamiento para Planta", style_body)
    ]
    cover_card_3 = [
        Paragraph("<b>CONTACTO DIRECTO</b>", style_card_title),
        Paragraph("<b>Ingeniería:</b> Mtro. Aaron Ibarra Cepeda<br/><b>Tel / WhatsApp:</b> +52 844 455 1869<br/><b>Ubicación:</b> Saltillo, Coahuila, México<br/><b>Web:</b> www.rbl-automation.com", style_body)
    ]

    t_cover = Table([[cover_card_1, cover_card_2, cover_card_3]], colWidths=[230, 230, 240])
    t_cover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), COLOR_CARD),
        ('BACKGROUND', (1,0), (1,0), COLOR_CARD),
        ('BACKGROUND', (2,0), (2,0), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_PRIMARY),
        ('BOX', (1,0), (1,0), 1, COLOR_SECONDARY),
        ('BOX', (2,0), (2,0), 1, COLOR_PRIMARY),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_cover)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 2: PERFIL CORPORATIVO & EXPERIENCIA
    # =========================================================================
    story.append(Paragraph("01. Perfil Corporativo &amp; Quiénes Somos", style_slide_title))
    story.append(Paragraph("Más de 15 años de experiencia acumulada en ingeniería de control y automatización industrial.", style_slide_subtitle))
    
    p_about = Paragraph(
        "<b>Robologix Automation</b> es una empresa integradora mexicana líder en el desarrollo de soluciones de automatización industrial, "
        "programación avanzada de PLC, integración de celdas robóticas y capacitación técnica certificada. "
        "Ubicados estratégicamente en <b>Saltillo, Coahuila</b>, brindamos atención inmediata a parques industriales clave como Ramos Arizpe, Derramadero, Zapalinamé y Arteaga.",
        style_body
    )
    story.append(p_about)
    story.append(Spacer(1, 15))

    # 3 Column Pillars
    p1 = [
        Paragraph("🎯 NUESTRA MISIÓN", style_card_title),
        Paragraph("Diseñar, integrar y poner en marcha sistemas de control automatizados deterministas, seguros y altamente eficientes, maximizando el rendimiento de producción y reduciendo a cero las paradas no programadas en planta.", style_body_muted)
    ]
    p2 = [
        Paragraph("⚙️ EXPERIENCIA EN CAMPO", style_card_title_orange),
        Paragraph("Más de 15 años solucionando fallas complejas en líneas de ensamble automotriz, estampado, inyección de plásticos, empaque y procesos continuos bajo estándares internacionales ISO y normas de seguridad SIL3 / PLe.", style_body_muted)
    ]
    p3 = [
        Paragraph("🚀 INNOVACIÓN 2026", style_card_title),
        Paragraph("Pioneros en la Región Sureste en aplicar Inteligencia Artificial Generativa (Siemens Industrial Copilot &amp; ChatGPT) y Gemelos Digitales para acelerar el tiempo de desarrollo de código y puesta en marcha.", style_body_muted)
    ]

    t_pillars = Table([[p1, p2, p3]], colWidths=[230, 230, 240])
    t_pillars.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_BORDER),
        ('BOX', (1,0), (1,0), 1, COLOR_BORDER),
        ('BOX', (2,0), (2,0), 1, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_pillars)
    story.append(Spacer(1, 15))

    # Industries Serviced Table
    ind_title = Paragraph("<b>SECTORES ATENDIDOS EN COAHUILA Y EL NORTE DE MÉXICO</b>", style_card_title)
    ind_text = Paragraph(
        "• <b>Automotriz &amp; Autopartes:</b> Celdas de soldadura, ensamble final, estampado y líneas de transporte de chasis.<br/>"
        "• <b>Inyección &amp; Moldeo de Plásticos:</b> Extracción con robots de 3 y 6 ejes, control de temperatura y periféricos.<br/>"
        "• <b>Alimentos, Bebidas &amp; Empaque:</b> Paletizado automatizado, empaque de alta velocidad y dosificación.<br/>"
        "• <b>Metalmecánica &amp; Maquinados:</b> Tendido automático de CNC, celdas de desbaste y visión artificial para inspección.",
        style_body
    )
    t_ind = Table([[ind_title], [ind_text]], colWidths=[700])
    t_ind.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (-1,-1), 1, COLOR_PRIMARY),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_ind)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 3: PORTAFOLIO DE SERVICIOS PRINCIPALES
    # =========================================================================
    story.append(Paragraph("02. Portafolio Integración &amp; Servicios de Ingeniería", style_slide_title))
    story.append(Paragraph("Soluciones integrales de hardware, software y control de movimiento de punta a punta.", style_slide_subtitle))

    # 4 Service Cards Grid (2x2 Layout)
    s1 = [
        Paragraph("1. PROGRAMACIÓN DE PLC", style_card_title),
        Paragraph("<b>Allen-Bradley (Rockwell Automation):</b><br/>• Studio 5000 Logix Designer (ControlLogix / CompactLogix)<br/>• Migración de SLC 500 / MicroLogix a CompactLogix 5380<br/>• RSLogix 500 y desarrollo en Ladder / Structured Text<br/><br/><b>Siemens Automation:</b><br/>• TIA Portal V16 - V20 (SIMATIC S7-1200 / S7-1500)<br/>• Programación avanzada en SCL y bloques FB/FC<br/>• Redes industriales Profinet, PROFIBUS e IO-Link", style_body)
    ]

    s2 = [
        Paragraph("2. INTEGRACIÓN DE CELDAS ROBÓTICAS", style_card_title_orange),
        Paragraph("<b>FANUC Robotics:</b><br/>• Manejo de cargas (HandlingTool) y programación Karel<br/>• Configuración de DCS (Dual Check Safety) y marcos UFrame/UTool<br/><br/><b>ABB &amp; KUKA Robotics:</b><br/>• Programación modular en código ABB RAPID (IRC5 / OmniCore)<br/>• Desarrollo de secuencias en KUKA KRL (KRC4 / KRC5)<br/>• Integración de garras neumáticas, grippers y visión artificial", style_body)
    ]

    s3 = [
        Paragraph("3. SISTEMAS SCADA &amp; HMI", style_card_title),
        Paragraph("• Desarrollo de pantallas de supervisión en FactoryTalk View SE / ME<br/>• Integración con WinCC Unified y SIMATIC HMI Panels<br/>• Sistemas de adquisición de datos en tiempo real (Ignition SCADA)<br/>• Gestión de recetas, tendencias históricas y control de alarmas auditables", style_body)
    ]

    s4 = [
        Paragraph("4. CONTROL DE MOVIMIENTO (MOTION)", style_card_title_orange),
        Paragraph("• Configuración y sintonización de servomotores multieje Kinetix 5500/5700<br/>• Parametrización de variadores de frecuencia (PowerFlex 525/755, SINAMICS)<br/>• Sincronización de ejes mediante redes CIP Motion sobre EtherNet/IP<br/>• Ajuste dinámico de lazos PID y reducción de tiempos de ciclo", style_body)
    ]

    t_grid = Table([[s1, s2], [s3, s4]], colWidths=[345, 345])
    t_grid.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_PRIMARY),
        ('BOX', (1,0), (1,0), 1, COLOR_SECONDARY),
        ('BOX', (0,1), (0,1), 1, COLOR_PRIMARY),
        ('BOX', (1,1), (1,1), 1, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_grid)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 4: CAPACITACIÓN TÉCNICA Y CERTIFICACIÓN STPS DC-3
    # =========================================================================
    story.append(Paragraph("03. División de Capacitación Técnica &amp; Certificación STPS DC-3", style_slide_title))
    story.append(Paragraph("Entrenamiento 100% práctico presencial con racks industriales reales en Saltillo, Coahuila.", style_slide_subtitle))

    p_cap_lead = Paragraph(
        "En <b>Robologix Automation</b> entendemos que la competitividad de una planta depende directamente del talento de sus ingenieros y técnicos de mantenimiento. "
        "Nuestros cursos están diseñados bajo la metodología <b>'Learning by Doing'</b> con equipos físicos de marca Allen-Bradley, Siemens y FANUC.",
        style_body
    )
    story.append(p_cap_lead)
    story.append(Spacer(1, 12))

    # Courses Table
    c1 = [
        Paragraph("<b>CURSO PLC ALLEN-BRADLEY</b>", style_card_title),
        Paragraph("• Studio 5000 Logix Designer<br/>• ControlLogix &amp; CompactLogix<br/>• Lógica Ladder, Tags, Alias, I/O<br/>• Diagnóstico de fallas en vivo<br/><b>Valor:</b> Constancia STPS DC-3", style_body_muted)
    ]
    c2 = [
        Paragraph("<b>CURSO SIEMENS TIA PORTAL</b>", style_card_title),
        Paragraph("• Siemens S7-1200 / S7-1500<br/>• Programación SCL y Ladder<br/>• Configuración HMI WinCC<br/>• Redes Profinet &amp; Drives<br/><b>Valor:</b> Constancia STPS DC-3", style_body_muted)
    ]
    c3 = [
        Paragraph("<b>CURSO ROBÓTICA FANUC</b>", style_card_title_orange),
        Paragraph("• Manejo con Teach Pendant<br/>• HandlingTool &amp; Marcos UFrame<br/>• Programación de rutinas Pick &amp; Place<br/>• Configuración de Seguridad DCS<br/><b>Valor:</b> Constancia STPS DC-3", style_body_muted)
    ]

    t_courses = Table([[c1, c2, c3]], colWidths=[230, 230, 240])
    t_courses.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_PRIMARY),
        ('BOX', (1,0), (1,0), 1, COLOR_PRIMARY),
        ('BOX', (2,0), (2,0), 1, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_courses)
    story.append(Spacer(1, 15))

    # STPS DC-3 Guarantee Box
    dc3_head = Paragraph("<b>BENEFICIOS DE LA CERTIFICACIÓN STPS DC-3 PARA EMPRESAS</b>", style_card_title_orange)
    dc3_body = Paragraph(
        "✔ <b>Cumplimiento Regulatorio:</b> Certificados de Competencias Laborales emitidos conforme a los requerimientos de la Secretaría del Trabajo.<br/>"
        "✔ <b>Reducción de Tiempos de Respuesta:</b> El personal capacitado soluciona fallas de PLC y robots en minutos en lugar de horas.<br/>"
        "✔ <b>Modalidades Flexibles:</b> Impartición en nuestras instalaciones de entrenamiento en Saltillo o directamente In-Plant en tu fábrica.",
        style_body
    )
    t_dc3 = Table([[dc3_head], [dc3_body]], colWidths=[700])
    t_dc3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (-1,-1), 1.5, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_dc3)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 5: INNOVACIÓN TECNOLÓGICA & INTELIGENCIA ARTIFICIAL
    # =========================================================================
    story.append(Paragraph("04. Innovación Tecnológica &amp; Copiloto de IA", style_slide_title))
    story.append(Paragraph("Acompañamos a la industria 4.0 mediante Inteligencia Artificial y Gemelos Digitales.", style_slide_subtitle))

    ai1 = [
        Paragraph("🤖 CHATGPT &amp; SIEMENS INDUSTRIAL COPILOT", style_card_title),
        Paragraph("Integración de modelos de IA generativa en el ciclo de vida del software industrial:<br/>"
                  "• Traducimos especificaciones narrativas a código estructurado <b>SCL / Structured Text</b> en segundos.<br/>"
                  "• Generación automatizada de documentación técnica (Listas de I/O, Especificaciones FDS).<br/>"
                  "• Explicación instantánea de bloques de código antiguos sin documentar.<br/>"
                  "• <b>Resultado:</b> Reducción de hasta 60% en tiempos de programación inicial.", style_body)
    ]

    ai2 = [
        Paragraph("🌐 GEMELOS DIGITALES (VIRTUAL COMMISSIONING)", style_card_title_orange),
        Paragraph("Simulación y validación previa fuera de línea (Off-line):<br/>"
                  "• Modelado 3D de celdas de manufactura en <b>ABB RobotStudio y FANUC ROBOGUIDE</b>.<br/>"
                  "• Detección temprana de colisiones y cálculo exacto de tiempos de ciclo.<br/>"
                  "• Verificación de alcance de brazos robóticos antes de fabricar las bases físicas de acero.<br/>"
                  "• <b>Resultado:</b> Puesta en marcha en planta sin sorpresas ni riesgos.", style_body)
    ]

    t_ai = Table([[ai1, ai2]], colWidths=[345, 345])
    t_ai.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_PRIMARY),
        ('BOX', (1,0), (1,0), 1, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ai)
    story.append(Spacer(1, 15))

    ai3_head = Paragraph("<b>MANTENIMIENTO PREDICTIVO &amp; CONECTIVIDAD IIoT</b>", style_card_title)
    ai3_body = Paragraph(
        "Implementamos sensores inteligentes <b>IO-Link</b> para monitorear vibración, temperatura y corriente en motores y reductores en tiempo real. "
        "Enviamos alarmas predictivas a dashboards SCADA antes de que ocurra una avería catastrófica.",
        style_body
    )
    t_ai3 = Table([[ai3_head], [ai3_body]], colWidths=[700])
    t_ai3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (-1,-1), 1, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_ai3)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 6: VENTAJAS COMPETITIVAS & COBERTURA
    # =========================================================================
    story.append(Paragraph("05. ¿Por qué Elegir a Robologix Automation?", style_slide_title))
    story.append(Paragraph("Garantizamos respuesta ágil, soporte local continuo y los más altos estándares de calidad.", style_slide_subtitle))

    v1 = [
        Paragraph("⚡ ATENCIÓN LOCAL 24/7", style_card_title),
        Paragraph("Ubicados en Saltillo, ofrecemos soporte presencial en menos de 45 minutos en parques industriales de Ramos Arizpe y Saltillo.", style_body_muted)
    ]
    v2 = [
        Paragraph("🛡️ SEGURIDAD GARANTIZADA", style_card_title),
        Paragraph("Programación bajo normas estrictas de Seguridad Funcional (Safety PLC, Paros de Emergencia, Cortinas y DCS).", style_body_muted)
    ]
    v3 = [
        Paragraph("📈 INCREMENTO DE OEE", style_card_title_orange),
        Paragraph("Optimizamos secuencias de ciclo y eliminamos tiempos muertos para maximizar la Eficiencia Global de los Equipos.", style_body_muted)
    ]
    v4 = [
        Paragraph("🤝 LLAVE EN MANO", style_card_title_orange),
        Paragraph("Desde el levantamiento de requerimientos y diseño eléctrico hasta la instalación física y entrenamiento final.", style_body_muted)
    ]

    t_v = Table([[v1, v2], [v3, v4]], colWidths=[345, 345])
    t_v.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1, COLOR_BORDER),
        ('BOX', (1,0), (1,0), 1, COLOR_BORDER),
        ('BOX', (0,1), (0,1), 1, COLOR_BORDER),
        ('BOX', (1,1), (1,1), 1, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_v)
    story.append(Spacer(1, 15))

    # Cobertura Box
    cob_head = Paragraph("<b>COBERTURA GEOGRÁFICA DE SERVICIOS E INGENIERÍA</b>", style_card_title)
    cob_body = Paragraph(
        "📍 <b>Coahuila:</b> Saltillo, Ramos Arizpe, Arteaga, Derramadero, Monclova, Torreón.<br/>"
        "📍 <b>Nuevo León:</b> Monterrey, Santa Catarina, Apodaca, Pesquería.<br/>"
        "📍 <b>Norte de México:</b> Querétaro, San Luis Potosí y Aguascalientes.",
        style_body
    )
    t_cob = Table([[cob_head], [cob_body]], colWidths=[700])
    t_cob.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (-1,-1), 1, COLOR_PRIMARY),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_cob)
    story.append(PageBreak())

    # =========================================================================
    # SLIDE 7: CONTACTO & CIERRE
    # =========================================================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("¡Transformemos la Automatización de tu Planta!", style_cover_title))
    story.append(Paragraph("Ponte en contacto con nuestro equipo de ingeniería especializado.", style_cover_subtitle))
    story.append(HRFlowable(width="100%", thickness=2, color=COLOR_PRIMARY, spaceBefore=5, spaceAfter=25))

    c_box1 = [
        Paragraph("<b>INFORMACIÓN DE CONTACTO DIRECTO</b>", style_card_title),
        Paragraph(
            "<b>Director de Ingeniería:</b> Mtro. Aaron Ibarra Cepeda<br/><br/>"
            "<b>📱 Teléfono / WhatsApp:</b> +52 844 455 1869<br/><br/>"
            "<b>🌐 Sitio Web Oficial:</b> <font color='#00F3FF'>www.rbl-automation.com</font><br/><br/>"
            "<b>📍 Ubicación:</b> Saltillo, Coahuila, México<br/><br/>"
            "<b>✉️ Atención Comercial:</b> Cotizaciones y levantamiento de proyectos en sitio.",
            style_body
        )
    ]

    c_box2 = [
        Paragraph("<b>SERVICIOS DESTACADOS DE ATENCIÓN RÁPIDA</b>", style_card_title_orange),
        Paragraph(
            "✔ Diagnóstico y solución de paros de línea urgentes en PLC / Robot.<br/><br/>"
            "✔ Levantamientos para modernización y migración de hardware obsoleto.<br/><br/>"
            "✔ Cotizaciones de cursos de capacitación in-company con DC-3 para tu personal.<br/><br/>"
            "✔ Integración de nuevas celdas de manufactura y modificación de rutinas.",
            style_body
        )
    ]

    t_final = Table([[c_box1, c_box2]], colWidths=[345, 345])
    t_final.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CARD),
        ('BOX', (0,0), (0,0), 1.5, COLOR_PRIMARY),
        ('BOX', (1,0), (1,0), 1.5, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 16),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_final)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF exitosamente generado en: {os.path.abspath(output_filename)}")

if __name__ == "__main__":
    output_pdf = "Presentacion_Corporativa_Robologix_Automation.pdf"
    create_presentation_pdf(output_pdf)
