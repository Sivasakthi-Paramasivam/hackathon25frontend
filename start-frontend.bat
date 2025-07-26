@echo off
echo Starting Hackathon25 Frontend...

REM Check if build folder exists
if not exist "build" (
    echo Building the application first...
    npm run build
    if errorlevel 1 (
        echo Build failed! Please check the errors above.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo ✅ Frontend is now running!
echo 🌐 URL: http://localhost:3000
echo ========================================
echo.
echo Starting Vite preview server...
npm run preview

pause 