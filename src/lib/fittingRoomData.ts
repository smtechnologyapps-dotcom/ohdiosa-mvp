export type GarmentCategory = 'garment' | 'jewelry' | 'bag' | 'shoes';

export type BodySilhouette = 'hourglass' | 'rectangle' | 'triangle' | 'inverted_triangle';

export interface SilhouetteProfile {
  id: BodySilhouette;
  name: string;
  subtitle: string;
  description: string;
  proportions: {
    shoulderScale: number;
    waistScale: number;
    hipScale: number;
  };
  stylingPhilosophy: string;
}

export const SILHOUETTE_PROFILES: Record<BodySilhouette, SilhouetteProfile> = {
  hourglass: {
    id: 'hourglass',
    name: 'Reloj de Arena',
    subtitle: 'Armonía & Proporción Definida',
    description: 'Hombros y caderas en simetría con cintura claramente acentuada.',
    proportions: { shoulderScale: 1.0, waistScale: 0.88, hipScale: 1.05 },
    stylingPhilosophy: 'Prendas envolventes, vestidos ceñidos en cintura y escotes asimétricos que celebran las curvas naturales.'
  },
  rectangle: {
    id: 'rectangle',
    name: 'Rectángulo',
    subtitle: 'Línea Continua & Atlética',
    description: 'Hombros, cintura y caderas alineados de forma esbelta y equilibrada.',
    proportions: { shoulderScale: 0.98, waistScale: 0.98, hipScale: 0.98 },
    stylingPhilosophy: 'Sastrería con hombreras pagoda y drapeados que añaden dimensión arquitectónica y movimiento.'
  },
  triangle: {
    id: 'triangle',
    name: 'Triángulo / Pera',
    subtitle: 'Cadera Escultural & Torso Fino',
    description: 'Caderas pronunciadas con línea de hombros suave y cintura definida.',
    proportions: { shoulderScale: 0.95, waistScale: 0.90, hipScale: 1.12 },
    stylingPhilosophy: 'Prendas con foco en hombros, solapas llamativas y joyería focal para balancear visualmente la silueta.'
  },
  inverted_triangle: {
    id: 'inverted_triangle',
    name: 'Triángulo Invertido',
    subtitle: 'Estructura Imperial & Porte Atlético',
    description: 'Línea de hombros amplia y prominente con caderas y piernas finas.',
    proportions: { shoulderScale: 1.08, waistScale: 0.94, hipScale: 0.92 },
    stylingPhilosophy: 'Faldas con vuelo, pantalones palazzo fluidos y aberturas laterales para desviar la mirada a las piernas.'
  }
};

export interface FittingItem {
  id: string;
  name: string;
  category: GarmentCategory;
  categoryLabel: string;
  price: number;
  colorName: string;
  colorHex: string;
  accentHex?: string;
  fabric: string;
  description: string;
  renderKey: string;
  tag: string;
  specs: string[];
  favoredSilhouettes: BodySilhouette[];
  silhouetteAdvice: string;
  garmentOverlaySrc?: string;
}

export interface CuratedLook {
  id: string;
  title: string;
  subtitle: string;
  occasion: string;
  itemIds: {
    garment: string;
    jewelry?: string;
    bag?: string;
    shoes?: string;
  };
  discountPercentage: number;
  bestSilhouette: BodySilhouette;
}

