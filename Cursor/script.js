const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Flor {
  constructor(x, y, tipo, escala, rotacion) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.escala = escala;
    this.rotacion = rotacion;
    this.imagen = new Image();
    this.imagen.src = `flowers/${tipo}.png`;
    this.imagen.onload = () => {
      this.estaLista = true; // Marca la flor como lista para ser dibujada
    };
    this.opacidad = 0; // Empezar con opacidad 0
    this.esNueva = true;
    this.estaLista = false; // Inicialmente la flor no está lista para ser dibujada
  }

  dibujar() {
    if (this.estaLista) { // Asegurarse de que la imagen esté cargada antes de dibujar
      ctx.save();
      ctx.globalAlpha = this.opacidad; // usar la opacidad para controlar la transparencia de la flor
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotacion);
      ctx.scale(this.escala, this.escala);
      ctx.drawImage(this.imagen, -this.imagen.width / 2, -this.imagen.height / 2);
      ctx.restore();
    }
  }
}

const flores = [];

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  agregarFlor(x, y);
});

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = event.touches[0].clientX - rect.left;
  const y = event.touches[0].clientY - rect.top;
  agregarFlor(x, y);
});

function agregarFlor(x, y) {
  const tiposFlor = ['flower1', 'flower2', 'flower3', 'flower4', 'flower5'];
  const tipo = tiposFlor[Math.floor(Math.random() * tiposFlor.length)];
  const escala = Math.random() * 0.1 + 0.08;
  const rotacion = Math.random() * 2 * Math.PI;
  const flor = new Flor(x, y, tipo, escala, rotacion);
  flores.push(flor);
  flor.opacidad = 1; // Establecer la opacidad inicial a 1
}

function animacion() {
  requestAnimationFrame(animacion);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desvanecer y eliminar flores antiguas
  flores.forEach((flor, indice) => {
    if (flor.esNueva) {
      flor.esNueva = false;
      setTimeout(() => {
        flor.opacidad = 0; // empezar a desvanecer la flor después de 1 segundo
      }, 1000);
    }
    flor.opacidad -= 0.01; // disminuir la opacidad en 0.01 cada fotograma
    if (flor.opacidad <= 0) {
      flores.splice(indice, 1); // eliminar la flor del array
    } else if (flor.estaLista) { // Asegurarse de que la imagen esté cargada antes de dibujar
      flor.dibujar();
    }
  });
}

animacion();