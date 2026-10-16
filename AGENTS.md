# Instrucciones permanentes del proyecto

## Accesibilidad web

Toda creación, modificación, revisión o incorporación de contenido en este repositorio debe mantener conformidad con WCAG 2.2 nivel AA. La accesibilidad es un criterio de aceptación obligatorio, no una mejora opcional.

Antes de dar una tarea por terminada:

- Usar HTML semántico, landmarks correctos, jerarquía coherente de encabezados y un único `h1` por página.
- Garantizar operación completa mediante teclado, orden de foco lógico, foco claramente visible y ausencia de trampas de teclado.
- Conservar el enlace para saltar al contenido principal y evitar que contenido fijo o superpuesto oculte el foco.
- Mantener nombres, roles, estados y valores accesibles. El nombre accesible de cada control debe contener su texto visible.
- Mantener contraste mínimo AA: 4.5:1 para texto normal, 3:1 para texto grande y 3:1 para componentes y estados visuales relevantes.
- Asegurar reflow y uso sin pérdida de información con zoom de 200 % y a 320 CSS px de ancho, sin exigir desplazamiento horizontal salvo cuando sea esencial.
- Mantener objetivos táctiles de al menos 24 × 24 CSS px según WCAG 2.2; preferir 44 × 44 px para controles principales.
- Respetar `prefers-reduced-motion`. Ningún movimiento automático de más de cinco segundos puede carecer de un mecanismo para pausarlo, detenerlo u ocultarlo.
- En carruseles, ocultar las diapositivas inactivas también para tecnologías de asistencia, exponer la diapositiva actual, permitir control por teclado y anunciar los cambios iniciados por el usuario.
- Proporcionar alternativas textuales contextuales para todas las imágenes informativas. Describir de forma concisa la acción y el contexto del proyecto; no comenzar con “imagen de” o “foto de”, no identificar personas sin datos confirmados y no inferir atributos sensibles. Usar `alt=""` solo cuando la imagen sea realmente decorativa.
- No transmitir información únicamente mediante color, posición, forma, sonido o movimiento.
- Etiquetar correctamente campos y errores si se incorporan formularios. Los mensajes dinámicos importantes deben ser perceptibles por tecnologías de asistencia.
- Si se incorpora audio o vídeo, incluir las alternativas, subtítulos y audiodescripción exigibles según el caso.

## Verificación obligatoria

Para cualquier cambio que afecte a interfaz, contenido, estilos o comportamiento:

1. Ejecutar una comprobación automática de accesibilidad sobre todas las páginas afectadas. Lighthouse Accessibility debe terminar sin fallos detectados; una puntuación de 100 no reemplaza la revisión manual.
2. Comprobar manualmente la navegación completa con teclado, incluido el orden y la visibilidad del foco.
3. Revisar zoom, reflow móvil, contraste, texto alternativo y estados de componentes interactivos.
4. Validar la sintaxis de JavaScript y comprobar que cada imagen mantiene su atributo `alt`.
5. Informar en la entrega qué verificaciones se ejecutaron y cualquier aspecto que requiera prueba humana o con lector de pantalla.

No introducir una regresión conocida de accesibilidad para conservar una preferencia visual. Si un requisito de producto entra en conflicto con WCAG 2.2 AA, detener la implementación y señalar el conflicto antes de continuar.

WCAG 3 puede utilizarse como orientación adicional, pero mientras continúe en borrador no reemplaza el criterio de conformidad WCAG 2.2 AA.
