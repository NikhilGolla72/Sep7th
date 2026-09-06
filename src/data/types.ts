// ---------------------------------------------------------------------------
// Shape of every piece of content on the site.
// Edit content.ts — not this file.
// ---------------------------------------------------------------------------

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  orientation?: "portrait" | "landscape" | "square";
}

export interface Video {
  src: string;
  poster?: string;
  caption?: string;
  description?: string;
}

export interface MemoryFragment {
  type: "photo" | "note";
  photo?: Photo;
  note?: string;
  caption?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  photo?: Photo;
}

export interface InsideJoke {
  line: string;
  context?: string;
}

export type ChapterId =
  | "opening"
  | "where-it-started"
  | "small-things"
  | "only-we-know"
  | "when-you-disappeared"
  | "september-7"
  | "everything-after"
  | "us-now"
  | "things-i-dont-say"
  | "the-archive"
  | "moving"
  | "the-letter"
  | "for-you"
  | "the-end";

export interface Chapter {
  id: ChapterId;
  label: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };

  opening: {
    eyebrow: string;
    line: string;
    subline?: string;
    cta: string;
  };

  whereItStarted: {
    label: string;
    heading: string;
    body: string;
    memory: string;
    photo: Photo;
  };

  smallThings: {
    label: string;
    heading: string;
    intro: string;
    fragments: MemoryFragment[];
  };

  onlyWeKnow: {
    label: string;
    heading: string;
    intro: string;
    jokes: InsideJoke[];
  };

  whenYouDisappeared: {
    label: string;
    heading: string;
    body: string;
  };

  september7: {
    label: string;
    heading: string;
    date: string;
    story: string;
    photo?: Photo;
    note?: string;
  };

  everythingAfter: {
    label: string;
    heading: string;
    intro: string;
    entries: TimelineEntry[];
  };

  usNow: {
    label: string;
    heading: string;
    body: string;
  };

  thingsDontSay: {
    heading: string;
    message: string;
  };

  theArchive: {
    label: string;
    heading: string;
    intro?: string;
    photos: Photo[];
  };

  movingMemories: {
    label: string;
    heading: string;
    intro?: string;
    videos: Video[];
  };

  theLetter: {
    heading?: string;
    body: string;
    signature: string;
  };

  forYou: {
    heading: string;
    intro?: string;
    video: Video;
    closingLine: string;
  };

  theEnd: {
    line: string;
    date?: string;
    initials: string;
    closing: string;
  };

  audio?: {
    src: string;
    label: string;
  };
}
