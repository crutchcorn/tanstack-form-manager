import { ProductReviewForm } from "./views/product-details/forms/reviews";
import { Container, Title } from "@mantine/core";

function App() {
  return (
    <Container mt="xl">
      <Title>Product Review</Title>
      <ProductReviewForm />
    </Container>
  );
}

export default App;
