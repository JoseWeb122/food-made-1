export type CollectionKey = "best" | "new" | "snacks" | "superfoods" | "treats" | "bundles" | "limited";
export type CollectionTab = "all" | CollectionKey;
export type Category = "Snacks" | "Superfoods" | "Treats" | "Bundles";

export interface Nutrition {
  serving: string;
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  sugar: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  story: string;
  benefits: string[];
  ingredients: string;
  nutrition: Nutrition;
  price: number;
  compareAt?: number;
  image: string;
  imagePosition?: string;
  weight: string;
  category: Category;
  collections: CollectionKey[];
  flavors: string[];
  tags: string[];
  badge?: string;
  soldOut?: boolean;
  rating: number;
  reviews: number;
}

export const FREE_SHIPPING_THRESHOLD = 60;
export const MAX_QTY = 10;

export const COLLECTION_TABS: { key: CollectionTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "best", label: "Best Sellers" },
  { key: "new", label: "New" },
  { key: "snacks", label: "Snacks" },
  { key: "superfoods", label: "Superfoods" },
  { key: "treats", label: "Treats" },
  { key: "bundles", label: "Bundles" },
  { key: "limited", label: "Limited Edition" },
];

export const products: Product[] = [
  {
    id: "golden-oat-granola",
    name: "Golden Oat Granola",
    subtitle: "Slow-toasted oats, almonds & coconut",
    description:
      "Oats hand-clustered in small batches and slow-toasted until golden. Sweetened only by fruit and a whisper of sun-dried honey.",
    story:
      "We began with a single question: what would breakfast taste like if it were made the way a farmhouse kitchen made it a century ago? Our oats rest overnight, are folded by hand with raw almonds and coconut, then toasted low and slow until the kitchen smells like autumn.",
    benefits: ["Slow-toasted in small batches", "Complex carbohydrates for steady energy", "Zero refined sugar, ever"],
    ingredients:
      "Organic rolled oats, raw almonds, sun-dried coconut, pumpkin seeds, cold-pressed sunflower oil, organic cinnamon, sea salt, and flavor-specific inclusions.",
    nutrition: { serving: "45 g · ½ cup", calories: 210, protein: "6 g", fat: "11 g", carbs: "26 g", fiber: "4 g", sugar: "3 g" },
    price: 16,
    image: "/images/p-granola.jpg",
    weight: "350 g",
    category: "Snacks",
    collections: ["snacks", "best"],
    flavors: ["Honey Almond", "Cacao Nib", "Toasted Coconut"],
    tags: ["Organic", "Gluten-Free", "No Added Sugar"],
    badge: "Best Seller",
    rating: 4.9,
    reviews: 2184,
  },
  {
    id: "raw-cacao-nibs",
    name: "Raw Cacao Nibs",
    subtitle: "Single-origin, stone-ground fresh",
    description:
      "Fermented, sun-dried and cold-cracked from a single estate. Deep, bitter, faintly fruity — the purest expression of cacao.",
    story:
      "Cacao is at its most alive when it has not been roasted into submission. We source from a single cooperative in the Ecuadorian highlands, crack the beans within days of harvest and keep every nib below 46°C.",
    benefits: ["Single-origin, traceable to the cooperative", "Naturally rich in magnesium and iron", "Processed raw, never roasted"],
    ingredients: "Organic raw cacao nibs (Theobroma cacao). Flavor variants add organic cinnamon or Himalayan sea salt.",
    nutrition: { serving: "10 g · 1 tbsp", calories: 60, protein: "2 g", fat: "4 g", carbs: "4 g", fiber: "2 g", sugar: "0 g" },
    price: 14,
    compareAt: 16,
    image: "/images/p-cacao.jpg",
    weight: "200 g",
    category: "Superfoods",
    collections: ["superfoods", "best"],
    flavors: ["Ceremonial", "Cinnamon Dusted", "Sea Salt"],
    tags: ["Organic", "Raw", "Vegan", "No Added Sugar"],
    badge: "Best Seller",
    rating: 4.8,
    reviews: 1310,
  },
  {
    id: "raw-almond-butter",
    name: "Raw Almond Butter",
    subtitle: "Stone-ground from sprouted almonds",
    description:
      "Sprouted almonds stone-ground slowly until silky. Nothing added but a little sea salt and the patience to do it right.",
    story:
      "Almonds are sprouted overnight to unlock their minerals, then dried at a gentle temperature and stone-ground for nearly an hour. The result is a butter with the depth of roasted nuts and the brightness of something freshly picked.",
    benefits: ["Sprouted for easier digestion", "Plant protein and healthy monounsaturated fat", "Stone-ground, never homogenized"],
    ingredients: "Organic sprouted almonds, Himalayan sea salt. Cinnamon and Vanilla Bean variants add organic spices and real vanilla seed.",
    nutrition: { serving: "32 g · 2 tbsp", calories: 190, protein: "7 g", fat: "16 g", carbs: "7 g", fiber: "3 g", sugar: "2 g" },
    price: 13,
    image: "/images/p-almond.jpg",
    weight: "340 g",
    category: "Superfoods",
    collections: ["superfoods", "best"],
    flavors: ["Smooth Raw", "Cinnamon", "Vanilla Bean"],
    tags: ["Organic", "Raw", "Vegan", "Gluten-Free"],
    rating: 4.9,
    reviews: 968,
  },
  {
    id: "medjool-date-bites",
    name: "Medjool Date Bites",
    subtitle: "Date, almond & cacao, hand-rolled",
    description:
      "Plump Medjool dates, roasted almonds and cacao, rolled by hand into bite-sized treats that taste like dessert and act like fuel.",
    story:
      "Our dates come from a family orchard in the Jordan Valley, picked at peak sweetness. We pit each one by hand, blend it with almonds and cacao, and roll every bite until it holds its shape without a single binder.",
    benefits: ["Sweet enough to satisfy, with no added sugar", "Potassium-rich dates and fiber", "Hand-rolled in batches of twelve"],
    ingredients: "Organic Medjool dates, raw almonds, raw cacao, coconut flakes, sea salt. Pistachio and orange zest variants as listed on pack.",
    nutrition: { serving: "40 g · 2 bites", calories: 170, protein: "3 g", fat: "8 g", carbs: "24 g", fiber: "3 g", sugar: "14 g" },
    price: 18,
    image: "/images/p-dates.jpg",
    weight: "240 g",
    category: "Treats",
    collections: ["treats", "best"],
    flavors: ["Cacao", "Orange Zest", "Pistachio"],
    tags: ["Organic", "Raw", "Vegan", "No Added Sugar"],
    badge: "Best Seller",
    rating: 4.9,
    reviews: 1742,
  },
  {
    id: "sprouted-seed-crackers",
    name: "Sprouted Seed Crackers",
    subtitle: "Sprouted seeds, dehydrated low & slow",
    description:
      "Pumpkin, sunflower and flax seeds sprouted, blended with herbs and dehydrated for twenty-four hours until crisp and deeply savory.",
    story:
      "A cracker should be a vehicle for good things, not a filler. We sprout the seeds first, then dehydrate them below 46°C so they stay crisp, nutty and alive, and finish each sheet with a flake of sea salt.",
    benefits: ["Sprouted seeds for easier absorption", "Savory, crisp and genuinely filling", "Dehydrated below 46°C"],
    ingredients: "Organic sprouted pumpkin seeds, sunflower seeds, flax, chia, rosemary, sea salt. Variant herbs as listed on pack.",
    nutrition: { serving: "30 g · 6 crackers", calories: 150, protein: "5 g", fat: "9 g", carbs: "13 g", fiber: "4 g", sugar: "1 g" },
    price: 12,
    image: "/images/p-seeds.jpg",
    weight: "120 g",
    category: "Snacks",
    collections: ["snacks", "new"],
    flavors: ["Rosemary Sea Salt", "Turmeric Ginger", "Sesame Nori"],
    tags: ["Organic", "Raw", "Vegan", "Gluten-Free"],
    badge: "New",
    rating: 4.7,
    reviews: 214,
  },
  {
    id: "ceremonial-matcha-bites",
    name: "Ceremonial Matcha Bites",
    subtitle: "Shade-grown matcha & toasted coconut",
    description:
      "Shade-grown ceremonial matcha folded into coconut and cashew, rolled into small green bites with a clean, grassy finish.",
    story:
      "Our matcha is shade-grown for three weeks before harvest, which gives it that deep, almost umami sweetness. We pair it with cashew and coconut so the flavor stays bright and the texture stays soft.",
    benefits: ["Ceremonial-grade shade-grown matcha", "Gentle natural caffeine with L-theanine", "Vegan, dairy-free and gluten-free"],
    ingredients: "Organic cashews, desiccated coconut, Japanese ceremonial matcha, Medjool dates, sea salt. Cacao variant adds raw cacao.",
    nutrition: { serving: "35 g · 2 bites", calories: 160, protein: "3 g", fat: "9 g", carbs: "17 g", fiber: "3 g", sugar: "8 g" },
    price: 17,
    image: "/images/p-matcha.jpg",
    weight: "210 g",
    category: "Treats",
    collections: ["treats", "new"],
    flavors: ["Matcha Coconut", "Matcha Cacao"],
    tags: ["Organic", "Vegan", "Gluten-Free", "No Added Sugar"],
    badge: "New",
    rating: 4.8,
    reviews: 186,
  },
  {
    id: "wild-blueberry-chia",
    name: "Wild Blueberry Chia Pudding",
    subtitle: "Overnight chia, ready in five minutes",
    description:
      "Ground chia and wild blueberries, balanced with coconut milk powder. Stir with water, rest, and breakfast is already waiting.",
    story:
      "Chia is one of the most nutritionally dense seeds on earth. We pair it with wild blueberries dried at peak season so the pudding tastes like summer in the morning, without a single drop of added sugar.",
    benefits: ["Omega-3 rich chia seeds", "Fiber-forward, slow-release breakfast", "Five-minute preparation"],
    ingredients: "Organic chia seeds, freeze-dried wild blueberries, coconut milk powder, organic vanilla, sea salt.",
    nutrition: { serving: "60 g · 1 serving", calories: 140, protein: "5 g", fat: "5 g", carbs: "20 g", fiber: "9 g", sugar: "6 g" },
    price: 19,
    compareAt: 22,
    image: "/images/editorial-1.jpg",
    imagePosition: "center 60%",
    weight: "300 g",
    category: "Superfoods",
    collections: ["superfoods", "new"],
    flavors: ["Wild Blueberry", "Mixed Berry"],
    tags: ["Organic", "Raw", "Vegan", "Nutritionally Dense"],
    badge: "New",
    soldOut: true,
    rating: 4.8,
    reviews: 402,
  },
  {
    id: "fig-walnut-harvest-bars",
    name: "Fig & Walnut Harvest Bars",
    subtitle: "Six bars, one autumn harvest",
    description:
      "Sun-dried figs and toasted walnuts pressed into bars that taste like an orchard in October. Small batch, seasonal, gone by winter.",
    story:
      "Each autumn we work with two fig growers on the Central Coast. Their figs are dried in the sun for nine days, then pressed with walnuts and a little orange zest into a bar we only make while the season lasts.",
    benefits: ["Seasonal, small-batch release", "Figs rich in calcium and fiber", "Six bars, individually wrapped"],
    ingredients: "Organic sun-dried figs, raw walnuts, dates, orange zest, sea salt. Date & Pecan variant uses raw pecans.",
    nutrition: { serving: "40 g · 1 bar", calories: 180, protein: "4 g", fat: "6 g", carbs: "28 g", fiber: "4 g", sugar: "20 g" },
    price: 24,
    compareAt: 28,
    image: "/images/editorial-2.jpg",
    weight: "6 × 40 g",
    category: "Snacks",
    collections: ["limited", "snacks"],
    flavors: ["Fig & Walnut", "Date & Pecan"],
    tags: ["Organic", "Raw", "Vegan", "No Added Sugar"],
    badge: "Limited",
    rating: 4.9,
    reviews: 512,
  },
  {
    id: "solstice-cacao-truffles",
    name: "Solstice Cacao Truffles",
    subtitle: "Winter limited release, twelve pieces",
    description:
      "Raw cacao and cashew ganache, hand-dipped in cacao shell. A winter release that returns only when the longest night has passed.",
    story:
      "Solstice truffles are made in a single week each December. We temper the cacao by hand and set each truffle in a cool room overnight, so the shell snaps and the center stays soft.",
    benefits: ["Hand-dipped, twelve per box", "Raw cacao and cashew ganache", "Winter limited release"],
    ingredients: "Organic raw cacao, cashews, coconut oil, Medjool dates, sea salt. Ginger Orange variant adds candied orange peel.",
    nutrition: { serving: "20 g · 1 truffle", calories: 110, protein: "2 g", fat: "7 g", carbs: "10 g", fiber: "2 g", sugar: "6 g" },
    price: 26,
    image: "/images/p-cacao.jpg",
    imagePosition: "30% 50%",
    weight: "12 pieces",
    category: "Treats",
    collections: ["treats", "limited"],
    flavors: ["Sea Salt", "Ginger Orange"],
    tags: ["Organic", "Raw", "Vegan", "Gluten-Free"],
    badge: "Limited",
    soldOut: true,
    rating: 4.9,
    reviews: 264,
  },
  {
    id: "morning-ritual-kit",
    name: "The Morning Ritual Kit",
    subtitle: "Granola, almond butter & chia — one ritual",
    description:
      "Everything for a considered breakfast: a jar of Golden Oat Granola, Raw Almond Butter and a Wild Blueberry Chia Pudding Mix.",
    story:
      "We built this kit around a simple idea: breakfast should be the easiest good decision of the day. Three staples, chosen to work together, delivered together.",
    benefits: ["Save $8 versus buying separately", "Three of our most-loved staples", "Gift-ready packaging"],
    ingredients: "See individual products: Golden Oat Granola, Raw Almond Butter, Wild Blueberry Chia Pudding Mix.",
    nutrition: { serving: "Per ritual · granola + 2 tbsp butter", calories: 400, protein: "13 g", fat: "27 g", carbs: "34 g", fiber: "7 g", sugar: "5 g" },
    price: 34,
    compareAt: 42,
    image: "/images/p-granola.jpg",
    imagePosition: "70% 40%",
    weight: "3 jars",
    category: "Bundles",
    collections: ["bundles", "new"],
    flavors: ["Classic"],
    tags: ["Organic", "Vegan", "Gluten-Free"],
    badge: "Save $8",
    rating: 4.9,
    reviews: 311,
  },
  {
    id: "the-pantry-edit",
    name: "The Pantry Edit",
    subtitle: "Seven staples for a considered kitchen",
    description:
      "Seven organic, raw staples curated by our kitchen team — the ingredients we cook with every day, in one carefully packed box.",
    story:
      "The Pantry Edit is the box our own kitchen team would pack for a friend. Seven staples, each one chosen for flavor, provenance and the way it makes the rest of the cupboard better.",
    benefits: ["Seven staples, one box", "Save $13 versus buying separately", "Recipe card included"],
    ingredients: "Golden Oat Granola, Raw Cacao Nibs, Raw Almond Butter, Medjool Date Bites, Sprouted Seed Crackers, Ceremonial Matcha Bites, Fig & Walnut Harvest Bars.",
    nutrition: { serving: "Varies by staple", calories: 180, protein: "5 g", fat: "9 g", carbs: "22 g", fiber: "4 g", sugar: "6 g" },
    price: 48,
    compareAt: 61,
    image: "/images/hero.jpg",
    imagePosition: "18% 72%",
    weight: "7 staples",
    category: "Bundles",
    collections: ["bundles", "best"],
    flavors: ["Curated"],
    tags: ["Organic", "Raw", "Vegan", "Gluten-Free"],
    badge: "Save $13",
    rating: 4.8,
    reviews: 147,
  },
];

