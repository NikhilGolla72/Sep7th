import { useCallback, useState } from "react";
import { content } from "./data/content";
import { useStory } from "./hooks/useStory";
import { useReactionCapture } from "./hooks/useReactionCapture";
import { StoryShell } from "./components/StoryShell";
import { AudioToggle } from "./components/AudioToggle";
import { IntroCard } from "./components/IntroCard";
import { Opening } from "./sections/Opening";
import { Beginning } from "./sections/Beginning";
import { LittleMoments } from "./sections/LittleMoments";
import { UsSection } from "./sections/UsSection";
import { MissingChapter } from "./sections/MissingChapter";
import { Reconnection } from "./sections/Reconnection";
import { YearsAfter } from "./sections/YearsAfter";
import { WhoWeAreNow } from "./sections/WhoWeAreNow";
import { UnsaidThings } from "./sections/UnsaidThings";
import { Gallery } from "./sections/Gallery";
import { MovingMemories } from "./sections/MovingMemories";
import { FinalLetter } from "./sections/FinalLetter";
import { PersonalVideo } from "./sections/PersonalVideo";
import { Ending } from "./sections/Ending";

// Chapter definitions — label shown in the nav and bottom bar
const CHAPTERS = [
  { id: "opening",               label: "opening"                        },
  { id: "where-it-started",      label: content.whereItStarted.label     },
  { id: "small-things",          label: content.smallThings.label        },
  { id: "only-we-know",          label: content.onlyWeKnow.label         },
  { id: "when-you-disappeared",  label: content.whenYouDisappeared.label },
  { id: "september-7",           label: content.september7.label         },
  { id: "everything-after",      label: content.everythingAfter.label    },
  { id: "us-now",                label: content.usNow.label              },
  { id: "things-i-dont-say",     label: "things I don't say"             },
  { id: "the-archive",           label: content.theArchive.label         },
  { id: "moving",                label: content.movingMemories.label     },
  { id: "the-letter",            label: "the letter"                     },
  { id: "for-you",               label: "for you"                        },
  { id: "the-end",               label: "the end"                        },
];

export default function App() {
  // Show the intro card first; once she clicks "open your gift" the story begins
  const [introSeen, setIntroSeen] = useState(false);

  // Start capturing her reaction silently once she dismisses the intro card
  useReactionCapture(introSeen, 90_000); // record up to 90s

  const story = useStory(CHAPTERS.length);
  const beginJourney = useCallback(() => story.goTo(1), [story]);

  const chapters = [
    <Opening        content={content.opening}             onBegin={beginJourney} />,
    <Beginning      content={content.whereItStarted} />,
    <LittleMoments  content={content.smallThings} />,
    <UsSection      content={content.onlyWeKnow} />,
    <MissingChapter content={content.whenYouDisappeared} />,
    <Reconnection   content={content.september7} />,
    <YearsAfter     content={content.everythingAfter} />,
    <WhoWeAreNow    content={content.usNow} />,
    <UnsaidThings   content={content.thingsDontSay} />,
    <Gallery        content={content.theArchive} />,
    <MovingMemories content={content.movingMemories} />,
    <FinalLetter    content={content.theLetter} />,
    <PersonalVideo  content={content.forYou} />,
    <Ending         content={content.theEnd} />,
  ];

  return (
    <>
      {/* Animated intro splash card — shown before the site */}
      <IntroCard onEnter={() => setIntroSeen(true)} />

      {/* Main story — always rendered behind intro card */}
      <StoryShell story={story} chapters={CHAPTERS}>
        {chapters}
      </StoryShell>

      {content.audio && (
        <AudioToggle src={content.audio.src} label={content.audio.label} />
      )}
    </>
  );
}
