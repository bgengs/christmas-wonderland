// ─── Christmas Wonderland content ────────────────────────────────────────────
// Two albums, ten songs. Each song owns a visual scene, a story, original
// lyrics, and an original generative music-box arrangement (melody + chords,
// in MIDI note numbers) rendered live by the audio engine.

export type Ambience = "fireplace" | "winter-wind" | "music-box";

export interface Song {
  id: string;
  title: string;
  album: 1 | 2;
  track: number;
  location: string; // village map location name
  sceneImage: string;
  ambience: Ambience;
  mood: "warm" | "aurora" | "candle" | "night";
  tempo: number; // bpm
  melody: [number, number][]; // [midi, beats]
  chords: number[][]; // one triad per measure
  lyrics: string[];
  story: string;
  palette: { from: string; to: string };
}

export interface Album {
  id: string;
  num: 1 | 2;
  title: string;
  subtitle: string;
  cover: string;
  description: string;
}

export const ALBUMS: Album[] = [
  {
    id: "home-for-christmas",
    num: 1,
    title: "Home for Christmas",
    subtitle: "Album One — the warm, nostalgic record",
    cover: "/assets/scenes/album1-cover.jpg",
    description:
      "Fireplaces, family, childhood memories. Snow-covered houses, Christmas morning, old photographs, handwritten cards and candles — the traditional holiday warmth of home.",
  },
  {
    id: "wonderland",
    num: 2,
    title: "Wonderland",
    subtitle: "Album Two — the larger magical world",
    cover: "/assets/scenes/album2-cover.jpg",
    description:
      "Glowing winter villages, Northern Lights, enormous Christmas trees, trains in the snow. Fantasy lights, charity, hope and remembrance — cinematic Christmas wonder.",
  },
];

// MIDI helpers (kept as literals below for clarity): C4=60 D4=62 E4=64 F4=65
// G4=67 A4=69 B4=71 C5=72 D5=74 E5=76 G5=79 | A3=57 Bb4=70 D3=50 F3=53 G3=55

