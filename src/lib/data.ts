export const products = {
  clothes: [
    { 
      id: "1", 
      name: "Vestido Asimétrico Noir", 
      price: 1200, 
      category: "Alta Costura",
      image: "clothes",
      description: "Una pieza escultural que desafía la gravedad. Diseñado en nuestro atelier parisino con seda de grado museo. Su corte asimétrico no solo envuelve la silueta, sino que cuenta una historia de rebeldía elegante. Perfecto para aquellas noches donde ser inolvidable es el único protocolo."
    },
    { 
      id: "2", 
      name: "Blazer Estructurado Oro", 
      price: 1550, 
      category: "Sastrería",
      image: "clothes",
      description: "El poder redefinido. Un blazer confeccionado con precisión milimétrica, incorporando hilos de oro sutiles que atrapan la luz. Sus hombreras estructuradas proyectan autoridad, mientras que la cintura entallada rinde homenaje a la feminidad moderna."
    },
    { 
      id: "3", 
      name: "Pantalón Seda Canvas", 
      price: 920, 
      category: "Pantalones",
      image: "clothes",
      description: "Fluidez que camina contigo. Estos pantalones de seda de caída libre ofrecen una experiencia sensorial incomparable. Su cintura alta y corte amplio alargan las piernas, creando un movimiento hipnótico a cada paso."
    },
    { 
      id: "4", 
      name: "Abrigo Oversize Lana", 
      price: 2100, 
      category: "Abrigos",
      image: "clothes",
      description: "Un refugio de lujo. Elaborado con lana virgen tejida a mano, este abrigo cocoon es una declaración de intenciones contra el frío. Su silueta envolvente y su peso exacto proporcionan un abrazo cálido sin perder la rectitud del diseño editorial."
    },
  ],
  accessories: [
    { 
      id: "5", 
      name: "Collar Champagne", 
      price: 890, 
      category: "Joyería Fina",
      image: "accessories",
      description: "Más que una joya, es luz capturada. Engastado con zirconias de tono champagne exclusivas de OHDIOSA, este collar reposa exactamente sobre la clavícula, atrayendo las miradas hacia el punto focal de cualquier escote."
    },
    { 
      id: "6", 
      name: "Brazalete Geométrico", 
      price: 1100, 
      category: "Joyería Fina",
      image: "accessories",
      description: "Arquitectura para llevar. Inspirado en el brutalismo moderno, este brazalete de oro macizo 18k combina ángulos duros con un pulido espejo que refleja la fuerza de quien lo lleva. No requiere compañía."
    },
    { 
      id: "7", 
      name: "Gafas Dark Acetato", 
      price: 450, 
      category: "Gafas",
      image: "accessories",
      description: "El misterio absoluto. Cortadas a partir de un solo bloque de acetato negro profundo, estas gafas de sol ofrecen una opacidad total. Sus líneas geométricas angulares ocultan la mirada mientras elevan instantáneamente la simetría del rostro."
    },
  ],
  bags: [
    { 
      id: "8", 
      name: "Bolso Tote Estructurado", 
      price: 1800, 
      category: "Bolsos de Mano",
      image: "bags",
      description: "Donde la utilidad se encuentra con el arte. Este tote, confeccionado con cuero vacuno tratado durante semanas, mantiene su forma rígida impecable sin importar lo que lleve en su interior. Sus herrajes de oro sólido son un sello de garantía vitalicia."
    },
    { 
      id: "9", 
      name: "Clutch Oro Macizo", 
      price: 3200, 
      category: "Noche",
      image: "bags",
      description: "El punto final a cualquier atuendo de gala. Este clutch rígido bañado en oro no está diseñado para guardar mucho, sino para significar todo. Un objeto de deseo pesado, frío al tacto y deslumbrante a la vista."
    },
  ],
  shoes: [
    { 
      id: "10", 
      name: "Botas Altas Cuero", 
      price: 1450, 
      category: "Botas",
      image: "shoes",
      description: "Paso firme, legado eterno. Estas botas sobre la rodilla se ciñen a la pierna como una segunda piel gracias a su cuero italiano elástico. Su tacón arquitectónico garantiza presencia visual y un caminar impecable."
    },
    { 
      id: "11", 
      name: "Stilettos Asimétricos", 
      price: 980, 
      category: "Tacones",
      image: "shoes",
      description: "El arte de la seducción vertical. Con un escote frontal asimétrico que alarga el empeine y un tacón de aguja de 12 cm, estos stilettos de charol negro son una herramienta de empoderamiento puro. Diseñados para romper reglas."
    },
  ]
};

export const getAllProducts = () => {
  return [
    ...products.clothes,
    ...products.accessories,
    ...products.bags,
    ...products.shoes
  ];
};

export const getProductById = (id: string) => {
  return getAllProducts().find(p => p.id === id);
};
