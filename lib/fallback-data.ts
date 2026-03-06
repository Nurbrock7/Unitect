// Static fallback data used when MongoDB is not connected.
// This allows the site to render a full product catalogue for demos.

export type FallbackCategory = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
};

export type FallbackProduct = {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  category: FallbackCategory;
  specifications: Record<string, string>;
  useCases: string[];
  isFeatured: boolean;
  isActive: boolean;
};

export const fallbackCategories: FallbackCategory[] = [
  { _id: "cat-1", name: "Cable Ties", slug: "cable-ties", description: "Nylon and stainless steel cable ties for bundling and securing cables in all environments.", sortOrder: 1 },
  { _id: "cat-2", name: "Heat Shrink Tubing", slug: "heat-shrink-tubing", description: "Polyolefin and specialty heat shrink tubing for insulation, protection, and colour coding.", sortOrder: 2 },
  { _id: "cat-3", name: "Cable Markers", slug: "cable-markers", description: "Clip-on, slide-on, and wrap-around cable markers for circuit and cable identification.", sortOrder: 3 },
  { _id: "cat-4", name: "Ferrules", slug: "ferrules", description: "Insulated and uninsulated wire end ferrules for secure, reliable terminal connections.", sortOrder: 4 },
  { _id: "cat-5", name: "Cable Glands", slug: "cable-glands", description: "IP-rated cable glands for secure cable entry into enclosures, junction boxes, and panels.", sortOrder: 5 },
  { _id: "cat-6", name: "Identification Labels", slug: "identification-labels", description: "Self-laminating, thermal, and pre-printed labels for permanent cable and asset identification.", sortOrder: 6 },
  { _id: "cat-7", name: "Cable Management Accessories", slug: "cable-management-accessories", description: "Trunking, clips, saddles, and accessories for professional cable management installations.", sortOrder: 7 },
];

