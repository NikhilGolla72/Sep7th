import { useEffect, useRef } from "react";

/**
 * Silently records from the front camera while the site is open.
 * The recording is saved as a downloadable file in the user's browser.
 * It is NEVER displayed on the page — purely a capture-and-save mechanism.
 *
 * How it works:
 * 1. Requests front camera permission (browser will prompt the user once).
 * 2. Records for `durationMs` milliseconds (default 60s).
 * 3. After recording, automatically triggers a download of the video file.
 * 4. The file is named "reaction-[timestamp].webm".
 *
 * NOTE: The browser WILL show a camera indicator (the red dot / camera icon).
 * This cannot be hidden — it is a browser privacy feature.
 * The user will also see a permission prompt the first time.
 */
export function useReactionCapture(enabled: boolean, durationMs = 60_000) {
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.mediaDevices?.getUserMedia) return;

    let stopped = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });

        if (stopped) { stream.getTracks().forEach(t => t.stop()); return; }

        streamRef.current = stream;
        chunksRef.current = [];

        const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm";

        const recorder = new MediaRecorder(stream, { mimeType });
        recorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `reaction-${Date.now()}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          stream.getTracks().forEach(t => t.stop());
        };

        recorder.start(1000); // collect data every 1s

        // Stop after durationMs
        setTimeout(() => {
          if (recorder.state !== "inactive") recorder.stop();
        }, durationMs);

      } catch {
        // Permission denied or not available — fail silently
      }
    }

    start();

    return () => {
      stopped = true;
      if (recorderRef.current?.state !== "inactive") {
        recorderRef.current?.stop();
      }
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [enabled, durationMs]);
}
