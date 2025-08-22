import { useAppForm } from "../../../../hooks/form.tsx";
import {
  reviewMaxLength,
  reviewsSchema,
  type ReviewsSchema,
} from "./schema.ts";
import { SubmitButton } from "../../../../components/fields.tsx";

export function ProductReviewForm() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      review: "",
    } as ReviewsSchema,
    validators: {
      onDynamic: reviewsSchema,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form.AppForm>
      <form.FormContainer>
        <form.AppField name="name">
          {(field) => <field.TextField mt="md" label="Name" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField mt="md" label="Email" />}
        </form.AppField>
        <form.AppField name="review">
          {(field) => {
            const tooLong = field.state.value?.length >= reviewMaxLength;

            return (
              <field.TextareaField
                mt={"md"}
                label="Review"
                descriptionProps={{
                  style: tooLong ? { color: "red" } : undefined,
                }}
                error={tooLong ? true : undefined}
                description={`${field.state.value?.length} / ${reviewMaxLength} characters`}
              />
            );
          }}
        </form.AppField>
        <SubmitButton mt="lg">Submit</SubmitButton>
      </form.FormContainer>
    </form.AppForm>
  );
}
