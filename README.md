# 🏊‍♂️🚴‍♂️🏃‍♂️ Entrenador Personal · Ironman 70.3 Málaga 2026

App de entrenamiento, fuerza y nutrición para preparar el **Ironman 70.3 Málaga** y ganar fuerza muscular. Construida con Next.js + TypeScript.

## Funcionalidades

- **Dashboard** con tu estado actual y actividades recientes (datos reales desde **Garmin Connect**).
- **Plan de entrenamiento** de 24 semanas periodizado (Base → Construcción → Pico → Tapering).
- **Programa de fuerza** muscular adaptado a triatlón por fases.
- **Plan de nutrición**: calorías, macros, comidas, suplementación y nutrición de carrera.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

El plan, la fuerza y la nutrición funcionan sin configurar nada. El dashboard muestra datos de ejemplo hasta que conectes Garmin.

## Conectar Garmin Connect

Garmin no ofrece una API pública para uso personal, así que la app usa la
librería [`garmin-connect`](https://www.npmjs.com/package/garmin-connect) con
tus credenciales, leídas **solo en local** desde `.env.local`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con:

```
GARMIN_EMAIL=tu-email@ejemplo.com
GARMIN_PASSWORD=tu-contraseña-de-garmin
```

Reinicia (`npm run dev`) y pulsa **Conectar Garmin** en el dashboard.

> 🔒 `.env.local` está en `.gitignore`: tus credenciales nunca se suben a GitHub.

> ℹ️ La librería de Garmin no es oficial (ingeniería inversa de Garmin Connect).
> Si Garmin tiene la verificación en dos pasos (2FA) activada, el login puede
> fallar; en ese caso, la alternativa más estable es sincronizar Garmin → Strava.

## Despliegue

Lista para desplegar en [Vercel](https://vercel.com/new). Recuerda configurar
`GARMIN_EMAIL` y `GARMIN_PASSWORD` como variables de entorno en el proyecto.
