"use client";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { usePayments } from "@/hooks/usePayments";
import { useEffect, useState } from "react";

export function PricingSection() {
  const { createCheckoutSession, getPackages, creatingCheckoutSession } =
    usePayments();

  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Fetch packages on mount
  useEffect(() => {
    const loadPlans = async () => {
      const res = await getPackages();
      if (!res || !Array.isArray(res)) return;

      // Format plans
      const formatted = res
        .map((pkg: any) => ({
          name: pkg.name,
          price: `$${pkg.charges}`,
          period: pkg.duration_days ? `/${pkg.duration_days} days` : "/month",
          features: [
            `${pkg.credit_limit} email verifications`,
            pkg.duration_days ? `Valid for ${pkg.duration_days} days` : "",
          ].filter(Boolean),
          cta: "Start Now",
          popular: pkg.name.toLowerCase() === "starter", // mark Starter as most popular
          raw: pkg,
        }))
        // Sort Free → Starter → Pro → others
        .sort(
          (a, b) =>
            ["free", "starter", "pro"].indexOf(a.name.toLowerCase()) -
            ["free", "starter", "pro"].indexOf(b.name.toLowerCase())
        );

      setPlans(formatted);
    };

    loadPlans();
  }, []);

  const handleSelectPlan = async (plan: any) => {
    const id = plan.raw?.id ?? null;
    setSelectedPlanId(id);
    try {
      await createCheckoutSession(id, plan.name);
    } finally {
      setSelectedPlanId(null);
    }
  };

  return (
    <section id="pricing" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            Choose the plan that's right for you.
          </p>
        </motion.div>

        {/* Plans Grid */}
        {plans.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name + index}
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
                    <h3 className="mb-1 text-lg capitalize">{plan.name}</h3>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-4xl">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pb-6">
                    <ul className="space-y-3">
                      {(plan.features ?? []).map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      disabled={
                        creatingCheckoutSession &&
                        selectedPlanId === plan.raw?.id
                      }
                      className={`w-full ${
                        plan.popular
                          ? "bg-cyan-500 text-white hover:bg-cyan-600"
                          : "border-border hover:bg-secondary"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      {creatingCheckoutSession &&
                        selectedPlanId === plan.raw?.id &&
                        "..."}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
