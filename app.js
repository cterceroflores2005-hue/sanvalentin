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
  window.catchFloatingHeart = null;
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* =========================
   CORAZONES FLOTANTES
========================= */
function createHeart(){
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤️";
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
  const correct = Math.floor(Math.random()*3);

  openModal(`
    <h3>¿Dónde está el ❤️?</h3>
    <button onclick="pick(0)">🎁</button>
    <button onclick="pick(1)">🎁</button>
    <button onclick="pick(2)">🎁</button>
    <br><br><button onclick="closeModal()">Salir</button>
  `);

  window.pick = function(n){
    if(n === correct){
      addPoints(6);
      openModal(`<p>💘 ¡Encontraste mi corazón! 💘</p><button onclick="closeModal()">Cerrar</button>`);
    } else {
      openModal(`<p>Intenta otra vez 💕</p><button onclick="closeModal()">Cerrar</button>`);
    }
  };
}

/* 3️⃣ DESCIFRA */
function game3(){
  const words = ["amor","vida","beso","cielo","feliz"];
  let solved = 0;

  const encourageMsgs = [
    "Casi mi amor 💕 ¡Inténtalo otra vez, tú puedes!",
    "No pasa nada 😘 A veces el amor se descifra con calma.",
    "Uy 🙈 ¡Pero yo sé que lo lograrás! Intenta de nuevo 💖",
    "Respira bonito ✨ y vuelve a intentarlo, confío en ti ❤️",
    "Mi flaquita hermosa, tú eres capaz de todo 🥰 ¡otra vez!",
    "Te quedaste cerquita 💗 ¡inténtalo una vez más!"
  ];

  function showTryAgain(){
    const msg = encourageMsgs[Math.floor(Math.random()*encourageMsgs.length)];
    openModal(`
      <div class="contract-paper" style="text-align:left;">
        <div class="contract-title">💌 Intenta otra vez</div>
        <div class="contract-line" style="line-height:1.6;">${msg}</div>
        <div class="contract-actions" style="margin-top:14px;">
          <button class="contract-btn-primary" onclick="continueDecipher()">Seguir intentando 💖</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  function showFinish(){
    openModal(`
      <div class="contract-paper" style="text-align:left;">
        <div class="contract-title">🎉 ¡Lo lograste! 💖</div>
        <div class="contract-line" style="line-height:1.6;">
          Eres increíble 😍 Ahora quiero saber algo…
        </div>

        <div class="contract-line" style="margin-top:10px; line-height:1.6;">
          <b>Escribe una cosa que tú quieras</b> (puede ser un antojo, una cita, un plan, lo que sea) 💞
        </div>

        <input id="wishInput" placeholder="Escribe aquí..." style="margin-top:10px;">

        <div class="contract-actions" style="margin-top:14px;">
          <button class="contract-btn-primary" onclick="submitWish()">Aceptar ✅</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Cerrar</button>
        </div>
      </div>
    `);
  }

  function showWishThanks(wish){
    const safeWish = (wish || "").replace(/[<>]/g,"");
    openModal(`
      <div class="contract-paper" style="text-align:left;">
        <div class="contract-title">💗 Anotado, mi amor</div>
        <div class="contract-line" style="line-height:1.7;">
          Me encanta 😘<br><br>
          <b>Lo que tú quieres:</b><br>
          “${safeWish || "❤️"}”
        </div>
        <div class="contract-line" style="margin-top:10px; line-height:1.6;">
          Gracias por jugar conmigo. Te amo muchísimo ✨
        </div>
        <div class="contract-actions" style="margin-top:14px;">
          <button class="contract-btn-primary" onclick="closeModal()">Cerrar</button>
        </div>
      </div>
    `);
  }

  function newW(){
    const w = words[Math.floor(Math.random()*words.length)];
    const scr = w.split("").sort(()=>0.5-Math.random()).join("");

    openModal(`
      <div class="contract-paper" style="text-align:center;">
        <div class="contract-title">🧩 Descifra 💌</div>
        <div class="contract-line" style="text-align:center;">
          <b>${solved}</b> / <b>5</b> correctas
        </div>
        <div class="contract-line" style="font-size:22px; text-align:center; letter-spacing:2px;">
          ${scr}
        </div>
        <input id="a" autocomplete="off" placeholder="Escribe la palabra...">
        <div class="contract-actions">
          <button class="contract-btn-primary" onclick="chk()">Enviar</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);

    window.chk = function(){
      const a = document.getElementById("a");
      const guess = a ? a.value.toLowerCase().trim() : "";
      if(guess === w){
        solved++;
        addPoints(4);

        if(solved >= 5){
          // final
          window.continueDecipher = null;
          showFinish();
        } else {
          newW();
        }
      } else {
        // modal bonito con ánimo + botón seguir
        window.continueDecipher = function(){
          newW();
        };
        showTryAgain();
      }
    };

    window.submitWish = function(){
      const inp = document.getElementById("wishInput");
      const wish = inp ? inp.value.trim() : "";
      showWishThanks(wish);
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
  // Helpers para modales bonitos del quiz
  function prettyBox(title, body, extraButtonsHtml=""){
    openModal(`
      <div class="contract-paper quiz-paper">
        <div class="contract-title">${title}</div>
        <div class="contract-line">${body}</div>
        <div class="contract-actions" style="margin-top:12px;">
          ${extraButtonsHtml}
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  function wrong(msg, retryFnName){
    openModal(`
      <div class="contract-paper quiz-paper" style="text-align:center;">
        <div class="contract-title">🎁 Ups…</div>
        <div class="contract-line">${msg}</div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-primary" onclick="${retryFnName}()">Intentar de nuevo 💕</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  // Pregunta 1
  function qMonth(){
    openModal(`
      <div class="contract-paper quiz-paper">
        <div class="contract-title">❓ Quiz de nosotros</div>
        <div class="contract-line"><b>¿Nuestro mes?</b></div>
        <div class="option-grid">
          <button class="option-btn" onclick="q1(true)">Abril</button>
          <button class="option-btn" onclick="q1(false)">Junio</button>
        </div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  // Pregunta 2
  function qWhere(){
    openModal(`
      <div class="contract-paper quiz-paper">
        <div class="contract-title">💖 Vamos bien</div>
        <div class="contract-line"><b>¿Dónde nos enamoramos?</b></div>
        <div class="option-grid">
          <button class="option-btn" onclick="q2(true)">Colegio</button>
          <button class="option-btn" onclick="q2(false)">Galería</button>
        </div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  // Pregunta 3
  function qFirstDate(){
    openModal(`
      <div class="contract-paper quiz-paper">
        <div class="contract-title">🥰 Casi casi</div>
        <div class="contract-line"><b>Primera cita romántica</b></div>
        <div class="option-grid">
          <button class="option-btn" onclick="q3(true)">Cine</button>
          <button class="option-btn" onclick="q3(false)">Galería</button>
        </div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  // Pregunta 4 (comida con 12 opciones: 2 + 10 nuevas)
  const foods = [
    "Pizza",
    "Papitas fritas",
    "Hamburguesa",
    "Tacos",
    "Sushi",
    "Pasta",
    "Pollo frito",
    "Helado",
    "Enchiladas",
    "Baleadas",
    "Pupusas",
    "Chocolate"
  ];

  function qFood(){
    let btns = foods.map(f => `<button class="option-btn" onclick="food('${f.replace(/'/g,"&#39;")}')">${f}</button>`).join("");
    openModal(`
      <div class="contract-paper quiz-paper">
        <div class="contract-title">🍽️ Última</div>
        <div class="contract-line"><b>Comida favorita</b></div>
        <div class="option-grid">
          ${btns}
        </div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);
  }

  // Exponer para onclick
  window.qMonth = qMonth;
  window.qWhere = qWhere;
  window.qFirstDate = qFirstDate;
  window.qFood = qFood;

  window.q1 = function(correct){
    if(!correct){
      wrong("Ese regalito no era 😅", "qMonth");
      return;
    }
    qWhere();
  };

  window.q2 = function(correct){
    if(!correct){
      wrong("Casi 😘 ¡Inténtalo otra vez!", "qWhere");
      return;
    }
    qFirstDate();
  };

  window.q3 = function(correct){
    if(!correct){
      wrong("Uy no 🙈 ¡Vuelve a intentarlo!", "qFirstDate");
      return;
    }
    qFood();
  };

  window.food = function(choice){
    addPoints(5);
    openModal(`
      <div class="contract-paper quiz-paper" style="text-align:center;">
        <div class="contract-title">😄💖</div>
        <div class="contract-line">Anotado: <b>${choice}</b> ✨</div>
        <div class="contract-line" style="margin-top:6px;">Gracias, ahora lo recordaré 💕</div>
        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-primary" onclick="closeModal()">Cerrar</button>
        </div>
      </div>
    `);
  };

  // Iniciar
  qMonth();
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

/* =========================
   7️⃣ ROMPECABEZAS (foto)
   - Tap-friendly: toca 2 piezas para intercambiar
   - Responsive: se adapta al ancho del celular
========================= */
function game7(){
  const imgSrc = "img/puzzle.jpeg"; // 👈 tu imagen en el repo
  const size = 3;                  // 3x3
  const winPoints = 12;

  let order = [...Array(size*size).keys()];
  let selectedIndex = null;

  function shuffle(){
    for(let i=order.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  }

  function isSolved(){
    return order.every((v, i) => v === i);
  }

  function computeBoardPx(){
    // Basado en el contenedor del modal, para que se vea perfecto en celular
    const wrap = document.querySelector(".puzzle-wrap");
    const fallback = Math.min(320, Math.floor(window.innerWidth * 0.78));
    if(!wrap) return fallback;

    const w = wrap.getBoundingClientRect().width || fallback;
    // margen interno aproximado
    const px = Math.floor(Math.min(360, w - 24));
    return Math.max(240, Math.min(px, Math.floor(window.innerWidth * 0.82)));
  }

  function render(){
    openModal(`
      <div class="contract-paper puzzle-wrap">
        <div class="contract-title">🧩 Rompecabezas</div>
        <div class="contract-line" style="text-align:center;opacity:.9;">
          Toca una pieza y luego otra para intercambiarlas 💕
        </div>

        <div class="puzzle-board" id="puzzleBoard"></div>

        <div class="contract-actions" style="margin-top:12px;">
          <button class="contract-btn-secondary" onclick="puzzleShuffle()">Mezclar 🔀</button>
          <button class="contract-btn-secondary" onclick="closeModal()">Salir</button>
        </div>
      </div>
    `);

    const board = document.getElementById("puzzleBoard");
    const boardPx = computeBoardPx();

    board.style.setProperty("--puzzle-size", boardPx + "px");
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    board.innerHTML = "";
    const tilePx = boardPx / size;

    order.forEach((tileId, pos) => {
      const r = Math.floor(tileId / size);
      const c = tileId % size;

      const tile = document.createElement("div");
      tile.className = "puzzle-tile";
      tile.style.backgroundImage = `url('${imgSrc}')`;
      tile.style.backgroundPosition = `${-c*tilePx}px ${-r*tilePx}px`;

      tile.addEventListener("click", () => onTileTap(pos, tile, boardPx));
      board.appendChild(tile);
    });
  }

  function clearSelection(){
    selectedIndex = null;
    document.querySelectorAll(".puzzle-tile").forEach(t => t.classList.remove("puzzle-selected"));
  }

  function onTileTap(pos, tileEl, boardPx){
    if(selectedIndex === null){
      selectedIndex = pos;
      tileEl.classList.add("puzzle-selected");
      return;
    }

    if(selectedIndex === pos){
      clearSelection();
      return;
    }

    [order[selectedIndex], order[pos]] = [order[pos], order[selectedIndex]];
    clearSelection();

    const board = document.getElementById("puzzleBoard");
    if(!board) return;

    const tilePx = boardPx / size;
    [...board.children].forEach((tileNode, p) => {
      const tileId = order[p];
      const r = Math.floor(tileId / size);
      const c = tileId % size;
      tileNode.style.backgroundPosition = `${-c*tilePx}px ${-r*tilePx}px`;
    });

    if(isSolved()){
      addPoints(winPoints);
      openModal(`
        <div class="contract-paper" style="text-align:center;">
          <div class="contract-title">💖 ¡Rompecabezas completo!</div>
          <div class="contract-line" style="margin-top:10px;">
            Sabía que lo lograrías 😘✨
          </div>
          <div class="contract-actions" style="margin-top:14px;">
            <button class="contract-btn-primary" onclick="closeModal()">Cerrar</button>
          </div>
        </div>
      `);
    }
  }

  // Botón Mezclar
  window.puzzleShuffle = function(){
    shuffle();
    clearSelection();

    const board = document.getElementById("puzzleBoard");
    if(!board){ render(); return; }

    const boardPxStr = getComputedStyle(board).getPropertyValue("--puzzle-size").trim();
    const boardPx = parseInt(boardPxStr) || computeBoardPx();
    board.style.setProperty("--puzzle-size", boardPx + "px");

    const tilePx = boardPx / size;
    [...board.children].forEach((tileNode, p) => {
      const tileId = order[p];
      const r = Math.floor(tileId / size);
      const c = tileId % size;
      tileNode.style.backgroundPosition = `${-c*tilePx}px ${-r*tilePx}px`;
    });
  };

  shuffle();
  render();
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
window.game7 = game7;
