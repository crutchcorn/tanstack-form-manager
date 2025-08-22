import { NewsletterForm } from "./forms/newsletter";
import { ProductReviewForm } from "./forms/reviews";
import { Title } from "@mantine/core";

export function ProductDetails() {
  return (
    <>
      <Title order={2}>Product Review</Title>
      <ProductReviewForm />
      <Title mt={"xl"} order={2}>
        Newsletter Signup
      </Title>
      <NewsletterForm />
    </>
  );
}
