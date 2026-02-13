/* =========================
   REFERENCIAS DOM
========================= */
const startPage = document.getElementById("startPage");
const mainPage = document.getElementById("mainPage");
const pointsDisplay = document.getElementById("pointsDisplay");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const nightToggle = document.getElementById("nightToggle");
const music = document.getElementById("bgMusic");

// Bloquea cerrar modal tocando afuera (útil para minijuegos)
let modalBackdropCloseEnabled = true;
// Indica si el juego de atrapar corazones está corriendo
let isCatchGameRunning = false;


/* =========================
   MÚSICA DE FONDO (suave)
   - solo inicia al tocar "Sí"
========================= */
let musicStarted = false;

function startBackgroundMusic(){
  if (musicStarted) return;
  music.volume = 0.18; // Ajusta: 0.10 muy suave / 0.25 medio
  music.play().catch(()=>{});
  musicStarted = true;
}

/* =========================
   🌙 DARK MODE
========================= */
function toggleNight(){
  document.body.classList.toggle("night");
  // si está abierto el canvas de firma, vuelve a configurar color de trazo
  if (document.getElementById("sigCanvas")) setupSignatureCanvas();
}
nightToggle.addEventListener("click", toggleNight);

/* =========================
   PUNTOS
========================= */
let globalPoints = 0;

function addPoints(n){
  globalPoints += n;
  pointsDisplay.innerText = "Puntos: " + globalPoints;
}

/* =========================
   MODAL
========================= */
function openModal(html){
  modalContent.innerHTML = html;
  modal.classList.add("show");
}

function closeModal(){
  modal.classList.remove("show");
  if (typeof window.__modalCleanup === "function") {
    try { window.__modalCleanup(); } catch(e) {}
  }
  window.__modalCleanup = null;
  window.catchFloatingHeart = null;
}

modal.addEventListener("click", (e) => {
  if (!modalBackdropCloseEnabled) return;
  if (e.target === modal) closeModal();
});

/* =========================
   CORAZONES FLOTANTES
========================= */
function createHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤️";

  // Si está corriendo el minijuego, que el corazón quede sobre el modal
  if (isCatchGameRunning) {
    h.style.zIndex = "10005";
  }

  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (Math.random() * 3 + 3) + "s";

  h.onclick = function(){
    if (typeof window.catchFloatingHeart === "function") window.catchFloatingHeart(h);
  };

  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}
setInterval(createHeart, 400);

/* =========================
   BOTÓN NO (se mueve)
========================= */
function moveNo(){
  noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  noBtn.style.top  = Math.random() * (window.innerHeight - 50) + "px";
}
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNo(); });

/* =========================
   BOTÓN SÍ (1 toque)
========================= */
yesBtn.addEventListener("click", () => {
  startBackgroundMusic();
  startPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
});

/* =========================
   🧮 CALCULATOR (fecha)
========================= */
function openCalculator(){
  openModal(`
    <h3>Nuestra fecha 💕</h3>
    <input type="date" id="dateInput">
    <button onclick="checkDate()">Confirmar</button>
    <button onclick="closeModal()">Cerrar</button>
  `);
}

function checkDate(){
  const d = document.getElementById("dateInput").value;

  if (d === "2024-04-27"){
    addPoints(5);

    openModal(`
      <h3>La Amo ❤️</h3>
      <p style="text-align:left; font-size:14px; line-height:1.6;">
        Gracias por hacerme el niño más feliz durante estos casi dos años. 
        No hay un solo día en el que no agradezca tenerla a mi lado. 
        Sin duda, el más afortunado soy yo por poder compartir mi vida con usted, 
        por cada risa, cada abrazo, cada mirada cómplice y cada momento increíble que hemos construido juntos.
        <br><br>
        Gracias por su paciencia, por su amor, por apoyarme incluso en mis días difíciles 
        y por celebrar conmigo cada pequeño logro. A su lado he aprendido que el amor verdadero 
        no solo se siente, se demuestra en los detalles, en la compañía y en el “aquí estoy” 
        incluso cuando las cosas no son fáciles.
        <br><br>
        Espero que podamos seguir caminando juntos siempre, en las buenas y en las malas, 
        creciendo, soñando y cumpliendo metas uno al lado del otro. 
        Porque si es a su lado, cualquier lugar se siente como hogar.
        <br><br>
        <strong>La amo tres millones y un infinito más. 💖✨</strong>
      </p>
      <button onclick="closeModal()">Cerrar</button>
    `);

  } else {
    openModal(`
      <p>Intente otra vez pequitas babosa (no se acordaba de nuestra fecha por infiel)💕</p>
      <button onclick="closeModal()">Cerrar</button>
    `);
  }
}


