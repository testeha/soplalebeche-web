export interface Destino {
  nombre: string;
  lat: number;
  lng: number;
  slug?: string; // slug del post relacionado, si existe
}

export const destinos: Destino[] = [
  { nombre: 'España — Madrid', lat: 40.4168, lng: -3.7038, slug: 'castizos-tradiciones-madrid' },
  { nombre: 'España — Letur', lat: 38.3833, lng: -2.0667, slug: 'letur-pueblo-agua' },
  { nombre: 'España — Málaga', lat: 36.7213, lng: -4.4214, slug: 'malaga' },
  { nombre: 'España — Ceuta (Tarajal)', lat: 35.8894, lng: -5.3213, slug: 'marcha-dignidad-playa-tarajal' },
  { nombre: 'Portugal — Lisboa', lat: 38.7223, lng: -9.1393, slug: 'lisboa-huele-a-sardinas-y-café' },
  { nombre: 'Portugal — Oporto', lat: 41.1579, lng: -8.6291, slug: 'oporto-porto' },
  { nombre: 'Portugal — Coimbra', lat: 40.2033, lng: -8.4103, slug: 'coimbra-portugal' },
  { nombre: 'Portugal — Castelo de Vide', lat: 39.4167, lng: -7.4500 },
  { nombre: 'Italia — Reggio Calabria', lat: 38.1113, lng: 15.6619, slug: 'reggio-calabria-italia' },
  { nombre: 'Italia — Marceddì (Cerdeña)', lat: 39.6900, lng: 8.5300, slug: 'marceddi-pueblo-donde-peces-vuelan' },
  { nombre: 'Italia — Isla de los Conejos', lat: 35.5000, lng: 12.6000, slug: 'recorriendo-la-isla-conejos-carreteras-secundarias-1' },
  { nombre: 'Grecia — Tinos', lat: 37.5330, lng: 25.1600, slug: 'isla-tinos-grecia' },
  { nombre: 'Turquía — Estambul', lat: 41.0082, lng: 28.9784, slug: 'balat-barrio-judio-ortodoxo-estambul' },
  { nombre: 'Serbia — Belgrado', lat: 44.7866, lng: 20.4489, slug: 'snippets-serbia' },
  { nombre: 'Marruecos — Marrakech', lat: 31.6295, lng: -7.9811, slug: 'cuadernos-viaje-marruecos-marrakech' },
  { nombre: 'Marruecos — Desierto', lat: 31.1000, lng: -4.0000, slug: 'cuadernos-viaje-marruecos-desierto' },
  { nombre: 'Cabo Verde — São Vicente', lat: 16.8500, lng: -24.9800, slug: 'cabo-verde-isla-sao-vicente' },
  { nombre: 'Malawi — Karonga', lat: -9.9333, lng: 33.9333, slug: 'malawi-karonga-dinosaurios-bicicletas' },
  { nombre: 'Malawi — Mzuzu / Nkhata Bay', lat: -11.4300, lng: 34.0200, slug: 'malawi-mzuzu-nkhata-bay' },
  { nombre: 'Malawi — Lago Malawi', lat: -12.2500, lng: 34.3000, slug: 'malawi-africa' },
  { nombre: 'Tanzania', lat: -6.3690, lng: 34.8888, slug: 'preparando-un-viaje-a-tanzania-y-malawi' },
  { nombre: 'Colombia', lat: 4.5709, lng: -74.2973, slug: 'colombia' },
  { nombre: 'Ecuador', lat: -1.8312, lng: -78.1834, slug: 'teo-jaramillo-ecuador-lorca' },
  { nombre: 'Brasil — Recife', lat: -8.0476, lng: -34.8770, slug: 'recife-ciudad-contrastes' },
  { nombre: 'Brasil — João Pessoa', lat: -7.1150, lng: -34.8450, slug: 'joao-pessoa-ciudad-donde-nace-sol' },
  { nombre: 'Brasil — Porto de Galinhas', lat: -8.5100, lng: -35.0000, slug: 'puerto-de-gallinas-mejor-playa-brasil' },
  { nombre: 'Filipinas', lat: 12.8797, lng: 121.7740, slug: 'filipinas-pais-gente-siempre-sonrie' },
];