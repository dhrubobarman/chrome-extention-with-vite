import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormSchema = z.object({
  email: z.string().email("User email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormProps = {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm({ setIsUserLoggedIn }: LoginFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsUserLoggedIn(true);
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl text-center">Login🔑</CardTitle>
            <CardDescription className="text-center">
              You need to login first to use capture library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-wrap">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="mt-4 text-sm mx-auto">
              Don't have an account?{" "}
              <a className="text-blue-500" href="https://www.equip-t.com/">
                Register
              </a>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
