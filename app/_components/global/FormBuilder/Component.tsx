'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/app/_components/ui/button';
import { FormBuilderProps } from '@/types/components/form';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import { buildInitialFormState } from '@/app/_components/global/FormBuilder/buildInitialFormState';
import { cn } from '@/app/_utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { useRouter } from 'next/navigation';

const fieldComponents: Record<string, any> = {
  input: Input,
  textArea: Textarea,
};

export const FormBuilderBlock = ({ form }: FormBuilderProps) => {
  const {
    _key: formID,
    fields,
    email,
    subject,
    submitButtonLabel = 'Submit',
    confirmationMessage,
    confirmationType,
    redirect,
  } = form || {};

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>();
  const [error, setError] = React.useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const formMethods = useForm({
    defaultValues: buildInitialFormState(fields),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const onSubmit = async (data: any) => {
    setError(undefined);

    try {
      setIsLoading(true);

      const req = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: data,
          email,
          subject: subject || 'You have mail',
        }),
      });

      const res = await req.json();

      if (req.status >= 400) {
        setIsLoading(false);

        setError({
          message: res.errors?.[0]?.message || 'Internal Server Error',
          status: res.status,
        });

        return;
      }

      setIsLoading(false);
      setHasSubmitted(true);

      if (confirmationType === 'redirect' && redirect) {
        router.push(redirect);
      }
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
      setError({
        message: 'Something went wrong.',
      });
    }
  };

  return (
    <Form {...formMethods}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <CustomPortableText value={confirmationMessage} />
      )}

      {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}

      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}

      {!hasSubmitted && !isLoading && (
        <form
          id={formID}
          onSubmit={handleSubmit(onSubmit)}
          className={cn('mx-auto w-full')}
        >
          <div className="mb-4 space-y-4 last:mb-0">
            {fields &&
              fields?.map((field, i) => {
                if (field.type === 'select') {
                  return (
                    <FormField
                      key={i}
                      control={control}
                      /* @ts-ignore */
                      name={field.name!}
                      render={({ field: controllerField }) => (
                        <FormItem>
                          <FormLabel>{field.name}</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={controllerField.onChange}
                              defaultValue={controllerField.value}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    field.placeholder || 'Select an option'
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {field.options.map((option: string) => (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className="transition-colors duration-75 ease-in-out hover:cursor-pointer data-[highlighted]:bg-gray-200 data-[state=checked]:bg-primary-accent data-[state=checked]:text-white"
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {field.description && (
                            <FormDescription>
                              {field.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                if (field.type === 'checkbox') {
                  return (
                    <FormField
                      key={i}
                      control={control}
                      /* @ts-ignore */
                      name={field.name!}
                      render={({ field: controllerField }) => (
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={controllerField.value}
                              onCheckedChange={controllerField.onChange}
                              className="transition-colors duration-75 ease-in-out hover:cursor-pointer data-[state=checked]:border-primary-accent data-[state=checked]:bg-primary-accent data-[state=checked]:text-white"
                            />
                          </FormControl>
                          {!field?.description ? (
                            <FormLabel>{field.name}</FormLabel>
                          ) : (
                            <FormDescription className="">
                              {field.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                const Component = fieldComponents[field.type!];

                if (!Component) return null;

                return (
                  <FormField
                    key={i}
                    control={control}
                    /* @ts-ignore */
                    name={field.name!}
                    render={({ field: controllerField }) => (
                      <FormItem>
                        <FormLabel>{field.name}</FormLabel>
                        <FormControl>
                          {field.type === 'select' ? (
                            <Component {...controllerField}>
                              {field.options.map((option: any) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </Component>
                          ) : (
                            <Component
                              type={field.inputType}
                              {...controllerField}
                            />
                          )}
                        </FormControl>
                        {field.description && (
                          <FormDescription>{field.description}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
          </div>

          <Button
            form={formID}
            disabled={isLoading}
            type="submit"
            variant="default"
          >
            {submitButtonLabel}
          </Button>
        </form>
      )}
    </Form>
  );
};
