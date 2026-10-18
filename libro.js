// ---------- Mensajes de la calificación ----------
const MENSAJES_ESTRELLAS = [
    "¡Gracias por decirnos! Buscaremos cuentos que te gusten más.",
    "¡Gracias! Seguiremos mejorando.",
    "¡Qué bien! Gracias por tu opinión.",
    "¡Genial! Nos alegra que te haya gustado.",
    "¡Wow! ¡Te encantó este cuento!"
  ];
  
  // ---------- Voz narradora ----------
  const hayVoz = "speechSynthesis" in window;
  let vozElegida = null;
  
  // Busca la mejor voz en español disponible en el dispositivo
  function elegirVoz() {
    if (!hayVoz) return;
    const voces = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("es"));
    if (!voces.length) return;
  
    const puntos = (v) => {
      const nombre = v.name.toLowerCase();
      let p = 0;
      if (nombre.includes("natural")) p += 4;
      if (nombre.includes("online")) p += 2;
      if (nombre.includes("google")) p += 1;
      if (!/es[-_]es/i.test(v.lang)) p += 1;   // acento latinoamericano
      return p;
    };
  
    vozElegida = voces.sort((a, b) => puntos(b) - puntos(a))[0];
  }
  
  if (hayVoz) {
    elegirVoz();
    speechSynthesis.addEventListener("voiceschanged", elegirVoz);
  }
  
  // Texto que se lee en voz alta en cada tipo de página
  function textoParaVoz(p) {
    let t;
    if (p.tipo === "portada") t = p.titulo;
    else if (p.tipo === "preguntas") t = p.titulo + ". " + p.lista.join(" ");
    else if (p.tipo === "fin") t = "Fin. " + p.etiqueta + ": " + p.texto;
    else if (p.tipo === "calificar") t = "¿Qué te pareció el cuento? Toca las estrellas para calificarlo.";
    else t = p.texto;
  
    return t
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
      .replace(/—/g, ", ")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  // Cantidad de texto de una página (para calcular cuánto dura)
  function largoPagina(p) {
    if (p.tipo === "cuento" || p.tipo === "fin") return p.texto.length;
    if (p.tipo === "preguntas") return p.lista.join(" ").length;
    return 0;
  }
  
  // ---------- Armado de las páginas ----------
  function crearPaginas(cuento, categoria) {
    const textos = historias[cuento.id] || ["Este cuento llegará muy pronto al Rincón de Cuentos."];
    const preg = preguntas[cuento.id] || preguntasGenerales;
    const paginas = [];
  
    paginas.push({
      tipo: "portada",
      titulo: cuento.titulo,
      autor: cuento.autor,
      imagen: cuento.imagen || "imagenes/" + cuento.id + ".jpg"
    });
  
    paginas.push({ tipo: "preguntas", titulo: "Antes de leer", lista: preg.antes });
  
    textos.forEach((item, i) => {
      const texto = typeof item === "string" ? item : item.texto;
      const imagen = (typeof item === "object" && item.imagen) || "imagenes/paginas/" + cuento.id + "-" + (i + 1) + ".jpg";
      paginas.push({ tipo: "cuento", texto, imagen, numero: i + 1 });
    });
  
    paginas.push({
      tipo: "fin",
      etiqueta: categoria && categoria.etiqueta ? categoria.etiqueta : "Lo que aprendimos",
      texto: cuento.tema
    });
  
    paginas.push({ tipo: "preguntas", titulo: "Después de leer", lista: preg.despues });
    paginas.push({ tipo: "calificar" });
  
    return paginas;
  }
  
  // ---------- Piezas pequeñas ----------
  function crearImagen(src, alt) {
    const marco = document.createElement("div");
    marco.className = "ilustracion";
  
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.addEventListener("error", () => {
      img.remove();
      marco.classList.add("sin-imagen");
      marco.textContent = "✨ Aquí va la imagen ✨";
    });
  
    marco.appendChild(img);
    return marco;
  }
  
  function crearLado(lado) {
    const div = document.createElement("div");
    div.className = "lado " + lado;
    ["❦", "✦", "❀", "✦", "❀", "✦", "❦"].forEach((signo) => {
      const s = document.createElement("span");
      s.textContent = signo;
      div.appendChild(s);
    });
    return div;
  }
  
  function crearFrente(p, alCalificar) {
    const frente = document.createElement("div");
    frente.className = "cara frente";
  
    ["e1", "e2", "e3", "e4"].forEach((clase) => {
      const e = document.createElement("span");
      e.className = "esquina " + clase;
      e.textContent = "❦";
      frente.appendChild(e);
    });
    frente.append(crearLado("izq"), crearLado("der"));
  
    if (p.tipo === "portada") {
      const titulo = document.createElement("h2");
      titulo.className = "titulo-libro";
      titulo.textContent = p.titulo;
  
      const autor = document.createElement("p");
      autor.className = "autor-libro";
      autor.textContent = p.autor;
  
      frente.append(crearImagen(p.imagen, "Portada de " + p.titulo), titulo, autor);
  
    } else if (p.tipo === "preguntas") {
      const caja = document.createElement("div");
      caja.className = "preguntas";
  
      const h2 = document.createElement("h2");
      h2.textContent = p.titulo;
  
      const lista = document.createElement("ol");
      p.lista.forEach((pregunta) => {
        const li = document.createElement("li");
        li.textContent = pregunta;
        lista.appendChild(li);
      });
  
      caja.append(h2, lista);
      frente.appendChild(caja);
  
    } else if (p.tipo === "fin") {
      const fin = document.createElement("div");
      fin.className = "fin";
  
      const h2 = document.createElement("h2");
      h2.textContent = "Fin";
  
      const texto = document.createElement("p");
      texto.textContent = p.etiqueta + ": " + p.texto;
  
      fin.append(h2, texto);
      frente.appendChild(fin);
  
    } else if (p.tipo === "calificar") {
      const caja = document.createElement("div");
      caja.className = "calificar";
  
      const h2 = document.createElement("h2");
      h2.textContent = "¿Qué te pareció el cuento?";
  
      const fila = document.createElement("div");
      fila.className = "estrellas";
  
      const mensaje = document.createElement("p");
      mensaje.className = "mensaje-estrellas";
      mensaje.textContent = "Toca las estrellas para calificarlo";
  
      const botones = [1, 2, 3, 4, 5].map((n) => {
        const b = document.createElement("button");
        b.className = "estrella-btn";
        b.textContent = "★";
        b.setAttribute("aria-label", n === 1 ? "1 estrella" : n + " estrellas");
  
        // Al pasar el cursor se iluminan las estrellas hasta esa
        b.addEventListener("mouseenter", () => {
          botones.forEach((x, i) => x.classList.toggle("previa", i < n));
        });
  
        b.addEventListener("click", () => {
          botones.forEach((x) => x.classList.remove("activa"));
          void fila.offsetWidth;   // reinicia la animación
          botones.forEach((x, i) => x.classList.toggle("activa", i < n));
          mensaje.textContent = MENSAJES_ESTRELLAS[n - 1];
          alCalificar(n);
        });
  
        return b;
      });
  
      fila.addEventListener("mouseleave", () => {
        botones.forEach((x) => x.classList.remove("previa"));
      });
  
      fila.append(...botones);
      caja.append(h2, fila, mensaje);
      frente.appendChild(caja);
  
    } else {
      const texto = document.createElement("p");
      texto.className = "texto";
      texto.textContent = p.texto;
  
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = p.numero;
  
      frente.append(crearImagen(p.imagen, "Ilustración de la página " + p.numero), texto, num);
    }
  
    return frente;
  }
  
  // ---------- El libro ----------
  let lectorAbierto = false;
  
  function abrirLibro(cuento, categoria) {
    if (lectorAbierto) return;
    lectorAbierto = true;
  
    const paginas = crearPaginas(cuento, categoria);
    const ultima = paginas.length - 1;
    let actual = 0;
    let pausado = false;
    let temporizador;
  
    // Voz
    let narrar = hayVoz;
    let idLectura = 0;
    let temporizadorVoz;
  
    // Estructura
    const raiz = document.createElement("div");
    raiz.className = "lector con-controles";
    raiz.innerHTML = `
      <div class="libro"><div class="hojas"></div></div>
      <button class="btn-cerrar" aria-label="Cerrar el libro">✕</button>
      <div class="controles">
        <button class="btn-ant" aria-label="Página anterior">‹</button>
        <button class="btn-pausa" aria-label="Pausar">⏸</button>
        <button class="btn-sig" aria-label="Página siguiente">›</button>
        <button class="btn-voz" aria-label="Quitar la voz">🔊</button>
      </div>
      <div class="progreso"><div class="barra"></div></div>
    `;
  
    const contenedorHojas = raiz.querySelector(".hojas");
    const barra = raiz.querySelector(".barra");
    const btnPausa = raiz.querySelector(".btn-pausa");
    const btnVoz = raiz.querySelector(".btn-voz");
  
    // Si el navegador no tiene voz, quitamos el botón
    if (!hayVoz) btnVoz.remove();
  
    // Hojas (la primera queda arriba)
    const hojas = paginas.map((p, i) => {
      const hoja = document.createElement("div");
      hoja.className = "hoja";
      hoja.style.zIndex = paginas.length - i;
  
      const dorso = document.createElement("div");
      dorso.className = "cara dorso";
  
      hoja.append(crearFrente(p, calificar), dorso);
      contenedorHojas.appendChild(hoja);
      return hoja;
    });
  
    // ----- Voz narradora -----
    function detenerVoz() {
      idLectura++;                       // ignora lo que quede pendiente
      clearTimeout(temporizadorVoz);
      if (hayVoz) speechSynthesis.cancel();
    }
  
    // Lee un texto; al terminar pasa a la página siguiente tras "pausaFinal"
    function hablarTexto(texto, pausaFinal, espera) {
      detenerVoz();
      if (!narrar) return;
  
      const mi = idLectura;
  
      temporizadorVoz = setTimeout(() => {
        if (mi !== idLectura) return;
  
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = vozElegida ? vozElegida.lang : "es-MX";
        if (vozElegida) u.voice = vozElegida;
        u.rate = 0.9;     // un poco más lenta, ideal para cuentos
        u.pitch = 1.05;
  
        const siguiente = () => {
          if (mi !== idLectura) return;
          if (!pausado && actual < ultima) {
            temporizadorVoz = setTimeout(() => {
              if (mi === idLectura) irA(actual + 1);
            }, pausaFinal);
          }
        };
  
        u.onend = siguiente;
        u.onerror = siguiente;   // si algo falla, no nos quedamos trabados
        speechSynthesis.speak(u);
      }, espera);
    }
  
    function hablarPagina() {
      if (!narrar || (pausado && actual !== ultima)) {
        detenerVoz();
        return;
      }
      const p = paginas[actual];
      // En las preguntas esperamos más para que haya tiempo de pensar
      const pausaFinal = p.tipo === "preguntas" ? 3500 : 900;
      // Esperamos a que termine de girar la hoja antes de empezar a leer
      hablarTexto(textoParaVoz(p), pausaFinal, 800);
    }
  
    function actualizarVoz() {
      btnVoz.textContent = narrar ? "🔊" : "🔇";
      btnVoz.setAttribute("aria-label", narrar ? "Quitar la voz" : "Activar la voz");
    }
  
    // ----- Calificación con estrellas -----
    function lluviaDeEstrellas(n) {
      const cantidad = n * 12;   // 1 estrella = 12 estrellas cayendo, 5 = 60
      const colores = ["#ffc93c", "#ff7eb3", "#5fbbe8", "#fff3b0"];
  
      for (let i = 0; i < cantidad; i++) {
        const e = document.createElement("span");
        e.className = "estrella-cae";
        e.textContent = i % 3 ? "★" : "✦";
        e.style.left = Math.random() * 100 + "%";
        e.style.fontSize = 18 + Math.random() * 28 + "px";
        e.style.color = colores[Math.floor(Math.random() * colores.length)];
        e.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
        e.style.animationDelay = Math.random() * 1.5 + "s";
        e.addEventListener("animationend", () => e.remove());
        raiz.appendChild(e);
      }
    }
  
    function calificar(n) {
      lluviaDeEstrellas(n);
      hablarTexto(MENSAJES_ESTRELLAS[n - 1], 0, 150);
      mostrarControles();
    }
  
    // ----- Controles: se ven al mover el cursor o tocar la pantalla -----
    function mostrarControles() {
      raiz.classList.add("con-controles");
      clearTimeout(temporizador);
      if (!pausado) {
        temporizador = setTimeout(() => raiz.classList.remove("con-controles"), 2500);
      }
    }
  
    function actualizarBoton() {
      if (actual === ultima) {
        btnPausa.textContent = "↻";
        btnPausa.setAttribute("aria-label", "Leer otra vez");
      } else if (pausado) {
        btnPausa.textContent = "▶";
        btnPausa.setAttribute("aria-label", "Continuar");
      } else {
        btnPausa.textContent = "⏸";
        btnPausa.setAttribute("aria-label", "Pausar");
      }
    }
  
    // La barra de avance marca cuánto falta para pasar de página
    function reiniciarBarra() {
      barra.style.animation = "none";
      void barra.offsetWidth;
  
      if (actual === ultima) {
        barra.style.width = "100%";
        return;
      }
  
      barra.style.width = "";
      const p = paginas[actual];
      const largo = largoPagina(p);
      const extra = p.tipo === "preguntas" ? 3000 : 0;   // tiempo para pensar
      // Con voz, la barra es solo una guía; con la voz apagada marca el tiempo real
      const ms = (narrar ? 1500 + largo * 80 : 4000 + largo * 55) + extra;
      barra.style.animation = "llenar " + ms + "ms linear forwards";
      barra.style.animationPlayState = pausado ? "paused" : "running";
    }
  
    // Sin voz, la barra decide cuándo pasar de página
    barra.addEventListener("animationend", () => {
      if (!pausado && !narrar && actual < ultima) irA(actual + 1);
    });
  
    // Pasar de página
    function irA(n) {
      n = Math.max(0, Math.min(ultima, n));
      if (n === actual) return;
  
      actual = n;
      hojas.forEach((hoja, i) => hoja.classList.toggle("pasada", i < actual));
  
      if (actual === ultima) pausado = true;   // en la calificación se detiene
      reiniciarBarra();
      actualizarBoton();
      hablarPagina();
      mostrarControles();
    }
  
    function alternarPausa() {
      if (actual === ultima) {
        pausado = false;
        irA(0);           // volver a leer desde el inicio
        actualizarBoton();
        return;
      }
  
      pausado = !pausado;
      barra.style.animationPlayState = pausado ? "paused" : "running";
      if (pausado) detenerVoz();
      else hablarPagina();   // al continuar, lee la página desde el principio
      actualizarBoton();
      mostrarControles();
    }
  
    // Cerrar
    function cerrar() {
      raiz.classList.add("cerrando");
      clearTimeout(temporizador);
      detenerVoz();
      document.removeEventListener("keydown", teclas);
      setTimeout(() => {
        raiz.remove();
        document.body.style.overflow = "";
        lectorAbierto = false;
      }, 400);
    }
  
    function teclas(e) {
      if (e.key === "ArrowRight") irA(actual + 1);
      if (e.key === "ArrowLeft") irA(actual - 1);
      if (e.key === "Escape") cerrar();
    }
  
    // Eventos
    raiz.querySelector(".btn-sig").addEventListener("click", () => irA(actual + 1));
    raiz.querySelector(".btn-ant").addEventListener("click", () => irA(actual - 1));
    btnPausa.addEventListener("click", alternarPausa);
    raiz.querySelector(".btn-cerrar").addEventListener("click", cerrar);
  
    btnVoz.addEventListener("click", () => {
      narrar = !narrar;
      actualizarVoz();
      if (narrar) {
        hablarPagina();
      } else {
        detenerVoz();
        reiniciarBarra();   // sin voz, vuelve a avanzar por tiempo
      }
      mostrarControles();
    });
  
    raiz.addEventListener("mousemove", mostrarControles);
    document.addEventListener("keydown", teclas);
  
    // En el celular: tocar muestra los controles y deslizar pasa la página
    let inicioX = null;
    raiz.addEventListener("touchstart", (e) => {
      inicioX = e.touches[0].clientX;
      mostrarControles();
    }, { passive: true });
    raiz.addEventListener("touchend", (e) => {
      if (inicioX === null) return;
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 60) irA(actual + (dx < 0 ? 1 : -1));
      inicioX = null;
    });
  
    // Abrir
    document.body.style.overflow = "hidden";
    document.body.appendChild(raiz);
    reiniciarBarra();
    actualizarBoton();
    actualizarVoz();
    mostrarControles();
    hablarPagina();
  }
