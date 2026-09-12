# EnglishLab UTN - Plataforma Interactiva de Práctica y Estudio de Inglés Técnico I

Aplicación web moderna, interactiva y de alto rendimiento diseñada específicamente para el estudio y práctica de **Inglés Técnico I** para la carrera de **Técnico Universitario en Programación (UTN TUP)**.

---

## 🌟 Características Principales

### 1. 📝 Práctica de Examen y Simulador Oficial
- **Configuración Flexible**: Selector para realizar **10, 20 o 30 preguntas** (o el banco completo de +40 ítems).
- **Temporizador Personalizable**: Opciones de 5, 10, 20, 38 minutos (tiempo real del parcial UTN) o modo sin límite de tiempo.
- **2 Modos de Estudio**:
  - **Simulacro Formal**: Respuestas ocultas hasta la entrega con calificación numérica en escala UTN (0-10) y estado (*Promocionado*, *Aprobado*, *A Recuperar*).
  - **Práctica con Feedback Inmediato**: Validación pregunta a pregunta con colores verde/rojo y explicación gramatical detallada al instante.
- **Scoring y Analítica Completa**:
  - Nota final UTN y porcentaje de precisión.
  - Métricas de tiempo (tiempo total, promedio por pregunta y velocidad).
  - Desglose de rendimiento por temas (Present Simple, Present Continuous, Past Simple, Vocabulario IT, Comparativos).
  - Revisión interactiva de preguntas con filtros (*Todas*, *Solo Incorrectas*, *Solo Correctas*).

### 2. ⚡ Presente Simple (Unidad 1)
- Estructuras afirmativas, negativas, preguntas y respuestas cortas.
- Reglas ortográficas detalladas para 3ra persona singular (`-s`, `-es`, `-ies`).
- Adverbios de frecuencia (`always`, `usually`, `often`, `sometimes`, `never`).
- Glosario de roles IT (Software Developer, UX Designer, IT Support, Systems Analyst, etc.) y saludos formales/informales.
- Mini-Quiz de fijación interactivo.

### 3. 🔄 Presente Continuo (Unidad 1)
- Estructura y reglas ortográficas para la terminación `-ING` (duplicación de consonante, caída de 'e').
- **Matriz de Contraste**: Simple Present vs Present Continuous con palabras clave y situaciones temporales.
- Guía de **Verbos de Estado (Stative Verbs)** que no admiten forma continua.
- Mini-Quiz interactivo con retroalimentación.

### 4. 📜 Pasado Simple & Buscador de Verbos Irregulares (Unidad 2)
- Reglas para verbos regulares (`-ED`) y estructuras afirmativas, negativas con `didn't` e interrogativas con `did`.
- **Buscador Dinámico e Interactivo de Verbos Irregulares**:
  - Búsqueda en tiempo real con tarjeta destacada que muestra en grande el **Pasado Simple** al escribir el infinitivo o la traducción.
  - Tabla completa con más de 80 verbos y ejemplos contextualizados en programación.
  - Modo **Flashcards** para entrenamiento de memoria.
- Casos de estudio y lecturas de clase: Margaret Hamilton & Apollo 11, Grace Hopper & COBOL, Sergey Brin & Google.
- Glosario empresarial IT (*raise money*, *launch*, *step down*, *restructure*, *IPO*, *shareholders*).

---

## 🎨 Diseño y UX/UI
- **Estética Contemporánea**: Paleta Slate/Zinc con acentos en Índigo y Cyan.
- **Modo Oscuro / Modo Claro**: Conmutador instantáneo en la barra de navegación.
- **Efectos de Sonido Procedurales**: Clics suaves, fanfarrias y alertas de tiempo implementadas con Web Audio API (toggleable).
- **Animaciones y Confeti**: Celebración con confeti al alcanzar notas aprobatorias.

---

## 🚀 Despliegue en Vercel

La aplicación está completamente configurada y optimizada para producción con `vercel.json` y Vite.

### Opción A: Despliegue directo mediante Vercel CLI
1. Inicia sesión en Vercel desde la terminal:
```bash
npx vercel login
```
2. Ejecuta el despliegue a producción:
```bash
npx vercel --prod
```

### Opción B: Despliegue mediante GitHub
1. Sube este repositorio a tu cuenta de GitHub:
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```
2. Entra a [vercel.com](https://vercel.com) -> **Add New Project** -> Selecciona el repositorio -> Clic en **Deploy**. Vercel detectará Vite automáticamente.

---

## 🛠️ Ejecución Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