/* =========================
   📜 CONTRATO + FIRMA DIGITAL
========================= */
function openContract(){
  openModal(`
    <div class="contract-paper">
      <div class="contract-title">💘 CONTRATO OFICIAL DE NOVIAZGO Y SAN VALENTÍN ETERNO 💘</div>
      <div class="contract-line" style="text-align:center;opacity:.85;margin-bottom:10px;">
        “Hasta que la muerte nos separe”
      </div>

      <div class="contract-line">
        En la fecha <b>14 de febrero</b>, reunidos en pleno uso de nuestras facultades emocionales, sentimentales y románticas,
        se celebra el presente Contrato de Novia para San Valentín, el cual tendrá validez desde el momento de su firma
        y permanecerá vigente por el resto de nuestras vidas.
      </div>

      <div class="contract-line" style="margin-top:12px;"><b>📝 DATOS DE LAS PARTES</b></div>

      <div class="contract-line"><b>PRIMERA CONTRATANTE (LA NOVIA):</b></div>
      <div class="contract-line">Nombre: Maryuri Paola Rodríguez Guiza</div>
      <div class="contract-line">Número de Identidad: 0502-2004-01422</div>

      <div class="contract-line" style="margin-top:10px;"><b>SEGUNDO CONTRATANTE (EL NOVIO):</b></div>
      <div class="contract-line">Nombre: Carlos Daniel Tercero Flores</div>
      <div class="contract-line">Número de Identidad: 0319-2005-00430</div>

      <div class="contract-line" style="margin-top:10px;">
        Ambas partes, de manera voluntaria, con amor verdadero y sin presión (solo con amor del bonito), acuerdan lo siguiente:
      </div>

      <div class="contract-line" style="margin-top:12px;"><b>💖 CLÁUSULAS DEL CONTRATO</b></div>

      <div class="contract-line"><b>PRIMERA: OBJETO DEL CONTRATO</b></div>
      <div class="contract-line">
        Maryuri Paola Rodríguez Guiza se compromete formalmente a ser el San Valentín oficial, único y eterno de Carlos Daniel Tercero Flores,
        cada 14 de febrero, desde este día y por el resto de sus vidas, hasta que la muerte los separe.
      </div>

      <div class="contract-line" style="margin-top:10px;"><b>SEGUNDA: COMPROMISO ROMÁNTICO</b></div>
      <div class="contract-line">
        La novia promete entregar amor, cariño, besos, abrazos, detalles, paciencia y ternura, en cantidades ilimitadas,
        y a mantener el corazón de su novio lleno de felicidad.
      </div>

      <div class="contract-line" style="margin-top:10px;"><b>TERCERA: EXCLUSIVIDAD DE SAN VALENTÍN</b></div>
      <div class="contract-line">
        Queda estrictamente prohibido que alguno de los contratantes tenga otro San Valentín alternativo, temporal o de emergencia.
        Este contrato garantiza exclusividad total en el amor.
      </div>

      <div class="contract-line" style="margin-top:10px;"><b>CUARTA: DERECHOS DEL NOVIO</b></div>
      <div class="contract-line">Carlos Daniel Tercero Flores tendrá derecho a:</div>
      <ul class="contract-list">
        <li>Ser amado todos los días.</li>
        <li>Recibir abrazos en cualquier momento.</li>
        <li>Ser consentido, apoyado y respetado.</li>
        <li>Tener a Maryuri como su San Valentín eterno cada 14 de febrero.</li>
      </ul>

      <div class="contract-line" style="margin-top:10px;"><b>QUINTA: DERECHOS DE LA NOVIA</b></div>
      <div class="contract-line">Maryuri Paola Rodríguez Guiza tendrá derecho a:</div>
      <ul class="contract-list">
        <li>Ser amada con lealtad.</li>
        <li>Ser cuidada y valorada.</li>
        <li>Recibir cariño y atención.</li>
        <li>Ser tratada como la prioridad sentimental del novio.</li>
      </ul>

      <div class="contract-line" style="margin-top:10px;"><b>SEXTA: DURACIÓN</b></div>
      <div class="contract-line">
        El presente contrato tendrá duración indefinida y se mantendrá vigente:
        📌 hasta el fin de sus vidas y hasta que la muerte los separe.
      </div>

      <div class="contract-line" style="margin-top:10px;"><b>SÉPTIMA: PENALIZACIÓN POR INCUMPLIMIENTO</b></div>
      <div class="contract-line">
        En caso de incumplimiento, la parte responsable deberá pagar la sanción sentimental correspondiente, la cual incluye:
      </div>
      <ul class="contract-list">
        <li>100 abrazos obligatorios,</li>
        <li>50 besos mínimos,</li>
        <li>1 salida romántica,</li>
        <li>y una disculpa con amor verdadero.</li>
      </ul>

      <div class="contract-line" style="margin-top:10px;"><b>OCTAVA: DISPOSICIÓN FINAL</b></div>
      <div class="contract-line">
        Ambas partes aceptan este contrato con el corazón, el alma y el amor como testigos,
        afirmando que este compromiso es auténtico, sincero y para siempre.
      </div>

      <div class="contract-line" style="margin-top:12px;"><b>❤️ DECLARACIÓN FINAL</b></div>
      <div class="contract-line">
        Maryuri Paola Rodríguez Guiza declara solemnemente que promete ser el San Valentín de Carlos Daniel Tercero Flores
        todos los 14 de febrero, sin falta, con amor fiel, bonito y verdadero, por toda la eternidad.
      </div>

      <div class="contract-actions">
        <button class="contract-btn-primary" onclick="sign()">Firmar 💖</button>
        <button class="contract-btn-secondary" onclick="closeModal()">Cerrar</button>
      </div>
    </div>
  `);
}

