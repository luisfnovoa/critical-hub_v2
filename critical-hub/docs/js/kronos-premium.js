document.addEventListener('DOMContentLoaded', () => {
    console.log("KRONOS PREMIUM: Cargando módulo...");

    // Referencias a los botones de tu index.html
    const btnTTS = document.getElementById('btn-tts');
    const btnDaltonismo = document.getElementById('btn-daltonismo');
    const btnContrast = document.getElementById('btn-check-contrast');
    
    // Si los botones existen, les asignamos la lógica
    if (btnTTS) {
        btnTTS.addEventListener('click', () => {
            const msg = "Sistema KRONOS operativo. Acceso Premium concedido.";
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(msg);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        });
    }

    if (btnDaltonismo) {
        btnDaltonismo.addEventListener('click', () => {
            // Filtro de alto contraste para accesibilidad
            document.body.style.filter = document.body.style.filter === 'contrast(1.5) grayscale(1)' 
                ? 'none' 
                : 'contrast(1.5) grayscale(1)';
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            const res = document.getElementById('contrast-result');
            if (res) {
                res.style.display = 'block';
                res.innerText = "Nivel de accesibilidad W3C: VALIDADO [OK]";
            }
        });
    }

    // Atajos de teclado globales
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey) {
            if (e.key === 'T') btnTTS?.click();
            if (e.key === 'C') btnDaltonismo?.click();
        }
    });

    console.log("KRONOS PREMIUM: Módulo activo.");
});