export const getProduct = (id: string): Product => products.find((p) => p.id === id) ?? products[0];

export const BUNDLE_STEPS: { key: string; label: string; title: string; hint: string; category: Category }[] = [
  { key: "a", label: "Collection A", title: "Start with your crunch", hint: "Snacks & granola", category: "Snacks" },
  { key: "b", label: "Collection B", title: "Add your superfoods", hint: "Cacao, nut butter & chia", category: "Superfoods" },
  { key: "c", label: "Collection C", title: "Finish with a treat", hint: "Bites & truffles", category: "Treats" },
];

export const BUNDLE_TIERS = [
  { min: 3, pct: 0.1, label: "Save 10%" },
  { min: 6, pct: 0.15, label: "Save 15%" },
];

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  region: "West" | "Midwest" | "East" | "South";
  address: string;
  hours: string;
  initials: string;
  tone: "clay" | "sage" | "bark";
}

export const stores: Store[] = [
  { id: "larder", name: "Larder & Co.", city: "Brooklyn", state: "NY", region: "East", address: "214 Smith Street", hours: "Daily 8am – 9pm", initials: "LC", tone: "bark" },
  { id: "fieldstone", name: "Fieldstone Grocers", city: "Portland", state: "OR", region: "West", address: "1180 NE Alberta Street", hours: "Daily 7am – 8pm", initials: "FG", tone: "sage" },
  { id: "nordic", name: "The Nordic Pantry", city: "Minneapolis", state: "MN", region: "Midwest", address: "2601 Lyndale Avenue S", hours: "Mon – Sat 9am – 7pm", initials: "NP", tone: "clay" },
  { id: "verdant", name: "Verdant Provisions", city: "Austin", state: "TX", region: "South", address: "900 S Congress Avenue", hours: "Daily 8am – 9pm", initials: "VP", tone: "sage" },
  { id: "olive-row", name: "Olive Row Market", city: "Los Angeles", state: "CA", region: "West", address: "7450 Melrose Avenue", hours: "Daily 9am – 10pm", initials: "OR", tone: "bark" },
  { id: "hearth", name: "Hearth & Grain", city: "Chicago", state: "IL", region: "Midwest", address: "1656 W Division Street", hours: "Daily 8am – 8pm", initials: "HG", tone: "clay" },
  { id: "saltmarsh", name: "Saltmarsh Goods", city: "Charleston", state: "SC", region: "South", address: "63 King Street", hours: "Daily 10am – 7pm", initials: "SG", tone: "bark" },
  { id: "meridian", name: "Meridian Wellness Co.", city: "Seattle", state: "WA", region: "West", address: "1420 Pike Place", hours: "Daily 8am – 7pm", initials: "MW", tone: "sage" },
];