export const FITTING_ITEMS: FittingItem[] = [
  // --- PRENDAS / ALTA COSTURA ---
  {
    id: "g1",
    name: "Vestido Asimétrico Noir",
    category: "garment",
    categoryLabel: "Alta Costura",
    price: 1200,
    colorName: "Noir Profundo",
    colorHex: "#111113",
    accentHex: "#D4AF37",
    fabric: "Seda de morera 100% y georgette",
    description: "Corte escultural envolvente con escote unihombro y abertura lateral de alta costura.",
    renderKey: "dress_asymmetric_noir",
    tag: "Pieza Icónica",
    specs: ["Largo: 145 cm", "Forro de seda", "Hecho a mano en París"],
    favoredSilhouettes: ["hourglass", "inverted_triangle", "rectangle"],
    silhouetteAdvice: "La caída unihombro estiliza el torso y la abertura lateral alarga visualmente la pierna.",
    garmentOverlaySrc: "/images/evening.jpg"
  },
  {
    id: "g2",
    name: "Blazer Estructurado Oro",
    category: "garment",
    categoryLabel: "Sastrería",
    price: 1550,
    colorName: "Oro Champagne & Carbón",
    colorHex: "#1C1917",
    accentHex: "#E5C158",
    fabric: "Lana virgen con filamentos metálicos de oro",
    description: "Hombros pagoda de corte arquitectónico, solapa satinada y botones tallados en latón dorado.",
    renderKey: "blazer_structured_gold",
    tag: "Bestseller FW26",
    specs: ["Corte entallado", "Solapa de satén", "Hombreras anatómicas"],
    favoredSilhouettes: ["rectangle", "triangle"],
    silhouetteAdvice: "Las hombreras pagoda equilibran las caderas y la cintura entallada crea volumen proporcionado.",
    garmentOverlaySrc: "/images/work.jpg"
  },
  {
    id: "g3",
    name: "Vestido Gala Seda Champagne",
    category: "garment",
    categoryLabel: "Alta Costura",
    price: 1850,
    colorName: "Champagne Satinado",
    colorHex: "#C5A059",
    accentHex: "#F3E5AB",
    fabric: "Satén de seda pesada",
    description: "Silueta sirena con caída fluida, escote drapeado en espalda y brillo aperlado hipnótico.",
    renderKey: "dress_gala_champagne",
    tag: "Edición Limitada",
    specs: ["Cola de 40 cm", "Copas corseteras internas", "Seda italiana"],
    favoredSilhouettes: ["hourglass", "rectangle"],
    silhouetteAdvice: "El satén pesado envuelve las curvas acentuando la armonía de busto y cadera.",
    garmentOverlaySrc: "/images/casual.jpg"
  },
  {
    id: "g4",
    name: "Abrigo Cocoon Lana Charcoal",
    category: "garment",
    categoryLabel: "Abrigos",
    price: 2100,
    colorName: "Charcoal Profundo",
    colorHex: "#27272A",
    accentHex: "#D4AF37",
    fabric: "Lana doble faz con solapa invertida",
    description: "Silueta cocoon envolvente que redefine el outerwear con caída imperial y cinturón desmontable.",
    renderKey: "coat_cocoon_wool",
    tag: "Prenda de Colección",
    specs: ["Corte oversized", "Bolsillos ojal", "Terminación termosellada"],
    favoredSilhouettes: ["rectangle", "inverted_triangle", "triangle"],
    silhouetteAdvice: "Su volumen arquitectónico suaviza la línea superior y aporta presencia imperial.",
    garmentOverlaySrc: "/images/hero_main.jpg"
  },

  // --- JOYERÍA & ACCESORIOS ---
  {
    id: "j1",
    name: "Collar Champagne Royal",
    category: "jewelry",
    categoryLabel: "Joyería Fina",
    price: 890,
    colorName: "Oro Champagne 18k",
    colorHex: "#D4AF37",
    accentHex: "#FFFBEB",
    fabric: "Baño de oro 18k con zirconias engastadas",
    description: "Gargantilla rígida articulada que abraza la clavícula con incrustaciones de brillo prismático.",
    renderKey: "necklace_champagne",
    tag: "Joya Focal",
    specs: ["Diámetro adaptable", "Cierre invisible de seguridad", "Piedras engastadas a mano"],
    favoredSilhouettes: ["hourglass", "triangle", "rectangle", "inverted_triangle"],
    silhouetteAdvice: "Atrae el punto de luz inmediatamente hacia la clavícula y el rostro.",
    garmentOverlaySrc: "/images/product_accessories.jpg"
  },
  {
    id: "j2",
    name: "Brazalete Geométrico Brutalista",
    category: "jewelry",
    categoryLabel: "Joyería Fina",
    price: 1100,
    colorName: "Oro Amarillo Pulido",
    colorHex: "#E5C158",
    accentHex: "#FFF",
    fabric: "Latón macizo chapado en oro 24k",
    description: "Líneas poliédricas biseladas con acabado espejo de alta resistencia.",
    renderKey: "cuff_geometric_gold",
    tag: "Arte Escultural",
    specs: ["Apertura de bisagra", "Peso: 85g", "Grabado de autenticidad"],
    favoredSilhouettes: ["rectangle", "inverted_triangle"],
    silhouetteAdvice: "Añade peso visual a las extremidades inferiores del torso equilibrando hombros anchos.",
    garmentOverlaySrc: "/images/product_accessories.jpg"
  },
  {
    id: "j3",
    name: "Gafas Dark Acetato Noir",
    category: "jewelry",
    categoryLabel: "Accesorios",
    price: 450,
    colorName: "Acetato Negro Piano",
    colorHex: "#09090B",
    accentHex: "#52525B",
    fabric: "Acetato Mazzucchelli curado 6 meses",
    description: "Armazón geométrico audaz con cristales Zeiss categoría 3 y protección UV 400 total.",
    renderKey: "sunglasses_dark_noir",
    tag: "Misterio Urbano",
    specs: ["Cristales minerales", "Bisagras de 5 barriles", "Estuche rígido de cuero"],
    favoredSilhouettes: ["hourglass", "rectangle", "triangle", "inverted_triangle"],
    silhouetteAdvice: "Eleva la simetría angular del rostro y complementa cualquier conjunto sastre.",
    garmentOverlaySrc: "/images/product_accessories.jpg"
  },

  // --- BOLSOS ---
  {
    id: "b1",
    name: "Clutch Oro Macizo Escultural",
    category: "bag",
    categoryLabel: "Bolsos de Noche",
    price: 3200,
    colorName: "Oro Espejo",
    colorHex: "#D4AF37",
    accentHex: "#FEF08A",
    fabric: "Carcasa de metal bañada en oro con forro de terciopelo",
    description: "Minaudière joya de silueta facetada geométrica, diseñado para reflejar la luz del salón.",
    renderKey: "clutch_gold_sculptural",
    tag: "Objeto de Deseo",
    specs: ["Cierre magnético de presión", "Cadena joya desmontable", "Hecho en Florencia"],
    favoredSilhouettes: ["hourglass", "rectangle", "inverted_triangle"],
    silhouetteAdvice: "Mantiene la ligereza vertical sin añadir volumen lateral en caderas.",
    garmentOverlaySrc: "/images/product_bags.jpg"
  },
  {
    id: "b2",
    name: "Bolso Tote Estructurado Noir",
    category: "bag",
    categoryLabel: "Bolsos de Mano",
    price: 1800,
    colorName: "Cuero Box Negro",
    colorHex: "#18181B",
    accentHex: "#D4AF37",
    fabric: "Cuero vacuno curtido al vegetal",
    description: "Estructura arquitectónica indeformable con cantos pintados a mano y cerradura bañada en oro.",
    renderKey: "tote_structured_black",
    tag: "Inversión Eterna",
    specs: ["Doble asa reforzada", "Pies de protección dorados", "Compartimento interior con cremallera"],
    favoredSilhouettes: ["rectangle", "triangle"],
    silhouetteAdvice: "Estructura impecable para estilismos de trabajo y siluetas que buscan líneas rectas.",
    garmentOverlaySrc: "/images/product_bags.jpg"
  },

  // --- CALZADO ---
  {
    id: "s1",
    name: "Stilettos Asimétricos Noir",
    category: "shoes",
    categoryLabel: "Tacones de Gala",
    price: 980,
    colorName: "Charol Negro Lustre",
    colorHex: "#09090B",
    accentHex: "#D4AF37",
    fabric: "Piel de becerro barnizada",
    description: "Escote asimétrico en empeine y tacón stiletto de aguja de 105 mm con ribete dorado.",
    renderKey: "stilettos_noir_sharp",
    tag: "Paso de Pasarela",
    specs: ["Tacón: 105 mm", "Suela de cuero natural", "Plantilla acolchada viscoelástica"],
    favoredSilhouettes: ["hourglass", "rectangle", "triangle", "inverted_triangle"],
    silhouetteAdvice: "Alarga visualmente las piernas en 8 a 10 cm aportando postura imperial.",
    garmentOverlaySrc: "/images/product_shoes.jpg"
  },
  {
    id: "s2",
    name: "Botas Altas Cuero Italiano",
    category: "shoes",
    categoryLabel: "Botas",
    price: 1450,
    colorName: "Cuero Negro Guante",
    colorHex: "#18181B",
    accentHex: "#71717A",
    fabric: "Nappa elástica premium",
    description: "Caña sobre la rodilla de calce anatómico perfecto con tacón bloque escultórico de 90 mm.",
    renderKey: "boots_overknee_noir",
    tag: "Silueta Dominante",
    specs: ["Altura de caña: 58 cm", "Cremallera invisible interior", "Suela antideslizante"],
    favoredSilhouettes: ["rectangle", "inverted_triangle"],
    silhouetteAdvice: "Crea una línea continua de pierna sin interrupciones ideal para abrigos y vestidos midi.",
    garmentOverlaySrc: "/images/product_shoes.jpg"
  },
  {
    id: "s3",
    name: "Sandalias Minimal Champagne Starlight",
    category: "shoes",
    categoryLabel: "Sandalias de Gala",
    price: 890,
    colorName: "Tiras Oro Champagne",
    colorHex: "#D4AF37",
    accentHex: "#FEF08A",
    fabric: "Cuero metalizado espejo",
    description: "Tiras tubulares ultrafinas que envuelven el tobillo y sujetan el empeine con ligereza aérea.",
    renderKey: "sandals_minimal_gold",
    tag: "Brillo Sublime",
    specs: ["Tacón: 95 mm", "Cierre con micro-hebilla dorada", "Puntera cuadrada moderna"],
    favoredSilhouettes: ["hourglass", "triangle"],
    silhouetteAdvice: "Máxima ligereza visual en pies, ideal para vestidos con cola o aberturas pronunciadas.",
    garmentOverlaySrc: "/images/product_shoes.jpg"
  }
];

