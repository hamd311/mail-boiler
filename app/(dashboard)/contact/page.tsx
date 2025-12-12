"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {motion} from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputV2 } from "@/components/ui/inputv2";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import useEmail from "@/hooks/use-email";
import { ArrowLeft, CheckCircle2, Clock, Headphones, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const {sendEmail} = useEmail();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resp = await sendEmail(values);
    toast({title:resp?.message,type: "background"});
    if(resp.success)
    {
      form.reset()
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50 relative overflow-hidden">
      {/* Animated Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-gradient-to-bl from-[#06b6d4]/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-[#3b82f6]/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 right-1/4 text-[#10b981]/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Mail className="h-32 w-32" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-[#06b6d4]/10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <MessageSquare className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-16 text-[#3b82f6]/10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Send className="h-28 w-28" />
        </motion.div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-start">
            {/* Left Column - Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  Get in Touch
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-muted-foreground"
                >
                  Have questions about our email verification service? We're here to help!
                </motion.p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border/50 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] text-white shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours during business days
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border/50 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] text-white shrink-0">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1">Dedicated Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team is ready to assist with any questions or concerns
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border/50 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#10b981] text-white shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1">Expert Guidance</h3>
                    <p className="text-sm text-muted-foreground">
                      Get help with technical questions and best practices
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Direct Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-lg bg-gradient-to-br from-[#10b981]/10 via-[#06b6d4]/10 to-[#3b82f6]/10 border border-[#10b981]/20 p-6"
              >
                <h3 className="mb-3">Direct Contact</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prefer phone? Reach us directly at:
                </p>
                <a
                  href="tel:+17087400561"
                  className="inline-flex items-center gap-2 text-[#10b981] hover:text-[#06b6d4] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +1 708 740 0561
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl bg-white/70 backdrop-blur-md border border-border/50 p-8 shadow-xl"
            >
              <div className="mb-6">
                <h2 className="mb-2">Send us a message</h2>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            startIcon={<User className="h-4 w-4" />}
                            className="h-11 bg-background/50 border-gray-300 focus-visible:border-[#10b981]/50 focus-visible:ring-[#10b981]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                            startIcon={<Mail className="h-4 w-4" />}
                            className="h-11 bg-background/50 border-gray-300 focus-visible:border-[#06b6d4]/50 focus-visible:ring-[#06b6d4]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this regarding?"
                            {...field}
                            startIcon={<MessageSquare className="h-4 w-4" />}
                            className="h-11 bg-background/50 border-gray-300 focus-visible:border-[#3b82f6]/50 focus-visible:ring-[#3b82f6]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="min-h-[140px] bg-background/50 resize-none border-gray-300 focus-visible:border-[#10b981]/50 focus-visible:ring-[#10b981]/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="group w-full h-11 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}