import { content } from "./data/content";
import { useStory } from "./hooks/useStory";
import { StoryShell } from "./components/StoryShell";
import { AudioToggle } from "./components/AudioToggle";
import { Opening } from "./sections/Opening";
import { Beginning } from "./sections/Beginning";
import { LittleMoments } from "./sections/LittleMoments";
import { UsSection } from "./sections/UsSection";
import { MissingChapter } from "./sections/MissingChapter";
import { Reconnection } from "./sections/Reconnection";
import { YearsAfter } from "./sections/YearsAfter";
import { WhoWeAreNow } from "./sections/WhoWeAreNow";
import { Gallery } from "./sections/Gallery";
import { MovingMemories } from "./sections/MovingMemories";
import { PersonalVideo } from "./sections/PersonalVideo";
import { Ending } from "./sections/Ending";

const CHAPTERS = [
  { id: "opening",               label: "opening"                        },
  { id: "where-it-started",      label: content.whereItStarted.label     },
  { id: "when-you-disappeared",  label: content.whenYouDisappeared.label },
  { id: "september-7",           label: content.september7.label         },
  { id: "everything-after",      label: content.everythingAfter.label    },
  { id: "small-things",          label: content.smallThings.label        },
  { id: "the-archive",           label: content.theArchive.label         },
  { id: "moving",                label: content.movingMemories.label     },
  { id: "only-we-know",          label: content.onlyWeKnow.label         },
  { id: "us-now",                label: content.usNow.label              },
  { id: "for-you",               label: "for you"                        },
  { id: "the-end",               label: "the end"                        },
];

export default function App() {
  const story = useStory(CHAPTERS.length);

  const chapters = [
    <Opening        content={content.opening} />,
    <Beginning      content={content.whereItStarted} />,
    <MissingChapter content={content.whenYouDisappeared} />,
    <Reconnection   content={content.september7} />,
    <YearsAfter     content={content.everythingAfter} />,
    <LittleMoments  content={content.smallThings} />,
    <Gallery        content={content.theArchive} />,
    <MovingMemories content={content.movingMemories} />,
    <UsSection      content={content.onlyWeKnow} />,
    <WhoWeAreNow    content={content.usNow} />,
    <PersonalVideo  content={content.forYou} />,
    <Ending         content={content.theEnd} />,
  ];

  return (
    <>
      <StoryShell story={story} chapters={CHAPTERS}>
        {chapters}
      </StoryShell>

      {content.audio && (
        <AudioToggle src={content.audio.src} label={content.audio.label} />
      )}
    </>
  );
}
