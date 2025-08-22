import { useAppForm } from "../../../../hooks/form.tsx";
import { newsletterSchema, type NewsletterSchema } from "./schema.ts";
import { SubmitButton } from "../../../../components/fields.tsx";

export function NewsletterForm() {
  const form = useAppForm({
    defaultValues: {
      email: "",
    } as NewsletterSchema,
    validators: {
      onDynamic: newsletterSchema,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form.AppForm>
      <form.FormContainer>
        <form.AppField name="email">
          {(field) => <field.TextField mt="md" label="Email" />}
        </form.AppField>
        <SubmitButton mt="lg">Submit</SubmitButton>
      </form.FormContainer>
    </form.AppForm>
  );
}