/* ====== Firma digital ====== */
let sigCanvas = null;
let sigCtx = null;
let isDrawing = false;
let hasSignature = false;

function sign(){
  // En vez de firmar directo, pedimos firma digital
  openSignatureModal();
}

function openSignatureModal(){
  openModal(`
    <div class="contract-paper">
      <div class="contract-title">✍️ Firma Digital</div>
      <div class="contract-line" style="opacity:.9;">
        Firma aquí con tu dedo (o mouse) y luego presiona <b>Aceptar ✅</b>.
      </div>

      <div style="margin-top:12px;">
        <canvas id="sigCanvas" class="sig-canvas"></canvas>
      </div>

      <div class="contract-actions" style="margin-top:12px;">
        <button class="contract-btn-secondary" onclick="clearSignature()">Limpiar</button>
        <button class="contract-btn-primary" onclick="acceptSignature()">Aceptar ✅</button>
        <button class="contract-btn-secondary" onclick="closeModal()">Cancelar</button>
      </div>
    </div>
  `);

  setupSignatureCanvas();
}

function setupSignatureCanvas(){
  let canvas = document.getElementById("sigCanvas");
  if (!canvas) return;

  // Para evitar listeners duplicados si se reabre:
  const clone = canvas.cloneNode(true);
  canvas.parentNode.replaceChild(clone, canvas);
  sigCanvas = clone;

  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const rect = sigCanvas.getBoundingClientRect();

  sigCanvas.width = Math.floor(rect.width * ratio);
  sigCanvas.height = Math.floor(rect.height * ratio);

  sigCtx = sigCanvas.getContext("2d");
  sigCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

  sigCtx.lineWidth = 3;
  sigCtx.lineCap = "round";
  sigCtx.lineJoin = "round";
  sigCtx.strokeStyle = document.body.classList.contains("night") ? "#ffd1dc" : "#ff4d6d";

  isDrawing = false;
  hasSignature = false;

  const getPos = (evt) => {
    const r = sigCanvas.getBoundingClientRect();
    const e = evt.touches ? evt.touches[0] : evt;
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const start = (evt) => {
    evt.preventDefault();
    isDrawing = true;
    const p = getPos(evt);
    sigCtx.beginPath();
    sigCtx.moveTo(p.x, p.y);
  };

  const move = (evt) => {
    if (!isDrawing) return;
    evt.preventDefault();
    const p = getPos(evt);
    sigCtx.lineTo(p.x, p.y);
    sigCtx.stroke();
    hasSignature = true;
  };

  const end = (evt) => {
    evt.preventDefault();
    isDrawing = false;
  };

  // Mouse
  sigCanvas.addEventListener("mousedown", start);
  sigCanvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end, { once: true });

  // Touch
  sigCanvas.addEventListener("touchstart", start, { passive:false });
  sigCanvas.addEventListener("touchmove", move, { passive:false });
  sigCanvas.addEventListener("touchend", end, { passive:false });
}

function clearSignature(){
  if (!sigCanvas || !sigCtx) return;
  const rect = sigCanvas.getBoundingClientRect();
  sigCtx.clearRect(0, 0, rect.width, rect.height);
  hasSignature = false;
}

