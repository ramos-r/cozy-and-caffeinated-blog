import { inArray } from "drizzle-orm";
import { db } from "../src/db";
import { posts, galleryItems, siteSettings } from "../src/db/schema";

const postsData: (typeof posts.$inferInsert)[] = [
  {
    slug: "first-cold-morning-of-the-year",
    title: "The first cold morning of the year",
    date: "2026-09-02",
    category: "Autumn",
    excerpt:
      "There is one morning every year when the air changes its mind. I made coffee twice, wore two pairs of socks, and let the whole day be slow on purpose.",
    tags: ["autumn", "mornings", "slow living"],
    content: `There is one morning every year when the air changes its mind. This year it happened on a Tuesday, which felt wrong — mornings like this should only be allowed on weekends, when there's nowhere to be and no reason to rush the process of realizing summer is actually, finally, over.

I made coffee twice. The first cup went cold on the windowsill while I stood there in last year's cardigan trying to remember where I'd put my good socks — the wool ones, the pair with the hole starting at the left heel that I keep meaning to darn and never do. The second cup I actually drank, sitting on the front step with my knees pulled up, watching my breath do something it hadn't done in months.

I wore two pairs of socks. I don't know why two felt necessary rather than just thicker ones, but it did, and once I'd decided that the whole day arranged itself around the same logic — more of everything, slower about everything. Two candles instead of the overhead light. A second blanket on the bed before I'd even needed the first one yet.

By the time the sun was properly up, the cold had backed off to something more reasonable, the kind you forget about once you're moving. But for that one hour on the step, sock-heavy and slightly ridiculous, I let the whole day be slow on purpose — the first of many, if the season keeps its promises.`,
  },
  {
    slug: "walk-with-no-destination",
    title: "A walk with no destination",
    date: "2026-08-24",
    category: "Thoughts",
    excerpt:
      "I took the long way home through the park and counted the trees that had already turned. Seven. Next week it will be too many to count.",
    tags: ["walking", "autumn", "thoughts"],
    content: `I took the long way home through the park, which is a sentence that only makes sense if you already know I had nowhere in particular to be. The short way is eleven minutes. The long way, past the pond and around by the row of maples that always turn first, is closer to forty, and today forty sounded exactly right.

I counted the trees that had already turned. Seven — five maples and, surprisingly, two of the smaller ones near the fence whose names I've never learned, despite walking past them for three years. Next week it will be too many to count, and the week after that I'll stop trying and just let the color happen without keeping score.

There's a kind of thinking that only works at walking pace. Sitting still, my mind circles the same three worries like a dog that can't decide where to lie down. Moving, somehow, it loosens. I solved nothing large on this particular walk — no decisions, no revelations — but I arrived home a little less tangled than I left, and some days that's the entire point of having legs.

A woman with a dog nodded at me near the bridge, the way strangers do when they've silently agreed the weather deserves comment even without words. I nodded back. Then I kept walking, in no hurry, toward a home that wasn't going anywhere either.`,
  },
  {
    slug: "rereading-the-books-you-love",
    title: "Notes on rereading the books you love",
    date: "2026-08-15",
    category: "Books",
    excerpt:
      "Rereading is not a failure of curiosity. It is a way of visiting a place you already know how to be happy in.",
    tags: ["books", "rereading"],
    content: `Rereading is not a failure of curiosity. I used to feel a little guilty about it, like returning to a book I already know was somehow lazier than reaching for something new — as if the whole point of reading were the sport of covering ground. It isn't, or at least it doesn't have to be.

I picked up an old paperback last week, the spine gone soft and pale from however many times it's traveled in a bag or fallen open on a nightstand. I knew what happens on page forty. I knew the line on page two hundred and twelve that I've underlined in three different pens over the years, each one a slightly different version of me agreeing with the same sentence.

> It is a way of visiting a place you already know how to be happy in.

That's the thing nobody tells you about rereading — it isn't about the plot anymore. It's about the specific quality of afternoon light you associate with a certain chapter, the tea you were drinking the first time, the person you were before you knew how the story ended. The book stays the same. You're the one who's changed, and rereading is just a quiet way of checking the difference.

I'll read new things too, plenty of them, this month and every month. But some books aren't meant to be finished once and shelved. Some are meant to be worn in, like a good coat you keep pulling out every autumn because it still fits, and still, somehow, fits exactly right.`,
  },
  {
    slug: "how-i-make-my-coffee",
    title: "How I make my coffee (badly, happily)",
    date: "2026-08-06",
    category: "Coffee",
    excerpt:
      "No scale, no timer, no opinions about water temperature. Just a slightly chipped mug and the same spoon I have used for six years.",
    tags: ["coffee", "morning ritual"],
    content: `No scale, no timer, no opinions about water temperature. I want to say this up front because there is a whole world of coffee people who will tell you I'm doing it wrong, and they are probably correct, and I have made my peace with that.

Here is the actual process: I fill the kettle more than I need and less than the last time. I scoop grounds with the same spoon I've used for six years, a slightly bent teaspoon that used to belong to a set and now belongs to nothing but this one job. I don't measure. I've made coffee in this kitchen often enough that my hands seem to know before I do.

The mug matters more than the method — a slightly chipped one, the chip small enough that it's never once cut my lip, worn smooth at the edge from years of the same grip. I drink it black, standing at the counter for the first few sips before I let myself sit down, which is its own small ritual I couldn't explain if you asked me to.

Is it good coffee, by any real standard? I genuinely don't know. It's mine, made the same slightly wrong way every morning, and some mornings that matters more than the standard.`,
  },
  {
    slug: "small-things-i-drew-this-month",
    title: "Small things I drew this month",
    date: "2026-07-28",
    category: "Art",
    excerpt:
      "Leaves, mostly. A mug. A very unsuccessful attempt at my own hand. Drawing badly on purpose has become my favourite hour of the week.",
    tags: ["art", "sketchbook"],
    content: `Leaves, mostly. I filled half a sketchbook with leaves this month — maple, oak, one I'm fairly sure was just a weed I found charming — and every single one came out a little lopsided in a way that used to bother me and now, mostly, doesn't.

A mug, twice. The first attempt had a handle that looked structurally impossible, the kind that would snap the moment anyone tried to actually lift it. The second was better, though "better" here means only "recognizable," which I've decided is a perfectly good bar to clear on a Tuesday.

And a very unsuccessful attempt at my own hand — my actual hand, held up awkwardly in front of me while I tried to draw it holding the pencil that was drawing it, which is exactly as confusing as it sounds. It looks more like a glove that's given up than a hand. I kept it anyway.

Drawing badly on purpose has become my favourite hour of the week. Not "badly" as in careless — badly as in unconcerned, as in nobody's grading this, as in the leaf doesn't need to be correct to be worth the twenty minutes it took to notice its shape in the first place.`,
  },
  {
    slug: "rain-and-staying-in",
    title: "Rain, and the gentle art of staying in",
    date: "2026-07-19",
    category: "Thoughts",
    excerpt:
      "The lights outside go soft and blurry, the chair by the window becomes the best seat in the house, and cancelling plans stops feeling like a betrayal.",
    tags: ["rain", "staying in", "slow living"],
    content: `The lights outside go soft and blurry the moment real rain starts, streetlamps turning into smudges of orange through a wet window, and something in me exhales the second I notice it happening. I don't love rain in the abstract. I love what it gives me permission to do, which is nothing.

The chair by the window becomes the best seat in the house on days like this, in a way it never quite manages on ordinary sunny afternoons. Same chair, same window, entirely different chair once there's weather worth watching from it. I've had genuinely important thoughts in that chair, and also, more often, no thoughts at all — which might be the better use of a rainy afternoon.

Cancelling plans on a clear day always carries a small flicker of guilt, like I'm wasting something. On a day like this it stops feeling like a betrayal and starts feeling like the obviously correct decision, the one the weather itself is gently making on my behalf so I don't have to feel responsible for it.

By evening the rain usually softens to something more ordinary, and the day resumes its normal shape. But for those few hours — chair, window, tea going lukewarm on the sill, absolutely nowhere I'm supposed to be — staying in stops being an absence of plans and starts being the plan.`,
  },
  {
    slug: "woods-in-early-fog",
    title: "The woods in early fog",
    date: "2026-07-08",
    category: "Autumn",
    excerpt:
      "Everything an hour after sunrise looks like it was painted with too little water. I stood there far longer than I meant to.",
    tags: ["autumn", "walking", "mornings"],
    content: `Everything an hour after sunrise looks like it was painted with too little water — the color present but thinned out, reluctant, like the world hadn't fully committed to being itself yet. I went into the woods early enough to catch it exactly at that point, before the fog burned off and the trees went back to looking merely like trees.

I stood there far longer than I meant to. What was supposed to be a twenty-minute walk turned into the better part of an hour of just standing at the same bend in the path, watching light do something to the mist that I knew wouldn't last and couldn't be rushed either. A few birds moved through it. Nothing else did.

There's a particular quiet the woods have at that hour that they don't have later, once the day has properly started and other people arrive with dogs and coffee and conversation. Early enough, it's just the fog deciding, tree by tree, what it's willing to reveal.

I didn't bring my phone out once, which felt worth noting only after the fact — an entire hour spent looking at something and only that, no photo to prove it happened. It happened anyway. I stood there far longer than I meant to, and I'd do it again tomorrow if the fog obliged.`,
  },
];

