/* ============================================================
 * EDIT ALL CONTENT IN THIS FILE ONLY
 * ============================================================
 * 1. RECIPIENT_NAME  -> her nickname
 * 2. STOPS           -> 28 journey stops (place + icon + photo + question)
 * 3. VOUCHERS        -> 8 gift vouchers
 * ============================================================ */

import photo01 from "@/assets/01.jpeg";
import photo02 from "@/assets/02.png";
import photo03 from "@/assets/03.jpeg";
import photo04 from "@/assets/04.jpeg";
import photo05 from "@/assets/05.jpeg";
import photo06 from "@/assets/06.jpeg";
import photo07 from "@/assets/07.jpeg";
import photo08 from "@/assets/08.jpeg";
import photo09 from "@/assets/09.jpeg";
import photo10 from "@/assets/10.jpeg";
import photo11 from "@/assets/11.jpeg";
import photo12 from "@/assets/12.jpeg";
import photo13 from "@/assets/13.jpeg";
import photo14 from "@/assets/14.jpeg";
import photo15 from "@/assets/15.jpeg";
import photo16 from "@/assets/16.jpeg";
import photo17 from "@/assets/17.jpeg";
import photo18 from "@/assets/18.jpeg";
import photo19 from "@/assets/19.jpeg";
import photo20 from "@/assets/20.jpeg";
import photo21 from "@/assets/21.jpeg";
import photo22 from "@/assets/22.jpg";
import photo23 from "@/assets/23.jpeg";
import photo24 from "@/assets/24.jpeg";
import photo25 from "@/assets/25.jpeg";
import photo26 from "@/assets/26.jpeg";
import photo27 from "@/assets/27.jpeg";
import photo28 from "@/assets/28.jpeg";

import flagSouthAmerica from "@/assets/flags/south-america.png";
import flagEngland from "@/assets/flags/england.png";
import flagScotland from "@/assets/flags/scotland.png";
import flagSingapore from "@/assets/flags/singapore.png";
import flagAustralia from "@/assets/flags/australia.png";
import flagJapan from "@/assets/flags/japan.png";
import flagMalaysia from "@/assets/flags/malaysia.png";
import flagThailand from "@/assets/flags/thailand.png";
import flagIndonesia from "@/assets/flags/indonesia.png";

/** Name shown in the titles */
export const RECIPIENT_NAME = "Aya";

/** Message on the welcome screen */
export const WELCOME_MESSAGE =
  "Happy birthday, Aya! I have built you a mini-Monopoly board of 28 memory that we have been through together. Answer each memory, and at the end of the road, eight gifts are waiting for you.";

/** Message after the last stop is completed */
export const FINISH_MESSAGE =
  "You made it through all 28 of our memories. Thank you for being the best travel companion I could ever ask for. Now, time to open your gifts.";

/** Message when every voucher has been scratched */
export const ALL_UNLOCKED_MESSAGE =
  "Every gift is open now. All of them are valid until 15 August 2027. I love you.";

/** Validity note shown on the rewards page */
export const VOUCHER_VALIDITY = "Valid until 15 August 2027";

/** Long closing letter shown after all vouchers are opened */
export const FINAL_MESSAGE =
  "Hi Aya,\n\nI know how much you love birthdays, and today of all days, it doesn't feel right that we're 11,700+ km apart.\n\nBut somewhere between every memory you've unlocked in this little game, and every voucher and gift waiting for you in Indonesia, there's one more thing I want to say. Something much simpler than all of that.\n\nThank you for being in my life.\n\nEvery journey with you has been the most beautiful gift I've ever received, and the strange thing is, it's not something I could ever buy, anywhere, for anyone.\n\nI love you. Not just the version of you sitting there reading this today, but every version of you I've had the privilege of falling in love with along the way. Here's to a year with more laughter, more adventures, and more moments that are simply, quietly ours.\n\nn.b.: You might notice the song playing in the background of this app. It's \"Fairy Tale\" by Michael Wong, one of the most loved Chinese ballads out there. The chorus is basically him promising to become the person's guardian angel from the fairy tales, wrapping his arms around her like wings, protecting her, and asking her to believe that their own happily-ever-after is real.\n\nHappy 18 (plus 10) birthday, Aya.\n\nWith all my heart, from across continents,\n\nGalih";

/** Background music file — put your file in the public folder with this name */
export const MUSIC_SRC = "/musik-latar.mp3";