function acceptSignature(){
  if (!hasSignature){
    openModal(`
      <div class="contract-paper" style="text-align:center;">
        <div class="contract-title">😅 Falta la firma</div>
        <div class="contract-line">Primero dibuja tu firma en el recuadro.</div>
        <div class="contract-actions" style="margin-top:14px;">
          <button class="contract-btn-primary" onclick="openSignatureModal()">Volver a firmar</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Cerrar</button>
        </div>
      </div>
    `);
    return;
  }
  finalizeSignedContract();
}

function finalizeSignedContract(){
  closeModal();
  fireworks();
  addPoints(10);

  openModal(`
    <div class="contract-paper" style="text-align:center;">
      <div class="contract-title">✅ CONTRATO FIRMADO 💍❤️</div>
      <div class="contract-line" style="margin-top:10px;">
        Oficialmente y para siempre: <b>San Valentín eterno</b> 💕✨
      </div>
      <div class="contract-actions" style="margin-top:14px;">
        <button class="contract-btn-primary" onclick="closeModal()">Cerrar</button>
      </div>
    </div>
  `);
}

/* =========================
   FIREWORKS
========================= */
function fireworks(){
  for(let i=0;i<50;i++){
    const f = document.createElement("div");
    f.className = "firework";
    f.style.top = window.innerHeight * 0.5 + "px";
    f.style.left = window.innerWidth * 0.5 + "px";
    f.style.setProperty("--x", (Math.random() - 0.5) * 500 + "px");
    f.style.setProperty("--y", (Math.random() - 0.5) * 500 + "px");
    f.style.background = `hsl(${Math.random()*360},100%,65%)`;
    document.body.appendChild(f);
    setTimeout(()=>f.remove(), 1000);
  }
}

/* =========================
   🎮 MINIJUEGOS
========================= */

/* 1️⃣ ATRAPA LOS CORAZONES */
function game1(){
  let score = 0;
  const goal = 5;
  let timeLeft = 15;
  let timerId = null;
  let running = false;

  const loveMsgs = [
    "Te amo 💖",
    "Eres mi vida ❤️",
    "Mi lugar favorito eres tú 🥰",
    "Gracias por existir ✨",
    "Eres mi paz 💞",
    "Tu sonrisa me encanta 😘",
    "Contigo todo es mejor 💗",
    "Mi corazón es tuyo 💘",
    "Siempre tú 💍",
    "Te elijo hoy y siempre 🌹"
  ];

  function stopGame(){
    running = false;
    isCatchGameRunning = false;
    modalBackdropCloseEnabled = true;
    window.catchFloatingHeart = null;
    if(timerId) clearInterval(timerId);
    timerId = null;
  }

  function updateUI(){
    const cSc = document.getElementById("cSc");
    const tLeft = document.getElementById("tLeft");
    if(cSc) cSc.innerText = `${score} / ${goal}`;
    if(tLeft) tLeft.innerText = `${timeLeft}s`;
  }

  function startGame(){
    if(running) return;
    running = true;
    isCatchGameRunning = true;
    modalBackdropCloseEnabled = false;
    score = 0;
    timeLeft = 15;
    updateUI();

    // Captura corazones flotantes SOLO cuando está corriendo
    window.catchFloatingHeart = function(h){
      if(!running) return;

      score++;
      const rect = h.getBoundingClientRect();
      const x = rect.left + rect.width/2;
      const y = rect.top + rect.height/2;

      // Quitar corazón y hacer explosión + mensaje
      h.remove();
      heartPop(x, y);

      updateUI();

      if(score >= goal){
        stopGame();
        addPoints(8);
        openModal(`
          <h2>¡Ganado! ❤️</h2>
          <p>¡Lo lograste en tiempo! 💖</p>
          <button onclick="closeModal()">Cerrar</button>
        `);
      }
    };

    // Cuenta regresiva
    timerId = setInterval(()=>{
      timeLeft--;
      updateUI();

      if(timeLeft <= 0){
        stopGame();
        openModal(`
          <h2>Se acabó el tiempo ⏳</h2>
          <p>Atrapaste <b>${score}</b> de <b>${goal}</b>. Intenta otra vez amor 💕</p>
          <button onclick="closeModal()">Cerrar</button>
        `);
      }
    }, 1000);
  }

  function heartPop(x, y){
    // Partículas corazón
    for(let i=0;i<14;i++){
      const p = document.createElement("div");
      p.className = "firework"; // reutilizamos tu estilo firework
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--x", (Math.random()-0.5)*220 + "px");
      p.style.setProperty("--y", (Math.random()-0.5)*220 + "px");
      p.style.background = `hsl(${Math.random()*360},100%,65%)`;
      document.body.appendChild(p);
      setTimeout(()=>p.remove(), 1000);
    }

    // Mensaje bonito en el punto
    const msg = document.createElement("div");
    msg.innerText = loveMsgs[Math.floor(Math.random()*loveMsgs.length)];
    msg.style.position = "fixed";
    msg.style.left = x + "px";
    msg.style.top = (y - 10) + "px";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.fontWeight = "700";
    msg.style.fontSize = "15px";
    msg.style.padding = "6px 10px";
    msg.style.borderRadius = "14px";
    msg.style.background = "rgba(255,255,255,0.85)";
    msg.style.color = "#ff4d6d";
    msg.style.boxShadow = "0 8px 18px rgba(0,0,0,0.18)";
    msg.style.zIndex = "10001";
    msg.style.pointerEvents = "none";
    msg.style.opacity = "0";
    msg.style.transition = "opacity .15s ease, transform .7s ease";

    document.body.appendChild(msg);

    // Animación (sube y se desvanece)
    requestAnimationFrame(()=>{
      msg.style.opacity = "1";
      msg.style.transform = "translate(-50%, -90%)";
    });

    setTimeout(()=>{
      msg.style.opacity = "0";
      msg.style.transform = "translate(-50%, -130%)";
    }, 650);

    setTimeout(()=>msg.remove(), 900);
  }

  // Abrimos modal inicial con botón iniciar
  openModal(`
    <h3>Atrapa ${goal} ❤️</h3>
    <p>Tiempo: <b id="tLeft">15s</b></p>
    <p id="cSc">0 / ${goal}</p>
    <button onclick="startCatchGame()">Iniciar ▶️</button>
    <button onclick="closeModal()">Salir</button>
  `);

  // Hacemos accesible el iniciar desde el botón del modal
  window.startCatchGame = function(){
    startGame();
    // Cambiar el contenido del modal a "en juego"
    openModal(`
      <h3>¡Corre! 😍</h3>
      <p>Tiempo: <b id="tLeft">${timeLeft}s</b></p>
      <p id="cSc">${score} / ${goal}</p>
      <p style="opacity:.9;">Atrapa 5 corazones en 15 segundos 💘</p>
      <button onclick="closeModal()">Salir</button>
    `);
  };

  // Al cerrar modal: detener todo
  const oldClose = window.closeModal;
  window.closeModal = function(){
    stopGame();
    // restaurar closeModal original
    window.closeModal = oldClose;
    oldClose();
  };
}


