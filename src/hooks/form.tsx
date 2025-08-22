import { createFormHook, revalidateLogic } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import {
  TextField,
  TextareaField,
  SubmitButton,
  FormContainer,
} from "../components/fields";

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

  return form;
};

export { withForm, withFieldGroup };
