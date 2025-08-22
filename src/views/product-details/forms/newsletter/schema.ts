import * as v from "valibot";

export const newsletterSchema = v.object({
  email: v.pipe(v.string(), v.email("This is not a valid email")),
});

export type NewsletterSchema = v.InferInput<typeof newsletterSchema>;
