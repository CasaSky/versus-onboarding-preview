// data.jsx — sample data for Tokyo vs Seoul comparison

const SAMPLE_DATA = {
  query: "Tokyo vs Seoul for a 7-day trip",
  a: {
    name: "Tokyo",
    sub: "Japan · Kantō region",
    flag: "🇯🇵",
    tagline: "Vast, deep, layered. A city that rewards repeat visits.",
    score: 91,
  },
  b: {
    name: "Seoul",
    sub: "South Korea · Han River",
    flag: "🇰🇷",
    tagline: "Fast-moving, design-forward, late-night energy.",
    score: 88,
  },
  context: {
    purpose: "Leisure travel, 7 days",
    priorities: ["Food", "Design & culture", "Walkability", "Value"],
    audience: "First-time visitor, mid-30s, comfortable budget",
  },
  verdict: {
    headline: "Tokyo, narrowly — but Seoul wins if you want a livelier night.",
    body: "For a first-time, week-long trip with a balanced interest in food, culture, and pace, Tokyo edges ahead on depth, transit, and the sheer variety of neighborhoods you can explore in a day. Seoul is the better pick if you weight nightlife, contemporary design, and value more heavily — and it's an easier city to feel locally fluent in within a week.",
    confidence: 0.82,
  },
  categories: [
    { id: "food", label: "Food", a: 9.4, b: 9.1, winner: "a", note: "Both are world-class. Tokyo's Michelin density and ingredient obsession edge out Seoul's broader, livelier street and late-night scene." },
    { id: "transit", label: "Getting around", a: 9.6, b: 8.8, winner: "a", note: "Tokyo's network is denser and runs on impeccable timing. Seoul's is cleaner and cheaper, with better English signage." },
    { id: "design", label: "Design & culture", a: 8.7, b: 9.0, winner: "b", note: "Seoul's contemporary design, K-pop, and gallery scene feel of-the-moment. Tokyo runs deeper but quieter." },
    { id: "nightlife", label: "Nightlife", a: 7.8, b: 9.2, winner: "b", note: "Seoul stays up later, louder, and across more districts. Tokyo's nightlife is excellent but pocketed." },
    { id: "walk", label: "Walkability", a: 8.2, b: 8.6, winner: "b", note: "Seoul's central districts cluster tighter. Tokyo rewards transit-hopping over walking between zones." },
    { id: "value", label: "Value", a: 7.4, b: 8.7, winner: "b", note: "Seoul is meaningfully cheaper for food, lodging, and transit at a comparable level of quality." },
    { id: "english", label: "English friendliness", a: 7.2, b: 8.0, winner: "b", note: "Seoul's signage and apps are more bilingual; Tokyo has improved but still demands more navigation effort." },
    { id: "depth", label: "Depth & repeat-ability", a: 9.5, b: 8.3, winner: "a", note: "Tokyo's neighborhood variety and craft tradition make it a city you can return to for a decade." },
  ],
  specs: [
    { label: "Population (metro)", a: "37.4M", b: "25.6M" },
    { label: "Avg. flight from NYC", a: "13h 45m", b: "14h 25m" },
    { label: "Daily budget (mid)", a: "$210", b: "$155" },
    { label: "Subway lines", a: "13", b: "23" },
    { label: "Michelin-starred restaurants", a: "194", b: "33" },
    { label: "Best months", a: "Mar–May, Oct–Nov", b: "Apr–Jun, Sep–Oct" },
    { label: "Avg. hotel (4★)", a: "$245 / night", b: "$165 / night" },
    { label: "Tap water", a: "Drinkable", b: "Drinkable" },
    { label: "Power plug", a: "Type A · 100V", b: "Type C/F · 220V" },
    { label: "Tipping", a: "Not customary", b: "Not customary" },
  ],
  pros: {
    a: [
      "Unmatched food depth — sushi, kaiseki, ramen, izakaya, all peerless",
      "Transit precision: 13 lines, sub-minute timing",
      "Neighborhood variety — 23 wards feel like 23 cities",
      "Craft and artisan culture runs centuries deep",
      "Cleanest, safest large city you'll ever visit",
    ],
    b: [
      "Energetic, late-night culture across many districts",
      "Stronger value across food, lodging, and transit",
      "Contemporary design and beauty scene leads globally",
      "Easier to navigate as a non-Japanese, non-Korean speaker",
      "Compact center — more walkable between key zones",
    ],
  },
  cons: {
    a: [
      "Expensive — especially lodging in central wards",
      "Language barrier higher than most major Asian capitals",
      "Can feel reserved if you want loud, social energy",
    ],
    b: [
      "Less food variety at the very top end",
      "Air quality dips in spring (yellow dust season)",
      "Smaller historical footprint than Tokyo or Kyoto",
    ],
  },
  quotes: [
    { text: "Tokyo is less a city than a constellation of villages, each with its own gravity.", source: "Condé Nast Traveler", date: "Mar 2025", side: "a" },
    { text: "Seoul has become the design capital of Asia almost by accident — and entirely on purpose.", source: "Monocle", date: "Feb 2026", side: "b" },
    { text: "You will never run out of restaurants in Tokyo. Literally — the math doesn't work.", source: "Eater", date: "Jan 2026", side: "a" },
    { text: "If New York is the city that never sleeps, Seoul is the one that doesn't see the point.", source: "The Guardian", date: "Nov 2025", side: "b" },
  ],
  sources: [
    { title: "Tokyo Travel Guide 2026", host: "Condé Nast Traveler", date: "Mar 2026" },
    { title: "Seoul: The New Design Capital", host: "Monocle", date: "Feb 2026" },
    { title: "Best Time to Visit Japan", host: "Lonely Planet", date: "Jan 2026" },
    { title: "Seoul vs Tokyo: A Local's Take", host: "The Infatuation", date: "Dec 2025" },
    { title: "Cost of Travel: East Asia 2026", host: "Nomad List", date: "Apr 2026" },
    { title: "Michelin Guide Tokyo", host: "michelin.com", date: "2026" },
    { title: "Korea Tourism Organization", host: "visitkorea.or.kr", date: "2026" },
    { title: "Seoul Subway Modernization", host: "Reuters", date: "Sep 2025" },
  ],
  recommendation: {
    pickFor: "first-time, week-long, balanced interests",
    pick: "Tokyo",
    why: "Tokyo gives a first-time visitor more to discover per day across food, neighborhoods, and craft culture than any other city in the region. The depth-per-day is what makes a single week feel earned.",
    altPick: "Pick Seoul if late-night energy, value, and modern design rank higher than tradition and depth.",
  },
  recents: [
    "iPhone Air vs iPhone 17 Pro",
    "Claude Opus 4.7 vs GPT-5.5",
    "Tesla Model 3 vs Polestar 2",
    "Roam Research vs Obsidian",
    "Lisbon vs Porto",
    "Rolex Submariner vs Tudor Black Bay",
  ],
};

