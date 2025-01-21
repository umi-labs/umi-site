'use client';
import React from 'react';
import '@vidstack/react/player/styles/base.css';
import {
  Controls,
  FullscreenButton,
  MediaPlayer,
  MediaProvider,
  MuteButton,
  PlayButton,
  Poster,
  TimeSlider,
} from '@vidstack/react';
import {
  CornersIn,
  CornersOut,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerLow,
  SpeakerNone,
} from '@phosphor-icons/react';

export interface VideoProps {
  video: {
    asset: {
      url: string;
      mimeType: string;
    };
  };
  image: {
    asset: {
      url: string;
      altText: string;
      metadata: {
        dimensions: {
          aspectRatio: number;
          height: number;
          _type: string;
          width: number;
        };
      };
    };
  };
  altText?: string;
  caption?: string;
  muted: boolean;
  loop: boolean;
  playsinline: boolean;
  autoplay: boolean;
  controls: boolean;
}

export default function Video({
  video,
  image,
  muted,
  loop,
  playsinline,
  autoplay,
  controls,
}: VideoProps) {
  return (
    <MediaPlayer
      title="Video Player"
      src={video.asset.url}
      playsInline={playsinline}
      muted={muted ? true : autoplay ? true : false}
      loop={loop}
      autoPlay={autoplay ? true : !controls ? true : false}
    >
      <MediaProvider>
        {controls && (
          <Controls.Root className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-black/40 opacity-0 transition-opacity data-[visible]:opacity-100">
            <Controls.Group className="pointer-events-auto flex w-full items-center justify-end p-2">
              <MuteButton className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-zinc-50 outline-none ring-inset ring-sky-400 hover:bg-white/20 data-[focus]:ring-4">
                <SpeakerNone className="hidden h-8 w-8 group-data-[state='muted']:block" />
                <SpeakerLow className="hidden h-8 w-8 group-data-[state='low']:block" />
                <SpeakerHigh className="hidden h-8 w-8 group-data-[state='high']:block" />
              </MuteButton>
            </Controls.Group>
            <div className="flex-1" />
            <Controls.Group className="flex-center pointer-events-auto w-full items-center px-2">
              <PlayButton className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-zinc-50 outline-none ring-inset ring-sky-400 hover:bg-white/20 data-[focus]:ring-4">
                <Play className="hidden h-8 w-8 group-data-[paused]:block" />
                <Pause className="h-8 w-8 group-data-[paused]:hidden" />
              </PlayButton>
            </Controls.Group>
            <div className="flex-1" />
            <Controls.Group className="pointer-events-auto flex w-full items-center px-2">
              <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
                <TimeSlider.Track className="relative z-0 h-[5px] w-full rounded-sm bg-white/30 ring-sky-400 group-data-[focus]:ring-[3px]">
                  <TimeSlider.TrackFill className="absolute h-full w-[var(--slider-fill)] rounded-sm bg-indigo-400 will-change-[width]" />
                  <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)] rounded-sm bg-white/50 will-change-[width]" />
                </TimeSlider.Track>
                <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
              </TimeSlider.Root>
              <FullscreenButton className="group relative mb-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-zinc-50 outline-none ring-inset ring-sky-400 hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4">
                <CornersOut className="h-8 w-8 group-data-[active]:hidden" />
                <CornersIn className="hidden h-8 w-8 group-data-[active]:block" />
              </FullscreenButton>
            </Controls.Group>
          </Controls.Root>
        )}
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md bg-black opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src={image.asset.url}
          alt={image.asset.altText}
        />
      </MediaProvider>
    </MediaPlayer>
  );
}
