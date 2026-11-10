# K-dle 🎵

Juego web tipo Wordle para adivinar canciones de K-pop. Cada partida elige una canción al azar y el jugador tiene **5 intentos** para adivinarla. Después de cada intento, el juego muestra pistas por colores comparando la canción ingresada con la correcta.


## Cómo se juega

1. Escribe el nombre de una canción en el buscador y elígela de las sugerencias.
2. El juego compara sus atributos con los de la canción secreta:
   - 🟩 **Verde:** el atributo coincide.
   - 🟨 **Amarillo:** coincide en parte.
   - ⬜ **Gris:** no coincide.
3. Usa las pistas para acercarte a la respuesta antes de quedarte sin intentos.

Los atributos que se comparan son el **artista**, el **idioma**, el **año de lanzamiento** y la **generación** del grupo. También se muestra la portada del álbum.

## Características

- Base de datos propia de **81 canciones** en JSON, con portada, artista, idioma, año y generación.
- Buscador con sugerencias que ignora mayúsculas y tildes al comparar.
- Lógica de comparación de atributos con tres estados: correcto, casi o incorrecto.
- Interfaz armada con componentes reutilizables (grilla de intentos, tarjeta de canción, buscador).

## Tecnologías

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- Tailwind CSS 4
- Heroicons

## Ejecutar en local

```bash
git clone https://github.com/pengupang/k-dle.git
cd k-dle
npm install
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/
│   ├── page.jsx          # Lógica principal del juego
│   ├── Components/       # Grid, SearchBar, songCard, Attributes...
│   └── utils/getColor.js # Color según el resultado de la comparación
└── Data/Songs.json       # Base de datos de canciones
```

