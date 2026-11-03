# Respuestas de Claude

## ¿Por qué no veo las respuestas de Claude en el iPad?

Prueba estas soluciones en orden:

1. **Recargar la ventana de VS Code**
   Menú ☰ (arriba a la izquierda) → *Ver* → *Paleta de comandos* → escribe
   `Developer: Reload Window` y pulsa Enter.

2. **Desplazarte dentro del panel de Claude**
   En el iPad el panel a veces no se desplaza con un dedo: prueba con **dos dedos**
   o rota el iPad a **horizontal** para que el panel sea más grande.

3. **Pedir la versión de escritorio de la página**
   En Safari toca **aA** en la barra de direcciones → *Solicitar sitio web de escritorio*.
   Si sigue igual, prueba con **Chrome** para iPad.

4. **Usar Claude en la terminal**
   Menú ☰ → *Terminal* → *Nueva terminal* y escribe:
   ```
   claude
   ```
   Las respuestas se muestran como texto en la terminal y suelen verse bien en el iPad.

5. **Usar la versión web**
   Abre **https://claude.ai/code** en Safari: está pensada para el navegador
   y funciona mejor en tabletas.

Mientras tanto, pondré mis respuestas en este archivo (`prueba/RESPUESTAS_CLAUDE.md`)
para que puedas leerlas aunque el chat no se vea.
El informe de seguridad está en `prueba/REVISION_SEGURIDAD.md`.

---

## ¿El código tiene alguna vulnerabilidad? (revisión del 30/10/2026)

**No hay vulnerabilidades graves.** No hay XSS (React escapa el texto) ni inyección SQL
(Prisma usa consultas parametrizadas). El `.env` está protegido por `.gitignore`.
`npm audit` del frontend: 0 problemas.

Puntos a mejorar (detalle en `prueba/REVISION_SEGURIDAD.md`, que he vuelto a comprobar y sigue siendo correcto):

1. `backend/src/domain/Tarea.js` – no comprueba que `texto` sea un string.
2. `backend/src/presentation/tareaRoutes.js` – devuelve al cliente el mensaje de cualquier error interno.
3. `backend/src/presentation/tareaRoutes.js` – el `GET` no tiene `try/catch` (puede mostrar el stack trace).
4. `backend/src/infrastructure/PrismaTareaRepository.js` – lista todas las tareas sin límite; no hay login ni límite de peticiones.
5. `backend/src/main.js` – sin `helmet`; envía la cabecera `X-Powered-By: Express`.
6. Backend: `npm audit` da 3 avisos "high" en `deepmerge-ts`, pero solo afecta al CLI de `prisma` (desarrollo). Arreglarlo exige pasar a Prisma 7 (cambio grande).
7. `backend/.gitignore` – falta `prisma/dev.db`: la base de datos se subiría a GitHub.

Lo más rápido de arreglar: el 1, el 2 y el 7. ¿Quieres que los corrija?
