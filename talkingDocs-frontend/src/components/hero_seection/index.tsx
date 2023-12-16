import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/utils";
import Background from "../background/background";

const HeroSection = () => {
  return (
    <div className="min-h-screen  font-heading flex flex-col justify-center items-center">
      <div className="overflow-hidden w-screen">
        <Background />
      </div>
      <motion.div
        className="z-50 max-w-7xl px-5 xl:px-0 font-display2"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {/* <motion.a
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          href="https://twitter.com/steventey/status/1616505632001232896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-2 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-heading2 text-[#1d9bf0]">
            Introducing ArezArmada
          </p>
        </motion.a> */}
        <motion.h1
          className="z-50 text-gradient mb-4 translate-y-[30%] text-center text-5xl bg-gradient-to-tr from-black to-black/20 dark:from-zinc-400/20 dark:via-white/90 text-transparent bg-clip-text dark:to-white/10 sm:text-6xl  md:text-8xl lg:text-9xl [transition:transform_1000ms_cubic-bezier(0.3,1.17,0.55,0.99)0s] [.is-visible_&]:translate-y-"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Let the{" "}
          <span className="bg-gradient-to-tr from-indigo-200 via-indigo-200/80 to-purple-400 text-transparent bg-clip-text">
            DOCS talk
          </span>{" "}
          about the{" "}
          <span className="bg-gradient-to-tr from-indigo-200 via-indigo-200/80 to-purple-400 text-transparent bg-clip-text">
            everything
          </span>
          .
        </motion.h1>
        <motion.p
          className="mt-2 font-heading2 text-muted-foreground text-center dark:text-gray-300 md:text-xl font-display2 text-4xl bg-gradient-to-tr from-zinc-600/90 via-zinc-500/80 to-black/90  bg-clip-text "
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Let the AI helps you to get analytics about your DOCS.
          <div className="flex justify-center items-center gap-2">
            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="-mb-4"
            >
              <a href="/">
                <button className="group mx-auto mt-6 text-lg flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-gradient-to-tr from-indigo-400 via-indigo-400/80 to-purple-600   px-5 py-3  text-white transition-colors hover:bg-white hover:duration-300 hover:shadow-yellow-600 ">
                  {" "}
                  Start Here
                </button>
              </a>
            </motion.div>

            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="-mb-4"
            >
              <button className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full  border-black  bg-gradient-to-tr from-indigo-200 via-indigo-200/80 to-purple-400 border-[0.5px]">
                {/* <Upload /> */}
              </button>
            </motion.div>
          </div>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
