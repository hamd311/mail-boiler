"use client";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/sections/pricing-section";



export default function Pricing() {


    return (
        <div className="min-h-screen via-cyan-50/30 relative overflow-hidden">
      
            <PricingSection  margin/>
      
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}