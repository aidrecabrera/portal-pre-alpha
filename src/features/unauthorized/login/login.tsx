"use client";

import { AnimatedComponent } from "@/components/anim/animated-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/supabase/authHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLineUpRight, GoogleLogo, XCircle } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const LoginPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: postLogin } = useLogin();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    postLogin(
      { email, password },
      {
        onSuccess: () => {
          window.location.reload();
        },
        onError: (error) => {
          form.setError("root", {
            type: "error",
            message: error.message,
          });
          throw new Error("Failed to login");
        },
      }
    );
  };
  // TODO: add announcement log in the login page
  return (
    <div className="h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <div className="relative w-full h-full">
          <img
            src="/corjesu-magic.jpg"
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-red-700 bg-opacity-65">
            <div className="absolute top-0 left-0 flex flex-row items-center justify-start gap-3 m-8 jc">
              <h2 className="text-2xl font-medium text-white font-tight">
                Cor Jesu Portal
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login to Portal</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter your student credentials to access the portal.
            </p>
          </div>
          <Form {...form}>
            {form.formState.errors.root && (
              <AnimatedComponent>
                <Card className="-mb-4 rounded-md shadow-none bg-destructive/10 border-destructive/10">
                  <div className="flex flex-row items-center justify-center gap-1 p-4">
                    <span>
                      <XCircle size={20} color="red" />
                    </span>
                    <h1 className="text-red-500 text-">
                      {form.formState.errors.root.message}
                    </h1>
                  </div>
                </Card>
              </AnimatedComponent>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="inline-block ml-auto text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <Button variant="outline" className="w-full">
            <span className="mr-2">
              <GoogleLogo />
            </span>
            Login with Google
          </Button>
          <div className="mt-4 text-xs text-center">
            Received an access code?{" "}
            <Link href="#" className="underline">
              <Badge className="text-xs" variant="outline">
                Create your password{" "}
                <span>
                  <ArrowLineUpRight />
                </span>
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