/* 2️⃣ DÓNDE ESTÁ EL CORAZÓN */
function game2(){
  // Gift IDs stay attached to the "real" boxes; we shuffle the visual order.
  let giftIds = [0,1,2];
  let correctGiftId = null;
  let canPick = false;
  let shuffleTimer = null;

  function render(order, statusText){
    openModal(`
      <h3>¿Dónde está el ❤️?</h3>

      <div class="gift-area" id="giftArea">
        <div class="heart-fly" id="heartFly">❤️</div>

        ${order.map(id => `
          <button class="gift-btn ${canPick ? "" : "disabled"}" data-gift="${id}" onclick="pickGift(${id})">🎁</button>
        `).join("")}
      </div>

      <div class="game2-status" id="game2Status">${statusText || ""}</div>

      <br>
      <button onclick="closeModal()">Salir</button>
    `);
  }

  function setStatus(t){
    const el = document.getElementById("game2Status");
    if(el) el.textContent = t;
  }

  function setShuffle(on){
    const area = document.getElementById("giftArea");
    if(!area) return;
    area.classList.toggle("shuffling", !!on);
  }

  function randomOrder(){
    return giftIds.slice().sort(()=>Math.random()-0.5);
  }

  function startRound(){
    // stop pending
    if(shuffleTimer) clearTimeout(shuffleTimer);
    canPick = false;

    correctGiftId = giftIds[Math.floor(Math.random()*giftIds.length)];
    let order = randomOrder();
    render(order, "Mira bien… 👀");

    // Heart "enters" the correct gift
    const area = document.getElementById("giftArea");
    const heart = document.getElementById("heartFly");
    const targetBtn = area?.querySelector(`.gift-btn[data-gift="${correctGiftId}"]`);

    if(area && heart && targetBtn){
      const areaRect = area.getBoundingClientRect();
      const tRect = targetBtn.getBoundingClientRect();

      const targetX = (tRect.left + tRect.width/2) - areaRect.left;
      const targetY = (tRect.top + tRect.height/2) - areaRect.top;

      heart.style.opacity = "1";
      heart.style.left = "50%";
      heart.style.top = "-6px";
      heart.style.transform = "translate(-50%,0) scale(1)";

      // animate into gift
      heart.animate(
        [
          { transform:"translate(-50%,0) scale(1)", opacity: 1 },
          { transform:`translate(${targetX - areaRect.width/2}px, ${targetY + 10}px) scale(0.25)`, opacity: 0.0 }
        ],
        { duration: 700, easing: "cubic-bezier(.2,.8,.2,1)", fill:"forwards" }
      );

      shuffleTimer = setTimeout(()=>{
        // shuffle animation
        setStatus("Mezclando… 🔀");
        setShuffle(true);

        setTimeout(()=>{
          setShuffle(false);

          // re-render with a new random order (visual shuffle)
          const newOrder = randomOrder();
          render(newOrder, "Ahora elige un regalo 🎁💕");

          // enable picks
          canPick = true;
          // update button states
          document.querySelectorAll(".gift-btn").forEach(b=>b.classList.remove("disabled"));
        }, 900);

      }, 750);
    } else {
      // fallback without animation
      setStatus("Mezclando… 🔀");
      setTimeout(()=>{
        render(randomOrder(), "Ahora elige un regalo 🎁💕");
        canPick = true;
        document.querySelectorAll(".gift-btn").forEach(b=>b.classList.remove("disabled"));
      }, 700);
    }
  }

  function wrongFlow(){
    canPick = false;
    document.querySelectorAll(".gift-btn").forEach(b=>b.classList.add("disabled"));
    setStatus("🎁 Ups… inténtalo de nuevo 💕");
    // reshuffle again after a moment
    setTimeout(()=>startRound(), 900);
  }

  // Expose picker for inline onclicks in modal
  window.pickGift = function(giftId){
    if(!canPick) return;

    if(giftId === correctGiftId){
      addPoints(6);
      openModal(`
  <div class="contract-paper" style="max-height:65vh;">
    <div class="contract-title">💘 ¡Encontraste mi corazón! 💘</div>
    <div class="contract-line" style="text-align:left; font-size:14px; line-height:1.65;">
      Sabía que lo iba a lograr, porque siempre logra todo lo que se propone. Desde que la conozco he visto en usted una fuerza que pocas personas tienen, una valentía que inspira y un corazón enorme que no se rinde jamás. Siempre he sabido que es capaz de todo, porque cuando se fija una meta, no hay obstáculo lo suficientemente grande que pueda detenerla.
      <br><br>
      Desde el primer día noté que no era como las demás. Usted es esa niña fuerte, valiente y guapaaa —como siempre se lo he dicho— pero no solo guapa por fuera, sino increíblemente hermosa por dentro. Tiene una luz que brilla incluso en los momentos más oscuros. Y aunque la vida le haya puesto pruebas difíciles, aunque haya tenido que enfrentar tantos y tantos problemas, jamás ha dejado que eso le quite las ganas de seguir luchando.
      <br><br>
      Mi flaquita hermosa, admiro su manera de levantarse cada vez que algo intenta derrumbarla. Admiro su coraje, su determinación y esa fuerza silenciosa que lleva dentro. Sé que no se rinde y que no se va a rendir jamás, porque está hecha de algo especial. Es más fuerte de lo que cree, más valiente de lo que imagina y más capaz de lo que a veces usted misma puede ver.
      <br><br>
      Gracias por ser esa niña fuerte que lucha por sus sueños. Gracias por demostrarme todos los días que la perseverancia y el corazón pueden más que cualquier dificultad. Gracias por enorgullecerme a diario con cada paso que da, con cada logro, con cada batalla que decide enfrentar con la frente en alto.
      <br><br>
      Gracias por ser usted, por su sonrisa, por su ternura, por su carácter, por su luz. Gracias por enseñarme que rendirse no es una opción cuando se tiene un corazón tan grande como el suyo. Estoy inmensamente orgulloso de usted y siempre voy a estar aquí, admirándola, apoyándola y celebrando cada uno de sus triunfos.
      <br><br>
      <b>Nunca olvide lo increíble que es. ✨</b>
    </div>
    <div class="contract-actions" style="margin-top:14px;">
      <button class="contract-btn-primary" onclick="closeModal()">Cerrar</button>
    </div>
  </div>
`);
} else {
      wrongFlow();
    }
  };

  // Start the first round
  startRound();
}

