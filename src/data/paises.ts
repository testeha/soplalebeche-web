export interface Pais {
  code: string;
  nombre: string;
  left: number; // posición en % dentro del contenedor del mapa
  top: number;
  fallbackSlug?: string; // solo si no hay ningún post etiquetado con el país
  ciudad?: string; // solo cuando hay una etiqueta de ciudad real y clara en el archivo
}

export const paises: Pais[] = [
  { code: 'es', nombre: 'España', left: 47.42, top: 38.10 },
  { code: 'pt', nombre: 'Portugal', left: 45.50, top: 39.27, ciudad: 'Lisboa' },
  { code: 'it', nombre: 'Italia', left: 50.05, top: 36.59 },
  { code: 'gr', nombre: 'Grecia', left: 53.85, top: 40.47, ciudad: 'Cícladas' },
  { code: 'tr', nombre: 'Turquía', left: 56.38, top: 39.32, ciudad: 'Estambul' },
  { code: 'rs', nombre: 'Serbia', left: 53.72, top: 36.13 },
  { code: 'ma', nombre: 'Marruecos', left: 47.41, top: 43.24, ciudad: 'Marrakech' },
  { code: 'cv', nombre: 'Cabo Verde', left: 40.72, top: 54.22, ciudad: 'Mindelo' },
  { code: 'mw', nombre: 'Malawi', left: 58.31, top: 70.97 },
  { code: 'tz', nombre: 'Tanzania', left: 58.85, top: 69.43, fallbackSlug: 'preparando-un-viaje-a-tanzania-y-malawi' },
  { code: 'co', nombre: 'Colombia', left: 25.96, top: 55.96, ciudad: 'Barranquilla, Cartagena y Bogotá' },
  { code: 'ec', nombre: 'Ecuador', left: 23.37, top: 62.76 },
  { code: 'br', nombre: 'Brasil', left: 32.63, top: 82.17, ciudad: 'Recife' },
  { code: 'ph', nombre: 'Filipinas', left: 85.01, top: 55.54, ciudad: 'Manila' },
];
