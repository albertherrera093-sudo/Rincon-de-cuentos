// ---------- Datos de los cuentos ----------
// "imagen" es la ruta de la portada. Si no se indica, se usa "imagenes/<id>.jpg".
const categorias = [
  {
    nombre: "Cuentos clásicos",
    cuentos: [
      { id: "caperucita", titulo: "Caperucita Roja", autor: "Perrault / Grimm", tema: "La prudencia y la precaución ante los desconocidos.", imagen: "imagenes/caperucitaroja.png" },
      { id: "cerditos", titulo: "Los Tres Cerditos", autor: "Tradición popular", tema: "El esfuerzo y el trabajo bien hecho.", imagen: "imagenes/tres-cerditos.jfif" },
      { id: "patito-feo", titulo: "El Patito Feo", autor: "Hans Christian Andersen", tema: "La autoaceptación y el respeto a las diferencias.", imagen: "imagenes/patitofeo.jfif" },
      { id: "pinocho", titulo: "Pinocho", autor: "Carlo Collodi", tema: "La honestidad y las consecuencias de mentir.", imagen: "imagenes/pinocho.jfif" },
      { id: "cenicienta", titulo: "Cenicienta", autor: "Perrault / Grimm", tema: "La bondad y la paciencia frente a la crueldad.", imagen: "imagenes/cenicienta.jfif" },
      { id: "blancanieves", titulo: "Blancanieves y los siete enanitos", autor: "Hermanos Grimm", tema: "La generosidad y los peligros de la envidia.", imagen: "imagenes/blancanieves.jfif" },
      { id: "hansel-gretel", titulo: "Hansel y Gretel", autor: "Hermanos Grimm", tema: "La astucia y la unión entre hermanos.", imagen: "imagenes/hansel-gretel.jfif" },
      { id: "ricitos-de-oro", titulo: "Ricitos de Oro y los tres osos", autor: "Robert Southey", tema: "El respeto por la propiedad ajena.", imagen: "imagenes/ricitos-de-oro.jfif" },
      { id: "sirenita", titulo: "La Sirenita", autor: "Hans Christian Andersen", tema: "La identidad, el sacrificio y la curiosidad.", imagen: "imagenes/sirenita.jfif" },
      { id: "principito", titulo: "El Principito", autor: "Antoine de Saint-Exupéry", tema: "La amistad y ver con el corazón.", imagen: "imagenes/principito.jfif" },
      { id: "traje-emperador", titulo: "El Traje Nuevo del Emperador", autor: "Hans Christian Andersen", tema: "La vanidad y la sinceridad.", imagen: "imagenes/traje-emperador.jfif" },
      { id: "soldadito-plomo", titulo: "El Soldadito de Plomo", autor: "Hans Christian Andersen", tema: "La valentía y la lealtad.", imagen: "imagenes/soldadito-plomo.jfif" },
      { id: "bella-bestia", titulo: "La Bella y la Bestia", autor: "Leprince de Beaumont", tema: "Valorar la belleza interior.", imagen: "imagenes/bella-bestia.jfif" },
      { id: "gato-con-botas", titulo: "El Gato con Botas", autor: "Charles Perrault", tema: "El ingenio y aprovechar las oportunidades.", imagen: "imagenes/gato-con-botas.jfif" },
      { id: "pedro-lobo", titulo: "Pedro y el Lobo", autor: "Serguéi Prokófiev", tema: "El valor de la verdad.", imagen: "imagenes/pedro-lobo.jfif" }
    ]
  },
  {
    nombre: "Emociones y valores",
    cuentos: [
      { id: "monstruo-de-colores", titulo: "El Monstruo de Colores", autor: "Anna Llenas", tema: "Identificar y ordenar las emociones básicas: alegría, tristeza, rabia, miedo y calma." },
      { id: "pez-arcoiris", titulo: "El Pez Arcoíris", autor: "Marcus Pfister", tema: "La generosidad y el valor de compartir." },
      { id: "cuatro-esquinitas", titulo: "Por cuatro esquinitas de nada", autor: "Jérôme Ruillier", tema: "La inclusión, la empatía y el respeto a la diversidad." },
      { id: "el-punto", titulo: "El punto", autor: "Peter H. Reynolds", tema: "La confianza en uno mismo, la creatividad y la perseverancia." },
      { id: "cazo-de-lorenzo", titulo: "El cazo de Lorenzo", autor: "Isabelle Carrier", tema: "La resiliencia, la aceptación y la superación." },
      { id: "orejas-de-mariposa", titulo: "Orejas de mariposa", autor: "Luisa Aguilar", tema: "La autoestima frente a las burlas y amar lo que nos hace únicos." },
      { id: "monstruo-rosa", titulo: "Monstruo Rosa", autor: "Olga de Dios", tema: "La libertad de ser uno mismo y la tolerancia." },
      { id: "sabe-la-luna", titulo: "¿A qué sabe la luna?", autor: "Michael Grejniec", tema: "La cooperación y el trabajo en equipo." },
      { id: "hilo-invisible", titulo: "El hilo invisible", autor: "Míriam Tirado", tema: "Los vínculos afectivos y el amor que permanece pese a la distancia." },
      { id: "tengo-un-volcan", titulo: "Tengo un volcán", autor: "Míriam Tirado y Joan Turu", tema: "La gestión de la rabia y cómo recuperar la calma." },
      { id: "ruby-preocupacion", titulo: "Ruby tiene una preocupación", autor: "Tom Percival", tema: "Hablar de lo que nos preocupa para liberarnos del malestar." },
      { id: "cosas-que-me-gustan", titulo: "Cosas que me gustan de mí", autor: "Trace Moroney", tema: "El autoconocimiento y valorar las propias cualidades." },
      { id: "todos-extraordinarios", titulo: "Todos somos extraordinarios", autor: "R.J. Palacio", tema: "La amabilidad, el respeto y la lucha contra el prejuicio." },
      { id: "arbol-de-los-recuerdos", titulo: "El árbol de los recuerdos", autor: "Britta Teckentrup", tema: "El duelo, la memoria afectiva y el amor que trasciende." },
      { id: "adivina-cuanto-te-quiero", titulo: "Adivina cuánto te quiero", autor: "Sam McBratney", tema: "La expresión del afecto y la seguridad en el amor familiar." }
    ]
  },
  {
    nombre: "Fantasía y aventura",
    cuentos: [
      { id: "donde-viven-los-monstruos", titulo: "Donde viven los monstruos", autor: "Maurice Sendak", tema: "La imaginación como desahogo emocional y la seguridad del hogar." },
      { id: "peter-pan", titulo: "Peter Pan", autor: "J.M. Barrie", tema: "La libertad, el espíritu de aventura y la inocencia infantil." },
      { id: "alicia-maravillas", titulo: "Alicia en el país de las maravillas", autor: "Lewis Carroll", tema: "La curiosidad y la exploración de mundos insólitos." },
      { id: "mago-de-oz", titulo: "El mago de Oz", autor: "L. Frank Baum", tema: "La colaboración, el coraje y el afecto en un viaje de vuelta a casa." },
      { id: "el-hobbit", titulo: "El Hobbit", autor: "J.R.R. Tolkien", tema: "Descubrir la valentía oculta y el valor del compañerismo." },
      { id: "charlie-chocolate", titulo: "Charlie y la fábrica de chocolate", autor: "Roald Dahl", tema: "La creatividad, la humildad y las consecuencias de la codicia." },
      { id: "historia-interminable", titulo: "La historia interminable", autor: "Michael Ende", tema: "El poder de la lectura y la búsqueda de la propia identidad." },
      { id: "libro-de-la-selva", titulo: "El libro de la selva", autor: "Rudyard Kipling", tema: "La supervivencia, el respeto a la naturaleza y la pertenencia." },
      { id: "narnia", titulo: "Las crónicas de Narnia: El león, la bruja y el armario", autor: "C.S. Lewis", tema: "La lealtad familiar y la valentía para enfrentar el mal." },
      { id: "centro-de-la-tierra", titulo: "Viaje al centro de la Tierra", autor: "Julio Verne", tema: "La curiosidad científica y la perseverancia en equipo." },
      { id: "momo", titulo: "Momo", autor: "Michael Ende", tema: "La escucha empática y la apreciación del tiempo." },
      { id: "vuelta-al-mundo", titulo: "La vuelta al mundo en ochenta días", autor: "Julio Verne", tema: "La determinación y la diversidad cultural." },
      { id: "harry-potter", titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", tema: "El potencial propio, la amistad verdadera y elegir el bien." },
      { id: "tom-sawyer", titulo: "Las aventuras de Tom Sawyer", autor: "Mark Twain", tema: "La libertad, la picardía juvenil y la curiosidad." },
      { id: "don-quijote", titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", tema: "La imaginación, los ideales y la amistad entre compañeros de aventuras." }
    ]
  },
  {
    nombre: "Fábulas con moraleja",
    etiqueta: "Moraleja",
    cuentos: [
      { id: "liebre-tortuga", titulo: "La liebre y la tortuga", autor: "Esopo", tema: "La constancia y la humildad superan a la arrogancia." },
      { id: "cigarra-hormiga", titulo: "La cigarra y la hormiga", autor: "Esopo", tema: "La planificación y el esfuerzo constante frente a la pereza." },
      { id: "leon-raton", titulo: "El león y el ratón", autor: "Esopo", tema: "Ningún acto de bondad queda sin recompensa; nunca menosprecies a nadie." },
      { id: "pastorcito-mentiroso", titulo: "El pastorcito mentiroso", autor: "Esopo", tema: "La mentira destruye la confianza." },
      { id: "zorra-uvas", titulo: "La zorra y las uvas", autor: "Esopo", tema: "Despreciamos lo que no conseguimos para ocultar la frustración." },
      { id: "cuervo-zorra", titulo: "El cuervo y la zorra", autor: "Esopo / La Fontaine", tema: "La vanidad nos hace vulnerables a los falsos halagos." },
      { id: "lechera", titulo: "La lechera", autor: "Samaniego / La Fontaine", tema: "Fantasear sin los pies en la tierra puede hacernos perder lo que tenemos." },
      { id: "perro-reflejo", titulo: "El perro y su reflejo", autor: "Esopo", tema: "La codicia nos arriesga a perder lo que ya poseemos." },
      { id: "gallina-huevos-oro", titulo: "La gallina de los huevos de oro", autor: "Esopo", tema: "La impaciencia y la avaricia destruyen la fuente de nuestra riqueza." },
      { id: "viento-sol", titulo: "El viento del norte y el sol", autor: "Esopo", tema: "La amabilidad consigue más que la fuerza." },
      { id: "zorra-ciguena", titulo: "La zorra y la cigüeña", autor: "Esopo", tema: "Trata a los demás como deseas ser tratado." },
      { id: "raton-campo-ciudad", titulo: "El ratón de campo y el ratón de ciudad", autor: "Esopo", tema: "Vale más una vida sencilla en paz que lujos con sobresaltos." },
      { id: "asno-leon", titulo: "El asno disfrazado de león", autor: "Esopo", tema: "Las falsas apariencias no duran; nuestras acciones revelan quiénes somos." },
      { id: "gallo-joya", titulo: "El gallo y la joya", autor: "Esopo", tema: "Lo que deslumbra no siempre es lo que necesitamos." },
      { id: "lobo-piel-oveja", titulo: "El lobo con piel de oveja", autor: "Esopo", tema: "Hay que observar las intenciones, pues la maldad se disfraza de inocencia." }
    ]
  }
];

// ---------- Crear las categorías y tarjetas ----------
const contenedor = document.getElementById("categorias");

categorias.forEach((categoria) => {
  const seccion = document.createElement("section");
  seccion.className = "categoria";

  const titulo = document.createElement("h2");
  titulo.textContent = categoria.nombre;

  // Contenedor del carrusel + las tarjetas
  const carrusel = document.createElement("div");
  carrusel.className = "carrusel";

  const fila = document.createElement("div");
  fila.className = "tarjetas";

  categoria.cuentos.forEach((cuento) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.dataset.cuento = cuento.id;

    const portada = document.createElement("div");
    portada.className = "portada";

    const img = document.createElement("img");
    img.src = cuento.imagen || "imagenes/" + cuento.id + ".jpg";
    img.alt = "Portada de " + cuento.titulo;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      portada.classList.add("sin-imagen");
      portada.textContent = cuento.titulo;
    });
    portada.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = cuento.titulo;

    const autor = document.createElement("p");
    autor.className = "autor";
    autor.textContent = cuento.autor;

    const tema = document.createElement("p");
    tema.className = "tema";
    tema.textContent = (categoria.etiqueta ? categoria.etiqueta + ": " : "") + cuento.tema;

    tarjeta.append(portada, h3, autor, tema);

    // En el siguiente paso aquí abriremos el libro animado
    tarjeta.addEventListener("click", () => {
      abrirLibro(cuento, categoria);
    });

    fila.appendChild(tarjeta);
  });

  // Flechas
  const btnIzq = document.createElement("button");
  btnIzq.className = "flecha izquierda oculta";
  btnIzq.setAttribute("aria-label", "Ver cuentos anteriores");
  btnIzq.textContent = "‹";

  const btnDer = document.createElement("button");
  btnDer.className = "flecha derecha";
  btnDer.setAttribute("aria-label", "Ver más cuentos");
  btnDer.textContent = "›";

  // Mueve la fila casi un "pantallazo" a cada lado
  const mover = (direccion) => {
    fila.scrollBy({ left: direccion * fila.clientWidth * 0.8, behavior: "smooth" });
  };
  btnIzq.addEventListener("click", () => mover(-1));
  btnDer.addEventListener("click", () => mover(1));

  // Muestra u oculta cada flecha según la posición
  const actualizarFlechas = () => {
    const maxScroll = fila.scrollWidth - fila.clientWidth;
    btnIzq.classList.toggle("oculta", fila.scrollLeft <= 5);
    btnDer.classList.toggle("oculta", fila.scrollLeft >= maxScroll - 5);
  };
  fila.addEventListener("scroll", actualizarFlechas);
  window.addEventListener("resize", actualizarFlechas);

  carrusel.append(fila, btnIzq, btnDer);
  seccion.append(titulo, carrusel);
  contenedor.appendChild(seccion);

  actualizarFlechas();
});

// ---------- Decoración: burbujas y estrellas flotando ----------
const decoracion = document.getElementById("decoracion");

for (let i = 0; i < 14; i++) {
  const burbuja = document.createElement("span");
  burbuja.className = "burbuja";
  const tamano = 14 + Math.random() * 30;
  burbuja.style.width = tamano + "px";
  burbuja.style.height = tamano + "px";
  burbuja.style.left = Math.random() * 100 + "%";
  burbuja.style.animationDuration = 14 + Math.random() * 16 + "s";
  burbuja.style.animationDelay = -Math.random() * 20 + "s";
  decoracion.appendChild(burbuja);
}

for (let i = 0; i < 10; i++) {
  const estrella = document.createElement("span");
  estrella.className = "estrella";
  estrella.textContent = i % 2 ? "✦" : "★";
  estrella.style.fontSize = 12 + Math.random() * 18 + "px";
  estrella.style.left = Math.random() * 100 + "%";
  estrella.style.animationDuration = 18 + Math.random() * 18 + "s";
  estrella.style.animationDelay = -Math.random() * 25 + "s";
  decoracion.appendChild(estrella);
}