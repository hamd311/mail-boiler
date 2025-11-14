"use client";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out MailVerify",
    features: [
      "100 email verifications",
      "Basic API access",
      "Email support",
      "24-hour result history",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Starter",
    price: "$10",
    period: "/month",
    description: "For small businesses and startups",
    features: [
      "10,000 email verifications",
      "Full API access",
      "Priority email support",
      "Bulk upload (CSV, Excel)",
      "30-day result history",
      "Detailed analytics",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro",
    price: "$30",
    period: "/month",
    description: "For growing teams and agencies",
    features: [
      "50,000 email verifications",
      "Full API access",
      "24/7 priority support",
      "Bulk upload (CSV, Excel)",
      "Unlimited result history",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Simple,{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Choose the plan that&apos;s right for you. All plans include a
            14-day free trial.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card
                className={`flex h-full flex-col transition-all duration-300 ${
                  plan.popular
                    ? "border-cyan-500 shadow-lg shadow-cyan-500/10"
                    : "border-border hover:border-cyan-500/30"
                }`}
              >
                <CardHeader className="pb-6">
                  {plan.popular && (
                    <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-600 dark:text-cyan-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most Popular
                    </div>
                  )}
                  <h3 className="mb-1 text-lg">{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-cyan-500 text-white hover:bg-cyan-600"
                        : "border-border hover:bg-secondary"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
