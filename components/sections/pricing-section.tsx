"use client";
import { motion } from "motion/react";
import { Badge, Check, Sparkles } from "lucide-react";
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
    price: "$29",
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
    price: "$99",
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
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited verifications",
      "Custom API endpoints",
      "White-label solution",
      "SLA guarantee",
      "On-premise deployment option",
      "Custom integrations",
      "Dedicated support team",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                className={`flex h-full flex-col ${
                  plan.popular ? "scale-105 border-[#10b981] shadow-xl" : "border-border"
                }`}
              >
                <CardHeader className="pb-8">
                  {plan.popular && (
                    <Badge className="mb-4 w-fit border-0 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white hover:opacity-90"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    // onClick={() => onNavigate("/signup")}
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
