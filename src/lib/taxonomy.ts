/* ────────────────────────────────────────────────────────────────
   The taxonomy. Two axes.

     topic  — required, one per post. This is the navigation.
     form   — optional. This is the franchise.

   Esquire runs both at different layers: topics are how you browse
   (Style, Food & Drink, Fitness), forms are the recurring franchises
   inside them ("wear this, not that" is a form applied to style).

   Because form is optional, a post without one is its own escape
   hatch — so there is no catch-all department, and filing stays one
   decision per post.

   Display names live HERE and nowhere else. Frontmatter and URLs
   store slugs, so renaming a topic or form is a one-line edit with
   zero content churn.
   ──────────────────────────────────────────────────────────────── */

export interface Section {
  name: string;
  blurb: string;
}

export const TOPICS = {
  drink:      { name: 'Drink',      blurb: 'Beer, whiskey, gin. Value over prestige.' },
  fitness:    { name: 'Fitness',    blurb: 'Running, training, the outdoors. Discipline and where it leads.' },
  money:      { name: 'Money',      blurb: 'Value by design. The math of a good bet.' },
  style:      { name: 'Style',      blurb: 'Wear this, not that.' },
  fatherhood: { name: 'Fatherhood', blurb: 'Oscar, and the mornings. First generation, figuring it out.' },
  sundries:   { name: 'Sundries',   blurb: 'Music, football, whatever was on. The rest of it.' },
} as const satisfies Record<string, Section>;

export const FORMS = {
  endorsements:   { name: 'Endorsements', blurb: "One thing. Why it's worth it. Ends on a verdict." },
  'greater-than': { name: 'Greater Than', blurb: 'This, not that — argued to a conclusion.' },
  lists:          { name: 'Lists',        blurb: 'Ranked. Numbered. No explanation owed.' },
} as const satisfies Record<string, Section>;

export type TopicSlug = keyof typeof TOPICS;
export type FormSlug  = keyof typeof FORMS;
export type SectionSlug = TopicSlug | FormSlug;

/* Tuples for the zod enums in content.config.ts. */
export const topicSlugs = Object.keys(TOPICS) as [TopicSlug, ...TopicSlug[]];
export const formSlugs  = Object.keys(FORMS)  as [FormSlug,  ...FormSlug[]];

export const topicName = (slug: TopicSlug): string => TOPICS[slug].name;
export const formName  = (slug: FormSlug):  string => FORMS[slug].name;

export const isTopic = (slug: string): slug is TopicSlug => slug in TOPICS;
export const isForm  = (slug: string): slug is FormSlug  => slug in FORMS;

/* Every page `src/pages/[section]/index.astro` builds. Exactly nine —
   this is not a catch-all, so /living, /cameron and /archive are
   untouched. Re-check for collisions if a topic is ever added. */
export function allSections(): Array<{ slug: SectionSlug; kind: 'topic' | 'form' } & Section> {
  return [
    ...(Object.entries(TOPICS) as [TopicSlug, Section][]).map(([slug, s]) => ({ slug, kind: 'topic' as const, ...s })),
    ...(Object.entries(FORMS)  as [FormSlug,  Section][]).map(([slug, s]) => ({ slug, kind: 'form'  as const, ...s })),
  ];
}
