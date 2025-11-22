"use client";

import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "../queries/use-login";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const loginFormSchema = z.object({
  username: z.string().min(1, { error: "Username wajib diisi" }),
  password: z.string().min(6, { error: "Password harus memiliki 6 karakter atau lebih" }),
});

export function UserAuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const formId = "user-auth-form";
  const usernameId = `${formId}-username`;
  const passwordId = `${formId}-password`;

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useLogin({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Login successful:", data);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    mutate(data);
  };

  return (
    <div
      className={cn("grid gap-6", className)}
      {...props}
    >
      <div className="grid w-full max-w-xl items-start gap-4">
        {isError && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Gagal saat proses login.</AlertTitle>
            <AlertDescription>{(error as any)?.response.data.message}</AlertDescription>
          </Alert>
        )}
        <form
          id={formId}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={usernameId}>Username</FieldLabel>
                  <Input
                    {...field}
                    id={usernameId}
                    aria-invalid={fieldState.invalid}
                    placeholder="Username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={passwordId}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={passwordId}
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button disabled={isPending}>
                {isPending && <Spinner />}
                Login
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
