@echo off
title Subir Sitio Web Robologix a GitHub
cd /d "C:\Users\PC3\Documents\Antigravity"
echo ============================================================
echo   SUBIENDO SITIO WEB DE ROBOLOGIX AUTOMATION A GITHUB
echo ============================================================
echo.
echo Ejecutando: git push origin main ...
echo.
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   EXITO: Los cambios se subieron correctamente a GitHub!
    echo   Netlify actualizara https://rbl-automation.com/ en 20 seg.
    echo ============================================================
) else (
    echo ============================================================
    echo   Hubo un detalle al autenticar. Si se abrio una ventana en
    echo   tu navegador, haz clic en "Authorize" o inicia sesion.
    echo ============================================================
)
echo.
pause
