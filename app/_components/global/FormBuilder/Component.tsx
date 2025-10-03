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
    _id: formId,
    fields,
    formFields,
    email,
    subject,
    subjectLine,
    submitButtonLabel = 'Submit',
    confirmationMessage,
    confirmationType,
    redirect,
  } = form || {};
  
  // Use formFields if fields is not available (for backward compatibility)
  const actualFields = formFields || fields;
  
  // Use _id if _key is not available
  const actualFormID = formID || formId;

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>();
  const [error, setError] = React.useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const formMethods = useForm({
    defaultValues: buildInitialFormState(actualFields || []),
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
          subject: subject || subjectLine || 'You have mail',
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
          id={actualFormID}
          onSubmit={handleSubmit(onSubmit)}
          className={cn('mx-auto w-full min-w-full')}
        >
          <div className="mb-6 space-y-6 last:mb-0">
            {actualFields &&
              actualFields?.map((field, i) => {
                if (field.type === 'select') {
                  return (
                    <FormField
                      key={i}
                      control={control}
                      /* @ts-ignore */
                      name={field.name!}
                      render={({ field: controllerField }) => (
                        <FormItem>
                          <FormLabel className="text-[#313E4E] font-semibold text-sm mb-2 block">
                            {field.name}
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={controllerField.onChange}
                              defaultValue={controllerField.value}
                            >
                              <SelectTrigger className="h-12 rounded-xl border-2 border-[#B0DEE6]/30 bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 focus:ring-2 focus:ring-[#368DB1]/50 focus:border-[#368DB1] hover:border-[#368DB1]/50 hover:shadow-xl">
                                <SelectValue
                                  placeholder={
                                    field.placeholder || 'Select an option'
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white rounded-xl border border-[#B0DEE6]/20 shadow-xl">
                                {field.options.map((option: string) => (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className="transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-[#B0DEE6]/10 data-[highlighted]:bg-[#368DB1]/10 data-[state=checked]:bg-[#368DB1] data-[state=checked]:text-white rounded-lg"
                                  >
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {field.description && (
                            <FormDescription className="text-[#313E4E]/70 text-sm mt-2">
                              {field.description}
                            </FormDescription>
                          )}
                          <FormMessage className="text-red-600 text-sm mt-1" />
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
                        <FormItem className="flex items-center gap-x-3 space-y-0 p-4 rounded-xl bg-gradient-to-r from-[#B0DEE6]/5 to-[#FFE48C]/5 border border-[#B0DEE6]/20">
                          <FormControl>
                            <Checkbox
                              checked={controllerField.value}
                              onCheckedChange={controllerField.onChange}
                              className="transition-all duration-300 ease-in-out hover:cursor-pointer data-[state=checked]:border-[#368DB1] data-[state=checked]:bg-[#368DB1] data-[state=checked]:text-white hover:scale-110"
                            />
                          </FormControl>
                          {!field?.description ? (
                            <FormLabel className="text-[#313E4E] font-medium cursor-pointer">{field.name}</FormLabel>
                          ) : (
                            <FormDescription className="text-[#313E4E]/70 text-sm">
                              {field.description}
                            </FormDescription>
                          )}
                          <FormMessage className="text-red-600 text-sm" />
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
                        <FormLabel className="text-[#313E4E] font-semibold text-sm mb-2 block">
                          {field.name}
                        </FormLabel>
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
                          <FormDescription className="text-[#313E4E]/70 text-sm mt-2">
                            {field.description}
                          </FormDescription>
                        )}
                        <FormMessage className="text-red-600 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                );
              })}
          </div>

          <Button
            form={actualFormID}
            disabled={isLoading}
            type="submit"
            variant="umi-primary"
            size="lg"
            className="px-12 py-4 text-lg font-semibold"
          >
            {submitButtonLabel}
          </Button>
        </form>
      )}
    </Form>
  );
};
