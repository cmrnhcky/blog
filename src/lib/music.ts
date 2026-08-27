import library from '../data/music.json';
import playlists from '../data/playlists.json';

/* ────────────────────────────────────────────────────────────────
   Listening.

   Two things live here:

     1. Pre-made playlists — Cameron's own YouTube / YouTube Music
        playlists, embedded by ID.
     2. The generator — a visitor picks an occasion and gets a
        playlist built from the tagged library.

   The generator works because YouTube's embed accepts an anonymous
   playlist assembled from arbitrary video IDs:

        /embed/<first>?playlist=<id>,<id>,<id>

   No API key, no OAuth, no backend — which is what lets this exist
   on a static site at all. Verified against a live player: the
   iframe API reports the queue back correctly.

   Occasions, not moods. "Before Five" is more him than "Energetic",
   and an occasion is easier to tag a song against than a feeling.
   Names live here and nowhere else; renaming is free.
   ──────────────────────────────────────────────────────────────── */

export interface Occasion { name: string; blurb: string; }

export const OCCASIONS = {
  'before-five': { name: 'Before Five',  blurb: 'The early alarm. The first miles, before anyone is up.' },
  'the-miles':   { name: 'The Miles',    blurb: 'Running. Moving. Whatever keeps the legs going.' },
  'the-pour':    { name: 'The Pour',     blurb: 'A drink, no hurry, nowhere to be.' },
  'matchday':    { name: 'Matchday',     blurb: 'Football, and the hour of build-up before it.' },
  'the-drive':   { name: 'The Drive',    blurb: 'Windows down. Distance to cover.' },
  'after-hours': { name: 'After Hours',  blurb: 'Late, low, and winding down.' },
} as const satisfies Record<string, Occasion>;

export type OccasionSlug = keyof typeof OCCASIONS;

export const occasionSlugs = Object.keys(OCCASIONS) as OccasionSlug[];
export const occasionName = (s: OccasionSlug) => OCCASIONS[s].name;

export interface Song {
  id: string;        // YouTube video ID
  title: string;
  artist: string;
  moods: string[];   // occasion slugs
}

export interface Playlist {
  id: string;        // YouTube playlist ID (PL…)
  title: string;
  blurb?: string;
}

export const songs: Song[] = library as Song[];
export const madePlaylists: Playlist[] = playlists as Playlist[];

export const allOccasions = () =>
  occasionSlugs.map(slug => ({
    slug,
    ...OCCASIONS[slug],
    count: songs.filter(s => s.moods?.includes(slug)).length,
  }));

/** Songs are tagged by hand; until they are, the generator has nothing to build. */
export const untaggedCount = () => songs.filter(s => !s.moods?.length).length;

/* The player takes the first ID as the video and the rest as the queue.
   Roughly 170 tracks before the URL gets too long — far past useful. */
export const embedUrl = (ids: string[]) =>
  ids.length
    ? `https://www.youtube.com/embed/${ids[0]}?playlist=${ids.slice(1).join(',')}&rel=0`
    : '';

/** The same queue, opened on YouTube proper so a visitor can save it. */
export const watchUrl = (ids: string[]) =>
  ids.length ? `https://www.youtube.com/watch_videos?video_ids=${ids.join(',')}` : '';