const galleryData: (typeof galleryItems.$inferInsert)[] = [
  { caption: "the slow cup", category: "Coffee", order: 0 },
  { caption: "warmest hands", category: "Coffee", order: 1 },
  { caption: "the reread pile", category: "Books", order: 2 },
  { caption: "the long way home", category: "Autumn", order: 3 },
  { caption: "staying in", category: "Thoughts", order: 4 },
  { caption: "market morning", category: "Autumn", order: 5 },
  { caption: "the woods in early fog", category: "Autumn", order: 6 },
  { caption: "a quiet corner", category: "Thoughts", order: 7 },
];

async function seedPosts() {
  const inserted = await db
    .insert(posts)
    .values(postsData)
    .onConflictDoNothing({ target: posts.slug })
    .returning({ slug: posts.slug });
  console.log(`posts: inserted ${inserted.length}, skipped ${postsData.length - inserted.length} (already existed)`);
}

async function seedGallery() {
  const existing = await db
    .select({ caption: galleryItems.caption })
    .from(galleryItems)
    .where(
      inArray(
        galleryItems.caption,
        galleryData.map((g) => g.caption),
      ),
    );
  const existingCaptions = new Set(existing.map((e) => e.caption));
  const toInsert = galleryData.filter((g) => !existingCaptions.has(g.caption));

  if (toInsert.length > 0) {
    await db.insert(galleryItems).values(toInsert);
  }
  console.log(`gallery: inserted ${toInsert.length}, skipped ${galleryData.length - toInsert.length} (already existed)`);
}

async function seedSettings() {
  await db
    .insert(siteSettings)
    .values({
      id: 1,
      readingTitle: "Piranesi",
      readingDetail: "for the second time",
      drinkingDetail: "a cinnamon latte",
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        readingTitle: "Piranesi",
        readingDetail: "for the second time",
        drinkingDetail: "a cinnamon latte",
        updatedAt: new Date(),
      },
    });
  console.log("site_settings: upserted id 1");
}

async function main() {
  await seedPosts();
  await seedGallery();
  await seedSettings();
}

main()
  .then(() => {
    console.log("Seed complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