/* 3️⃣ DESCIFRA */
function game3(){
  const words = ["amor","vida","beso","cielo","feliz"];
  let solved = 0;

  function newW(){
    const w = words[Math.floor(Math.random()*words.length)];
    const scr = w.split("").sort(()=>0.5-Math.random()).join("");

    openModal(`
      <h3>Descifra 💌</h3>
      <p>${scr}</p>
      <input id="a" autocomplete="off">
      <button onclick="chk()">Enviar</button>
      <button onclick="closeModal()">Salir</button>
    `);

    window.chk = function(){
      const a = document.getElementById("a");
      if(a && a.value.toLowerCase() === w){
        solved++;
        addPoints(4);

        if(solved >= 5){
          openModal(`<p>¡Felicidades! 💖</p><button onclick="closeModal()">Cerrar</button>`);
        } else {
          newW();
        }
      } else {
        alert("Intenta otra vez 💕");
      }
    };
  }

  newW();
}

/* 4️⃣ DADO ROMÁNTICO */
function game4(){
  const msgs = [
    "Hoy te gano un abrazo grande 💖",
    "Un beso eterno para ti 😘",
    "Cita improvisada esta noche 💕",
    "Mimos todo el día ❤️",
    "Eres mi casualidad favorita ✨",
    "Futuro juntos brillante 💖"
  ];
  const n = Math.floor(Math.random()*msgs.length);
  addPoints(3);

  openModal(`<p>${msgs[n]}</p><button onclick="closeModal()">Cerrar</button>`);
}

