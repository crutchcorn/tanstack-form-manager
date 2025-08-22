import * as v from "valibot";

export const reviewMaxLength = 300;

export const reviewsSchema = v.object({
  name: v.string(),
  email: v.pipe(v.string(), v.email("This is not a valid email")),
  review: v.pipe(
    v.string(),
    v.maxLength(
      reviewMaxLength,
      `Your review must not be longer than ${reviewMaxLength} characters`,
    ),
  ),
});

export type ReviewsSchema = v.InferInput<typeof reviewsSchema>;
