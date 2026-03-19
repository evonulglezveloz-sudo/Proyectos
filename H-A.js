document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const startButton = document.getElementById('start-attack');
    const stopButton = document.getElementById('stop-attack');
    const modal = document.getElementById('encryption-modal');
    const closeModal = document.querySelector('.close');
    const encryptedData = document.getElementById('encrypted-data');
    const fileTheft = document.getElementById('file-theft');
    const timer = document.getElementById('timer');
    const statusLogs = document.getElementById('status-logs');
    const matrixRain = document.getElementById('matrix-rain');
    const nodes = ['node-ny', 'node-london', 'node-moscow', 'node-tokyo', 'node-sydney'];
    const connections = ['conn-ny-london', 'conn-london-moscow', 'conn-moscow-tokyo', 'conn-tokyo-sydney'];
    
    let attackInterval;
    let timerInterval; // Variable global para el temporizador
    let progress = 0;
    let timeLeft = 120; // 2 minutos en segundos
    const commands = [
        'Iniciando conexión VPN anónima via Tor...\n',
        'Ejecutando Nmap para escaneo de puertos globales...\n',
        'Vulnerabilidad detectada: EternalBlue en NY\n',
        'Inyectando payload con Metasploit...\n',
        'Propagando a Londres via phishing...\n',
        'Exfiltrando datos de Moscú con Wireshark...\n',
        'Encriptando archivos con AES-256...\n',
        '¡Ataque Anonymous global completado! Red comprometida.\n'
    ];
    const statusUpdates = [
        'Firewall bypass: Exitoso\n',
        'Intrusión en servidor: Detectada\n',
        'Datos en tránsito: Encriptados\n',
        'Alerta: Contramedidas activadas\n',
        'Sistema: Comprometido al 100%\n'
    ];
    
    // Función para lluvia de Matrix
    function createMatrixRain() {
        const columns = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDuration = `${Math.random() * 3 + 2}s`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            column.textContent = Math.random() > 0.5 ? '0' : '1';
            matrixRain.appendChild(column);
        }
    }
    
    createMatrixRain();
    
    function typeText(text, element, delay = 100) {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, delay);
    }
    
    function playBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `Tiempo restante: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:00`;
        timeLeft--;
        if (timeLeft < 0) timeLeft = 0;
    }
    
    function activateNode(index) {
        if (index < nodes.length) {
            document.getElementById(nodes[index]).style.fill = '#00ff00';
        }
        if (index < connections.length) {
            document.getElementById(connections[index]).style.opacity = '1';
        }
    }
    
    function showModal() {
        encryptedData.textContent = 'Datos encriptados globales: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6\nHash MD5: 5d41402abc4b2a76b9719d911017c592\nAES Key: 1234567890abcdef';
        fileTheft.textContent = 'Robando archivos globales:\n- passwords.txt (EEUU exfiltrado)\n- financial_data.db (UK en proceso)\n- user_logs.log (Rusia completado)\n- classified_docs.pdf (Japón encriptado)\n- intel_files.zip (Australia comprometido)';
        modal.style.display = 'block';
    }
    
    function startAttack() {
        progress = 0;
        timeLeft = 120;
        terminalOutput.textContent = '';
        statusLogs.textContent = '';
        progressFill.style.width = '0%';
        progressText.textContent = 'Iniciando escaneo de vulnerabilidades...';
        nodes.forEach(node => document.getElementById(node).style.fill = '#333');
        connections.forEach(conn => document.getElementById(conn).style.opacity = '0');
        
        let commandIndex = 0;
        let nodeIndex = 0;
        let statusIndex = 0;
        attackInterval = setInterval(() => {
            if (commandIndex < commands.length) {
                typeText(commands[commandIndex], terminalOutput);
                playBeep();
                commandIndex++;
            }
            
            if (statusIndex < statusUpdates.length) {
                typeText(statusUpdates[statusIndex], statusLogs);
                statusIndex++;
            }
            
            progress += 12.5;
            progressFill.style.width = progress + '%';
            if (nodeIndex < nodes.length) { // Límite para evitar errores
                activateNode(nodeIndex);
                nodeIndex++;
            }
            
            if (progress === 25) progressText.textContent = 'Escaneando puertos globales...';
            if (progress === 50) progressText.textContent = 'Inyectando código malicioso...';
            if (progress === 75) progressText.textContent = 'Extrayendo datos...';
            if (progress >= 100) {
                progressText.textContent = '¡Ataque exitoso!';
                playBeep(); // Beep extra en el clímax
                clearInterval(attackInterval);
                clearInterval(timerInterval); // Limpiar temporizador
                showModal();
            }
        }, 2000);
        
        timerInterval = setInterval(() => {
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(attackInterval); // Detener si el tiempo se acaba
                progressText.textContent = 'Tiempo agotado. Ataque fallido.';
            }
        }, 1000);
    }
    
    function stopAttack() {
        clearInterval(attackInterval);
        clearInterval(timerInterval); // Limpiar temporizador
        progressText.textContent = 'Simulación detenida.';
        timer.textContent = 'Tiempo restante: 00:00:00'; // Resetear temporizador
        modal.style.display = 'none'; // Ocultar modal si está abierto
    }
    
    startButton.addEventListener('click', startAttack);
    stopButton.addEventListener('click', stopAttack);
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });
});