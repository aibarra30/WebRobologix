import os
import sys
import subprocess
from imageio_ffmpeg import get_ffmpeg_exe

OUTPUT_DIR = r"C:\Users\PC3\Documents\Antigravity\video_temp"
FINAL_VIDEO_PATH = r"C:\Users\PC3\Documents\Antigravity\Video_Presentacion_Robologix_Automation.mp4"
ffmpeg_exe = get_ffmpeg_exe()

# Slide images and audio files already generated in video_temp
slides = [os.path.join(OUTPUT_DIR, f"slide_{i}.png") for i in range(1, 9)]
audios = [os.path.join(OUTPUT_DIR, f"slide_{i}.mp3") for i in range(1, 9)]

def get_audio_duration(audio_path):
    cmd = [ffmpeg_exe, "-i", audio_path]
    result = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in result.stderr.split("\n"):
        if "Duration:" in line:
            dur_str = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = dur_str.split(":")
            return float(h)*3600 + float(m)*60 + float(s)
    return 7.0

durations = [get_audio_duration(a) + 0.6 for a in audios]
print("Slide durations:", [round(d, 2) for d in durations])

# Step 1: Concat Audio Files
concat_audio_txt = os.path.join(OUTPUT_DIR, "audio_concat.txt")
with open(concat_audio_txt, "w", encoding="utf-8") as f:
    for a in audios:
        clean = a.replace("\\", "/")
        f.write(f"file '{clean}'\n")

combined_audio = os.path.join(OUTPUT_DIR, "combined_audio.mp3")
subprocess.run([
    ffmpeg_exe, "-y", "-f", "concat", "-safe", "0", "-i", concat_audio_txt,
    "-c", "copy", combined_audio
], check=True)

# Step 2: Build video concat script for ffmpeg
# FFmpeg concat filter / script format for images with durations:
# file 'slide_1.png'
# duration 7.5
# file 'slide_2.png'
# duration 8.2 ...
video_concat_txt = os.path.join(OUTPUT_DIR, "video_concat.txt")
with open(video_concat_txt, "w", encoding="utf-8") as f:
    for img, dur in zip(slides, durations):
        clean = img.replace("\\", "/")
        f.write(f"file '{clean}'\n")
        f.write(f"duration {dur}\n")
    # Repeat last image once (required by ffmpeg concat demuxer)
    clean_last = slides[-1].replace("\\", "/")
    f.write(f"file '{clean_last}'\n")

temp_video = os.path.join(OUTPUT_DIR, "temp_video.mp4")

# Render video using ffmpeg concat demuxer with zoom/fade filter or clean 30fps stream
cmd_video = [
    ffmpeg_exe, "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", video_concat_txt,
    "-vf", "scale=1920:1080,fps=30,format=yuv420p",
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "18",
    temp_video
]
print("Rendering MP4 video stream...")
subprocess.run(cmd_video, check=True)

# Step 3: Combine Video & Audio
cmd_final = [
    ffmpeg_exe, "-y",
    "-i", temp_video,
    "-i", combined_audio,
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    FINAL_VIDEO_PATH
]
print("Muxing final video and audio...")
subprocess.run(cmd_final, check=True)

print(f"COMPLETE! Video file created successfully at:\n{FINAL_VIDEO_PATH}")