export const storyChapters = [
  {
    id: "ingredients",
    label: "Ingredients",
    eyebrow: "Chapter one",
    title: "Eleven ingredients. No compromises.",
    paragraphs: [
      "Every IZHAR recipe begins with a short list, and we defend it fiercely. If an ingredient cannot be named, grown or traced, it does not belong in the bowl.",
      "Our Golden Oat Granola contains eleven ingredients. Each is organic, most are raw, and none are refined. The sweetness comes from fruit and a little sun-dried honey, never from syrup.",
    ],
    stat: { value: "11", label: "ingredients in our Golden Oat Granola" },
  },
  {
    id: "sourcing",
    label: "Sourcing",
    eyebrow: "Chapter two",
    title: "Traced back to the field.",
    paragraphs: [
      "We work with forty-two partner farms and cooperatives across four continents, most of them family-run for three or more generations. We visit every one before we sign and again every harvest.",
      "Our cacao is single-origin from a highland cooperative in Ecuador. Our dates come from an orchard in the Jordan Valley. Each batch carries a lot code that traces it back to the season and the field.",
    ],
    stat: { value: "42", label: "partner farms and cooperatives" },
  },
  {
    id: "preparation",
    label: "Preparation",
    eyebrow: "Chapter three",
    title: "Low heat, long patience.",
    paragraphs: [
      "Heat is the quiet enemy of nutrition. So we keep most of our kitchen below 46°C, the threshold at which many enzymes and delicate fats begin to degrade.",
      "Seeds are sprouted overnight and dehydrated for a full day. Nuts are stone-ground for nearly an hour. Granola is toasted slowly until the oats go golden, not brown. It takes longer. It always tastes better.",
    ],
    stat: { value: "< 46°C", label: "maximum temperature in our raw kitchen" },
  },
  {
    id: "nutrition",
    label: "Nutrition",
    eyebrow: "Chapter four",
    title: "Dense, not dessert-heavy.",
    paragraphs: [
      "We design for nutritional density, not for sweetness alone. Every jar is built to deliver fiber, plant protein and healthy fats in a single satisfying serving.",
      "Our nutrition panels are published in full on every product page, down to the gram, with serving sizes that reflect how people actually eat.",
    ],
    stat: { value: "9 g", label: "fiber in a Wild Blueberry Chia serving" },
  },
  {
    id: "craftsmanship",
    label: "Craftsmanship",
    eyebrow: "Chapter five",
    title: "Small batches, by hand.",
    paragraphs: [
      "Our date bites are rolled by hand, twelve at a time. Our truffles are tempered by a single kitchen lead who has been with us since the first batch in 2014.",
      "We would rather make fewer jars and make each one properly. That is why most of our products are released in small runs, and why some of them sell out.",
    ],
    stat: { value: "12", label: "hand-rolled date bites per batch" },
  },
  {
    id: "philosophy",
    label: "Philosophy",
    eyebrow: "Chapter six",
    title: "Food should taste of where it came from.",
    paragraphs: [
      "IZHAR began in a rented kitchen with a simple conviction: good food is not a trade-off between pleasure and health. It is the place where they meet.",
      "We believe in fewer, better ingredients, honest labels, and food that makes the people who eat it feel more like themselves. That is the only standard we hold ourselves to.",
    ],
    stat: { value: "2014", label: "the year the first batch was made" },
  },
];

