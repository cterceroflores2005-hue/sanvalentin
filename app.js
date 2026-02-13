/* ===== Referencias DOM seguras ===== */
const startPage = document.getElementById("startPage");
const mainPage = document.getElementById("mainPage");
const pointsDisplay = document.getElementById("pointsDisplay");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const nightToggle = document.getElementById("nightToggle");
const music = document.getElementById("bgMusic");

/* ===== Música de fondo suave (solo al tocar "Sí") ===== */
let musicStarted = false;
function startBackgroundMusic(){
  if(musicStarted) return;
  music.volume = 0.18; // ajusta: 0.10 muy suave, 0.25 medio
  music.play().catch(()=>{});
  musicStarted = true;
}

/* ===== 🌙 Dark mode ===== */
function toggleNight(){
  document.body.classList.toggle("night");
}
nightToggle.addEventListener("click", toggleNight);

/* ===== Puntos ===== */
let globalPoints = 0;
function addPoints(n){
  globalPoints += n;
  pointsDisplay.innerText = "Puntos: " + globalPoints;
}

/* ===== Modal ===== */
function openModal(c){
  modalContent.innerHTML = c;
  modal.classList.add("show");
}
function closeModal(){
  modal.classList.remove("show");
  window.catchFloatingHeart = null;
}
modal.addEventListener("click",(e)=>{ if(e.target === modal) closeModal(); });

/* ===== Corazones flotantes ===== */
function createHeart(){
  let h=document.createElement("div");
  h.className="heart";
  h.innerHTML="❤️";
  h.style.left=Math.random()*100+"vw";
  h.style.animationDuration=(Math.random()*3+3)+"s";
  h.onclick=function(){
    if(typeof window.catchFloatingHeart==="function") window.catchFloatingHeart(h);
  };
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),6000);
}
setInterval(createHeart,400);

/* ===== Botón NO se mueve ===== */
function moveNo(){
  noBtn.style.left=Math.random()*(window.innerWidth-100)+"px";
  noBtn.style.top=Math.random()*(window.innerHeight-50)+"px";
}
noBtn.addEventListener("mouseover",moveNo);
noBtn.addEventListener("touchstart",(e)=>{e.preventDefault();moveNo();});

/* ===== Botón SÍ (un toque entra + inicia música) ===== */
yesBtn.addEventListener("click",()=>{
  startBackgroundMusic();
  startPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
});

/* ===== 🧮 CALCULATOR ===== */
function openCalculator(){
  openModal(`
    <h3>Nuestra fecha 💕</h3>
    <input type="date" id="dateInput">
    <button onclick="checkDate()">Confirmar</button>
    <button onclick="closeModal()">Cerrar</button>
  `);
}
function checkDate(){
  let d=document.getElementById("dateInput").value;
  if(d==="2024-04-27"){
    addPoints(5);
    openModal(`
      <h3>Perfecto ❤️</h3>
      <p>
        ¡Gracias por hacerme el niño mas felix durante estos casi 2 años, sin duda son el mas afortunado por tenerla conmigo,
        por compartr tantoss momentos increibles juntos, y espero que podamos seguir asi siempre en las buenas y malas pero juntos ,
        la amo tres millones pecas! 💖
      </p>
      <button onclick="closeModal()">Cerrar</button>
    `);
  } else {
    openModal(`<p>Inténtalo otra vez amor 💕</p><button onclick="closeModal()">Cerrar</button>`);
  }
}

