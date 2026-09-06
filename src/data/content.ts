import type { SiteContent } from "./types";

// ---------------------------------------------------------------------------
// THIS IS THE ONLY FILE YOU NEED TO EDIT.
//
// Every word, photo path, and video path on the site lives here.
// Replace anything inside [BRACKETS] with your own content.
//
// Photos  →  /public/photos/your-file.jpg    reference as "/photos/your-file.jpg"
// Videos  →  /public/videos/your-file.mp4    reference as "/videos/your-file.mp4"
// Audio   →  /public/audio/your-file.mp3     reference as "/audio/your-file.mp3"
// ---------------------------------------------------------------------------

export const content: SiteContent = {
  meta: {
    title: "[HER NAME, OR A PRIVATE PHRASE ONLY SHE'D UNDERSTAND]",
    description: "A personal archive, for one specific person.",
  },

  // ─── OPENING ─────────────────────────────────────────────────────────────
  opening: {
    eyebrow: "[A SMALL SUPPORTING LINE — something quiet, like a date or a place]",
    line: "[THE FIRST THING SHE READS — make it count]",
    subline: "[AN OPTIONAL SECOND LINE — or delete this]",
    cta: "open it",
  },

  // ─── WHERE IT STARTED ────────────────────────────────────────────────────
  whereItStarted: {
    label: "where it started",
    heading: "[HOW WE MET — a short title]",
    body: "[THE STORY OF HOW YOU MET. A paragraph or two. Write it like you'd tell it to someone who doesn't know her.]",
    memory: "[ONE EARLY MEMORY — something small. The smaller the better.]",
    photo: {
      src: "/photos/photo-01.jpg",
      alt: "[DESCRIBE THIS PHOTO]",
      caption: "[CAPTION — optional]",
      orientation: "portrait",
    },
  },

  // ─── THE SMALL THINGS ────────────────────────────────────────────────────
  smallThings: {
    label: "the small things",
    heading: "[TITLE — something about the ordinary moments]",
    intro: "[A SHORT LINE ABOUT WHY THE SMALL STUFF ENDED UP MATTERING]",
    fragments: [
      {
        type: "photo",
        photo: { src: "/photos/photo-02.jpg", alt: "[DESCRIBE]", orientation: "portrait" },
        caption: "[CAPTION]",
      },
      {
        type: "note",
        note: "[A SHORT MESSAGE, SCREENSHOT TEXT, OR MEMORY]",
        caption: "[WHY THIS STAYED WITH YOU]",
      },
      {
        type: "photo",
        photo: { src: "/photos/photo-03.jpg", alt: "[DESCRIBE]", orientation: "landscape" },
        caption: "[CAPTION]",
      },
      {
        type: "photo",
        photo: { src: "/photos/photo-04.jpg", alt: "[DESCRIBE]", orientation: "portrait" },
        caption: "[CAPTION]",
      },
      {
        type: "note",
        note: "[ANOTHER SMALL THING]",
        caption: "[OPTIONAL CONTEXT]",
      },
      {
        type: "photo",
        photo: { src: "/photos/photo-05.jpg", alt: "[DESCRIBE]", orientation: "landscape" },
        caption: "[CAPTION]",
      },
    ],
  },

  // ─── ONLY WE KNOW ────────────────────────────────────────────────────────
  onlyWeKnow: {
    label: "only we know",
    heading: "[TITLE — something about the things only the two of you understand]",
    intro: "[A PLAYFUL LINE ABOUT YOUR SHARED LANGUAGE]",
    jokes: [
      { line: "[INSIDE JOKE ONE]", context: "[OPTIONAL — why it's funny]" },
      { line: "[A PHRASE YOU ALWAYS SAY]" },
      { line: "[SOMETHING YOU ALWAYS ARGUE ABOUT]" },
      { line: "[INSIDE JOKE TWO]" },
      { line: "[A RANDOM THING ONLY YOU TWO DO]" },
      { line: "[INSIDE JOKE THREE]" },
    ],
  },

  // ─── WHEN YOU DISAPPEARED ────────────────────────────────────────────────
  // Keep this section sparse. Less is more here.
  whenYouDisappeared: {
    label: "when you disappeared",
    heading: "[A QUIET TITLE FOR THIS PART]",
    body: "[AS MUCH OR AS LITTLE AS YOU WANT TO SAY ABOUT THE TIME YOU WEREN'T TALKING. IT'S OKAY FOR THIS TO BE ONE SENTENCE.]",
  },

  // ─── SEPTEMBER 7 ─────────────────────────────────────────────────────────
  september7: {
    label: "september 7",
    heading: "[TITLE FOR THE RECONNECTION]",
    date: "September 7",
    story: "[THE STORY OF HOW YOU STARTED TALKING AGAIN — WHAT HAPPENED, WHAT WAS SAID, WHAT IT FELT LIKE]",
    photo: {
      src: "/photos/photo-06.jpg",
      alt: "[DESCRIBE THIS PHOTO OR SCREENSHOT]",
      orientation: "portrait",
    },
    note: "[A SHORT PERSONAL NOTE ABOUT THIS MOMENT]",
  },

  // ─── EVERYTHING AFTER ────────────────────────────────────────────────────
  everythingAfter: {
    label: "everything after",
    heading: "[TITLE FOR THE YEARS SINCE]",
    intro: "[A SHORT LINE ABOUT WHAT CAME AFTER RECONNECTING]",
    entries: [
      {
        period: "[YEAR OR PERIOD]",
        title: "[MEMORY TITLE]",
        description: "[SHORT DESCRIPTION]",
        photo: { src: "/photos/memory-01.jpg", alt: "[DESCRIBE]", orientation: "landscape" },
      },
      {
        period: "[YEAR OR PERIOD]",
        title: "[MEMORY TITLE]",
        description: "[SHORT DESCRIPTION]",
        photo: { src: "/photos/memory-02.jpg", alt: "[DESCRIBE]", orientation: "portrait" },
      },
      {
        period: "[YEAR OR PERIOD]",
        title: "[MEMORY TITLE]",
        description: "[SHORT DESCRIPTION]",
        photo: { src: "/photos/memory-03.jpg", alt: "[DESCRIBE]", orientation: "landscape" },
      },
    ],
  },

  // ─── US NOW ──────────────────────────────────────────────────────────────
  usNow: {
    label: "us, now",
    heading: "[TITLE — something about who you are now]",
    body: "[A SHORT REFLECTION ON THE FRIENDSHIP TODAY]",
  },

  // ─── THINGS I DON'T SAY ──────────────────────────────────────────────────
  thingsDontSay: {
    heading: "things I don't say out loud",
    message:
      "[YOUR PERSONAL MESSAGE HERE.\n\nWrite it like you'd write it if you knew no one else was reading it.\n\nSeparate paragraphs with a blank line — each one will appear as its own paragraph.]",
  },

  // ─── THE ARCHIVE ─────────────────────────────────────────────────────────
  theArchive: {
    label: "the archive",
    heading: "[TITLE FOR THE GALLERY]",
    intro: "[OPTIONAL SHORT LINE]",
    photos: [
      { src: "/photos/gallery-01.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "landscape" },
      { src: "/photos/gallery-02.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "portrait" },
      { src: "/photos/gallery-03.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "portrait" },
      { src: "/photos/gallery-04.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "landscape" },
      { src: "/photos/gallery-05.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "portrait" },
      { src: "/photos/gallery-06.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "landscape" },
      { src: "/photos/gallery-07.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "portrait" },
      { src: "/photos/gallery-08.jpg", alt: "[DESCRIBE]", caption: "[CAPTION]", orientation: "landscape" },
    ],
  },

  // ─── MOVING MEMORIES ─────────────────────────────────────────────────────
  movingMemories: {
    label: "moving",
    heading: "[TITLE FOR THE VIDEO SECTION]",
    intro: "[OPTIONAL SHORT LINE]",
    videos: [
      {
        src: "/videos/memory-01.mp4",
        poster: "/photos/video-poster-01.jpg",
        caption: "[CAPTION]",
        description: "[OPTIONAL DESCRIPTION]",
      },
      {
        src: "/videos/memory-02.mp4",
        poster: "/photos/video-poster-02.jpg",
        caption: "[CAPTION]",
      },
    ],
  },

  // ─── THE LETTER ──────────────────────────────────────────────────────────
  theLetter: {
    heading: "[OPTIONAL TITLE — or leave blank]",
    body: "[THE LETTER.\n\nWrite several paragraphs if you want.\n\nSeparate them with blank lines.\n\nThis section slows everything down — give it space.]",
    signature: "[YOUR NAME OR SIGNATURE]",
  },

  // ─── FOR YOU ─────────────────────────────────────────────────────────────
  forYou: {
    heading: "[A SHORT INTRO TO THE VIDEO]",
    intro: "[OPTIONAL SECOND LINE BEFORE THE VIDEO]",
    video: {
      src: "/videos/final-message.mp4",
      poster: "/photos/final-message-poster.jpg",
    },
    closingLine: "[FINAL ONE-LINE MESSAGE AFTER THE VIDEO]",
  },

  // ─── THE END ─────────────────────────────────────────────────────────────
  theEnd: {
    line: "[FINAL LINE — the last thing she reads]",
    date: "[OPTIONAL DATE]",
    initials: "[YOUR INITIALS OR NAME]",
    closing: "until the next chapter.",
  },

  // ─── OPTIONAL AUDIO ──────────────────────────────────────────────────────
  // Delete this entire block if you don't want background music.
  audio: {
    src: "/audio/song.mp3",
    label: "music",
  },
};