export type Stop = {
  /** Place name as written on the Monopoly board */
  city: string;
  /** Icon representing the place (emoji) */
  icon: string;
  /** Optional flag/country image to show instead of the emoji icon */
  flag?: string;
  /** Memory photo — replace with your own image import */
  photo: string;
  /** Multiple choice question */
  question: string;
  /** Exactly 4 answer options */
  options: [string, string, string, string];
  /** Index (0-3) of the correct answer */
  correctIndex: 0 | 1 | 2 | 3;
  /** Story revealed after she answers */
  memory: string;
};

export const STOPS: Stop[] = [
  {
    city: "Earth",
    icon: "🌍",
    photo: photo01,
    question:
      "Career Ladder Time! If Aya is neither working in energy nor fashion, what is most likely to be her occupation?",
    options: ["Astronaut", "Diplomat", "Architect", "Chef"],
    correctIndex: 0,
    memory: "Somewhere between the sky and the stars — that is exactly where you belong.",
  },
  {
    city: "South America",
    icon: "🌎",
    flag: flagSouthAmerica,
    photo: photo02,
    question: "Where is the origin of the lilac preserved rose that you have in your room?",
    options: ["Colombia", "Peru", "Ecuador", "Brazil"],
    correctIndex: 2,
    memory: "A rose that never fades, just like this one.",
  },
  {
    city: "England",
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    flag: flagEngland,
    photo: photo03,
    question:
      "Country road … take me home … to the place … I belong … What is the name of the stand where we watched United on Boxing Day?",
    options: ["Stretford End", "Sir Alex Ferguson Stand", "Sir Bobby Charlton Stand", "East Stand"],
    correctIndex: 1,
    memory: "Old Trafford on Boxing Day, singing until our voices were gone.",
  },
  {
    city: "England",
    icon: "⚽",
    photo: photo04,
    question: "… and who was the scorer on the day we watched United back in December?",
    options: ["Bruno Fernandes", "Matheus Cunha", "Patrick Dorgu", "Joshua Zirkzee"],
    correctIndex: 2,
    memory: "The whole stand erupted, and you jumped higher than anyone.",
  },
  {
    city: "England",
    icon: "🫖",
    photo: photo05,
    question:
      "We were in York. You really wanted to try this place, but I was not confident because we had no reservation. Somehow we made it in — and there was a Surabaya family beside our table.",
    options: ["Betty's Tea Room", "The Ivy York", "Brew & Brownie", "Grays Court"],
    correctIndex: 0,
    memory: "Tea, cake, and the smallest miracle: a free table.",
  },
  {
    city: "Scotland",
    icon: "🏔️",
    flag: flagScotland,
    photo: photo06,
    question:
      "Snowfall! What is the name of the restaurant across the street where we experienced our first snowfall together?",
    options: ["Dishoom", "Landy's", "The Piper", "Howies"],
    correctIndex: 1,
    memory: "Our very first snow together — We were freezing, but happy.",
  },
  {
    city: "Lake",
    icon: "🦢",
    photo: photo07,
    question: "What is the place where we (finally) found the real black swan?",
    options: ["Hyde Park", "Regent's Park", "St. James Park", "Greenwich Park"],
    correctIndex: 2,
    memory: "We walked forever, and there it was, calm as anything.",
  },
  {
    city: "Singapore",
    icon: "🇸🇬",
    photo: photo08,
    question: "Taylor Swift's special song back on the day we watched her concert?",
    options: [
      "\"Mine\" mashed up with \"Starlight\"",
      "\"Cornelia Street\" mashed up with \"Maroon\"",
      "\"Holy Ground\" mashed up with \"Red\"",
      "\"The Best Day\" mashed up with \"Never Grow Up\"",
    ],
    correctIndex: 0,
    memory: "The whole stadium glowing, and you singing every single word.",
  },
  {
    city: "Singapore",
    icon: "🎹",
    flag: flagSingapore,
    photo: photo09,
    question: "And … what was Taylor's second surprise song (piano)?",
    options: [
      "\"This Love\" mashed up with \"Clean\"",
      "\"I Don't Wanna Live Forever\" mashed up with \"Dress\"",
      "\"Sad Beautiful Tragic\" mashed up with \"The Great War\"",
      "\"Better Man\" mashed up with \"Happiness\"",
    ],
    correctIndex: 1,
    memory: "The piano set – yet you are still standing all the time.",
  },
  {
    city: "Singapore",
    icon: "🍸",
    photo: photo10,
    question:
      "We were stuck on Orchard Road in the middle of the night. Then we found this place, which turned out to be one of the most interesting experiences. What is its name?",
    options: ["Atlas Bar", "The Other Room", "Manhattan", "28 HongKong Street"],
    correctIndex: 1,
    memory: "Getting stranded turned into one of our favourite nights.",
  },
  {
    city: "Singapore",
    icon: "🧸",
    photo: photo11,
    question: "Your favourite pillow doll?",
    options: ["Stitch", "Totoro", "Toothless", "Pusheen"],
    correctIndex: 2,
    memory: "He has been guarding you when you fell asleep in the car ever since.",
  },
  {
    city: "Singapore",
    icon: "🎆",
    photo: photo12,
    question:
      "We were there exactly when Singapore was celebrating their national day, looking for a spot to watch the fireworks. Singapore was celebrating their … year of independence.",
    options: ["50", "55", "58", "60"],
    correctIndex: 3,
    memory: "Fireworks over the bay, and you in front of all of them.",
  },
  {
    city: "Australia",
    icon: "📸",
    flag: flagAustralia,
    photo: photo13,
    question: "You love the photo that he took so much. Do you remember his name?",
    options: ["John", "James", "Jack", "Josh"],
    correctIndex: 0,
    memory: "One stranger, One Photo albums, and memories that we kept forever.",
  },
  {
    city: "Australia",
    icon: "☕",
    photo: photo14,
    question:
      "This is the first coffee that you liked. Yes, it was a Flat White, and you loved the cannelé as well, in the city you admire so much.",
    options: ["Patricia", "Market Lane", "Proud Mary", "Seven Seeds"],
    correctIndex: 0,
    memory: "The tiny standing-room coffee bar that made you choice coffee over matcha.",
  },
  {
    city: "Australia",
    icon: "🌌",
    photo: photo15,
    question: "We were there. One of your dreams. But it became the one that got away. What is it?",
    options: ["Whale watching", "Aurora", "Skydiving", "Hot air balloon"],
    correctIndex: 1,
    memory: "One night after we went there, the aurora australis show up. So, let’s chase it again next time!",
  },
  {
    city: "Australia",
    icon: "🍇",
    photo: photo16,
    question: "The place that is full of grapes!",
    options: ["Barossa Valley", "Hunter Valley", "Yarra Valley", "Margaret River"],
    correctIndex: 2,
    memory: "Crème de la crème red and white wine, with a very slow, perfect afternoon.",
  },
  {
    city: "Japan",
    icon: "⚡",
    flag: flagJapan,
    photo: photo17,
    question: "What could make us queue under the sun when we were in USJ?",
    options: ["Mario Kart", "Pikachu", "Harry Potter", "Jaws"],
    correctIndex: 1,
    memory: "You queued in the heat without a single complaint. Worth it.",
  },
  {
    city: "Japan",
    icon: "🎤",
    photo: photo18,
    question:
      "We went to a Coldplay concert. Who was the opener? Hint: it is not Sabrina Carpenter (she was TayTay's opener).",
    options: ["Yoasobi", "Aimer", "Perfume", "Official HIGE DANdism"],
    correctIndex: 0,
    memory: "Lights on our wrists, both of us completely lost in the music.",
  },
  {
    city: "Japan",
    icon: "🎀",
    photo: photo19,
    question: "What is the colour of the Minnie headband that you wore in USJ?",
    options: ["Pink", "Red", "Grey", "Black"],
    correctIndex: 2,
    memory: "You wore it all day and looked unfairly cute.",
  },
  {
    city: "Japan",
    icon: "🥩",
    photo: photo20,
    question:
      "This restaurant should have been very crowded. But we came at the perfect time. It is located in Ginza.",
    options: ["Ichiran", "Gyukatsu Motomura", "Kyubey", "Sushi Zanmai"],
    correctIndex: 1,
    memory: "No queue, hot stones, and the best beef of the trip.",
  },
  {
    city: "Malaysia",
    icon: "🍲",
    flag: flagMalaysia,
    photo: photo21,
    question: "The restaurant where we ate was filled with many Batak people.",
    options: ["Wanjo", "Nelayan", "Sari Ratu", "Bopet Mustafa"],
    correctIndex: 0,
    memory: "It felt like home, just a few hundred kilometres away.",
  },
  {
    city: "Malaysia",
    icon: "✈️",
    photo: photo22,
    question: "We were stuck at midnight waiting for the airplane. Which airline were we waiting for?",
    options: ["AirAsia", "Malaysia Airlines", "Batik Air", "Scoot"],
    correctIndex: 2,
    memory: "Successfully made us trauma of transit in KL.",
  },
  {
    city: "Thailand",
    icon: "🛍️",
    flag: flagThailand,
    photo: photo23,
    question:
      "We bought a huge bag; you also bought the trousers that are currently so popular in Blok M.",
    options: ["Chatuchak", "Pratunam", "Asiatique", "Talad Rot Fai"],
    correctIndex: 0,
    memory: "We walked that market until our legs gave up.",
  },
  {
    city: "Thailand",
    icon: "🛺",
    photo: photo24,
    question: "What did we ride in Thailand to go back after dinner?",
    options: ["Grab", "Tuktuk", "BTS Skytrain", "Motorbike taxi"],
    correctIndex: 1,
    memory: "Wind in your hair, both of us laughing the whole ride.",
  },
  {
    city: "Indonesia",
    icon: "🌋",
    flag: flagIndonesia,
    photo: photo25,
    question: "What characters did we meet back in our time in Bromo?",
    options: ["Minions", "Teletubbies", "Doraemon", "Upin & Ipin"],
    correctIndex: 1,
    memory: "Freezing in the morning + extremely hot in the afternoon.",
  },
  {
    city: "Indonesia",
    icon: "🌅",
    photo: photo26,
    question:
      "We successfully re-created our dinner here before the restaurant closed. Hint: Bali.",
    options: ["La Lucciola", "Mozaic", "St. Tropez", "Bambu"],
    correctIndex: 2,
    memory: "Last table, last order, and one of our best dinners.",
  },
  {
    city: "Indonesia",
    icon: "☕",
    photo: photo27,
    question: "It was the first time I met so many of your friends! Where was it? Hint: cafe.",
    options: ["Kina", "Tanamera", "Kopi Kalyan", "Djournal"],
    correctIndex: 0,
    memory: "I was nervous, and you made it feel easy.",
  },
  {
    city: "Earth",
    icon: "🎂",
    photo: photo28,
    question:
      "Today, you are turning to the new chapter of your life. May you live your life to the fullest. What is your current age?",
    options: ["18", "21", "18 (plus 10)", "almost 30"],
    correctIndex: 2,
    memory: "A brand new chapter — and I get to read it with you.",
  },
];

