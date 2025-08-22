import { Button, Container, Text, Title } from "@mantine/core";
import { ProductDetails } from "./views/product-details";
import { useForms } from "./contexts/forms";

function App() {
  const forms = useForms();

  const errors = Object.values(forms.formsState).flatMap((form) => {
    return form.errors;
  });

  return (
    <Container mt="xl">
      <Title order={1}>Product Details</Title>
      <Text mt={"sm"} mb={"md"}>
        This demonstrates controlling two forms using a single context
      </Text>
      <Button mb={"xl"} onClick={() => forms.submitAll()}>
        Submit all
      </Button>
      {errors.length > 0 && (
        <Text color="red" mb={"xl"}>
          There are {errors.length} errors in the forms
        </Text>
      )}
      <ProductDetails />
    </Container>
  );
}

export default App;
