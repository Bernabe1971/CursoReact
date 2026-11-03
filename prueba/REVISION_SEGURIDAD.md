# Revisión de seguridad – proyecto `prueba`

Resultado: **no hay vulnerabilidades críticas** (ni XSS ni inyección SQL), pero sí puntos a mejorar.

## Lo que está bien
- React escapa el texto de las tareas → no hay XSS.
- Prisma usa consultas parametrizadas → no hay inyección SQL.
- `.env` está en `.gitignore`.
- `express.json()` limita el body a 100 kb.

## Problemas encontrados

| # | Archivo | Línea | Problema |
|---|---|---|---|
| 1 | `backend/src/domain/Tarea.js` | 3 | No valida que `texto` sea un string (`{"texto": 123}` provoca `texto.trim is not a function`) |
| 2 | `backend/src/presentation/tareaRoutes.js` | 15 | Devuelve `e.message` de cualquier error (incluidos errores internos de Prisma) |
| 3 | `backend/src/presentation/tareaRoutes.js` | 6–8 | El `GET` no tiene `try/catch`; sin `NODE_ENV=production` se muestra el stack trace |
| 4 | `backend/src/infrastructure/PrismaTareaRepository.js` | 12 | `findMany()` sin límite; tampoco hay autenticación ni límite de peticiones |
| 5 | `backend/src/main.js` | 10 | Sin `helmet` y con la cabecera `X-Powered-By: Express` |
| 6 | `backend/package.json` | — | `npm audit`: 3 avisos "high" en `deepmerge-ts` (vía el CLI de `prisma`, solo en desarrollo) |
| 7 | `backend/.gitignore` | — | Falta `prisma/dev.db` (se subiría la base de datos al repositorio) |

## Corrección sugerida para el punto 1

```js
if (typeof texto !== 'string' || !texto.trim()) {
  throw new Error('El texto de la tarea es obligatorio');
}
```
