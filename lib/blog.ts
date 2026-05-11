export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: string;
};

export const posts: Post[] = [
  {
    slug: "scaling-temporal-workers",
    title: "How I scaled Temporal workers from 50 to 2.4M workflows/day",
    excerpt:
      "What actually broke between BullMQ-scale and Temporal-scale — payload codecs, autoscaling signals, and the replay cost nobody tells you about.",
    date: "2026-03-18",
    readingTime: "8 min",
    tags: ["Temporal", "Scalability", "Infrastructure"],
    body: `When we crossed roughly 200k workflows/day, three things broke at once.

## 1. Payload size

Temporal's event history caps individual events around 2MB. The moment an activity returned an LLM completion plus context, we hit it. The fix is a payload codec that transparently offloads anything past a threshold to S3 and replaces it with a pointer. The worker decodes on the way back in. No workflow code changes.

## 2. Autoscaling that doesn't thrash

Scaling on queue depth alone gives you a saw-tooth. We combined queue depth with smoothed activity P95 into a single metric, exposed it to Prometheus, and let HPA scale on that. A 60-second cooldown stopped the flapping.

## 3. Replay cost is real

A workflow that has run for two days replays its full event history on every worker restart. Long workflows + frequent deploys = wasted CPU. We split long-running flows into child workflows so each piece replays only what it owns.

## Takeaway

Temporal scales beautifully, but it punishes naive defaults. Codec, smoothed autoscaling signals, and child-workflow decomposition are the three levers I'd reach for first.`,
  },
  {
    slug: "llm-rate-limits-in-production",
    title: "Handling LLM rate limits in production",
    excerpt:
      "Token buckets, provider fallback, and the small bit of math that turned a 38% latency tail into a non-event.",
    date: "2026-02-04",
    readingTime: "6 min",
    tags: ["AI", "Reliability", "Node.js"],
    body: `LLM providers give you two numbers: requests-per-minute and tokens-per-minute. The naive thing is to retry on 429. The better thing is to never get one.

## Token bucket, not retry

A Redis-backed token bucket per provider key, sized to 90% of the published limit, gates every call. If the bucket is empty, the call queues with a short timeout. Latency goes up under burst, but you stop generating 429s entirely.

## Provider fallback

Pair OpenAI with Claude (or vice versa). If the primary bucket is dry past a deadline, fall through to the secondary. The secret is making the prompt + tools provider-agnostic at the boundary so fallback isn't a code branch.

## Adaptive backoff

When you do get a 429 (you will, edges exist), exponential backoff with jitter is fine — but seed the bucket with the Retry-After header if the provider sends one. Most do.

## Result

A 38% drop in P95 during campaign bursts on the social platform. More importantly: zero customer-visible failures.`,
  },
  {
    slug: "multi-platform-oauth",
    title: "Building multi-platform OAuth integrations that don't rot",
    excerpt:
      "Every social platform has its own token refresh quirks. Here's the abstraction that survived five of them.",
    date: "2026-01-12",
    readingTime: "7 min",
    tags: ["OAuth", "Integrations", "Backend"],
    body: `LinkedIn rotates refresh tokens. X gives you a long-lived bearer. Instagram's Graph token expires every 60 days unless you refresh it. Facebook's depends on which product you're using.

The shared truth: there's a credential, it expires, and something has to refresh it before it does.

## The credential service

One service owns the lifecycle: store (encrypted with KMS), refresh, and emit. Workflows that need to act on behalf of a user subscribe to "credential ready" events rather than touching tokens directly.

## Refresh windows, not refresh-on-401

Don't wait for the 401. Schedule a refresh at 80% of the token's lifetime. This avoids the worst failure mode: a queued post firing exactly when the token has just expired.

## Provider adapters, thin

Each platform's adapter only knows how to: exchange a code, refresh a token, and revoke. Everything else — the post itself, the analytics fetch — lives in shared code that takes a fresh credential as an argument.

The result is an integration surface that grew from 2 to 5 platforms without rewriting the surrounding system.`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
