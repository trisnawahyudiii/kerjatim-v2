"use client";
import { Button, Container } from "@/components/ui";
import Lottie from "lottie-react";
import Link from "next/link";
import NotFound from "assets/404_animation.json";
import { AiOutlineRight } from "react-icons/ai";

export default function NotFoundPage() {
  return (
    <Container className="relative flex h-screen w-screen flex-col justify-center gap-5 text-slate-400">
      {/* ilustration */}
      <div className="absolute -top-[25%] right-0 -z-10 lg:-top-10 lg:bottom-0">
        <Lottie animationData={NotFound} className="max-w-screen h-screen" />
      </div>

      <div className="flex items-center justify-center lg:w-2/5">
        <div className="absolute bottom-10 flex w-full flex-col gap-3 px-8 lg:relative lg:bottom-0 lg:px-0">
          <h1 className="text-4xl font-bold italic tracking-[-7px] text-slate-500 lg:text-6xl">
            404 Ooops!
          </h1>
          <h2 className="text-xl font-semibold uppercase lg:text-2xl">
            We sincerely apologize.
          </h2>
          <p>
            The page you are looking for is no longer here. Maybe it was never
            here in the first place. In any case, we are sorry you were sent on
            this wild goose chase, and have already taken steps to have the
            person responsible fired.
          </p>

          <Link href="/">
            <Button
              variant="ghost"
              className="flex w-full gap-3 font-semibold text-slate-500 lg:w-fit"
            >
              <AiOutlineRight />
              <span>Back to Life</span>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
