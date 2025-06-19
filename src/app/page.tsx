  "use client";
  import Link from "next/link";
  import { SignInButton, useUser } from "@clerk/nextjs";
  import WorkoutTips from "./components/HomeComponents/workouttips/WorkoutTips";
  import SuccessStories from "./components/HomeComponents/successstories/SuccessStories";
  import MembershipOptions from "./components/HomeComponents/membershipoptions/MembershipOptions";
  import EndSection from "./components/HomeComponents/endsection/EndSection";
  import KeyFeatures from "./components/HomeComponents/keysfeatures/KeyFeatures";
  import MeetWithTrainers from "./components/HomeComponents/meetwithtrainers/MeetWithTrainers";
  import MotivationalQuotes from "./components/HomeComponents/quotesssection/MotivationalQuotes";
  import MeelsTips from "./components/HomeComponents/meelstips/MeelsTips";
  import { motion } from "framer-motion";

  export default function Home() {
    const { isSignedIn } = useUser();

    const fadeInUp = {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7 },
    };

    return (
      <div className="w-full text-white bg-primary">
        {/* Hero Section with Video Background */}
        <section className="relative w-full h-screen">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              src="/images/Home_Images/video/video1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="max-w-4xl mx-auto space-y-4 sm:space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Track Your Fitness Journey
              </h1>
              <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
                Achieve your health goals with our comprehensive fitness tracking
                app. Monitor your workouts, nutrition, and progress effortlessly.
              </p>
              <div className="pt-2 sm:pt-4">
                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <button className="bg-white !text-black px-6 py-4 cursor-pointer rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
                      Get Started
                    </button>
                  </SignInButton>
                ) : (
                  <Link href="/supplements">
                    <button className="bg-white !text-black px-6 py-4 cursor-pointer rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
                      Go to Product Page
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Animated Sections */}
        <AnimatedSection delay={0.1}><KeyFeatures /></AnimatedSection>
        <AnimatedSection delay={0.2}><MeetWithTrainers /></AnimatedSection>
        <AnimatedSection delay={0.3}><MotivationalQuotes /></AnimatedSection>
        <AnimatedSection delay={0.4}><MeelsTips /></AnimatedSection>
        <AnimatedSection delay={0.5}><WorkoutTips /></AnimatedSection>
        <AnimatedSection delay={0.6}><SuccessStories /></AnimatedSection>
        <AnimatedSection delay={0.7}><MembershipOptions /></AnimatedSection>
        <AnimatedSection delay={0.8}><EndSection /></AnimatedSection>
      </div>
    );
  }

  // Reusable wrapper for fade-in section animations
  const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  };
