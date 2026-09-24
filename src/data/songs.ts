// ─── Christmas Wonderland content ────────────────────────────────────────────
// Two albums, twenty real songs. Each song owns a scene in the winter village;
// locations glow as visitors listen.

export type Ambience = "fireplace" | "winter-wind" | "music-box";

export interface Song {
  id: string;
  title: string;
  album: 1 | 2;
  track: number;
  location: string; // village map location name
  sceneImage: string;
  audio: string; // the real recording
  duration: number; // seconds
  ambience: Ambience;
  mood: "warm" | "aurora" | "candle" | "night";
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
      "The Christmas songs we all grew up with — carols at the door, Silent Night by candlelight, Feliz Navidad in the kitchen — sung the way they sound at our house, plus one of our own: Be Like Brit Christmas.",
  },
  {
    id: "wonderland",
    num: 2,
    title: "Wonderland",
    subtitle: "Album Two — the larger magical world",
    cover: "/assets/scenes/album2-cover.jpg",
    description:
      "Eleven original songs — grace, charity, heartbreak and hope, from a gift with no name on it to Christmas in Haiti. The wider world the season opens onto, ending small: Let Mercy Keep It Small.",
  },
];

const A = "/assets/audio/songs";
const S = "/assets/scenes";

export const SONGS: Song[] = [
  // ── Album One · Home for Christmas ──────────────────────────────────────
  {
    id: "we-wish-you-a-merry-christmas",
    title: "We Wish You a Merry Christmas",
    album: 1,
    track: 1,
    location: "The Front Porch",
    sceneImage: `${S}/scene-front-porch.jpg`,
    audio: `${A}/we-wish-you-a-merry-christmas.mp3`,
    duration: 56,
    ambience: "winter-wind",
    mood: "warm",
    story:
      "The door opens, the cold comes in, and so does the singing. The record starts the way every December evening should — with voices on the porch and the light spilling out to meet them.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
  {
    id: "santa-claus-is-coming-to-town",
    title: "Santa Claus Is Coming to Town",
    album: 1,
    track: 2,
    location: "The Family House",
    sceneImage: `${S}/scene-christmas-morning.jpg`,
    audio: `${A}/santa-claus-is-coming-to-town.mp3`,
    duration: 77,
    ambience: "fireplace",
    mood: "warm",
    story:
      "For the kids who can't sleep on the 24th — and the parents who remember being them. You better watch out, but mostly you better hurry up and get to the tree.",
    palette: { from: "#2a1a12", to: "#0e1016" },
  },
  {
    id: "hallelujah",
    title: "Hallelujah",
    album: 1,
    track: 3,
    location: "The Chapel",
    sceneImage: `${S}/scene-chapel.jpg`,
    audio: `${A}/hallelujah.mp3`,
    duration: 269,
    ambience: "winter-wind",
    mood: "candle",
    story:
      "The quiet center of the record. One voice, a cold chapel, candles doing their small work — and the word rising anyway, the way it always has, broken and holy at the same time.",
    palette: { from: "#1c1712", to: "#0e1016" },
  },
  {
    id: "feliz-navidad",
    title: "Feliz Navidad",
    album: 1,
    track: 4,
    location: "The Kitchen",
    sceneImage: `${S}/scene-cookies-kitchen.jpg`,
    audio: `${A}/feliz-navidad.mp3`,
    duration: 103,
    ambience: "fireplace",
    mood: "warm",
    story:
      "Somebody turned the radio up in the kitchen and now it's a party. Flour on the counter, everyone singing the parts they know — which is all of them. From our house to yours.",
    palette: { from: "#2a1a12", to: "#0e1016" },
  },
  {
    id: "happy-christmas",
    title: "Happy Christmas",
    album: 1,
    track: 5,
    location: "The Giving Tree",
    sceneImage: `${S}/scene-giving-tree.jpg`,
    audio: `${A}/happy-christmas.mp3`,
    duration: 171,
    ambience: "music-box",
    mood: "warm",
    story:
      "A hopeful one, for the year we've had and the one we're asking for. Sung under the tree with the lights low — war is over if you want it, and tonight, in this room, it is.",
    palette: { from: "#14201a", to: "#0e1016" },
  },
  {
    id: "o-holy-night",
    title: "O Holy Night",
    album: 1,
    track: 6,
    location: "The Frozen Lake",
    sceneImage: `${S}/scene-northern-lights.jpg`,
    audio: `${A}/o-holy-night.mp3`,
    duration: 225,
    ambience: "winter-wind",
    mood: "aurora",
    story:
      "The big one — saved for a clear night and a sky that earns it. When the lights move over the frozen lake, this is the song the family goes quiet for. Fall on your knees.",
    palette: { from: "#101d2b", to: "#0e1016" },
  },
  {
    id: "silent-night",
    title: "Silent Night",
    album: 1,
    track: 7,
    location: "The Memory Garden",
    sceneImage: `${S}/scene-memory-garden.jpg`,
    audio: `${A}/silent-night.mp3`,
    duration: 116,
    ambience: "winter-wind",
    mood: "candle",
    story:
      "The last carol of Christmas Eve, sung in the garden where the lights stay on all winter. Some people aren't at the table anymore — this is how we still sing with them.",
    palette: { from: "#141a26", to: "#0e1016" },
  },
  {
    id: "the-first-noel",
    title: "The First Noel",
    album: 1,
    track: 8,
    location: "The Fireplace",
    sceneImage: `${S}/scene-fireplace.jpg`,
    audio: `${A}/the-first-noel.mp3`,
    duration: 115,
    ambience: "fireplace",
    mood: "candle",
    story:
      "An old song for the oldest part of the house — the hearth. Stockings, embers, and a melody that's been keeping winter out for two hundred years. It knows what it's doing.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
  {
    id: "be-like-brit-christmas",
    title: "Be Like Brit Christmas",
    album: 1,
    track: 9,
    location: "The Christmas Train",
    sceneImage: `${S}/scene-christmas-train.jpg`,
    audio: `${A}/be-like-brit-christmas.mp3`,
    duration: 268,
    ambience: "winter-wind",
    mood: "warm",
    story:
      "Our own song, and the heart of the whole record — being the light for somebody else, the way Brit was. If Christmas is a train, this is the car where everyone sings.",
    palette: { from: "#1a1d2e", to: "#0e1016" },
  },

  // ── Album Two · Wonderland ──────────────────────────────────────────────
  {
    id: "saving-december-for-you",
    title: "Saving December for You",
    album: 2,
    track: 1,
    location: "Letters to Santa",
    sceneImage: `${S}/scene-letters-santa.jpg`,
    audio: `${A}/saving-december-for-you.mp3`,
    duration: 232,
    ambience: "music-box",
    mood: "warm",
    story:
      "For someone who isn't here yet — the month kept warm on the sill like a lamp left on. Every December thing we did this year, we did it twice: once, and once to tell you about.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
  {
    id: "lights-and-that-grace",
    title: "Lights and that Grace",
    album: 2,
    track: 2,
    location: "The Front Porch",
    sceneImage: `${S}/scene-front-porch.jpg`,
    audio: `${A}/lights-and-that-grace.mp3`,
    duration: 250,
    ambience: "fireplace",
    mood: "warm",
    story:
      "The porch lights go up crooked every year and stay that way — that's the grace part. A song about being let in anyway, cold hands and all.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
  {
    id: "together-once-more",
    title: "Together Once More",
    album: 2,
    track: 3,
    location: "The Christmas Train",
    sceneImage: `${S}/scene-christmas-train.jpg`,
    audio: `${A}/together-once-more.mp3`,
    duration: 287,
    ambience: "winter-wind",
    mood: "warm",
    story:
      "Everyone is coming home — by train through the snow, windows glowing, one seat saved. The whole album was headed here: the door, the hug, the noise of all of us at once.",
    palette: { from: "#1a1d2e", to: "#0e1016" },
  },
  {
    id: "you-never-forgot-us",
    title: "You Never Forgot Us",
    album: 2,
    track: 4,
    location: "The Family House",
    sceneImage: `${S}/scene-christmas-morning.jpg`,
    audio: `${A}/you-never-forgot-us.mp3`,
    duration: 251,
    ambience: "fireplace",
    mood: "warm",
    story:
      "For the one who remembered every birthday, every recital, every small thing — year after year, without being asked. Some love is just faithfulness wearing a winter coat.",
    palette: { from: "#2a1a12", to: "#0e1016" },
  },
  {
    id: "no-name-on-it",
    title: "No Name on It",
    album: 2,
    track: 5,
    location: "The Giving Tree",
    sceneImage: `${S}/scene-giving-tree.jpg`,
    audio: `${A}/no-name-on-it.mp3`,
    duration: 230,
    ambience: "music-box",
    mood: "candle",
    story:
      "A gift appeared under the tree with no tag — food, a toy, a warm coat, exactly what was needed. The best presents in this family have never been signed.",
    palette: { from: "#14201a", to: "#0e1016" },
  },
  {
    id: "noel-en-haiti",
    title: "Noel en Haïti",
    album: 2,
    track: 6,
    location: "The Kitchen",
    sceneImage: `${S}/scene-cookies-kitchen.jpg`,
    audio: `${A}/noel-en-haiti.mp3`,
    duration: 268,
    ambience: "fireplace",
    mood: "warm",
    story:
      "Christmas where the snow never comes — fanal lanterns in the dark, music in the street, the table stretched for whoever arrives. For Brit, and for the children who taught us joy doesn't need winter.",
    palette: { from: "#2a1a12", to: "#0e1016" },
  },
  {
    id: "when-your-heart-breaks",
    title: "When Your Heart Breaks",
    album: 2,
    track: 7,
    location: "The Fireplace",
    sceneImage: `${S}/scene-fireplace.jpg`,
    audio: `${A}/when-your-heartbreaks.mp3`,
    duration: 243,
    ambience: "fireplace",
    mood: "candle",
    story:
      "Not every December is merry. This one is for the year the chair stays empty — sit by the fire, let it crackle, and know the house has room for your grief too.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
  {
    id: "never-alone",
    title: "Never Alone",
    album: 2,
    track: 8,
    location: "The Frozen Lake",
    sceneImage: `${S}/scene-northern-lights.jpg`,
    audio: `${A}/never-alone.mp3`,
    duration: 291,
    ambience: "winter-wind",
    mood: "aurora",
    story:
      "The sky over the frozen lake, doing its slow green dance. However far away someone is tonight — deployed, estranged, gone — the same lights are over them. You were never alone.",
    palette: { from: "#101d2b", to: "#0e1016" },
  },
  {
    id: "silent-grace",
    title: "Silent Grace",
    album: 2,
    track: 9,
    location: "The Chapel",
    sceneImage: `${S}/scene-chapel.jpg`,
    audio: `${A}/silent-grace.mp3`,
    duration: 266,
    ambience: "winter-wind",
    mood: "candle",
    story:
      "The chapel at midnight, empty and still, candles doing their small work. No choir, no sermon — just the kind of grace that arrives without making a sound.",
    palette: { from: "#1c1712", to: "#0e1016" },
  },
  {
    id: "love-is-still-watching",
    title: "Love Is Still Watching",
    album: 2,
    track: 10,
    location: "The Memory Garden",
    sceneImage: `${S}/scene-memory-garden.jpg`,
    audio: `${A}/love-is-still-watching.mp3`,
    duration: 237,
    ambience: "winter-wind",
    mood: "candle",
    story:
      "The garden where the lights stay on all winter, one for each person we carry. Grief, it turns out, is just love with nowhere to go — so we gave it somewhere: here, still watching.",
    palette: { from: "#141a26", to: "#0e1016" },
  },
  {
    id: "let-mercy-keep-it-small",
    title: "Let Mercy Keep It Small",
    album: 2,
    track: 11,
    location: "Letters to Santa",
    sceneImage: `${S}/scene-letters-santa.jpg`,
    audio: `${A}/let-mercy-keep-it-small.mp3`,
    duration: 284,
    ambience: "music-box",
    mood: "warm",
    story:
      "The closer, and the prayer of the whole record. No grand finale — a small house, a small light, a small mercy. Christmas isn't one perfect day; let it stay small enough to hold.",
    palette: { from: "#241a10", to: "#0e1016" },
  },
];

export const songById = (id: string) => SONGS.find((s) => s.id === id);
export const albumSongs = (num: 1 | 2) => SONGS.filter((s) => s.album === num);

// Village map: every location and the songs that live there
export const LOCATIONS = [
  "The Family House",
  "The Kitchen",
  "The Fireplace",
  "The Front Porch",
  "Letters to Santa",
  "The Chapel",
  "The Giving Tree",
  "The Christmas Train",
  "The Frozen Lake",
  "The Memory Garden",
] as const;

export const locationSongs = (location: string) =>
  SONGS.filter((s) => s.location === location);

export const REACTIONS = [
  { key: "loved", emoji: "❤️", label: "I Loved This" },
  { key: "hit-me", emoji: "🥹", label: "This Hit Me" },
  { key: "favorite", emoji: "🎄", label: "Christmas Favorite" },
  { key: "beautiful", emoji: "✨", label: "Beautiful" },
  { key: "remembered", emoji: "🕯️", label: "Reminded Me of Someone" },
] as const;

export type ReactionKey = (typeof REACTIONS)[number]["key"];
