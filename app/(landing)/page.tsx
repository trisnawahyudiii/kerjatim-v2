import { Container } from "components/ui";
import { Hero } from "@/features/landing/components/hero";
import { About } from "@/features/landing/components/about";
import { Keunggulan } from "@/features/landing/components/keunggulan";
import { GooglePlay } from "@/features/landing/components/google-play";

export default function LandingPage() {
  return (
    <>
      <Container className="flex flex-col gap-12">
        <Hero />
        <About />
      </Container>
      <Keunggulan />
      <GooglePlay />
    </>
  );
}