/* ===== 📜 CONTRATO OFICIAL (modal estilo contrato real) ===== */
function openContract(){
  openModal(`
    <div class="contract-paper">
      <div class="contract-title">💘 CONTRATO OFICIAL DE NOVIAZGO Y SAN VALENTÍN ETERNO 💘</div>
      <div class="contract-sub">“Hasta que la muerte nos separe”</div>

      <div class="contract-section">
        <div class="contract-line">
          En la fecha <span class="contract-label">14 de febrero</span>, reunidos en pleno uso de nuestras facultades emocionales,
          sentimentales y románticas, se celebra el presente <span class="contract-label">Contrato de Novia para San Valentín</span>,
          el cual tendrá validez desde el momento de su firma y permanecerá vigente por el resto de nuestras vidas.
        </div>
      </div>

      <div class="contract-section">
        <h4>📝 DATOS DE LAS PARTES</h4>
        <div class="contract-line"><span class="contract-label">PRIMERA CONTRATANTE (LA NOVIA):</span></div>
        <div class="contract-line">Nombre: Maryuri Paola Rodríguez Guiza</div>
        <div class="contract-line">Número de Identidad: 0502-2004-01422</div>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">SEGUNDO CONTRATANTE (EL NOVIO):</span></div>
        <div class="contract-line">Nombre: Carlos Daniel Tercero Flores</div>
        <div class="contract-line">Número de Identidad: 0319-2005-00430</div>

        <div class="contract-line" style="margin-top:10px;">
          Ambas partes, de manera voluntaria, con amor verdadero y sin presión (solo con amor del bonito), acuerdan lo siguiente:
        </div>
      </div>

      <div class="contract-section">
        <h4>💖 CLÁUSULAS DEL CONTRATO</h4>

        <div class="contract-line"><span class="contract-label">PRIMERA: OBJETO DEL CONTRATO</span></div>
        <div class="contract-line">
          Maryuri Paola Rodríguez Guiza se compromete formalmente a ser el San Valentín oficial, único y eterno de Carlos Daniel Tercero Flores,
          cada 14 de febrero, desde este día y por el resto de sus vidas, hasta que la muerte los separe.
        </div>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">SEGUNDA: COMPROMISO ROMÁNTICO</span></div>
        <div class="contract-line">
          La novia promete entregar amor, cariño, besos, abrazos, detalles, paciencia y ternura, en cantidades ilimitadas,
          y a mantener el corazón de su novio lleno de felicidad.
        </div>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">TERCERA: EXCLUSIVIDAD DE SAN VALENTÍN</span></div>
        <div class="contract-line">
          Queda estrictamente prohibido que alguno de los contratantes tenga otro San Valentín alternativo, temporal o de emergencia.
          Este contrato garantiza exclusividad total en el amor.
        </div>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">CUARTA: DERECHOS DEL NOVIO</span></div>
        <div class="contract-line">Carlos Daniel Tercero Flores tendrá derecho a:</div>
        <ul class="contract-list">
          <li>Ser amado todos los días.</li>
          <li>Recibir abrazos en cualquier momento.</li>
          <li>Ser consentido, apoyado y respetado.</li>
          <li>Tener a Maryuri como su San Valentín eterno cada 14 de febrero.</li>
        </ul>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">QUINTA: DERECHOS DE LA NOVIA</span></div>
        <div class="contract-line">Maryuri Paola Rodríguez Guiza tendrá derecho a:</div>
        <ul class="contract-list">
          <li>Ser amada con lealtad.</li>
          <li>Ser cuidada y valorada.</li>
          <li>Recibir cariño y atención.</li>
          <li>Ser tratada como la prioridad sentimental del novio.</li>
        </ul>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">SEXTA: DURACIÓN</span></div>
        <div class="contract-line">
          El presente contrato tendrá duración indefinida y se mantendrá vigente:
          📌 hasta el fin de sus vidas y hasta que la muerte los separe.
        </div>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">SÉPTIMA: PENALIZACIÓN POR INCUMPLIMIENTO</span></div>
        <div class="contract-line">En caso de incumplimiento, la parte responsable deberá pagar la sanción sentimental correspondiente, la cual incluye:</div>
        <ul class="contract-list">
          <li>100 abrazos obligatorios,</li>
          <li>50 besos mínimos,</li>
          <li>1 salida romántica,</li>
          <li>y una disculpa con amor verdadero.</li>
        </ul>

        <div class="contract-line" style="margin-top:10px;"><span class="contract-label">OCTAVA: DISPOSICIÓN FINAL</span></div>
        <div class="contract-line">
          Ambas partes aceptan este contrato con el corazón, el alma y el amor como testigos,
          afirmando que este compromiso es auténtico, sincero y para siempre.
        </div>
      </div>

      <div class="contract-section">
        <h4>❤️ DECLARACIÓN FINAL</h4>
        <div class="contract-line">
          Maryuri Paola Rodríguez Guiza declara solemnemente que promete ser el San Valentín de Carlos Daniel Tercero Flores todos los 14 de febrero,
          sin falta, con amor fiel, bonito y verdadero, por toda la eternidad.
        </div>

        <div class="signature-box">
          <div class="contract-line"><span class="contract-label">Firmas:</span></div>
          <div class="signature-row">
            <div class="signature">Maryuri Paola Rodríguez Guiza</div>
            <div class="signature">Carlos Daniel Tercero Flores</div>
          </div>
        </div>
      </div>

      <div class="contract-actions">
        <button class="contract-btn-primary" onclick="sign()">Firmar 💖</button>
        <button class="contract-btn-secondary" onclick="closeModal()">Cerrar</button>
      </div>
    </div>
  `);
}

function sign(){
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

/* ===== FIREWORKS ===== */
function fireworks(){
  for(let i=0;i<50;i++){
    let f=document.createElement("div");
    f.className="firework";
    f.style.top=window.innerHeight*0.5+"px";
    f.style.left=window.innerWidth*0.5+"px";
    f.style.setProperty('--x', (Math.random()-0.5)*500+"px");
    f.style.setProperty('--y', (Math.random()-0.5)*500+"px");
    f.style.background=`hsl(${Math.random()*360},100%,65%)`;
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),1000);
  }
}

/* ===== 🎮 GAMES ===== */

