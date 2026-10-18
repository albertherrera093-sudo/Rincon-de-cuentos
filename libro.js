// ---------- Textos de los cuentos ----------
// Cada cuento es una lista de páginas. Cada página es un texto,
// o un objeto { texto, imagen } si quieres elegir tú la imagen.
// Si no pones imagen, se busca "imagenes/paginas/<id>-<número de página>.jpg"
const historias = {
    caperucita: [
      "Había una vez una niña a la que todos llamaban Caperucita Roja, porque siempre llevaba una capa roja que le había regalado su abuelita.",
      "Un día, su mamá le preparó una cesta con pan y miel. —Llévasela a tu abuelita, que está enferma —le dijo—. Ve por el camino y no hables con extraños.",
      "Caperucita caminaba cantando por el bosque cuando apareció un lobo. —¿A dónde vas tan sola, niña? —le preguntó con voz suave.",
      "—Voy a casa de mi abuelita —contestó Caperucita. El lobo sonrió con astucia y salió corriendo por un atajo para llegar antes que ella.",
      "El lobo llegó a la casita, encerró a la abuelita en el armario y se metió en la cama con su camisón y su gorrito.",
      "Cuando Caperucita entró, notó algo raro. —Abuelita, ¡qué ojos tan grandes tienes! —Son para verte mejor. —¡Y qué boca tan grande! —¡Es para comerte mejor!",
      "Caperucita gritó con todas sus fuerzas. Un leñador que pasaba cerca la oyó y entró corriendo. El lobo se asustó tanto que huyó del bosque y no volvió jamás.",
      "El leñador abrió el armario y la abuelita salió sana y salva. Las tres se abrazaron y compartieron el pan y la miel.",
      "Desde aquel día, Caperucita siempre obedeció a su mamá y nunca más habló con extraños en el camino."
    ],
  
    cerditos: [
      "Había una vez tres cerditos hermanos que decidieron construir cada uno su propia casita para vivir seguros.",
      "El primero, que era muy perezoso, hizo su casita de paja en un ratito para irse a jugar.",
      "El segundo construyó la suya con palos de madera. Terminó rápido y se fue a cantar.",
      "El tercero, el más trabajador, tardó muchos días en levantar una casa fuerte de ladrillos. —Así estaremos a salvo —decía.",
      "Un día llegó un lobo grande y hambriento. —¡Soplaré y soplaré y tu casa derribaré! —y la casita de paja salió volando. El primer cerdito corrió a casa de su hermano.",
      "El lobo sopló y sopló, y la casa de palos también se vino abajo. Los dos cerditos corrieron muertos de miedo a la casa de ladrillos.",
      "El lobo sopló y sopló, pero la casa de ladrillos ni se movió. Entonces trepó al tejado para entrar por la chimenea.",
      "Los cerditos pusieron una olla con agua caliente junto al fuego. Cuando el lobo bajó, ¡plaf!, cayó en la olla, pegó un brinco y salió corriendo para no volver nunca más.",
      "Los tres cerditos vivieron felices en la casa de ladrillos. Y aprendieron que el trabajo bien hecho siempre vale la pena."
    ]
  };
  
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
  
  // Limpia el texto para que se lea bien en voz alta
  function textoParaVoz(p) {
    let t;
    if (p.tipo === "portada") t = p.titulo;
    else if (p.tipo === "fin") t = "Fin. " + p.etiqueta + ": " + p.texto;
    else t = p.texto;
  
    return t
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
      .replace(/—/g, ", ")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  // ---------- Armado de las páginas ----------
  function crearPaginas(cuento, categoria) {
    const textos = historias[cuento.id] || ["Este cuento llegará muy pronto al Rincón de Cuentos."];
    const paginas = [];
  
    paginas.push({
      tipo: "portada",
      titulo: cuento.titulo,
      autor: cuento.autor,
      imagen: cuento.imagen || "imagenes/" + cuento.id + ".jpg"
    });
  
    textos.forEach((item, i) => {
      const texto = typeof item === "string" ? item : item.texto;
      const imagen = (typeof item === "object" && item.imagen) || "imagenes/paginas/" + cuento.id + "-" + (i + 1) + ".jpg";
      paginas.push({ tipo: "cuento", texto, imagen });
    });
  
    paginas.push({
      tipo: "fin",
      etiqueta: categoria && categoria.etiqueta ? categoria.etiqueta : "Lo que aprendimos",
      texto: cuento.tema
    });
  
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
  
  function crearFrente(p, numero) {
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
    } else if (p.tipo === "fin") {
      const fin = document.createElement("div");
      fin.className = "fin";
  
      const h2 = document.createElement("h2");
      h2.textContent = "Fin";
  
      const texto = document.createElement("p");
      texto.textContent = p.etiqueta + ": " + p.texto;
  
      fin.append(h2, texto);
      frente.appendChild(fin);
    } else {
      const texto = document.createElement("p");
      texto.className = "texto";
      texto.textContent = p.texto;
  
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = numero;
  
      frente.append(crearImagen(p.imagen, "Ilustración de la página " + numero), texto, num);
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
  
      hoja.append(crearFrente(p, i), dorso);
      contenedorHojas.appendChild(hoja);
      return hoja;
    });
  
    // ----- Voz narradora -----
    function detenerVoz() {
      idLectura++;                       // ignora lo que quede pendiente
      clearTimeout(temporizadorVoz);
      if (hayVoz) speechSynthesis.cancel();
    }
  
    function hablarPagina() {
      detenerVoz();
      if (!narrar) return;
      if (pausado && actual !== ultima) return;
  
      const mi = idLectura;
  
      // Esperamos a que termine de girar la hoja antes de empezar a leer
      temporizadorVoz = setTimeout(() => {
        if (mi !== idLectura) return;
  
        const u = new SpeechSynthesisUtterance(textoParaVoz(paginas[actual]));
        u.lang = vozElegida ? vozElegida.lang : "es-MX";
        if (vozElegida) u.voice = vozElegida;
        u.rate = 0.9;     // un poco más lenta, ideal para cuentos
        u.pitch = 1.05;
  
        const siguiente = () => {
          if (mi !== idLectura) return;
          if (!pausado && actual < ultima) {
            temporizadorVoz = setTimeout(() => {
              if (mi === idLectura) irA(actual + 1);
            }, 900);
          }
        };
  
        u.onend = siguiente;
        u.onerror = siguiente;   // si algo falla, no nos quedamos trabados
        speechSynthesis.speak(u);
      }, 800);
    }
  
    function actualizarVoz() {
      btnVoz.textContent = narrar ? "🔊" : "🔇";
      btnVoz.setAttribute("aria-label", narrar ? "Quitar la voz" : "Activar la voz");
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
      const largo = p.tipo === "cuento" ? p.texto.length : 0;
      // Con voz, la barra es solo una guía; con la voz apagada marca el tiempo real
      const ms = narrar ? 1500 + largo * 80 : 4000 + largo * 55;
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
  
      if (actual === ultima) pausado = true;   // al terminar, se detiene
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