export type Voucher = {
  emoji: string;
  title: string;
  description: string;
};

export const VOUCHERS: Voucher[] = [
  {
    emoji: "🎠",
    title: "Carousel Horse Music Box",
    description:
      "Handcrafted from real wood in a kiosk in Tianjin, China. The song inside is Fairy Tale by Michael Wong — because even if life is not a fairy tale, we can still choose our own ending.",
  },
  {
    emoji: "📚",
    title: "Untuk Apa Menikah? Untuk Apa Keluarga",
    description:
      "Written by Rani Anggraeni Dewi, a well-known marriage counselor in Indonesia. At this stage of life, I think we really need this reflection.",
  },
  {
    emoji: "💆",
    title: "Spa days!",
    description:
      "Free spa treatment days after your long time no see to a spa in the Global North countries.",
  },
  {
    emoji: "🍣",
    title: "Sushi week!",
    description: "Unlimited sushi for one week — a different sushi restaurant every day!",
  },
  {
    emoji: "🚗",
    title: "Car drive lesson month!",
    description:
      "Get familiar with driving in Indonesia with a free one month lesson. After that, you can drive the car by yourself!",
  },
  {
    emoji: "✈️",
    title: "Trip!",
    description: "\nGet free trip to your selected place!\n\nNotes: I’ve bought Trader’s Joe tote bag for you so we can bring a lot of stuff in one bag when we are strolling down the city street.",
  },
  {
    emoji: "🌱",
    title: "Give back to others!",
    description:
      "As climate change graduates, let's give back your knowledge or take action for society and the environment, for a greater good.",
  },
  {
    emoji: "👜",
    title: "Bag!",
    description:
      "Choose your desired bag and I will check it out for you upon your arrival in Indonesia.",
  },
];