export const SONGS: Song[] = [
  {
    id: "christmas-morning",
    title: "Christmas Morning at Home",
    album: 1,
    track: 1,
    location: "The Family House",
    sceneImage: "/assets/scenes/scene-christmas-morning.jpg",
    ambience: "fireplace",
    mood: "warm",
    tempo: 92,
    melody: [
      [72, 1], [71, 0.5], [72, 0.5], [74, 1], [72, 1], [67, 1], [69, 2],
      [69, 1], [67, 0.5], [69, 0.5], [71, 1], [72, 2], [76, 1], [74, 1],
      [74, 1], [72, 0.5], [74, 0.5], [76, 1], [74, 1], [72, 2], [71, 1], [69, 1],
      [67, 2], [69, 1], [71, 1], [72, 3],
    ],
    chords: [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67]],
    lyrics: [
      "Stockings hanging in the early light,",
      "little feet on the stairs before it's bright,",
      "paper ribbons like a scattered choir —",
      "and every gift is glowing by the fire.",
      "",
      "Christmas morning, stay a little longer,",
      "let the coffee cool, let the wonder wander,",
      "all I ever need is gathered here —",
      "your sleepy voices ringing in the year.",
    ],
    story:
      "Written on the living room floor, between torn wrapping paper and two kids who woke up at 5 a.m. It's about the hour you wish you could bottle — before the day becomes a memory.",
    palette: { from: "#2a1a12", to: "#0e1016" },
  },
  {
    id: "cookies-in-the-kitchen",
    title: "Cookies in the Kitchen",
    album: 1,
    track: 2,
    location: "The Kitchen",
    sceneImage: "/assets/scenes/scene-cookies-kitchen.jpg",
    ambience: "fireplace",
    mood: "warm",
    tempo: 108,
    melody: [
      [69, 0.5], [72, 0.5], [74, 0.5], [72, 0.5], [69, 1], [67, 1],
      [69, 0.5], [70, 0.5], [72, 1], [74, 1], [72, 2],
      [77, 1], [76, 0.5], [74, 0.5], [72, 1], [74, 1], [70, 2],
      [69, 0.5], [70, 0.5], [72, 0.5], [74, 0.5], [76, 1], [77, 1], [76, 1], [74, 0.5], [72, 0.5], [72, 2],
    ],
    chords: [[65, 69, 72], [70, 74, 77], [67, 71, 74], [65, 69, 72]],
    lyrics: [
      "Flour on the counter, flour on the floor,",
      "flour on your nose — and somehow on the door,",
      "stars and bells and gingerbread men,",
      "we'll bake the first batch, then we'll bake again.",
      "",
      "Sugar in the air, carols on the radio,",
      "burn the edges, baby, that's the way it goes,",
      "half the dough is missing — I won't ask where,",
      "the best ones never make it to the tin to share.",
    ],
    story:
      "A song for the beautiful chaos of December baking — the kind where the recipe is a suggestion and the kids are the head chefs. Recorded with actual wooden-spoon percussion from our kitchen.",
    palette: { from: "#2b1c10", to: "#0e1016" },
  },
  {
    id: "the-fireplace-song",
    title: "The Fireplace Song",
    album: 1,
    track: 3,
    location: "The Hearth",
    sceneImage: "/assets/scenes/scene-fireplace.jpg",
    ambience: "fireplace",
    mood: "candle",
    tempo: 72,
    melody: [
      [67, 1.5], [69, 0.5], [71, 2], [74, 1], [71, 1],
      [72, 1.5], [71, 0.5], [69, 2], [67, 2],
      [69, 1], [71, 1], [72, 1], [74, 1], [76, 2],
      [74, 1], [71, 1], [69, 1], [67, 3],
    ],
    chords: [[55, 62, 67], [60, 64, 67], [55, 62, 71], [55, 62, 67]],
    lyrics: [
      "Come sit where the embers keep their glow,",
      "the world can wait out in the snow,",
      "your head on my shoulder, the dog at our feet,",
      "this is the warmest hour of the week.",
      "",
      "And if the year was heavy, lay it down,",
      "the fire knows how to melt a frown,",
      "we don't need presents, we don't need things —",
      "just this old song the fireplace sings.",
    ],
    story:
      "The last song written for the first album, on the night the tree finally went up. It's the sound of the whole family in one room, doing nothing at all — which turns out to be everything.",
    palette: { from: "#241109", to: "#0e1016" },
  },
  {
    id: "letters-to-santa",
    title: "Letters to Santa",
    album: 1,
    track: 4,
    location: "Santa's Mailroom",
    sceneImage: "/assets/scenes/scene-letters-santa.jpg",
    ambience: "music-box",
    mood: "candle",
    tempo: 84,
    melody: [
      [74, 1], [72, 0.5], [69, 0.5], [67, 1], [69, 2],
      [72, 1], [74, 0.5], [76, 0.5], [74, 1], [72, 2],
      [69, 1], [72, 1], [74, 1], [76, 1], [79, 2],
      [76, 0.5], [74, 0.5], [72, 1], [74, 3],
    ],
    chords: [[62, 66, 69], [67, 71, 74], [64, 69, 72], [62, 66, 69]],
    lyrics: [
      "Dear Santa, I've been good — well, mostly good,",
      "I'd clean my room more often if I could,",
      "my brother wants a rocket, I want snow,",
      "and one more thing you maybe ought to know:",
      "",
      "Bring something extra for the house next door,",
      "their lights went out a little this year,",
      "I've got enough — I checked my shelf —",
      "leave my share with somebody else.",
    ],
    story:
      "Found folded inside a crayon box: a real letter asking Santa to skip our house and visit the neighbors instead. Some songs write themselves. This one was already written — we just gave it a melody.",
    palette: { from: "#26180e", to: "#0e1016" },
  },
  {
    id: "front-porch-lights",
    title: "Front Porch Lights",
    album: 1,
    track: 5,
    location: "The Porch",
    sceneImage: "/assets/scenes/scene-front-porch.jpg",
    ambience: "winter-wind",
    mood: "night",
    tempo: 88,
    melody: [
      [67, 1], [72, 1], [71, 0.5], [67, 0.5], [69, 2],
      [64, 1], [67, 1], [69, 0.5], [72, 0.5], [71, 2],
      [72, 1], [74, 1], [76, 1], [74, 1], [72, 2],
      [71, 0.5], [69, 0.5], [67, 1], [64, 3],
    ],
    chords: [[60, 64, 67], [65, 69, 72], [62, 67, 71], [60, 64, 67]],
    lyrics: [
      "The porch lights hum against the blue,",
      "the yard is wearing white brand-new,",
      "sleds lean tired by the door,",
      "small boots scattered on the floor.",
      "",
      "And I stand here in the in-between,",
      "where the house is warm and the night is clean,",
      "grateful for the glowing thread —",
      "every light we strung is something said.",
    ],
    story:
      "Every family has that moment on the porch — one last look at the snow before going back inside. This closes the first album the way dusk closes the day: quietly, with all the lights on.",
    palette: { from: "#141b2e", to: "#0e1016" },
  },
  {
    id: "northern-lights",
    title: "Northern Lights",
    album: 2,
    track: 1,
    location: "Frozen Lake",
    sceneImage: "/assets/scenes/scene-northern-lights.jpg",
    ambience: "winter-wind",
    mood: "aurora",
    tempo: 76,
    melody: [
      [69, 2], [72, 1], [76, 1], [74, 2], [72, 1], [69, 1],
      [71, 2], [74, 1], [79, 1], [76, 2],
      [72, 1], [76, 1], [74, 1], [72, 1], [71, 2],
      [69, 1], [67, 1], [69, 4],
    ],
    chords: [[57, 64, 69], [65, 69, 72], [60, 64, 67], [57, 64, 69]],
    lyrics: [
      "The lake is glass, the sky is wide,",
      "green ribbons on the winter tide,",
      "skates carve silver, lanterns swing,",
      "the whole cold world begins to sing.",
      "",
      "And if heaven has a doorway,",
      "I think it opens here —",
      "where the ice holds all the starlight",
      "and the dark holds nothing to fear.",
    ],
    story:
      "The opening door to the second album. We drove four hours north so the kids could see the aurora once. My daughter whispered 'the sky is breathing' — and that became the whole song.",
    palette: { from: "#0d1f1c", to: "#0e1016" },
  },
  {
    id: "the-christmas-train",
    title: "The Christmas Train",
    album: 2,
    track: 2,
    location: "Christmas Train Station",
    sceneImage: "/assets/scenes/scene-christmas-train.jpg",
    ambience: "winter-wind",
    mood: "night",
    tempo: 116,
    melody: [
      [67, 0.5], [67, 0.5], [71, 0.5], [74, 0.5], [76, 1], [74, 0.5], [71, 0.5],
      [72, 0.5], [72, 0.5], [74, 0.5], [76, 0.5], [79, 1], [76, 1],
      [74, 0.5], [76, 0.5], [74, 0.5], [72, 0.5], [71, 1], [69, 1],
      [67, 0.5], [69, 0.5], [71, 0.5], [72, 0.5], [74, 2],
    ],
    chords: [[55, 62, 67], [60, 64, 67], [62, 66, 69], [55, 62, 67]],
    lyrics: [
      "All aboard where the steam meets the snow,",
      "golden windows in a row,",
      "press your nose against the glass,",
      "watch the sleeping villages pass.",
      "",
      "Clickety-clack through the pines so deep,",
      "a train full of secrets the children keep,",
      "every whistle, every spark —",
      "Christmas moving through the dark.",
    ],
    story:
      "For every kid who has ever pressed their face to a cold train window. The rhythm is a real steam engine we recorded at the heritage railway — the melody just climbed aboard.",
    palette: { from: "#101728", to: "#0e1016" },
  },
  {
    id: "candlelight-chapel",
    title: "Candlelight Chapel",
    album: 2,
    track: 3,
    location: "Christmas Chapel",
    sceneImage: "/assets/scenes/scene-chapel.jpg",
    ambience: "music-box",
    mood: "candle",
    tempo: 66,
    melody: [
      [62, 2], [65, 1], [69, 1], [67, 2], [65, 1], [62, 1],
      [64, 2], [67, 1], [72, 1], [69, 2],
      [65, 1], [69, 1], [72, 1], [74, 1], [72, 2],
      [69, 1], [67, 1], [62, 4],
    ],
    chords: [[50, 57, 62], [53, 60, 65], [57, 64, 69], [50, 57, 62]],
    lyrics: [
      "One flame passed hand to hand,",
      "a hundred small suns in the stand,",
      "stone walls holding ancient sound,",
      "and not one candle burning down.",
      "",
      "Sing soft, sing low, sing clear,",
      "the holiest night of the year,",
      "whatever you believe, believe this true —",
      "the light was made to carry you.",
    ],
    story:
      "Christmas Eve, 11 p.m., a chapel older than the town around it. This is the quiet center of the record — one candle becoming a hundred, and nobody wanting to be the first to leave.",
    palette: { from: "#221410", to: "#0e1016" },
  },
  {
    id: "the-giving-tree",
    title: "The Giving Tree",
    album: 2,
    track: 4,
    location: "The Giving Tree",
    sceneImage: "/assets/scenes/scene-giving-tree.jpg",
    ambience: "winter-wind",
    mood: "aurora",
    tempo: 96,
    melody: [
      [70, 1], [72, 0.5], [74, 0.5], [77, 1], [74, 1], [72, 2],
      [74, 1], [77, 0.5], [76, 0.5], [74, 1], [72, 1], [70, 2],
      [72, 0.5], [74, 0.5], [76, 0.5], [77, 0.5], [79, 2], [77, 1], [74, 1],
      [72, 1], [70, 1], [74, 3],
    ],
    chords: [[58, 65, 70], [63, 70, 74], [65, 69, 72], [58, 65, 70]],
    lyrics: [
      "Nobody saw who left them there,",
      "boxes by the village square,",
      "mittens, coats, a wooden sleigh,",
      "gifts that never say a name.",
      "",
      "The tree glows brighter every year,",
      "lit by hands we never see,",
      "kindness doesn't sign its card —",
      "it just leaves light in the yard.",
    ],
    story:
      "Inspired by a real town where strangers secretly leave gifts under the square's great tree for families having a hard year. Nobody knows who. Nobody asks. That's the whole miracle.",
    palette: { from: "#122018", to: "#0e1016" },
  },
  {
    id: "memory-garden",
    title: "Memory Garden",
    album: 2,
    track: 5,
    location: "Memory Garden",
    sceneImage: "/assets/scenes/scene-memory-garden.jpg",
    ambience: "music-box",
    mood: "candle",
    tempo: 62,
    melody: [
      [69, 2], [67, 1], [64, 1], [69, 2], [72, 2],
      [71, 1], [69, 1], [67, 2], [64, 2],
      [69, 1], [72, 1], [76, 2], [74, 1], [72, 1],
      [71, 2], [69, 4],
    ],
    chords: [[57, 64, 69], [53, 60, 65], [60, 64, 67], [57, 64, 69]],
    lyrics: [
      "We hang a lantern in the tree,",
      "for the chair that's empty now,",
      "and the garden fills with golden names",
      "of the ones who showed us how.",
      "",
      "You are not gone, you are not far,",
      "you're the brightest winter star,",
      "every Christmas, every year —",
      "we save a light for you right here.",
    ],
    story:
      "The closing song, for everyone missing someone at the table this year. We wanted the album to end the way grief actually feels at Christmas — not gloomy, just honest, and quietly full of light.",
    palette: { from: "#1c1622", to: "#0e1016" },
  },
];

export const songById = (id: string) => SONGS.find((s) => s.id === id);
export const albumSongs = (num: 1 | 2) => SONGS.filter((s) => s.album === num);

export const REACTIONS = [
  { key: "loved", emoji: "❤️", label: "I Loved This" },
  { key: "hit-me", emoji: "🥹", label: "This Hit Me" },
  { key: "favorite", emoji: "🎄", label: "Christmas Favorite" },
  { key: "beautiful", emoji: "✨", label: "Beautiful" },
  { key: "remembered", emoji: "🕯️", label: "Reminded Me of Someone" },
] as const;

export type ReactionKey = (typeof REACTIONS)[number]["key"];