// Category profiles — sub-profiles first (more specific), then broad ones.
const CATEGORY_PROFILES = {
  // === SPECIFIC SUB-PROFILES ===
  agenticDev: {
    keywords: ["claude code","cursor","windsurf","aider","cline","continue.dev","copilot","github copilot","sweep","devin","replit agent","codeium","zed ai"],
    purposeLabel: "Choosing an AI coding tool",
    priorities: ["Agentic loops","Code quality","Speed","Editor integration","Multi-file edits","Codebase awareness","Pricing","Tool/MCP support","Privacy","Latency","Diff review UX","Terminal access"],
    defaults: ["Agentic loops","Code quality","Editor integration","Pricing"],
    samples: ["Cursor","Windsurf","Aider","Cline","Copilot","Zed"],
  },
  imageModel: {
    keywords: ["midjourney","dall-e","dalle","stable diffusion","flux","ideogram","firefly","imagen","recraft"],
    purposeLabel: "Choosing an image model",
    priorities: ["Photorealism","Stylization","Prompt adherence","Text rendering","Speed","Pricing","Editing tools","Commercial license","Style control","Resolution"],
    defaults: ["Photorealism","Prompt adherence","Pricing","Editing tools"],
    samples: ["Midjourney","Flux","Ideogram","DALL·E 3","Firefly"],
  },
  ev: {
    keywords: ["tesla","model 3","model y","polestar","rivian","lucid","ev","electric","id.4","ioniq","ev6"],
    purposeLabel: "Buying an EV",
    priorities: ["Range","Charging network","Charging speed","Performance","Tech & software","Comfort","Price","Reliability","Cargo space","Resale value"],
    defaults: ["Range","Charging network","Price","Tech & software"],
    samples: ["Tesla Model 3","Polestar 2","Rivian R1S","Hyundai Ioniq 5","Lucid Air"],
  },
  runningShoe: {
    keywords: ["vaporfly","alphafly","hoka","endorphin","saucony","asics","nike pegasus","adidas adios","new balance","running shoe"],
    purposeLabel: "Buying running shoes",
    priorities: ["Cushioning","Energy return","Weight","Stability","Durability","Price","Fit","Heel-to-toe drop","Use case (race/daily)","Breathability"],
    defaults: ["Cushioning","Energy return","Weight","Price"],
    samples: ["Hoka Clifton","Saucony Endorphin","Asics Novablast","New Balance Rebel"],
  },
  productivityNotes: {
    keywords: ["notion","obsidian","roam","logseq","craft","bear","apple notes","evernote","reflect","capacities","tana"],
    purposeLabel: "Choosing a notes app",
    priorities: ["Speed","Local-first / privacy","Linking & graph","Mobile experience","Daily notes","Plugins","Pricing","Collaboration","Offline support","Search"],
    defaults: ["Speed","Linking & graph","Mobile experience","Pricing"],
    samples: ["Obsidian","Logseq","Craft","Bear","Roam","Tana"],
  },
  designTool: {
    keywords: ["figma","sketch","framer","penpot","adobe xd","webflow"],
    purposeLabel: "Choosing a design tool",
    priorities: ["Collaboration","Prototyping","Component system","Plugins","Pricing","Performance","Hand-off","Code export","Learning curve"],
    defaults: ["Collaboration","Prototyping","Component system","Pricing"],
    samples: ["Figma","Sketch","Framer","Penpot","Webflow"],
  },
  smartRing: {
    keywords: ["oura","ultrahuman","ringconn","samsung galaxy ring","smart ring"],
    purposeLabel: "Choosing a smart ring",
    priorities: ["Sleep accuracy","Battery life","Subscription cost","Comfort","Recovery insights","App design","Compatibility","Charging","Sizing"],
    defaults: ["Sleep accuracy","Battery life","Subscription cost","Comfort"],
    samples: ["Oura Ring 4","Ultrahuman Ring Air","RingConn","Galaxy Ring"],
  },
  cloud: {
    keywords: ["aws","amazon web services","gcp","google cloud","azure","oracle cloud","ibm cloud","digitalocean","linode","vercel","netlify","cloudflare","hetzner","render","fly.io","cloud"],
    purposeLabel: "Choosing a cloud provider",
    priorities: ["Performance","Speed","Pricing","Reliability","Ease of use","Service breadth","Developer experience","Networking","Global regions","Support","AI/ML services","Compliance","Spot/preemptible pricing","Free tier"],
    defaults: ["Pricing","Reliability","Ease of use","Service breadth"],
    samples: ["Azure","Cloudflare","DigitalOcean","Hetzner","Vercel","Fly.io"],
  },
  database: {
    keywords: ["postgres","postgresql","mysql","mongodb","redis","sqlite","duckdb","snowflake","bigquery","clickhouse","cockroachdb","planetscale","supabase","neon","turso","database"],
    purposeLabel: "Choosing a database",
    priorities: ["Performance","Scalability","Query model","Pricing","Operational complexity","Ecosystem","Backup & DR","Latency","Consistency model","Cloud-native"],
    defaults: ["Performance","Pricing","Operational complexity","Ecosystem"],
    samples: ["Postgres","MongoDB","ClickHouse","Snowflake","BigQuery","DuckDB"],
  },
  // === BROADER PROFILES ===
  travel: {
    keywords: ["tokyo","seoul","paris","london","new york","lisbon","porto","bali","kyoto","barcelona","rome","berlin","amsterdam","city","country","island","trip","taipei","bangkok","singapore","hong kong","madrid","vienna","prague","copenhagen"],
    purposeLabel: "Travel",
    priorities: ["Food","Design & culture","Walkability","Value","Nightlife","Safety","Weather","English-friendly","Family-friendly","Outdoor activities"],
    defaults: ["Food","Design & culture","Walkability","Value"],
    samples: ["Osaka","Kyoto","Taipei","Bangkok","Hong Kong"],
  },
  phone: {
    keywords: ["iphone","pixel","samsung","galaxy","oneplus","phone","smartphone","xiaomi","nothing phone"],
    purposeLabel: "Buying a phone",
    priorities: ["Camera","Battery life","Display","Performance","Price","Build quality","Software","Ecosystem","Repairability","Weight & feel"],
    defaults: ["Camera","Battery life","Price","Performance"],
    samples: ["Pixel 10 Pro","Galaxy S26","OnePlus 13","Nothing Phone 3"],
  },
  ai: {
    keywords: ["gpt","claude","gemini","opus","sonnet","llm","ai model","mistral","grok","deepseek","o3","haiku"],
    purposeLabel: "Choosing an AI model",
    priorities: ["Reasoning","Coding","Writing quality","Speed","Context length","Pricing","Vision","Tool use","Safety","Multilingual"],
    defaults: ["Reasoning","Coding","Pricing","Context length"],
    samples: ["Gemini 2.5 Pro","Grok 4","DeepSeek V4","Mistral Large"],
  },
  car: {
    keywords: ["bmw","mercedes","audi","ford","car","sedan","suv","toyota","honda","lexus"],
    purposeLabel: "Buying a car",
    priorities: ["Performance","Comfort","Tech & software","Fuel economy","Price","Reliability","Cargo space","Safety","Resale value","Handling"],
    defaults: ["Comfort","Price","Reliability","Tech & software"],
    samples: ["BMW 3 Series","Mercedes C-Class","Audi A4","Lexus IS"],
  },
  laptop: {
    keywords: ["macbook","thinkpad","dell xps","laptop","framework","surface","chromebook","zenbook","lg gram","razer blade"],
    purposeLabel: "Buying a laptop",
    priorities: ["Performance","Battery life","Display","Keyboard","Ports","Price","Weight","Build quality","Repairability","Software"],
    defaults: ["Performance","Battery life","Price","Display"],
    samples: ["Dell XPS 14","Framework 13","Surface Laptop","LG Gram","ThinkPad X1"],
  },
  watch: {
    keywords: ["rolex","tudor","omega","seiko","watch","submariner","speedmaster","apple watch","garmin","grand seiko","cartier"],
    purposeLabel: "Choosing a watch",
    priorities: ["Design","Movement","Value","Wearability","Versatility","Brand heritage","Resale","Water resistance","Legibility","Strap options"],
    defaults: ["Design","Value","Movement","Versatility"],
    samples: ["Omega Seamaster","Grand Seiko","Cartier Tank","IWC Pilot"],
  },
  app: {
    keywords: ["linear","slack","discord","app","software","tool","asana","jira","trello","airtable","vscode"],
    purposeLabel: "Choosing software",
    priorities: ["Ease of use","Power & flexibility","Speed","Pricing","Collaboration","Integrations","Mobile experience","Offline support","Privacy","Community"],
    defaults: ["Ease of use","Power & flexibility","Pricing","Speed"],
    samples: ["Asana","Jira","Trello","Airtable","Monday"],
  },
  wearable: {
    keywords: ["whoop","fitbit","apple watch","garmin","wearable","tracker","polar","coros"],
    purposeLabel: "Choosing a wearable",
    priorities: ["Accuracy","Battery life","Comfort","App experience","Subscription cost","Sleep tracking","Workout tracking","Design","Compatibility","Privacy"],
    defaults: ["Accuracy","Battery life","Comfort","App experience"],
    samples: ["Garmin Fenix 8","Polar Vantage","Coros Apex","Whoop 5"],
  },
  generic: {
    keywords: [],
    purposeLabel: "General comparison",
    priorities: ["Quality","Price","Ease of use","Features","Reliability","Design","Performance","Value for money"],
    defaults: ["Quality","Price","Features","Value for money"],
    samples: ["Option C","Another contender","Alternative pick"],
  },
};

