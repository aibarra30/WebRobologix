import os
import sys
import asyncio
import pymupdf  # PyMuPDF
import edge_tts
from PIL import Image
import numpy as np
import imageio
import subprocess

PDF_PATH = r"C:\Users\PC3\Documents\Antigravity\Presentacion_Corporativa_Robologix_Automation.pdf"
OUTPUT_DIR = r"C:\Users\PC3\Documents\Antigravity\video_temp"
FINAL_VIDEO_PATH = r"C:\Users\PC3\Documents\Antigravity\Video_Presentacion_Robologix_Automation.mp4"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Narration scripts per slide
SLIDE_SCRIPTS = [
    # Slide 1: Cover
    "En Robologix Automation eliminamos los paros no programados de línea y optimizamos tus procesos de automatización industrial en el corredor Saltillo y Ramos Arizpe con asistencia presencial 24/7.",
    
    # Slide 2: Empathy & Pain Points
    "Entendemos la frustración de las penalizaciones por paro de producción, la respuesta lenta de integradores foráneos, la falta de respaldos en PLC y la escasez de refacciones descontinuadas.",
    
    # Slide 3: Leadership & Clients
    "Bajo la dirección del Maestro Aaron Ibarra, con más de 15 años de trayectoria en plantas Tier-1 y OEM, brindamos ingeniería senior y la confianza de las mejores marcas industriales.",
    
    # Slide 4: Realistic Metrics
    "Nuestros resultados son comprobables: más de 85 proyectos ejecutados, 180 técnicos certificados con STPS DC-3 y reducciones de hasta 60% en tiempos de arranque con comisionamiento virtual.",
    
    # Slide 5: Comprehensive Services
    "Ofrecemos programación de PLC y robótica multimarca, montaje de maquinaria, tableros UL508A en EPLAN, visión artificial Cognex, SCADA Ignition y refacciones de importación directa.",
    
    # Slide 6: Value Added
    "Nos diferencian el levantamiento inicial sin costo en tu fábrica, la documentación de código asistida por inteligencia artificial y 6 meses de acompañamiento post-entrega sin costo.",
    
    # Slide 7: STPS DC-3 Training
    "Desarrollamos el talento de tus técnicos con capacitación práctica In-Company usando racks de entrenamiento real en Allen-Bradley, Siemens, FANUC, ABB y Yaskawa con validez STPS DC-3.",
    
    # Slide 8: Closing CTA
    "Agenda hoy mismo una visita técnica de diagnóstico sin costo en tu planta. Contáctanos por WhatsApp al 844 455 1869 o visítanos en rbl-automation.com."
]

async def generate_audio():
    print("Generating audio narrations using edge-tts...")
    audio_files = []
    voice = "es-MX-JorgeNeural" # High quality natural Mexican Spanish male voice
    
    for i, script in enumerate(SLIDE_SCRIPTS):
        audio_path = os.path.join(OUTPUT_DIR, f"slide_{i+1}.mp3")
        communicate = edge_tts.Communicate(script, voice, rate="+5%")
        await communicate.save(audio_path)
        audio_files.append(audio_path)
        print(f"  Slide {i+1} audio saved.")
    return audio_files

def render_pdf_slides():
    print("Rendering PDF slides to 1920x1080 images...")
    doc = pymupdf.open(PDF_PATH)
    image_paths = []
    
    for i, page in enumerate(doc):
        # 1920x1080 landscape resolution rendering (approx 174.5 DPI for 11in x 8.5in)
        zoom = 1920 / page.rect.width
        mat = pymupdf.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        img_path = os.path.join(OUTPUT_DIR, f"slide_{i+1}.png")
        pix.save(img_path)
        
        # Crop/resize to exact 1920x1080 if needed using PIL
        with Image.open(img_path) as img:
            img = img.resize((1920, 1080), Image.Resampling.LANCZOS)
            img.save(img_path)
            
        image_paths.append(img_path)
        print(f"  Slide {i+1} rendered: {img_path}")
        
    doc.close()
    return image_paths

def get_audio_duration(audio_path):
    # Use imageio_ffmpeg or ffprobe to get audio duration
    from imageio_ffmpeg import get_ffmpeg_exe
    ffmpeg_exe = get_ffmpeg_exe()
    
    cmd = [ffmpeg_exe, "-i", audio_path]
    result = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in result.stderr.split("\n"):
        if "Duration:" in line:
            # Duration: 00:00:07.45, start: ...
            dur_str = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = dur_str.split(":")
            return float(h)*3600 + float(m)*60 + float(s)
    return 7.0

def build_video(image_paths, audio_files):
    print("Combining slides and audio into video...")
    from imageio_ffmpeg import get_ffmpeg_exe
    ffmpeg_exe = get_ffmpeg_exe()
    
    # Create concatenated audio file and concat script file
    concat_list_path = os.path.join(OUTPUT_DIR, "concat_list.txt")
    combined_audio_path = os.path.join(OUTPUT_DIR, "combined_audio.mp3")
    
    durations = []
    with open(concat_list_path, "w", encoding="utf-8") as f:
        for a_path in audio_files:
            dur = get_audio_duration(a_path) + 0.6  # Add brief 0.6s pause after each slide
            durations.append(dur)
            # escape path for ffmpeg
            clean_path = a_path.replace("\\", "/")
            f.write(f"file '{clean_path}'\n")
            
    print("Slide durations (seconds):", [round(d, 2) for d in durations])
    total_duration = sum(durations)
    print(f"Total video duration: {round(total_duration, 2)} seconds")
    
    # Combine audio using ffmpeg
    subprocess.run([
        ffmpeg_exe, "-y", "-f", "concat", "-safe", "0", "-i", concat_list_path,
        "-c", "copy", combined_audio_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Build video frame generator
    fps = 30
    frame_list = []
    
    print("Generating video frames with visual transitions...")
    for idx, (img_path, dur) in enumerate(zip(image_paths, durations)):
        img = Image.open(img_path).convert("RGB")
        img_np = np.array(img)
        num_frames = int(dur * fps)
        
        # Subtle slow zoom effect for dynamic modern presentation feel
        h, w, _ = img_np.shape
        for f in range(num_frames):
            scale = 1.0 + 0.03 * (f / max(num_frames, 1)) # 3% zoom over duration
            new_w, new_h = int(w * scale), int(h * scale)
            resized = Image.fromarray(img_np).resize((new_w, new_h), Image.Resampling.BILINEAR)
            
            # Center crop back to 1920x1080
            left = (new_w - w) // 2
            top = (new_h - h) // 2
            cropped = resized.crop((left, top, left + w, top + h))
            frame_list.append(np.array(cropped))
            
    # Save uncompressed raw video or encode via ffmpeg with audio
    raw_video_path = os.path.join(OUTPUT_DIR, "raw_video.mp4")
    writer = imageio.get_writer(raw_video_path, fps=fps, codec="libx264", pixelformat="yuv420p")
    for frame in frame_list:
        writer.append_data(frame)
    writer.close()
    
    # Merge video and audio with ffmpeg
    print("Merging audio and video into final MP4...")
    merge_cmd = [
        ffmpeg_exe, "-y",
        "-i", raw_video_path,
        "-i", combined_audio_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        FINAL_VIDEO_PATH
    ]
    subprocess.run(merge_cmd, check=True)
    print(f"SUCCESS! Video created at: {FINAL_VIDEO_PATH}")

async def main():
    audio_files = await generate_audio()
    image_paths = render_pdf_slides()
    build_video(image_paths, audio_files)

if __name__ == "__main__":
    asyncio.run(main())