/* 5️⃣ QUIZ DE NOSOTROS */
function game5(){
  openModal(`
    <p>¿Nuestro mes?</p>
    <button onclick="q1(true)">Abril</button>
    <button onclick="q1(false)">Junio</button>
    <br><br><button onclick="closeModal()">Salir</button>
  `);

  window.q1 = function(c){
    if(!c){ alert("No 😅"); return; }
    openModal(`
      <p>¿Dónde nos enamoramos?</p>
      <button onclick="q2(true)">Colegio</button>
      <button onclick="q2(false)">Galería</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };

  window.q2 = function(c){
    if(!c){ alert("Casi 😘"); return; }
    openModal(`
      <p>Primera cita romántica</p>
      <button onclick="q3(true)">Cine</button>
      <button onclick="q3(false)">Galería</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };

  window.q3 = function(c){
    if(!c){ alert("No 😅"); return; }
    openModal(`
      <p>Comida favorita</p>
      <button onclick="food()">Pizza</button>
      <button onclick="food()">Papitas fritas</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };

  window.food = function(){
    addPoints(5);
    openModal(`<p>Gracias, ahora lo recordaré 😄💖</p><button onclick="closeModal()">Cerrar</button>`);
  };
}

/* 6️⃣ ADIVINA NÚMERO */
function game6(){
  const num = Math.floor(Math.random()*10) + 1;
  let btns = "";
  for(let i=1;i<=10;i++){
    btns += `<button onclick="g(${i},${num})">${i}</button>`;
  }
  openModal(`<h3>Adivina 🔢</h3>${btns}<br><br><button onclick="closeModal()">Salir</button>`);
}

window.g = function(x, num){
  const msgs = ["No es ese, pero te amo ❤️","Intenta otra vez linda 💕","Casi 😘","Muy cerca 💗","Nooo 😅","Ese no 🙈"];
  if(x === num){
    addPoints(7);
    openModal(`<p>¡Correcto! ❤️✨ Te amo muchísimo 😘</p><button onclick="closeModal()">Cerrar</button>`);
  } else {
    openModal(`<p>${msgs[Math.floor(Math.random()*msgs.length)]}</p><button onclick="closeModal()">Intentar</button>`);
  }
};


/* 9️⃣ ROMPECABEZAS (4x4 + TIEMPO) */
function game9(){
  const imgUrl = "img/puzzle.jpeg";
  const size = 4;                 // 4x4
  const empty = size*size - 1;    // último
  let tiles = [];
  let awarded = false;

  openModal(`
    <div class="puzzle-wrap">
      <div class="puzzle-top">
        <h3 style="margin:0;">Rompecabezas 🧩</h3>
        <div class="puzzle-timer" id="puzzleTimer">00:00</div>
      </div>
      <p style="font-size:14px; line-height:1.4; margin:0;">
        Ordena la imagen. Toca una pieza que esté junto al espacio vacío.
      </p>
      <div class="puzzle-board" id="puzzleBoard"></div>
      <div class="puzzle-actions">
        <button id="puzzleShuffleBtn">Mezclar 🔀</button>
        <button onclick="closeModal()">Salir</button>
      </div>
    </div>
  `);

  const board = document.getElementById("puzzleBoard");
  const shuffleBtn = document.getElementById("puzzleShuffleBtn");
  const timerEl = document.getElementById("puzzleTimer");

  // Ajusta columnas según tamaño
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  let timerId = null;
  let startMs = Date.now();

  function fmt(ms){
    const total = Math.floor(ms/1000);
    const mm = String(Math.floor(total/60)).padStart(2,"0");
    const ss = String(total%60).padStart(2,"0");
    return `${mm}:${ss}`;
  }

  function startTimer(){
    stopTimer();
    startMs = Date.now();
    timerEl.textContent = "00:00";
    timerId = setInterval(() => {
      timerEl.textContent = fmt(Date.now() - startMs);
    }, 250);
  }

  function stopTimer(){
    if(timerId){
      clearInterval(timerId);
      timerId = null;
    }
  }

  // Limpieza segura al cerrar modal
  window.__modalCleanup = () => {
    stopTimer();
  };

  function inversionCount(arr){
    const a = arr.filter(x => x !== empty);
    let inv = 0;
    for(let i=0;i<a.length;i++){
      for(let j=i+1;j<a.length;j++){
        if(a[i] > a[j]) inv++;
      }
    }
    return inv;
  }

  function blankRowFromBottom(arr){
    const emptyIndex = arr.indexOf(empty);
    const rowFromTop = Math.floor(emptyIndex / size); // 0..size-1
    return size - rowFromTop; // 1..size
  }

  function isSolvable(arr){
    const inv = inversionCount(arr);
    if(size % 2 === 1){
      return inv % 2 === 0;
    } else {
      const blankFromBottom = blankRowFromBottom(arr);
      // Regla para grid par:
      // si el espacio vacío está en fila par desde abajo -> inversions impares
      // si está en fila impar desde abajo -> inversions pares
      if(blankFromBottom % 2 === 0) return inv % 2 === 1;
      return inv % 2 === 0;
    }
  }

  function isSolved(arr){
    for(let i=0;i<arr.length;i++){
      if(arr[i] !== i) return false;
    }
    return true;
  }

  function shuffleSolvable(){
    let arr;
    do{
      arr = [...Array(size*size).keys()];
      for(let i=arr.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }while(!isSolvable(arr) || isSolved(arr));
    return arr;
  }

  function canMove(tileIndex){
    const emptyIndex = tiles.indexOf(empty);
    const r = Math.floor(tileIndex / size), c = tileIndex % size;
    const er = Math.floor(emptyIndex / size), ec = emptyIndex % size;
    return (Math.abs(r-er) + Math.abs(c-ec)) === 1;
  }

  function move(tileIndex){
    if(!canMove(tileIndex)) return;
    const emptyIndex = tiles.indexOf(empty);
    [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
    render();

    if(isSolved(tiles) && !awarded){
      awarded = true;
      stopTimer();
      const elapsed = fmt(Date.now() - startMs);
      fireworks();
      addPoints(12);
      openModal(`
        <div class="contract-paper" style="text-align:center;">
          <div class="contract-title">🎉 ¡Lo lograste!</div>
          <div class="contract-line">Tiempo: <b>${elapsed}</b></div>
          <div class="contract-line">+12 puntos 💖</div>
          <div class="contract-actions" style="margin-top:14px;">
            <button class="contract-btn-primary" onclick="game9()">Jugar otra vez</button>
            <button class="contract-btn-secondary" onclick="closeModal()">Cerrar</button>
          </div>
        </div>
      `);
    }
  }

  function render(){
    board.innerHTML = "";
    tiles.forEach((t, idx) => {
      const div = document.createElement("div");
      div.className = "puzzle-tile";

      if(t === empty){
        div.classList.add("puzzle-empty");
      }else{
        const tr = Math.floor(t / size);
        const tc = t % size;

        // Para 4x4: 0%, 33.33%, 66.66%, 100%
        const x = (tc/(size-1))*100;
        const y = (tr/(size-1))*100;

        div.style.backgroundImage = `url('${imgUrl}')`;
        div.style.backgroundSize  = `${size*100}% ${size*100}%`;
        div.style.backgroundPosition = `${x}% ${y}%`;

        div.addEventListener("click", () => move(idx));
      }

      board.appendChild(div);
    });
  }

  function start(){
    awarded = false;
    tiles = shuffleSolvable();
    render();
    startTimer();
  }

  shuffleBtn.addEventListener("click", start);
  start();
}


/* =========================
   EXPONER FUNCIONES (por si acaso)
   (para onclick del HTML)
========================= */
window.openCalculator = openCalculator;
window.checkDate = checkDate;
window.openContract = openContract;
window.sign = sign;
window.openSignatureModal = openSignatureModal;
window.clearSignature = clearSignature;
window.acceptSignature = acceptSignature;
window.closeModal = closeModal;

window.game1 = game1;
window.game2 = game2;
window.game3 = game3;
window.game4 = game4;
window.game5 = game5;
window.game6 = game6;