function detectProfile(a = '', b = '') {
  const text = `${a} ${b}`.toLowerCase();
  let best = 'generic';
  let bestScore = 0;
  for (const [key, prof] of Object.entries(CATEGORY_PROFILES)) {
    let hits = 0;
    let maxKwLen = 0;
    for (const kw of prof.keywords) {
      if (text.includes(kw)) {
        hits++;
        if (kw.length > maxKwLen) maxKwLen = kw.length;
      }
    }
    // Multi-word keywords like "claude code" beat single-word "claude" via maxKwLen.
    const score = hits * 100 + maxKwLen;
    if (score > bestScore && hits > 0) {
      bestScore = score;
      best = key;
    }
  }
  return best;
}

function suggestNextItem(profileKey, existingItems = []) {
  const profile = CATEGORY_PROFILES[profileKey] || CATEGORY_PROFILES.generic;
  const samples = profile.samples || [];
  const used = new Set(existingItems.map(s => (s || '').trim().toLowerCase()).filter(Boolean));
  for (const s of samples) {
    if (!used.has(s.toLowerCase())) return s;
  }
  return 'Another option';
}

const PURPOSE_OPTIONS = [
  "Travel", "Buying a phone", "Buying a laptop", "Buying a car",
  "Choosing an AI model", "Choosing software", "Choosing a wearable",
  "Choosing a watch", "Research", "Just curious", "Other",
];

// Map profile keys to purpose option labels
const PROFILE_TO_PURPOSE = {
  travel: "Travel",
  phone: "Buying a phone",
  laptop: "Buying a laptop",
  car: "Buying a car",
  ev: "Buying a car",
  cloud: "Choosing software",
  database: "Choosing software",
  ai: "Choosing an AI model",
  agenticDev: "Choosing software",
  imageModel: "Choosing an AI model",
  app: "Choosing software",
  productivityNotes: "Choosing software",
  designTool: "Choosing software",
  wearable: "Choosing a wearable",
  smartRing: "Choosing a wearable",
  watch: "Choosing a watch",
  runningShoe: "Other",
  generic: null,
};
window.PROFILE_TO_PURPOSE = PROFILE_TO_PURPOSE;

window.SAMPLE_DATA = SAMPLE_DATA;
window.CATEGORY_PROFILES = CATEGORY_PROFILES;
window.detectProfile = detectProfile;
window.suggestNextItem = suggestNextItem;
window.PURPOSE_OPTIONS = PURPOSE_OPTIONS;
