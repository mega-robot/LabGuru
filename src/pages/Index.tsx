import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { LabCard } from "@/components/landing/LabCard";
import { PageTransition, FadeIn, SlideUp } from "@/components/animations/PageTransition";
import { Code2, Cpu } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <div className="min-h-[calc(100vh-4rem)] flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    CS Cluster • RVCE
                  </div>
                </FadeIn>
                
                <SlideUp delay={0.1}>
                  <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                    Lab<span className="text-primary">Guru</span>
                  </h1>
                </SlideUp>
                
                <SlideUp delay={0.2}>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Welcome to your second year virtual lab assistant for the CS Cluster at RVCE
                  </p>
                </SlideUp>

                {/* Decorative element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 flex justify-center gap-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary/40"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Lab Cards */}
              <SlideUp delay={0.3}>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <LabCard
                    title="Software Labs"
                    description="Guided code debugging with smart hints and logical error detection. Perfect your programming skills with AI-powered assistance."
                    icon={<Code2 className="w-8 h-8" />}
                    to="/software"
                  />
                  <LabCard
                    title="Hardware Labs"
                    description="Virtual ADLD digital trainer kit with lab-manual guidance. Simulate and understand digital logic circuits interactively."
                    icon={<Cpu className="w-8 h-8" />}
                    to="/hardware"
                  />
                </div>
              </SlideUp>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-6 border-t border-border/50">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 LabGuru • CS Cluster, RVCE
              </p>
            </div>
          </footer>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
