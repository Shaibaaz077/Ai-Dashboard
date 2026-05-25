import Features from "@/components/Langingpage/Features";
import Hero from "@/components/Langingpage/Hero";
import HowItWorks from "@/components/Langingpage/HowItWorks";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Langingpage/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}
