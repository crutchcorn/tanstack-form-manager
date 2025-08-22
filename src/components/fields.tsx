import { useStore } from "@tanstack/react-form";
import { useFieldContext, useFormContext } from "../hooks/form-context";
import {
  Button,
  type ButtonProps,
  Textarea,
  type TextareaProps,
  TextInput,
  type TextInputProps,
} from "@mantine/core";
import type { HTMLAttributes } from "react";

export function TextField(
  props: Omit<TextInputProps, "error" | "value" | "onChange" | "onBlur">,
) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <TextInput
      {...props}
      error={errors[0]?.message}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}

export function TextareaField({
  error,
  ...props
}: Omit<TextareaProps, "value" | "onChange" | "onBlur">) {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Textarea
      {...props}
      error={errors[0]?.message ?? error}
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  );
}

export function SubmitButton({
  disabled,
  loading,
  ...props
}: Omit<ButtonProps, "onClick">) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          {...props}
          onClick={() => form.handleSubmit()}
          loading={loading || isSubmitting}
          disabled={disabled || isSubmitting}
        />
      )}
    </form.Subscribe>
  );
}

export function FormContainer({
  children,
  ...props
}: Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">) {
  const formVal = useFormContext();

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        void formVal.handleSubmit();
      }}
    >
      {children}
    </form>
  );
}