/* 1️⃣ ATRAPA LOS CORAZONES */
function game1(){
  let score=0, goal=5;
  openModal(`<h3>Atrapa ${goal} ❤️</h3><p id="cSc">0 / ${goal}</p><button onclick="closeModal()">Salir</button>`);
  window.catchFloatingHeart=function(h){
    score++;
    h.remove();
    const cSc = document.getElementById("cSc");
    if(cSc) cSc.innerText = score+" / "+goal;
    if(score>=goal){
      addPoints(8);
      openModal(`<h2>¡Ganado! ❤️</h2><p>¡Eres increíble! 💖</p><button onclick="closeModal()">Cerrar</button>`);
    }
  };
}

/* 2️⃣ DÓNDE ESTÁ EL CORAZÓN */
function game2(){
  let correct=Math.floor(Math.random()*3);
  openModal(`<h3>¿Dónde está el ❤️?</h3>
    <button onclick="pick(0)">🎁</button>
    <button onclick="pick(1)">🎁</button>
    <button onclick="pick(2)">🎁</button>
    <br><br><button onclick="closeModal()">Salir</button>
  `);
  window.pick=function(n){
    if(n===correct){
      addPoints(6);
      openModal(`<p>💘 ¡Encontraste mi corazón! 💘</p><button onclick="closeModal()">Cerrar</button>`);
    } else {
      openModal(`<p>Intenta otra vez 💕</p><button onclick="closeModal()">Cerrar</button>`);
    }
  };
}

/* 3️⃣ DESCIFRA */
function game3(){
  let words=["amor","vida","beso","cielo","feliz"], solved=0;
  function newW(){
    let w=words[Math.floor(Math.random()*words.length)];
    let scr=w.split("").sort(()=>0.5-Math.random()).join("");
    openModal(`<h3>Descifra 💌</h3><p>${scr}</p>
      <input id="a" autocomplete="off">
      <button onclick="chk()">Enviar</button>
      <button onclick="closeModal()">Salir</button>
    `);
    window.chk=function(){
      const a = document.getElementById("a");
      if(a && a.value.toLowerCase()===w){
        solved++;
        addPoints(4);
        if(solved>=5){
          openModal(`<p>¡Felicidades! 💖</p><button onclick="closeModal()">Cerrar</button>`);
        } else newW();
      } else alert("Intenta otra vez 💕");
    };
  }
  newW();
}

/* 4️⃣ DADO ROMÁNTICO */
function game4(){
  let msgs=[
    "Hoy te gano un abrazo grande 💖",
    "Un beso eterno para ti 😘",
    "Cita improvisada esta noche 💕",
    "Mimos todo el día ❤️",
    "Eres mi casualidad favorita ✨",
    "Futuro juntos brillante 💖"
  ];
  let n=Math.floor(Math.random()*msgs.length);
  openModal(`<p>${msgs[n]}</p><button onclick="closeModal()">Cerrar</button>`);
  addPoints(3);
}

/* 5️⃣ QUIZ DE NOSOTROS */
function game5(){
  openModal(`<p>¿Nuestro mes?</p>
    <button onclick="q1(true)">Abril</button>
    <button onclick="q1(false)">Junio</button>
    <br><br><button onclick="closeModal()">Salir</button>
  `);
  window.q1=function(c){
    if(!c){alert("No 😅");return;}
    openModal(`<p>¿Dónde nos enamoramos?</p>
      <button onclick="q2(true)">Colegio</button>
      <button onclick="q2(false)">Galería</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };
  window.q2=function(c){
    if(!c){alert("Casi 😘");return;}
    openModal(`<p>Primera cita romántica</p>
      <button onclick="q3(true)">Cine</button>
      <button onclick="q3(false)">Galería</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };
  window.q3=function(c){
    if(!c){alert("No 😅");return;}
    openModal(`<p>Comida favorita</p>
      <button onclick="food()">Pizza</button>
      <button onclick="food()">Papitas fritas</button>
      <br><br><button onclick="closeModal()">Salir</button>
    `);
  };
  window.food=function(){
    addPoints(5);
    openModal(`<p>Gracias, ahora lo recordaré 😄💖</p><button onclick="closeModal()">Cerrar</button>`);
  };
}

/* 6️⃣ ADIVINA NÚMERO */
function game6(){
  let num=Math.floor(Math.random()*10)+1;
  let btns="";
  for(let i=1;i<=10;i++){ btns+=`<button onclick="g(${i},${num})">${i}</button>`; }
  openModal(`<h3>Adivina 🔢</h3>${btns}<br><br><button onclick="closeModal()">Salir</button>`);
}
window.g=function(x,num){
  let msgs=["No es ese, pero te amo ❤️","Intenta otra vez linda 💕","Casi 😘","Muy cerca 💗","Nooo 😅","Ese no 🙈"];
  if(x===num){
    addPoints(7);
    openModal(`<p>¡Correcto! ❤️✨ Te amo muchísimo 😘</p><button onclick="closeModal()">Cerrar</button>`);
  } else {
    openModal(`<p>${msgs[Math.floor(Math.random()*msgs.length)]}</p><button onclick="closeModal()">Intentar</button>`);
  }
};