export const CURATED_LOOKS: CuratedLook[] = [
  {
    id: "look_gala_panama",
    title: "Noche de Gala en Panamá",
    subtitle: "Seducción asimétrica y destellos de oro champagne para recepciones exclusivas.",
    occasion: "Gala & Alfombra Roja",
    itemIds: {
      garment: "g1",
      jewelry: "j1",
      bag: "b1",
      shoes: "s1"
    },
    discountPercentage: 10,
    bestSilhouette: "hourglass"
  },
  {
    id: "look_poder_vanguardia",
    title: "Poder y Vanguardia",
    subtitle: "Sastrería imponente con hombreras arquitectónicas y accesorios contundentes.",
    occasion: "Cocktail Ejecutivo & Arte",
    itemIds: {
      garment: "g2",
      jewelry: "j2",
      bag: "b2",
      shoes: "s2"
    },
    discountPercentage: 10,
    bestSilhouette: "rectangle"
  },
  {
    id: "look_seda_starlight",
    title: "Seda Starlight Nocturna",
    subtitle: "Drapeado fluido en satén champagne con acentos oscuros y sandalias minimalistas.",
    occasion: "Cena de Alta Sociedad",
    itemIds: {
      garment: "g3",
      jewelry: "j3",
      bag: "b1",
      shoes: "s3"
    },
    discountPercentage: 12,
    bestSilhouette: "hourglass"
  },
  {
    id: "look_monocromo_soberano",
    title: "Monocromo Soberano",
    subtitle: "El volumen cocoon en lana doble faz contrastado con joyería dorada brutalista.",
    occasion: "Eventos Otoño-Invierno",
    itemIds: {
      garment: "g4",
      jewelry: "j2",
      bag: "b2",
      shoes: "s2"
    },
    discountPercentage: 10,
    bestSilhouette: "triangle"
  }
];

export function calculateLookTotal(selectedIds: { [key in GarmentCategory]?: string | null }) {
  let subtotal = 0;
  const items: FittingItem[] = [];

  Object.values(selectedIds).forEach((id) => {
    if (!id) return;
    const found = FITTING_ITEMS.find((item) => item.id === id);
    if (found) {
      items.push(found);
      subtotal += found.price;
    }
  });

  const discountRate = items.length >= 3 ? 0.10 : (items.length === 2 ? 0.05 : 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  return {
    subtotal,
    discountRate,
    discountAmount,
    total,
    items,
    itemCount: items.length
  };
}
