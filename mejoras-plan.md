# Plan de mejoras - San Valentín

Este branch prepara una mejora grande para dejar la experiencia más agradable, estable y divertida.

## Problemas detectados

- No hay README con instrucciones del proyecto.
- La pantalla principal muestra solo emojis, sin nombres ni pistas de qué hace cada juego.
- Los puntos se guardan solo en memoria; al recargar se pierden.
- Algunos juegos dependen de funciones globales y modales que se reescriben, lo que puede provocar comportamientos raros al abrir/cerrar varias veces.
- Falta una pantalla de ayuda o explicación de recompensas.
- El botón de video se desbloquea por puntos, pero la experiencia puede explicarse mejor.

## Mejoras propuestas

1. Agregar tarjetas de juegos con título y descripción.
2. Guardar puntos y progreso en localStorage.
3. Agregar botón de reiniciar progreso.
4. Mejorar los modales para que limpien temporizadores/eventos al cerrar.
5. Agregar nuevos juegos divertidos:
   - Quiz de amor con preguntas personalizadas.
   - Ruleta de retos románticos.
   - Adivina el emoji.
   - Carrera de corazones.
   - Cofre sorpresa diario.
6. Agregar un README con instrucciones para ejecutar y personalizar.
7. Mejorar accesibilidad en móvil: botones más claros, textos de ayuda y tarjetas responsive.

## Siguiente paso

Aplicar cambios en `index.html`, `styles.css` y `app.js`, probar que no rompan la página y abrir un Pull Request para revisión.