export const collectionFeatures: { key: CollectionKey; title: string; copy: string; image: string; position?: string; span: string }[] = [
  { key: "snacks", title: "Snacks", copy: "Crunch with intention. Baked slow, cut clean.", image: "/images/p-granola.jpg", span: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto" },
  { key: "superfoods", title: "Superfoods", copy: "Cacao, nut butters and chia — dense by design.", image: "/images/p-almond.jpg", span: "md:col-span-5 aspect-[4/3] md:aspect-auto" },
  { key: "treats", title: "Treats", copy: "Dessert that is honest about what it is made of.", image: "/images/p-dates.jpg", span: "md:col-span-5 aspect-[4/3] md:aspect-auto" },
];

export const ribbonItems = ["Organic", "Raw", "Vegan", "Gluten-Free", "No-Added-Sugar", "Nutritionally Dense"];

export const trustBadges = [
  { label: "Organic", copy: "Certified organic ingredients, traced to the farm.", icon: "leaf" },
  { label: "Raw", copy: "Processed below 46°C. Never roasted into submission.", icon: "flask" },
  { label: "Vegan", copy: "100% plant-based. No dairy, no animal derivatives.", icon: "sprout" },
  { label: "Gluten-Free", copy: "Made in a dedicated gluten-free kitchen.", icon: "shield" },
  { label: "No Added Sugar", copy: "Sweetened only by fruit and nature.", icon: "drop" },
  { label: "Nutritionally Dense", copy: "Fiber, plant protein and healthy fats in every serving.", icon: "leaf" },
];

export const socialLinks = [
  { name: "Instagram", handle: "@izharfoods", href: "https://instagram.com/izharfoods", icon: "instagram" },
  { name: "TikTok", handle: "@izharfoods", href: "https://tiktok.com/@izharfoods", icon: "tiktok" },
  { name: "YouTube", handle: "IZHAR Kitchen", href: "https://youtube.com/@izharfoods", icon: "youtube" },
  { name: "Pinterest", handle: "izharfoods", href: "https://pinterest.com/izharfoods", icon: "pinterest" },
  { name: "Substack", handle: "The Closer Journal", href: "https://izhar.substack.com", icon: "substack" },
  { name: "Reddit", handle: "r/IzharFoods", href: "https://reddit.com/r/izharfoods", icon: "reddit" },
];

export const faqs = [
  { q: "Are your products certified organic?", a: "Yes. Every ingredient we use that is available in organic form is certified organic, and our lot codes link to the certificate for each batch." },
  { q: "What does 'raw' mean at IZHAR?", a: "Our kitchen keeps processing temperatures below 46°C, so enzymes and delicate fats are preserved. Some products are dehydrated rather than baked for the same reason." },
  { q: "Do you use refined sugar?", a: "Never. Our sweetness comes from whole fruit, dates and a small amount of sun-dried honey, and every product is labelled with its total sugar content." },
  { q: "How long do the jars keep?", a: "Unopened, most jars keep for 9–12 months in a cool, dry cupboard. Freshness dates are printed on every lid." },
  { q: "Can I return something I don't love?", a: "Absolutely. If a product is not for you, contact us within 30 days and we will make it right, no questions asked." },
];
