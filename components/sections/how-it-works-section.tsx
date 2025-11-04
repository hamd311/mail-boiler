"use client";
import { motion } from "motion/react";
import { Mail, Zap, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Enter Email",
    description: "Type in a single email or upload a list of emails you want to verify.",
    step: 1,
    gradient: "from-[#10b981] to-[#06b6d4]",
  },
  {
    icon: Zap,
    title: "Verify Instantly",
    description: "Our system checks the email against multiple validation layers.",
    step: 2,
    gradient: "from-[#06b6d4] to-[#3b82f6]",
  },
  {
    icon: CheckCircle,
    title: "Get Clean Results",
    description: "Receive detailed results with deliverability status and confidence scores.",
    step: 3,
    gradient: "from-[#3b82f6] to-[#8b5cf6]",
  },
];

export function HowItWorks() {
  return (
    <section className="from-background to-secondary/30 relative overflow-hidden bg-gradient-to-b py-20 sm:py-32">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#10b981]/5 via-[#06b6d4]/5 to-[#3b82f6]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-gradient-to-r from-[#10b981]/10 via-[#06b6d4]/10 to-[#3b82f6]/10 px-4 py-2"
          >
            <span className="text-sm">How it works</span>
          </motion.div>

          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            How It{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                Works
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute right-0 -bottom-2 left-0 -z-0 h-3 origin-left bg-gradient-to-r from-[#10b981]/20 via-[#06b6d4]/20 to-[#3b82f6]/20"
              />
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Three simple steps to verify your emails
          </p>
        </motion.div>

        {/* Steps - Desktop Layout */}
        <div className="relative mx-auto hidden max-w-5xl md:block">
          {/* Connecting Line - More subtle */}
          <div className="absolute top-16 right-[16.66%] left-[16.66%] h-[2px]">
            <div className="from-border via-border to-border h-full bg-gradient-to-r" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 h-full origin-left bg-gradient-to-r from-[#10b981]/60 via-[#06b6d4]/60 to-[#3b82f6]/60"
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col items-center"
              >
                {/* Icon Container - Cleaner without excessive glow */}
                <div className="relative mb-8">
                  {/* Very subtle background glow - much less intense */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-10 blur-2xl`}
                  />

                  {/* Main icon container */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Outer ring - cleaner border */}
                    <div className="bg-card border-border flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md">
                      {/* Inner gradient circle */}
                      <div
                        className={`h-14 w-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Step number badge - more subtle */}
                    <div
                      className={`absolute -top-1 -right-1 h-7 w-7 rounded-full bg-gradient-to-br ${step.gradient} border-background flex items-center justify-center border-2 text-sm text-white shadow-md`}
                    >
                      {step.step}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-2 text-center">
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator - More visible but not overwhelming */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.5 }}
                    className="absolute top-16 -right-5 hidden lg:block"
                  >
                    <div className={`rounded-full bg-gradient-to-r p-1 ${step.gradient}`}>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile Layout */}
        <div className="mx-auto max-w-md space-y-8 md:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="bg-border absolute top-20 left-10 h-16 w-[2px]">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    className={`w-full bg-gradient-to-b ${step.gradient} origin-top opacity-60`}
                  />
                </div>
              )}

              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  {/* Subtle glow */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-10 blur-xl`}
                  />

                  <div className="bg-card border-border relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-md">
                    <div
                      className={`h-14 w-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Step number badge */}
                    <div
                      className={`absolute -top-1 -right-1 h-7 w-7 rounded-full bg-gradient-to-br ${step.gradient} border-background flex items-center justify-center border-2 text-sm text-white shadow-md`}
                    >
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 pt-2">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
