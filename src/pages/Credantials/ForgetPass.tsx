/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";

// ✅ Zod schema for validation
const formSchema = z.object({
  email: z.email("Enter a valid email"),
});

type EmailFormValues = z.infer<typeof formSchema>;

export function ForgetPass() {
  const navigate = useNavigate()
  const [ForgetPass]=useForgetPasswordMutation()
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    const emailInfo = {
      email: data.email,
    };

    try {
      const result = await ForgetPass(emailInfo).unwrap();
      toast.success("Check Your Email");
      if(result.success === true){
        navigate('/verify', {state:data.email})
      }
    } catch (err) {
       toast.error((err as any).message);;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-sm shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
           Reset Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="cursor-pointer w-full bg-[#4B1E2F] hover:bg-[#3a1725]"
              >
                Send OTP
              </Button>
            </form>
          </Form>
        </CardContent>

        
      </Card>
    </div>
  );
}
