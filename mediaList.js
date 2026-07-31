/**
 * mediaList.js — Personal config & media list
 * Add new photos: drop file in img/ + one line in PHOTOS
 */

const SITE_CONFIG = {
  yourName: "Hitesh",
  herName: "Radhika",
  startDate: "2025-07-30", // ~1 year 2 days before Aug 1, 2026
  girlfriendDayHeadline: "Happy Girlfriend Day, Radhika!",
  heroTagline: "Tu meri duniya ka sabse khoobsurat hissa hai",
  heroSubline: "Ek saal se zyada ho gaye — aur har din aur special lagta hai",
  mahadevLine: "Har Har Mahadev — meri dua hai tu hamesha khush rahe",
  closingMessage: "Tu meri zindagi ki sabse khoobsurat kahani hai. Forever yours.",
  closingJoke: "P.S. — Haan haan, pata hai kuch photos blurry hain aur kuch screenshots aise hain jaise phone ne neend mein liye ho... par tu unme bhi cute lagti hai. Photographer fail, model pass. 😂",
  youtubeVideoId: "cYOB941gyXI", // Hawayein - Jab Harry Met Sejal
  youtubeSongTitle: "Hawayein",
  heroImage: "img/IMG20260629101348.jpg",
};

const PHOTOS = [
  { file: "img/IMG20260629101348.jpg", caption: "Pehli yaad jab hum saath the..." },
  { file: "img/IMG20260629101349.jpg", caption: "Teri smile ne dil chura liya" },
  { file: "img/IMG20260629101350.jpg", caption: "Hum dono — perfect match" },
  { file: "img/Screenshot_2026-02-15-14-07-32-61_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "February ki yaadein" },
  { file: "img/Screenshot_2026-03-03-08-56-34-54_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Subah subah teri photo" },
  { file: "img/Screenshot_2026-03-03-13-16-52-10_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "March ki khushiyaan" },
  { file: "img/Screenshot_2026-03-03-13-16-52-95_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu kitni pretty lag rahi thi" },
  { file: "img/Screenshot_2026-03-03-13-16-53-84_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Meri favourite moment" },
  { file: "img/Screenshot_2026-03-03-13-16-55-11_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Saath mein time best lagta hai" },
  { file: "img/Screenshot_2026-03-03-13-16-56-18_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Teri aankhein — meri duniya" },
  { file: "img/Screenshot_2026-03-03-13-16-57-47_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Cute wala pose" },
  { file: "img/Screenshot_2026-03-03-13-16-58-54_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Yaad hai ye din?" },
  { file: "img/Screenshot_2026-03-03-13-16-59-71_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari selfie game strong" },
  { file: "img/Screenshot_2026-03-03-13-17-00-80_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu meri happiness ho" },
  { file: "img/Screenshot_2026-03-03-13-17-02-02_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Sweet memories" },
  { file: "img/Screenshot_2026-03-03-13-17-03-50_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Bas tu aur main" },
  { file: "img/Screenshot_2026-03-03-13-17-05-98_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Teri muskurahat = meri peace" },
  { file: "img/Screenshot_2026-03-03-13-17-07-56_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Love you Radhika" },
  { file: "img/Screenshot_2026-03-03-13-17-10-28_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamara special din" },
  { file: "img/Screenshot_2026-03-03-13-17-11-58_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu flowers jaisi soft hai" },
  { file: "img/Screenshot_2026-03-03-13-17-13-10_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Meri jaan" },
  { file: "img/Screenshot_2026-03-03-13-17-17-32_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Chhoti si yaad, badi si khushi" },
  { file: "img/Screenshot_2026-03-03-13-19-05-84_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tere saath har pal golden" },
  { file: "img/Screenshot_2026-03-03-13-19-09-10_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Beautiful inside out" },
  { file: "img/Screenshot_2026-03-03-13-19-10-88_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari kahani ka ek chapter" },
  { file: "img/Screenshot_2026-03-21-16-28-24-71_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "March end memories" },
  { file: "img/Screenshot_2026-03-21-16-28-25-50_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu meri sunshine ho" },
  { file: "img/Screenshot_2026-03-21-16-28-26-30_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Perfect together" },
  { file: "img/Screenshot_2026-03-21-16-28-27-65_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Ye smile yaad rakhna" },
  { file: "img/Screenshot_2026-03-21-16-28-28-51_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari cute moments" },
  { file: "img/Screenshot_2026-03-21-16-28-29-31_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Dil se — I love you" },
  { file: "img/Screenshot_2026-03-21-16-28-30-01_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tere bina sab adhura" },
  { file: "img/Screenshot_2026-03-21-16-28-30-72_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Meri favourite human" },
  { file: "img/Screenshot_2026-03-21-16-28-31-42_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Saath mein sab easy lagta hai" },
  { file: "img/Screenshot_2026-03-21-16-28-32-01_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Radhika — meri duniya" },
  { file: "img/Screenshot_2026-03-21-16-28-33-98_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Chhoti si photo, bada sa pyaar" },
  { file: "img/Screenshot_2026-03-21-16-28-38-96_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari journey" },
  { file: "img/Screenshot_2026-03-21-16-28-40-47_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu best ho meri jaan" },
  { file: "img/Screenshot_2026-03-21-16-28-41-53_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Smile karke rakhna hamesha" },
  { file: "img/Screenshot_2026-03-21-16-28-42-63_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Meri queen" },
  { file: "img/Screenshot_2026-03-21-16-28-43-79_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Forever grateful for you" },
  { file: "img/Screenshot_2026-03-21-16-28-45-01_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari pyaari yaadein" },
  { file: "img/Screenshot_2026-03-21-16-28-46-15_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tu meri strength ho" },
  { file: "img/Screenshot_2026-03-21-16-28-47-09_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Last but not least — perfect" },
  { file: "img/Screenshot_2026-06-15-07-36-05-01_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "June ki garmi, tumhari thandi smile" },
  { file: "img/Screenshot_2026-06-15-07-36-20-18_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Summer love vibes" },
  { file: "img/Screenshot_2026-06-15-07-36-34-80_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Tere saath summer bhi cool" },
  { file: "img/Screenshot_2026-06-21-09-16-05-84_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "June memories forever" },
  { file: "img/Screenshot_2026-06-21-09-16-09-26_6012fa4d4ddec268fc5c7112cbb265e7.jpg", caption: "Hamari latest favourite" },
  { file: "img/Snapchat-1049646049.jpg", caption: "Snapchat wali cute photo" },
  { file: "img/Snapchat-1611719463.jpg", caption: "Filter bhi fail tumpe" },
  { file: "img/Snapchat-1732665912.jpg", caption: "Meri jaan ka snap" },
  { file: "img/Snapchat-440388765.jpg", caption: "Random snap, permanent memory" },
  { file: "img/Snapchat-541633398.jpg", caption: "Tu = meri happiness" },
  { file: "img/Snapchat-808500329.jpg", caption: "Last photo — but love never ends" },
];

const VIDEOS = [
  {
    file: "img/Snapchat-1734034067.mp4",
    poster: "img/Snapchat-1732665912.jpg",
    caption: "Ye video meri favourite memory hai — dekhna mat bhoolna",
  },
];

const QUOTE_STRIPS = [
  "Teri muskurahat meri sabse favourite cheez hai.",
  "Tu flowers se bhi zyada khoobsurat lagti hai, Radhika.",
  "Mahadev ki blessing hai tu meri zindagi mein.",
  "Har photo ek kahani hai — aur har kahani tumhare baare mein.",
  "Tere saath time fly karta hai — par yaadein hamesha rehti hain.",
  "Tu meri peace ho, meri happiness ho, meri everything ho.",
  "Hitesh + Radhika = forever kind of love.",
];

const REASONS = [
  { front: "Reason #1", back: "Teri smile dekh ke mera din ban jaata hai — sach mein." },
  { front: "Reason #2", back: "Tu Mahadev pe jo shraddha rakhti hai — wahi meri bhi strength hai." },
  { front: "Reason #3", back: "Flowers dekh ke jo khushi tujhe hoti hai, wahi smile meri favourite hai." },
  { front: "Reason #4", back: "Tu mujhe better insaan banaati hai — har din." },
  { front: "Reason #5", back: "Teri baatein sun ke lagta hai bas tu aur main — baaki sab fade." },
  { front: "Reason #6", back: "Tu caring hai, sweet hai, aur thodi naughty bhi — perfect combo." },
  { front: "Reason #7", back: "Tere saath silence bhi comfortable lagti hai — that's real love." },
  { front: "Reason #8", back: "Tu meri biggest supporter ho — har dream ke saath khadi rehti hai." },
  { front: "Reason #9", back: "Teri aankhon mein jo pyaar hai — usse zyada kuch nahi chahiye mujhe." },
  { front: "Reason #10", back: "Tu hansi mein, gusse mein, sleepy mein — har mood mein cute lagti hai." },
  { front: "Reason #11", back: "Radhika, tu meri zindagi ka sabse beautiful gift hai — Girlfriend Day pe bhi, har din bhi." },
  { front: "Reason #12", back: "Bas tu ho — aur wahi kaafi hai. Forever yours, Hitesh." },
];

const LETTER_LINES = [
  "Meri jaan Radhika,",
  "",
  "Likha likhna mushkil hai kyunki jo feel karta hoon wo shabd kam pad jaate hain — par phir bhi try karunga, tumhare liye.",
  "",
  "Jab se tum meri zindagi mein aayi ho, sab kuch thoda zyada rangin, thoda zyada meaningful lagne laga hai. Tum nahi jaanti kitni khush naseeb hoon main.",
  "",
  "Tum Mahadev ko jo pyaar se yaad karti ho, flowers ko jo itni khushi se dekhti ho — wahi softness, wahi warmth meri duniya ka sabse khoobsurat hissa ban gayi hai.",
  "",
  "Humaare saath bitaye har pal — chahe wo chhoti si selfie ho ya lambi baatein — sab kuch meri diary ka sabse precious chapter hai.",
  "",
  "Girlfriend Day pe main bas itna kehna chahta hoon: tu meri best friend ho, meri partner ho, meri home ho.",
  "",
  "Tujhse bahut pyaar karta hoon.",
  "",
  "Hamesha tera,",
  "Hitesh ❤️",
];
