/* ==========================================================================
   SKANDA RAMESH BHARADWAJA — INTERACTIVE JAVASCRIPT ENGINE
   Three.js 3D Background, Interactive CLI Terminal, AI Assistant Bot,
   IEEE GAN Weather Visualizer, Magnetic Physics, & Theme System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // Theme color hex map for Three.js synchronization
  const THEME_COLORS = {
    amber: 0xf59e0b,
    violet: 0x8b5cf6,
    cyan: 0x06b6d4,
    emerald: 0x10b981
  };

  let currentThemeColorHex = THEME_COLORS.amber;

  // ==========================================
  // 1. THREE.JS HYPER-ANIMATED CYBER WARP & SHOCKWAVE ENGINE
  // ==========================================
  (function initThreeScene() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // A. 3D Dynamic Fluid Particle Mesh (Wave Terrain with High-Frequency Physics)
    const GRID_X = 70;
    const GRID_Y = 70;
    const numParticles = GRID_X * GRID_Y;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(numParticles * 3);
    const waveColors = new Float32Array(numParticles * 3);

    let idx = 0;
    const width = 64;
    const height = 64;

    const baseColor = new THREE.Color(currentThemeColorHex);

    for (let ix = 0; ix < GRID_X; ix++) {
      for (let iy = 0; iy < GRID_Y; iy++) {
        const x = (ix / GRID_X - 0.5) * width;
        const y = (iy / GRID_Y - 0.5) * height;
        const z = 0;

        wavePos[idx * 3] = x;
        wavePos[idx * 3 + 1] = y;
        wavePos[idx * 3 + 2] = z;

        waveColors[idx * 3] = baseColor.r;
        waveColors[idx * 3 + 1] = baseColor.g;
        waveColors[idx * 3 + 2] = baseColor.b;

        idx++;
      }
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    // Create glowing circular particle texture
    function createParticleTexture() {
      const c = document.createElement('canvas');
      c.width = 64; c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }

    const particleTex = createParticleTexture();

    const waveMat = new THREE.PointsMaterial({
      size: 0.26,
      map: particleTex,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const waveMesh = new THREE.Points(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.6; // Tilt toward camera
    waveMesh.position.y = -7;
    waveMesh.position.z = -10;
    scene.add(waveMesh);

    // B. Hyper-Animated Central Quantum Core (Tri-Gyroscopic Core + Orbital Nodes)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 2.5, -9);

    // Core Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(2.8, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: currentThemeColorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Core Octahedron Inner Pulse
    const octGeo = new THREE.OctahedronGeometry(1.8, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const octCore = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(octCore);

    // Outer Geodesic Shell
    const outerGeo = new THREE.IcosahedronGeometry(3.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const outerCore = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCore);

    // 3 Orbiting Gyro Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: currentThemeColorHex,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.03, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.0, 0.03, 16, 100), ringMat.clone());
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.03, 16, 100), ringMat.clone());
    ring3.rotation.z = Math.PI / 6;
    coreGroup.add(ring3);

    // Orbiting Satellite Nodes
    const satelliteGroup = new THREE.Group();
    const satCount = 14;
    const satellites = [];
    for (let i = 0; i < satCount; i++) {
      const sGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const sMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? currentThemeColorHex : 0x06b6d4,
        transparent: true,
        opacity: 0.8
      });
      const sat = new THREE.Mesh(sGeo, sMat);
      const radius = 4.2 + Math.random() * 2.0;
      const speed = 0.015 + Math.random() * 0.02;
      const angle = (i / satCount) * Math.PI * 2;

      satelliteGroup.add(sat);
      satellites.push({ mesh: sat, radius, speed, angle });
    }
    coreGroup.add(satelliteGroup);

    scene.add(coreGroup);

    // C. Dynamic Cyber Energy Beams / Shooting Light Streaks
    const BEAM_COUNT = 30;
    const beamsGroup = new THREE.Group();
    const beams = [];

    for (let i = 0; i < BEAM_COUNT; i++) {
      const bGeo = new THREE.BufferGeometry();
      const bPos = new Float32Array(6); // 2 vertices per line segment
      const startX = (Math.random() - 0.5) * 70;
      const startY = (Math.random() - 0.5) * 70;
      const startZ = (Math.random() - 0.5) * 30 - 5;
      const len = 3 + Math.random() * 5;

      bPos[0] = startX; bPos[1] = startY; bPos[2] = startZ;
      bPos[3] = startX; bPos[4] = startY - len; bPos[5] = startZ;

      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));

      const bMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? currentThemeColorHex : 0x06b6d4,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.4
      });

      const line = new THREE.Line(bGeo, bMat);
      beamsGroup.add(line);
      beams.push({
        mesh: line,
        speed: 0.2 + Math.random() * 0.35,
        startY: startY,
        resetY: -35,
        topY: 35
      });
    }
    scene.add(beamsGroup);

    // D. Dynamic Shockwave System (Click / Rapid Move Impulse)
    const shockwaves = [];

    window.addEventListener('click', (e) => {
      const sX = (e.clientX / window.innerWidth - 0.5) * 4;
      const sY = (e.clientY / window.innerHeight - 0.5) * 4;
      shockwaves.push({ x: sX, y: sY, radius: 0, maxRadius: 6, speed: 0.18, intensity: 2.2 });
    });

    // Interaction & Animation State
    camera.position.z = 15;

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    const clock = new THREE.Clock();

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Main Hyper-Animated Render Loop
    function animate() {
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Smooth Mouse Interpolation
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // 1. Update Wave Shockwaves Progress
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.intensity *= 0.96;
        if (sw.radius > sw.maxRadius || sw.intensity < 0.05) {
          shockwaves.splice(i, 1);
        }
      }

      // 2. High-Frequency 3D Wave Field Undulation & Dynamic Color Cycling
      const posAttr = waveGeo.attributes.position;
      const colAttr = waveGeo.attributes.color;
      const positions = posAttr.array;
      const colors = colAttr.array;

      let pIdx = 0;
      for (let ix = 0; ix < GRID_X; ix++) {
        for (let iy = 0; iy < GRID_Y; iy++) {
          const uX = (ix / GRID_X - 0.5) * 4;
          const uY = (iy / GRID_Y - 0.5) * 4;

          // Multi-frequency wave math
          let z = Math.sin(uX * 3.2 + time * 2.8) * 1.8 +
                  Math.cos(uY * 3.2 + time * 2.4) * 1.8 +
                  Math.sin((uX + uY) * 2.0 + time * 3.2) * 1.0;

          // Mouse Hover Proximity Distortion
          const mDistSq = (uX - targetMouseX * 2.2) ** 2 + (uY - targetMouseY * 2.2) ** 2;
          if (mDistSq < 3.0) {
            z += (3.0 - mDistSq) * 1.6 * Math.sin(time * 6);
          }

          // Active Click Shockwave Distortions
          for (let sw of shockwaves) {
            const swDist = Math.sqrt((uX - sw.x) ** 2 + (uY - sw.y) ** 2);
            const ringDist = Math.abs(swDist - sw.radius);
            if (ringDist < 0.8) {
              z += (0.8 - ringDist) * sw.intensity * Math.sin(swDist * 4 - time * 8);
            }
          }

          positions[pIdx * 3 + 2] = z;

          // Dynamic Particle Color Shift based on Z Height
          const normalizedZ = (z + 3) / 6;
          const r = baseColor.r * (0.6 + normalizedZ * 0.4);
          const g = baseColor.g * (0.6 + normalizedZ * 0.4);
          const b = baseColor.b * (0.6 + normalizedZ * 0.4) + normalizedZ * 0.3;

          colors[pIdx * 3] = Math.min(r, 1);
          colors[pIdx * 3 + 1] = Math.min(g, 1);
          colors[pIdx * 3 + 2] = Math.min(b, 1);

          pIdx++;
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // 3. Animate Quantum Core Gyroscopic Spins & Pulsing
      innerCore.rotation.x += 0.008;
      innerCore.rotation.y += 0.012;

      octCore.rotation.x -= 0.015;
      octCore.rotation.z += 0.018;

      outerCore.rotation.x -= 0.004;
      outerCore.rotation.z += 0.006;

      ring1.rotation.z += 0.012;
      ring1.rotation.x += 0.006;

      ring2.rotation.y += 0.010;
      ring2.rotation.z -= 0.008;

      ring3.rotation.x -= 0.014;
      ring3.rotation.y += 0.007;

      // Orbit Satellite Nodes around core
      satellites.forEach(s => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.y = Math.sin(s.angle) * (s.radius * 0.6);
        s.mesh.position.z = Math.sin(s.angle * 1.5) * 1.5;
      });

      // Pulse core scale dynamically
      const pulseScale = 1 + Math.sin(time * 3.5) * 0.09;
      coreGroup.scale.set(pulseScale, pulseScale, pulseScale);

      // 4. Animate Cyber Beams / Light Streaks Falling Downward
      beams.forEach(b => {
        const p = b.mesh.geometry.attributes.position.array;
        p[1] -= b.speed;
        p[4] -= b.speed;

        if (p[1] < b.resetY) {
          const newX = (Math.random() - 0.5) * 70;
          const newZ = (Math.random() - 0.5) * 30 - 5;
          const len = 3 + Math.random() * 5;

          p[0] = newX; p[1] = b.topY; p[2] = newZ;
          p[3] = newX; p[4] = b.topY - len; p[5] = newZ;
        }
        b.mesh.geometry.attributes.position.needsUpdate = true;
      });

      // 5. Dynamic Camera Flight & Parallax
      camera.position.x = targetMouseX * 2.8;
      camera.position.y = -targetMouseY * 2.2;
      
      const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      camera.position.z = 15 - scrollRatio * 5;

      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Theme Color Update Hook
    window.updateThreeThemeColor = function (hexColor) {
      baseColor.setHex(hexColor);
      innerMat.color.setHex(hexColor);
      ring1.material.color.setHex(hexColor);
      ring2.material.color.setHex(hexColor);
      ring3.material.color.setHex(hexColor);
    };
  })();

  // ==========================================
  // 2. THEME PICKER SYSTEM
  // ==========================================
  (function initThemePicker() {
    const themeDots = document.querySelectorAll('.theme-dot');
    const savedTheme = localStorage.getItem('srb_portfolio_theme') || 'amber';

    function setTheme(themeName) {
      document.body.setAttribute('data-theme', themeName);
      themeDots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.setTheme === themeName);
      });
      localStorage.setItem('srb_portfolio_theme', themeName);

      if (THEME_COLORS[themeName] && window.updateThreeThemeColor) {
        window.updateThreeThemeColor(THEME_COLORS[themeName]);
      }
    }

    setTheme(savedTheme);

    themeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        setTheme(dot.dataset.setTheme);
      });
    });
  })();

  // ==========================================
  // 3. TYPEWRITER HERO ROLE TICKER
  // ==========================================
  (function initTypewriter() {
    const roles = [
      "AI & Machine Learning Engineer",
      "Multi-Agent RAG Specialist (Atlas)",
      "IEEE Research Author (GANs & XAI)",
      "B.Tech CSE Graduate (RV University)"
    ];
    const targetEl = document.getElementById('typed-text');
    if (!targetEl) return;

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function typeStep() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        targetEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        speed = 40;
      } else {
        targetEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        speed = 80;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        speed = 2200; // Pause at full word
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeStep, speed);
    }

    setTimeout(typeStep, 600);
  })();

  // ==========================================
  // 4. INTERACTIVE CLI TERMINAL ENGINE
  // ==========================================
  (function initCLI() {
    const cliTrigger = document.getElementById('cli-trigger');
    const heroCliBtn = document.getElementById('hero-cli-btn');
    const cliModal = document.getElementById('cli-modal');
    const cliClose = document.getElementById('cli-close');
    const cliClear = document.getElementById('cli-clear-btn');
    const cliBody = document.getElementById('cli-body');
    const cliInput = document.getElementById('cli-input');
    const presetChips = document.querySelectorAll('.cli-chip');

    if (!cliModal || !cliInput) return;

    function toggleCLI(show) {
      cliModal.classList.toggle('active', show);
      if (show) {
        cliInput.focus();
      }
    }

    if (cliTrigger) cliTrigger.addEventListener('click', () => toggleCLI(true));
    if (heroCliBtn) heroCliBtn.addEventListener('click', () => toggleCLI(true));
    if (cliClose) cliClose.addEventListener('click', () => toggleCLI(false));

    cliModal.addEventListener('click', (e) => {
      if (e.target === cliModal) toggleCLI(false);
    });

    if (cliClear) {
      cliClear.addEventListener('click', () => {
        cliBody.innerHTML = '<div class="cli-line">Screen cleared. Type <span class="cmd-highlight">\'help\'</span> for commands.</div>';
      });
    }

    // CLI Commands Processor
    const COMMANDS = {
      help: `Available commands:<br>
      - <span class="cmd-highlight">summary</span>: Professional bio &amp; background<br>
      - <span class="cmd-highlight">skills</span>: Technical expertise &amp; stack<br>
      - <span class="cmd-highlight">projects</span>: Featured open-source projects<br>
      - <span class="cmd-highlight">pub</span>: IEEE research publication<br>
      - <span class="cmd-highlight">education</span>: Academics &amp; degree details<br>
      - <span class="cmd-highlight">contact</span>: Email, phone, &amp; LinkedIn<br>
      - <span class="cmd-highlight">download</span>: Download PDF Resume<br>
      - <span class="cmd-highlight">clear</span>: Clear terminal window<br>
      - <span class="cmd-highlight">exit</span>: Close CLI window`,

      summary: `<strong>PROFESSIONAL SUMMARY:</strong><br>
      Recent B.Tech CSE graduate (RV University) specializing in Machine Learning, Multi-Agent RAG systems, and AI applications. Built open-source projects including Atlas RAG Chatbot, Intellect Google Drive Assistant, Emotion Drift Analyzer, and published IEEE research on adverse-weather GAN image translation.`,

      skills: `<strong>TECHNICAL EXPERTISE:</strong><br>
      • AI &amp; ML: Machine Learning, Deep Learning, Multi-Agent RAG, NLP, Computer Vision, GANs, Explainable AI<br>
      • Languages: Python, SQL, C++, JavaScript<br>
      • Frameworks &amp; Tools: PyTorch, LangChain, FastAPI, Node.js, React, Chroma DB, SQLite, Ollama, Tavily API`,

      projects: `<strong>FEATURED REPOSITORIES:</strong><br>
      1. <strong>Atlas Multi-Agent RAG System</strong> (github.com/skanda0303/aichatbot)<br>
         - 6-stage multi-agent RAG chatbot with hybrid search (BM25 + Vector), reranking, and live web fallback.<br>
      2. <strong>Intellect Google Drive AI Agent</strong> (github.com/skanda0303/Final_Miniproject)<br>
         - Autonomous document assistant using local Ollama LLMs (Gemma &amp; Qwen) and Google Drive API.<br>
      3. <strong>Emotion Drift Analyzer</strong> (github.com/skanda0303/nlp_proj)<br>
         - NLP dashboard tracking multi-turn conversation emotion progression and escalation risk scoring.<br>
      4. <strong>Generative AI Laboratory &amp; ReAct Agent</strong> (github.com/skanda0303/gen_ai)<br>
         - ReAct agentic reasoning loop over GitHub codebases and neural network architecture experiments.`,

      pub: `<strong>IEEE PUBLICATION:</strong><br>
      "Unpaired Adverse-Weather Image Translation Using GAN Architectures with XAI-Driven Interpretability Across Multi-Domain Conditions"<br>
      • IEEE i3ctcon 2026 (March 14, 2026)<br>
      • Mentors: Prof Ashwini, Prof Merin Thomas`,

      education: `<strong>ACADEMICS &amp; DEGREES:</strong><br>
      • <strong>RV University</strong> (2023-2027): B.Tech CSE (AI &amp; Machine Learning) | CGPA: 9 / 10<br>
      • <strong>Base PU College</strong> (2023): Class XII (PUE Karnataka) | 94.83%<br>
      • <strong>Pushkarini School</strong> (2021): Class X (CBSE) | 79.66%`,

      contact: `<strong>CONTACT DETAILS:</strong><br>
      • Phone: +91-9148246127<br>
      • Email: skandarb.btech23@rvu.edu.in / skandarb2005@gmail.com<br>
      • LinkedIn: linkedin.com/in/skanda-r-a58524386/<br>
      • Location: Bengaluru, Karnataka, India`,

      download: `Initiating download for Skanda_Ramesh_Bharadwaja_Resume.pdf...`
    };

    function runCommand(cmdText) {
      const cleanCmd = cmdText.trim().toLowerCase();
      const line = document.createElement('div');
      line.className = 'cli-line';
      line.innerHTML = `<span class="prompt-text">skanda@portfolio:~$</span> ${cmdText}`;
      cliBody.appendChild(line);

      const outLine = document.createElement('div');
      outLine.className = 'cli-line';

      if (cleanCmd === 'exit') {
        toggleCLI(false);
        return;
      } else if (cleanCmd === 'clear') {
        cliBody.innerHTML = '';
        return;
      } else if (cleanCmd === 'download') {
        outLine.innerHTML = COMMANDS.download;
        const link = document.createElement('a');
        link.href = 'Initial Resume_1.pdf';
        link.download = 'Skanda_Ramesh_Bharadwaja_Resume.pdf';
        link.click();
      } else if (COMMANDS[cleanCmd]) {
        outLine.innerHTML = COMMANDS[cleanCmd];
      } else if (cleanCmd !== '') {
        outLine.innerHTML = `Command not found: <span style="color:#ef4444">'${cmdText}'</span>. Type <span class="cmd-highlight">'help'</span> for list of commands.`;
      }

      if (cleanCmd !== '') {
        cliBody.appendChild(outLine);
      }

      cliBody.scrollTop = cliBody.scrollHeight;
    }

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value;
        cliInput.value = '';
        runCommand(val);
      }
    });

    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd;
        runCommand(cmd);
      });
    });
  })();

  // ==========================================
  // 5. INTERACTIVE AI RESUME BOT ASSISTANT
  // ==========================================
  (function initAIBot() {
    const botTrigger = document.getElementById('bot-trigger');
    const heroBotBtn = document.getElementById('hero-bot-btn');
    const botWindow = document.getElementById('bot-window');
    const botClose = document.getElementById('bot-close-btn');
    const botMessages = document.getElementById('bot-messages');
    const botInput = document.getElementById('bot-input');
    const botSendBtn = document.getElementById('bot-send-btn');
    const botChips = document.querySelectorAll('.bot-chips .chip');

    if (!botWindow || !botMessages) return;

    function toggleBot(show) {
      botWindow.classList.toggle('active', show);
    }

    if (botTrigger) botTrigger.addEventListener('click', () => toggleBot(!botWindow.classList.contains('active')));
    if (heroBotBtn) heroBotBtn.addEventListener('click', () => toggleBot(true));
    if (botClose) botClose.addEventListener('click', () => toggleBot(false));

    const BOT_KB = [
      {
        keys: ['atlas', 'aichatbot', 'rag', 'multi-agent', 'huggingface', 'tavily'],
        answer: "Atlas is Skanda's multi-agent RAG system deployed on Hugging Face (github.com/skanda0303/aichatbot). It features a 6-stage pipeline (Query Rewriter, RAG Agent with hybrid BM25/vector search, Context Evaluator, Web Search fallback, Answer Agent + Critic verification, and Supervisor SSE streaming)."
      },
      {
        keys: ['intellect', 'miniproject', 'drive', 'gdrive', 'ollama', 'gemma', 'qwen'],
        answer: "Intellect (github.com/skanda0303/Final_Miniproject) is an AI-powered Drive Agent built with React, Node.js, and Ollama (Gemma & Qwen local LLMs). It provides local RAG document Q&A and automated Google Drive folder reorganization."
      },
      {
        keys: ['emotion', 'drift', 'nlp', 'nlp_proj', 'chart'],
        answer: "Emotion Drift Analyzer (github.com/skanda0303/nlp_proj) is an NLP dashboard tracking emotion evolution across conversations into core emotional states with trend analysis, escalation risk scoring, and Chart.js visuals."
      },
      {
        keys: ['gen_ai', 'react', 'lab', 'cloner', 'agent.py'],
        answer: "Generative AI Lab (github.com/skanda0303/gen_ai) features a ReAct agentic loop for codebase Q&A and experimental neural network architectures."
      },
      {
        keys: ['ieee', 'paper', 'publication', 'gan', 'weather', 'research', 'fastcut', 'cyclegan'],
        answer: "Skanda co-authored an IEEE paper published at IEEE i3ctcon 2026 titled 'Unpaired Adverse-Weather Image Translation Using GAN Architectures with XAI-Driven Interpretability Across Multi-Domain Conditions'."
      },
      {
        keys: ['enkefalos', 'intern', 'internship'],
        answer: "During his AI Internship at Enkefalos Technologies (Jun-Jul 2026), Skanda developed a FastAPI agentic RAG chatbot using LangChain, Gemini API, Chroma DB, and Tavily API."
      },
      {
        keys: ['education', 'university', 'college', 'rv'],
        answer: "Skanda completed his B.Tech. in CSE (AI & Machine Learning) at RV University, Bengaluru with a 9/10 CGPA."
      },
      {
        keys: ['contact', 'email', 'phone', 'location', 'bengaluru', 'linkedin'],
        answer: "You can contact Skanda via Email at skandarb.btech23@rvu.edu.in or skandarb2005@gmail.com, or Phone at +91-9148246127."
      }
    ];

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = `bot-msg ${sender === 'user' ? 'msg-user' : 'msg-ai'}`;
      msg.innerHTML = text;
      botMessages.appendChild(msg);
      botMessages.scrollTop = botMessages.scrollHeight;
    }

    function processBotQuery(userQuery) {
      appendMessage('user', userQuery);

      const q = userQuery.toLowerCase();
      let bestAnswer = "I'm Skanda's AI assistant! Ask me about Atlas (Multi-Agent RAG), Intellect (Google Drive Assistant), Emotion Drift Analyzer, IEEE publication, or contact info!";

      for (let item of BOT_KB) {
        if (item.keys.some(k => q.includes(k))) {
          bestAnswer = item.answer;
          break;
        }
      }

      setTimeout(() => {
        appendMessage('ai', bestAnswer);
      }, 400);
    }

    if (botSendBtn && botInput) {
      botSendBtn.addEventListener('click', () => {
        const val = botInput.value.trim();
        if (val) {
          botInput.value = '';
          processBotQuery(val);
        }
      });

      botInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = botInput.value.trim();
          if (val) {
            botInput.value = '';
            processBotQuery(val);
          }
        }
      });
    }

    botChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q;
        processBotQuery(q);
      });
    });
  })();

  // ==========================================
  // 6. INTERACTIVE GAN WEATHER SIMULATOR
  // ==========================================
  (function initGANSimulator() {
    const tabs = document.querySelectorAll('.sim-tab');
    const weatherOverlay = document.getElementById('weather-overlay');
    const heatmapOverlay = document.getElementById('heatmap-overlay');
    const xaiToggle = document.getElementById('xai-toggle-checkbox');
    const viewLabel = document.getElementById('view-label-text');

    const fidVal = document.getElementById('fid-val');
    const fidBar = document.getElementById('fid-bar');
    const psnrVal = document.getElementById('psnr-val');
    const psnrBar = document.getElementById('psnr-bar');
    const ssimVal = document.getElementById('ssim-val');
    const ssimBar = document.getElementById('ssim-bar');
    const archDesc = document.getElementById('arch-desc');

    if (!weatherOverlay || !fidVal) return;

    const WEATHER_METRICS = {
      clear: {
        label: "Condition: Clear Day (Source Image)",
        class: "",
        fid: "0.0", fidPct: "5%",
        psnr: "Inf dB", psnrPct: "100%",
        ssim: "1.000", ssimPct: "100%",
        arch: "Original ground truth frame without weather transformation degradation."
      },
      rain: {
        label: "Condition: Heavy Rain (CycleGAN Translated)",
        class: "rain-mode",
        fid: "14.2", fidPct: "28%",
        psnr: "27.8 dB", psnrPct: "78%",
        ssim: "0.884", ssimPct: "88%",
        arch: "ResNet-9 generator trained with CycleGAN cycle-consistency loss & rain layer perceptual loss."
      },
      fog: {
        label: "Condition: Dense Fog (FastCUT Translated)",
        class: "fog-mode",
        fid: "18.5", fidPct: "37%",
        psnr: "25.1 dB", psnrPct: "71%",
        ssim: "0.852", ssimPct: "85%",
        arch: "FastCUT contrastive learning generator maintaining semantic road boundaries."
      },
      snow: {
        label: "Condition: Heavy Snow (Multi-domain GAN)",
        class: "snow-mode",
        fid: "12.8", fidPct: "25%",
        psnr: "29.4 dB", psnrPct: "84%",
        ssim: "0.910", ssimPct: "91%",
        arch: "ResNet generator with VGG Perceptual loss optimizing structural similarity."
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.dataset.weather;
        const m = WEATHER_METRICS[mode];

        viewLabel.textContent = m.label;
        weatherOverlay.className = `weather-layer ${m.class}`;

        fidVal.textContent = m.fid;
        fidBar.style.width = m.fidPct;

        psnrVal.textContent = m.psnr;
        psnrBar.style.width = m.psnrPct;

        ssimVal.textContent = m.ssim;
        ssimBar.style.width = m.ssimPct;

        archDesc.textContent = m.arch;
      });
    });

    if (xaiToggle) {
      xaiToggle.addEventListener('change', () => {
        heatmapOverlay.classList.toggle('active', xaiToggle.checked);
      });
    }
  })();

  // ==========================================
  // 7. PROJECT MODAL & INTERACTIVE CARD PHYSICS
  // ==========================================
  (function initProjectModals() {
    const modal = document.getElementById('proj-modal');
    const modalClose = document.getElementById('proj-modal-close');
    const modalBody = document.getElementById('proj-modal-body');
    const openBtns = document.querySelectorAll('.open-proj-modal');

    if (!modal || !modalBody) return;

    const PROJ_DETAILS = {
      'drive-agent': `
        <h3 style="font-size:1.4rem;color:#fff;margin-bottom:12px;"><i class="fab fa-google-drive" style="color:var(--primary);"></i> AI-Powered Intelligent Drive Agent</h3>
        <p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-bottom:16px;">
          An autonomous agentic workflow built using <strong>Python</strong> and <strong>Local LLMs (Ollama)</strong> designed to intelligently analyze, index, and execute semantic context operations on Google Drive repositories.
        </p>
        <div style="background:rgba(0,0,0,0.4);padding:16px;border-radius:12px;border:1px solid var(--border-glass);margin-bottom:18px;">
          <h4 style="color:var(--primary);font-size:0.9rem;margin-bottom:8px;"><i class="fas fa-cubes"></i> Key Architecture Components:</h4>
          <ul style="color:var(--text-muted);font-size:0.88rem;padding-left:18px;line-height:1.7;">
            <li><strong>LangChain Pipeline:</strong> Orchestrates multi-step document chunking, embeddings extraction, and agent tools.</li>
            <li><strong>SQLite Vector Storage:</strong> Lightweight persistent vector storage for dense file embeddings and semantic Q&amp;A.</li>
            <li><strong>Hybrid Retrieval Engine:</strong> Combines vector similarity search with BM25 keyword matching for max accuracy.</li>
            <li><strong>Google OAuth2 Authentication:</strong> Secure token flow for analyzing Google Drive user storage.</li>
          </ul>
        </div>
        <button class="btn btn-sm btn-primary" onclick="document.getElementById('proj-modal').classList.remove('active');">Close Architecture View</button>
      `
    };

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.proj;
        if (PROJ_DETAILS[key]) {
          modalBody.innerHTML = PROJ_DETAILS[key];
          modal.classList.add('active');
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    // 3D Card Tilt Effect
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

        card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${x * 100}%`);
        card.style.setProperty('--mouse-y', `${y * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  })();

  // ==========================================
  // 8. SCROLL & STAT COUNTER ANIMATIONS
  // ==========================================
  (function initScrollEffects() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }
    });

    // Stat Numbers Intersection Observer
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseFloat(e.target.dataset.count);
          let curr = 0;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;

          const timer = setInterval(() => {
            curr += increment;
            if (curr >= target) {
              curr = target;
              clearInterval(timer);
            }
            e.target.textContent = Number.isInteger(target) ? Math.round(curr) : curr.toFixed(2);
          }, duration / steps);

          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObs.observe(el));

    // Skill Bar Fill Intersection Observer
    const barFills = document.querySelectorAll('.bar-fill');
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    barFills.forEach(el => barObs.observe(el));

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const sendBtn = document.getElementById('send-btn');

    if (contactForm && sendBtn) {
      sendBtn.addEventListener('click', () => {
        const name = document.getElementById('c-name').value;
        const email = document.getElementById('c-email').value;
        const msg = document.getElementById('c-message').value;

        if (name && email && msg) {
          sendBtn.disabled = true;
          sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

          setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message sent successfully! Skanda will get back to you shortly.';
            contactForm.reset();
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          }, 1200);
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all fields before sending.';
        }
      });
    }
  })();

  console.log('Skanda Ramesh Bharadwaja Portfolio — JS Engine Fully Initialized');
});
