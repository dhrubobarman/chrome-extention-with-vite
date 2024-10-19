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

// import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setToken, setUser } from "@/utils/storage";
import { useStore } from "@/providers/storageProvider";

const FormSchema = z.object({
  email: z.string().email("User email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const { dispatch } = useStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO login and setToken
    try {
      const exampleToken = JSON.stringify({ email: data.email });
      const userData = { email: data.email };
      await setToken(exampleToken);
      dispatch({ type: "SET_TOKEN", payload: exampleToken });
      dispatch({ type: "SET_USER_DATA", payload: userData });
      await setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="w-[350px] border-none bg-transparent rounded-none shadow-none">
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
                        <Input
                          className="dark:border-gray-600"
                          placeholder="johndoe@mail.com"
                          {...field}
                        />
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
                          className="dark:border-gray-600"
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
              <a
                className="text-blue-500"
                href="https://www.equip-t.com/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Register
              </a>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
