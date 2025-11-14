"use client";
import { motion } from "motion/react";
import { Mail, Zap, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Enter Email",
    description:
      "Type in a single email or upload a list of emails you want to verify.",
    step: 1,
    color: "bg-emerald-500",
  },
  {
    icon: Zap,
    title: "Verify Instantly",
    description:
      "Our system checks the email against multiple validation layers.",
    step: 2,
    color: "bg-cyan-500",
  },
  {
    icon: CheckCircle,
    title: "Get Clean Results",
    description:
      "Receive detailed results with deliverability status and confidence scores.",
    step: 3,
    color: "bg-indigo-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <span className="text-sm text-muted-foreground">How it works</span>
          </div>

          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            How It{" "}
            <span className="text-cyan-600 dark:text-cyan-400">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Three simple steps to verify your emails
          </p>
        </motion.div>

        {/* Steps - Desktop Layout */}
        <div className="relative mx-auto hidden max-w-5xl md:block">
          {/* Connecting Line */}
          <div className="absolute top-10 left-[16.66%] right-[16.66%] h-[2px] bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.3,
              }}
              className="h-full origin-left bg-cyan-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="relative flex flex-col items-center"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    {/* Main icon circle */}
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${step.color}`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-cyan-500 text-xs text-white shadow-md">
                      {step.step}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-2 text-center">
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
                    className="absolute top-10 -right-4 hidden lg:block"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile Layout */}
        <div className="mx-auto max-w-md space-y-6 md:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="relative"
            >
              {/* Connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-20 h-12 w-[2px] bg-border">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="h-full w-full origin-top bg-cyan-500"
                  />
                </div>
              )}

              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full ${step.color}`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-cyan-500 text-xs text-white shadow-md">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 pt-2">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
