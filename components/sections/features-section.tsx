"use client";
import { motion } from "motion/react";
import { Zap, Database, Shield, BarChart3, Clock, Code } from "lucide-react";
import { Card } from "../ui/card";
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Verify emails in milliseconds with our optimized infrastructure.",
    gradient: "from-[#10b981] to-[#06b6d4]",
  },
  {
    icon: Database,
    title: "Bulk Verification",
    description: "Upload and verify thousands of emails at once with ease.",
    gradient: "from-[#06b6d4] to-[#3b82f6]",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties.",
    gradient: "from-[#3b82f6] to-[#8b5cf6]",
  },
  {
    icon: BarChart3,
    title: "Real-Time Results",
    description: "Get instant feedback on email validity and deliverability.",
    gradient: "from-[#10b981] to-[#06b6d4]",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Our API is always online and ready to serve your requests.",
    gradient: "from-[#06b6d4] to-[#3b82f6]",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Simple REST API with comprehensive documentation and SDKs.",
    gradient: "from-[#3b82f6] to-[#8b5cf6]",
  },
];

export function Features() {
  return (
    <section className="from-background via-secondary/20 to-background relative overflow-hidden bg-gradient-to-b py-20 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#10b981]/5 to-transparent blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-[#3b82f6]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-gradient-to-r from-[#10b981]/10 via-[#06b6d4]/10 to-[#3b82f6]/10 px-4 py-2"
          >
            <span className="text-sm">Why choose us</span>
          </motion.div>

          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Why choose{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                MailVerify
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute right-0 -bottom-2 left-0 -z-0 h-3 origin-left bg-gradient-to-r from-[#10b981]/20 via-[#06b6d4]/20 to-[#3b82f6]/20"
              />
            </span>
            ?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Powerful features to help you maintain a clean and valid email list
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <Card className="border-border/50 bg-card hover:border-border relative h-full overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
                {/* Subtle gradient glow on hover */}
                <div
                  className={`absolute -top-24 -right-24 h-48 w-48 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.03]`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative mb-4"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-2 text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Ready to get started with MailVerify?</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  "from-[#10b981] to-[#06b6d4]",
                  "from-[#06b6d4] to-[#3b82f6]",
                  "from-[#3b82f6] to-[#8b5cf6]",
                  "from-[#10b981] to-[#3b82f6]",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${gradient} border-background border-2 shadow-sm`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">Join 10,000+ developers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
