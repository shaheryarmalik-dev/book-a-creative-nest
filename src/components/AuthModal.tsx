import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: () => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Ensure the correct form is focused and the other is reset when switching modes
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => {
      if (mode === "login") {
        signupForm.reset({ name: "", email: "", password: "", confirmPassword: "" });
        loginForm.setFocus("email");
      } else {
        loginForm.reset({ email: "", password: "" });
        signupForm.setFocus("email");
      }
    }, 50);
    return () => clearTimeout(id);
  }, [isOpen, mode]);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" }
  });

  const onLoginSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Debug: Log the Supabase URL being used
      console.log('Login attempt with Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      
      toast({
        title: "Login successful!",
        description: "Welcome back to FrameScout Locations",
      });
      
      loginForm.reset();
      onClose();
    } catch (error: any) {
      const message: string =
        error?.message?.toLowerCase().includes("email not confirmed")
          ? "Email not confirmed. Please verify your email or resend the verification."
          : error?.message || "Invalid credentials. Please try again.";
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      // Debug: Log the Supabase URL being used
      console.log('Signup attempt with Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      signupForm.reset();
      onClose();
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message?.includes('already registered')) {
        errorMessage = "This email is already registered. Please log in instead.";
      } else if (error.message?.includes('password')) {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.message?.includes('email')) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message?.includes('Invalid API key')) {
        errorMessage = "Authentication service is not properly configured. Please try again later.";
      } else if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        errorMessage = error.message || "Failed to create account";
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {mode === "login" ? (
              <>
                <LogIn className="h-6 w-6 text-primary" />
                Log In
              </>
            ) : (
              <>
                <UserPlus className="h-6 w-6 text-primary" />
                Sign Up
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" 
              ? "Welcome back! Please enter your credentials." 
              : "Create an account to start booking creative spaces."}
          </DialogDescription>
        </DialogHeader>

        {mode === "login" ? (
          <Form key="login" {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Didn't get the verification email?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={async () => {
                    const email = loginForm.getValues("email");
                    if (!email) {
                      toast({
                        title: "Enter your email",
                        description: "Type your email above, then click resend.",
                        variant: "destructive"
                      });
                      return;
                    }
                    try {
                      const { error } = await supabase.auth.resend({
                        type: "signup",
                        email
                      });
                      if (error) throw error;
                      toast({
                        title: "Verification email sent",
                        description: "Check your inbox and spam folder.",
                      });
                    } catch (err: any) {
                      toast({
                        title: "Couldn't resend email",
                        description: err?.message || "Please try again later.",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  Resend verification
                </button>
              </div>
            </form>
          </Form>
        ) : (
          <Form key="signup" {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="text-primary hover:underline font-medium"
                >
                  Log in
                </button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
