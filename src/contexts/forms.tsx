import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { type AnyFormApi } from "@tanstack/react-form";
import { Derived } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";

interface FormsContextType {
  forms: Record<string, AnyFormApi>;
  addForm: (name: string, form: AnyFormApi) => void;
  removeForm: (name: string) => void;
}

export const FormsContext = createContext({
  forms: {},
} as FormsContextType);

export function FormsProvider({ children }: PropsWithChildren) {
  const [forms, setForms] = useState<Record<string, AnyFormApi>>({});

  const addForm = useCallback((name: string, form: AnyFormApi) => {
    setForms((prev) => ({ ...prev, [name]: form }));
  }, []);

  const removeForm = useCallback((name: string) => {
    setForms((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const value = useMemo(
    () => ({ forms, addForm, removeForm }),
    [forms, addForm, removeForm],
  );

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
}

export function useForms() {
  const formsContext = useContext(FormsContext);

  const mergedFormStores = useMemo(() => {
    const stores = Object.values(formsContext.forms).map((form) => form.store);

    return new Derived({
      deps: stores,
      fn: () => {
        return Object.entries(formsContext.forms).reduce(
          (prev, [name, curr]) => {
            prev[name as never] = curr.store.state;
            return prev;
          },
          {} as {
            [K in keyof typeof formsContext.forms]: (typeof formsContext.forms)[K]["store"]["state"];
          },
        );
      },
    });
  }, [formsContext]);

  // Needed, otherwise reactivity will not occur
  useLayoutEffect(() => {
    return mergedFormStores.mount();
  }, [mergedFormStores]);

  const formsState = useStore(mergedFormStores);

  function submitAll() {
    Object.values(formsContext.forms).forEach((form) => form.handleSubmit());
  }

  const forms = formsContext.forms;

  return {
    formsState,
    submitAll,
    forms,
  };
}
