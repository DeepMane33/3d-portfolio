export const stats = [
  { label: "projects archived", value: 12, suffix: "" },
  { label: "videos edited", value: 40, suffix: "+" },
  { label: "anime completed", value: 100, suffix: "+" },
  { label: "japanese learning", value: 220, suffix: " days" },
];

export const interests = [
  {
    id: "anime",
    tag: "01",
    title: "anime",
    glyph: "アニメ",
    body: "Honestly, i watch way too much anime but it genuinely shaped how i look at storytelling and life. nothing beats a story that takes its time and pays off 50 episodes later.",
    accent: "#8b7cff",
  },
  {
    id: "technology",
    tag: "02",
    title: "technology",
    glyph: "技術",
    body: "I just love figuring out how things actually work under the hood. from modern gpus to old school tech, deep-diving into hardware and os designs.",
    accent: "#7cf5d5",
  },
  {
    id: "ai",
    tag: "03",
    title: "artificial intelligence",
    glyph: "人工知能",
    body: "Ai is moving crazy fast rn. i like building things with it — chatbots, memory systems, stuff that actually feels useful instead of just another wrapper.",
    accent: "#5ec8ff",
  },
  {
    id: "uiux",
    tag: "04",
    title: "ui/ux design",
    glyph: "設計",
    body: "I legit hate software that feels lifeless. a good design is about how a page moves and how the typography feels — every click should feel like something you want to touch.",
    accent: "#ff7a59",
  },
  {
    id: "japanese",
    tag: "05",
    title: "japanese language",
    glyph: "日本語",
    body: "Trying to learn japanese one kanji at a time because i want to read raw manga panels without subtitles. it's brutal but it's a different way of thinking.",
    accent: "#ff5f9e",
  },
  {
    id: "video",
    tag: "06",
    title: "video editing",
    glyph: "編集",
    body: "Editing is perfect clips with the right sound. adding crazy shakes and grading colors until a random clip looks cinematic — one of the most satisfying feelings ever.",
    accent: "#ffd166",
  },
  {
    id: "football",
    tag: "07",
    title: "football",
    glyph: "蹴球",
    body: "There's something about football that no other sport captures — the raw emotion, the last minute goals, the way an entire stadium holds its breath. Ronaldo is my favourite player: pure dedication, obsession with being better every single day.",
    accent: "#9fe870",
  },
];

export const identities = [
  {
    key: "developer",
    label: "the developer",
    kana: "開発者",
    lines: [
      "Built Nero AI — an AI chat app with multiple specialized models, you pick what you want to do and it routes to the best one. took way longer than i expected but it works pretty well now.",
      "Also made the BMW Showcase — a 3D product page with scroll animations, spent too many hours making the lighting look right but i'm happy with how it turned out.",
    ],
    chips: ["Next.js", "TypeScript", "R3F", "Vercel AI", "Tailwind"],
    accent: "#7cf5d5",
  },
  {
    key: "guitarist",
    label: "the guitarist",
    kana: "ギター",
    lines: [
      "Have been learning the rhythm of guitar for more than 6 months and still far from the rhythm that makes a person the freest of them all. when a person masters an instrument they can produce what they feel — that's what makes someone liberated.",
      "That's how i wanna be when i grow with the skill of using a guitar as my liberation instrument.",
    ],
    chips: ["Fender Player Plus Strat HSS", "Boss GT-1000 Core", "Fender Blues Junior IV"],
    accent: "#ff7a59",
  },
  {
    key: "anime",
    label: "the anime enthusiast",
    kana: "オタク",
    lines: [
      "100+ series completed, but numbers don't capture it — anime taught me pacing, visual storytelling, and why \u201cthe journey matters more than the destination\u201d applies to code as much as narrative.",
      "One Piece especially changed how i see things. Luffy doesn't chase the One Piece for the treasure — he chases absolute freedom. they fail, they lose, they get separated, and they keep sailing. that's the mindset i bring to everything i build.",
    ],
    chips: ["01 — Frieren", "02 — Attack on Titan", "03 — One Piece", "04 — Berserk"],
    accent: "#8b7cff",
  },
];

export const projects = [
  {
    num: "01",
    name: "NERO AI",
    stack: "Next.js / TypeScript / Vercel AI",
    body: "So basically i got tired of using chatgpt and wanted something that actually does what i need. built nero with 7 different ai brains — one for coding, one for research, one for creative stuff. you tell it what you want and it picks the best brain for the job. it also has voice mode with different voices and remembers what you talked about before.",
    accent: "#7cf5d5",
    shape: "torus",
  },
  {
    num: "02",
    name: "CYBERTRON OS",
    stack: "Vanilla JS / CSS",
    body: "Always wanted to build a desktop os and since i can't make a real one, i made a web version inspired by transformers. it has actual window management, a dock with animations, and like 6 different apps you can open. there's a boot animation that plays when you load it — spent way too many hours on that part.",
    accent: "#8b7cff",
    shape: "box",
  },
  {
    num: "03",
    name: "THREAD CRAWLER",
    stack: "Phaser.js / TypeScript / Devvit",
    body: "Every reddit thread becomes a dungeon in a roguelike game. the title and post become the layout, and the comments make it harder or give you loot. made this for a devvit hackathon in like a week — it's actually playable and kinda addictive ngl. the more popular a thread is, the crazier the dungeon gets.",
    accent: "#ff7a59",
    shape: "knot",
  },
];

export const navLinks = [
  { id: "hero", label: "index" },
  { id: "interests", label: "interests" },
  { id: "identity", label: "identity" },
  { id: "work", label: "work" },
  { id: "contact", label: "contact" },
];
