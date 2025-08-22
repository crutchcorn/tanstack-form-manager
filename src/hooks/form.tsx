import { createFormHook, revalidateLogic } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import {
  TextField,
  TextareaField,
  SubmitButton,
  FormContainer,
} from "../components/fields";
import { useContext, useLayoutEffect } from "react";
import { FormsContext } from "../contexts/forms.tsx";

const {
  useAppForm: useInnerAppForm,
  withForm,
  withFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    FormContainer,
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export const useAppForm: typeof useInnerAppForm = (props) => {
  const form = useInnerAppForm({
    validationLogic: revalidateLogic(),
    ...props,
  });

  const context = useContext(FormsContext);

  // These are stable references, but `context` itself is not.
  const addForm = context.addForm;
  const removeForm = context.removeForm;

  useLayoutEffect(() => {
    const id = crypto.randomUUID();
    addForm(id, form);
    return () => {
      removeForm(id);
    };
  }, [addForm, removeForm, form]);

  return form;
};

export { withForm, withFieldGroup };