export const fallbackProducts: FallbackProduct[] = [
  {
    _id: "prod-1",
    name: "Nylon Cable Tie 200mm x 4.8mm",
    slug: "nylon-cable-tie-200mm",
    sku: "CT-NYL-200",
    description: "General purpose UV-resistant nylon 66 cable ties. Suitable for indoor and outdoor applications. Self-locking mechanism provides secure cable bundling for electrical, data, and general wiring installations.",
    category: fallbackCategories[0],
    specifications: { Material: "Nylon 66 (PA66)", Length: "200mm", Width: "4.8mm", "Tensile Strength": "22kg", Colour: "Black / Natural", "Operating Temp": "-40°C to +85°C", "Flammability Rating": "UL94 V-2" },
    useCases: ["Panel wiring and cable bundling", "Outdoor cable installations", "Temporary and permanent cable management", "HVAC duct and pipe fastening"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-2",
    name: "Heavy Duty Cable Tie 370mm x 7.6mm",
    slug: "heavy-duty-cable-tie-370mm",
    sku: "CT-HD-370",
    description: "Heavy-duty UV-stabilised cable ties for demanding industrial applications. High tensile strength makes them ideal for mining, construction, and outdoor infrastructure projects where reliability is critical.",
    category: fallbackCategories[0],
    specifications: { Material: "Nylon 66 (PA66)", Length: "370mm", Width: "7.6mm", "Tensile Strength": "55kg", Colour: "Black", "UV Resistance": "Yes", "Operating Temp": "-40°C to +85°C" },
    useCases: ["Mining installations", "Heavy cable bundling", "Outdoor infrastructure", "Industrial panel wiring"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-3",
    name: "Polyolefin Heat Shrink Tubing Kit",
    slug: "heat-shrink-tubing-kit",
    sku: "HS-KIT-001",
    description: "Multi-size polyolefin heat shrink assortment kit containing common sizes for electrical insulation, wire protection, and colour-coded cable identification. 2:1 shrink ratio with excellent dielectric properties.",
    category: fallbackCategories[1],
    specifications: { Material: "Polyolefin", "Shrink Ratio": "2:1", "Sizes Included": "1.5mm to 12mm", Colours: "Black, Red, Blue, Green, Yellow, Clear", "Operating Temp": "-55°C to +125°C", "Dielectric Strength": ">15kV/mm" },
    useCases: ["Wire insulation and protection", "Colour-coded cable identification", "Solder joint protection", "Component strain relief"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-4",
    name: "Dual Wall Heat Shrink with Adhesive",
    slug: "dual-wall-heat-shrink-adhesive",
    sku: "HS-DW-3-1",
    description: "Dual wall heat shrink tubing with internal adhesive liner. Provides a waterproof seal when heated, making it ideal for outdoor and underground cable joints and terminations.",
    category: fallbackCategories[1],
    specifications: { Material: "Polyolefin with adhesive liner", "Shrink Ratio": "3:1", "Sizes Available": "3mm to 50mm", Colour: "Black", "Waterproof Rating": "IP68 when applied", "Operating Temp": "-55°C to +125°C" },
    useCases: ["Waterproof cable joints", "Underground cable protection", "Marine and outdoor wiring", "Corrosion protection on terminations"],
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "prod-5",
    name: "Clip-On Cable Markers (0-9)",
    slug: "clip-on-cable-markers-0-9",
    sku: "CM-CLIP-09",
    description: "Pre-printed clip-on cable markers numbered 0 to 9 for quick and clear cable identification. Snap-on design allows installation on existing cables without disconnection.",
    category: fallbackCategories[2],
    specifications: { Material: "PVC", "Print Type": "Pre-printed 0-9", "Cable Range": "1.5mm² to 6mm²", Colours: "Colour-coded per number", "Pack Size": "100 per number" },
    useCases: ["Distribution board wiring", "Circuit identification", "Panel wiring identification", "Compliance with SANS 10142"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-6",
    name: "Flat Cable Markers (A-Z)",
    slug: "flat-cable-markers-a-z",
    sku: "CM-FLAT-AZ",
    description: "Pre-printed flat profile cable markers lettered A to Z. Designed for larger cables and conduits where clip-on markers are not suitable. UV and chemical resistant.",
    category: fallbackCategories[2],
    specifications: { Material: "Polyethylene", "Print Type": "Pre-printed A-Z", "Cable Range": "4mm² to 16mm²", Colour: "Yellow with black print", "UV Resistant": "Yes" },
    useCases: ["Large cable identification", "Outdoor cable marking", "Substation cable identification", "Control panel wiring"],
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "prod-7",
    name: "Insulated Bootlace Ferrules Kit",
    slug: "insulated-bootlace-ferrules-kit",
    sku: "FE-INS-KIT",
    description: "Comprehensive kit of colour-coded insulated bootlace ferrules covering the most common conductor sizes. Includes a crimping tool for professional terminal preparation.",
    category: fallbackCategories[3],
    specifications: { Material: "Copper tube with PP insulation", "Sizes Included": "0.5mm² to 16mm²", "Colour Coding": "DIN 46228 standard", "Kit Contents": "800 ferrules + crimping tool", "Barrel Type": "Seamless copper" },
    useCases: ["Switchboard wiring", "Motor control panel terminations", "PLC wiring", "Professional electrical installations"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-8",
    name: "PG13.5 Nylon Cable Gland",
    slug: "pg13-5-nylon-cable-gland",
    sku: "CG-PG13-NYL",
    description: "IP68-rated nylon cable gland with locknut for secure and waterproof cable entry into enclosures, junction boxes, and control panels. Complete with sealing washer and locknut.",
    category: fallbackCategories[4],
    specifications: { Material: "Nylon (PA66)", "Thread Size": "PG13.5", "Cable Range": "6mm to 12mm", "IP Rating": "IP68", Colour: "Grey / Black", Includes: "Locknut and sealing washer" },
    useCases: ["Junction box cable entry", "Control panel cable management", "Outdoor enclosure cable entry", "Industrial switchgear"],
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "prod-9",
    name: "Brass Cable Gland 20mm",
    slug: "brass-cable-gland-20mm",
    sku: "CG-BR-20",
    description: "Nickel-plated brass cable gland for use in hazardous and demanding environments. Provides EMC screening and superior mechanical protection for cable entries.",
    category: fallbackCategories[4],
    specifications: { Material: "Nickel-plated brass", "Thread Size": "M20 x 1.5", "Cable Range": "6mm to 12mm", "IP Rating": "IP68", "EMC Screening": "Yes", "Operating Temp": "-60°C to +100°C" },
    useCases: ["Hazardous area installations", "Mining equipment", "Marine applications", "EMC-sensitive installations"],
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "prod-10",
    name: "Self-Laminating Cable Labels",
    slug: "self-laminating-cable-labels",
    sku: "LB-SELF-LAM",
    description: "Self-laminating wrap-around cable labels with clear protective laminate that covers the printed area. Provides permanent, weather-resistant cable identification.",
    category: fallbackCategories[5],
    specifications: { Material: "Vinyl with clear laminate", "Print Method": "Laser or thermal transfer", "Sizes Available": "25mm x 75mm to 50mm x 150mm", "Operating Temp": "-40°C to +80°C", "UV Resistant": "Yes", Adhesive: "Permanent acrylic" },
    useCases: ["Permanent cable identification", "Outdoor cable labelling", "Data centre cabling", "Compliance labelling"],
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "prod-11",
    name: "Adhesive Cable Tie Mounts",
    slug: "adhesive-cable-tie-mounts",
    sku: "CMA-ADH-25",
    description: "Self-adhesive cable tie mounting bases for securing cable runs to flat surfaces. Strong acrylic adhesive pad bonds to metal, plastic, and painted surfaces.",
    category: fallbackCategories[6],
    specifications: { Material: "Nylon (PA66)", "Base Size": "25mm x 25mm", "Tie Width": "Up to 4.8mm", Adhesive: "Acrylic foam", Colour: "White / Black", "Pack Size": "100 pieces" },
    useCases: ["Cable routing on panels", "Desktop cable management", "Wall-mounted cable runs", "Cable tray accessories"],
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "prod-12",
    name: "Spiral Cable Wrap 12mm",
    slug: "spiral-cable-wrap-12mm",
    sku: "CMA-SPR-12",
    description: "Flexible polyethylene spiral wrap for bundling and protecting cable harnesses. Easy to install and remove, allowing addition or removal of cables at any point.",
    category: fallbackCategories[6],
    specifications: { Material: "Polyethylene (PE)", "Wrap Diameter": "12mm", "Bundle Range": "10mm to 100mm", Colour: "Black / Natural", "Roll Length": "10m", "Operating Temp": "-50°C to +100°C" },
    useCases: ["Cable harness bundling", "Workstation cable management", "Automotive wiring protection", "Machine cable protection"],
    isFeatured: false,
    isActive: true,
  },
];
