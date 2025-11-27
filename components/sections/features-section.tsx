"use client";
import { motion } from "motion/react";
import { Zap, Database, Shield, BarChart3, Clock, Code } from "lucide-react";
import { Card } from "../ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    color: "bg-cyan-500",
  },
  {
    icon: Database,
    title: "Bulk Verification",
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    color: "bg-purple-500",
  },
  {
    icon: BarChart3,
    title: "Real-Time Results",
    color: "bg-emerald-500",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    color: "bg-sky-500",
  },
  {
    icon: Code,
    title: "Users Friendly",
    color: "bg-indigo-500",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden bg-background" id="features">
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
            <span className="text-sm text-muted-foreground">Why choose us</span>
          </div>

          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Why choose{" "}
            <span className="text-cyan-600 dark:text-cyan-400">MailBoiler</span>
            ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful features to help you maintain a clean and valid email list
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card className="group h-full border border-border bg-card p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg">
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-2 text-xl">{feature.title}</h3>
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
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-muted-foreground">
            Ready to get started with MailBoiler?
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  "bg-cyan-500",
                  "bg-blue-500",
                  "bg-purple-500",
                  "bg-emerald-500",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${color} border-2 border-background shadow-sm`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
