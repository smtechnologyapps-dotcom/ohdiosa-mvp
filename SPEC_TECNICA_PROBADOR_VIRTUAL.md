# Especificación Técnica: Probador Virtual Interactivo & Avatar Dinámico (OHDIOSA)
**Organización:** Soluciones Integrales y Globales SM / OMNEX  
**Director General:** Omar Anthony Gutierrez (contacto@omnexpa.com | +507 6509-1352)  
**Proyecto:** OHDIOSA Luxury Fashion E-Commerce (`C:\Proyectos IA\ERP_Ecommers\ohdiosa`)  
**Fecha:** 2026-11-09  
**Estándar de Arquitectura:** Protocolo OMNEX Goldfish (Sala Limpia - Versión Certificada)

---

## 1. Visión y Objetivos de Negocio
* **Problema:** En el comercio electrónico de moda de alta gama en Panamá, las clientas abandonan carritos por incertidumbre sobre cómo luce la prenda en silueta real y cómo combinar prendas múltiples (*Mix & Match*).
* **Solución:** Construir un **Probador Virtual Interactivo (Virtual Fitting Room)** móvil y de escritorio integrado en OHDIOSA, que combina un avatar estilizado de proporciones editoriales con un carrusel táctil de prendas de alta costura.
* **Retorno Comercial (DoW):** Reactivar la negociación comercial con la boutique OHDIOSA con una demo interactiva irrefutable, valorada en 3,500 a 5,000 USD de implementación más soporte mensual.

---

## 2. Arquitectura de Software & Ergonomía Móvil (Strict Viewport Lock)
* **Stack Tecnológico:**
  * Next.js 16 (App Router) + React 19 + TypeScript estricto.
  * Animación y física táctil: Framer Motion 12 (física optimizada `stiffness: 90, damping: 25`, batching con `useTransition` para evitar caída de frames).
  * Estilos: Tailwind CSS v4 con Sistema de Diseño Luxury Dark (`#09090B` Canvas Black, `#D4AF37` Champagne Gold).
* **Mitigación de Rendimiento en Móvil (Pez 3):**
  * **Cero SVG Dinámico Pesado:** Se prohíbe el apilamiento de capas SVG con `mix-blend-mode` en tiempo de ejecución. En su lugar, el avatar opera mediante un **Canvas 2D acelerado por hardware (HTML5 Canvas)** que renderiza sprites pre-renderizados en formato WebP con canal alpha comprimido (~25 KB por prenda).
  * **Composición Dinámica de Atributos:** El motor de Canvas 2D permite tintado y superposición programática de accesorios sobre las siluetas base, optimizado con búfer de mapas de bits precargados (`ImageBitmap`) para garantizar cambios de vestuario instantáneos a **60 FPS sostenidos** sin sobrecalentar la batería ni saturar la GPU.
* **Ergonomía Móvil Grado Bancario:**
  * **Strict Viewport Lock:** Contenedor raíz con altura bloqueada a `100dvh`, `overflow: hidden`, `touch-action: pan-y` y `overscroll-behavior: none`, eliminando cualquier riesgo de desbordamiento horizontal o colapso por barra de navegación en iOS Safari y Android Chrome.
  * **Componentes Modulares:**
    1. `FittingRoomContainer.tsx`: Contenedor principal con layout adaptativo (Desktop: Split 50/50; Móvil: Avatar sticky central con drawer táctil de 38vh inferior).
    2. `AvatarCanvas.tsx`: Escenario de renderizado 2D ultra-liviano del avatar y sus prendas activas.
    3. `LookCarousel.tsx`: Carrusel horizontal táctil con inercia nativa para vestidos, sastrería y accesorios.
    4. `LookPriceCalculator.tsx`: Módulo inmutable de cálculo de look con checkout Yappy y WhatsApp.

---

## 3. Ciberseguridad, Anti-REA y Cumplimiento Legal (Panamá)
* **Gestión Estricta de Secretos & Variables de Servidor (Pez 1):**
  * Toda credencial sensible (tokens de Supabase, API keys de pagos) reside exclusivamente en variables de entorno del servidor/Edge Runtime (`process.env.SUPABASE_SERVICE_ROLE_KEY`) administradas en Vercel. **Cero llaves privadas ni cadenas de conexión son expuestas en el código cliente** en tiempo de compilación o ejecución.
* **Integridad Financiera & Cero Manipulación de Precios:**
  * Los precios de las prendas no provienen del estado volátil del cliente. El sistema utiliza un catálogo estático inmutable tipado en TypeScript (`LOOK_CATALOG`) firmado criptográficamente con hash SHA-256. Al generar el enlace de pago por Yappy o el mensaje de pedido por WhatsApp, el total se recalcula estrictamente contra los identificadores canónicos del catálogo en el servidor, bloqueando cualquier alteración en el DOM.
* **Validación de Entradas con Zod (Whitelisting Anti-Inyecciones):**
  * Cualquier parámetro proveniente del usuario pasa por validación estricta de esquemas Zod en el servidor, impidiendo inyecciones SQL o manipulación de atributos.
* **Aislamiento Multi-Tenant & RLS en Base de Datos:**
  * Para guardar atuendos favoritos en Supabase/PostgreSQL, se aplican políticas estrictas de Row Level Security: `CREATE POLICY "User Wardrobes" ON user_looks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`, impidiendo acceso cruzado entre clientas.
* **Privacidad Absoluta (Ley 81 de 2019 / ANTAI):**
  * Cero captura o almacenamiento de datos biométricos, medidas corporales privadas o fotografías de las usuarias. El probador opera 100% sobre maniquíes estilizados propiedad de la marca.

---

## 4. Viabilidad Financiera & Control Denial-of-Wallet (Pez 2)
* **Costo Operacional de Servidores / APIs:** **0.00 USD / mes garantizado**.
  * El módulo opera 100% en el cliente y en el runtime de borde (Edge/Vercel) de Next.js.
  * **Cero dependencias de APIs de Inteligencia Artificial generativa de pago por uso** (no se conecta a Replicate, Midjourney ni Kling), eliminando cualquier riesgo de quiebra técnica por facturas sorpresa (*Denial of Wallet*).
* **Protección Perimetral contra Ataques DoS:**
  * Rate limiting a nivel de CDN/Vercel configurado a máximo 60 peticiones por minuto por IP para prevenir raspado automatizado de imágenes.
* **Retorno Comercial Estimado:**
  * Costo técnico de construcción: 0 USD en infraestructura.
  * Retorno directo: Activación de propuesta de desarrollo llave en mano para OHDIOSA por valor de 3,500 a 5,000 USD con un margen de utilidad superior al 90%.
