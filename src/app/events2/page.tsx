    'use client';

    import { motion, useScroll, useTransform } from "framer-motion";
    import { RiRobot2Fill } from "react-icons/ri";
    import Link from "next/link";
    import Image from "next/image";
    import { ReactNode } from "react";

    function FloatingRobot({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        >
        {children}
        </motion.div>
    );
    }

    function ParallaxBackground() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -300]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-0 opacity-5" style={{ y: y1 }}>
            <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="8" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
        </motion.div>
        <motion.div className="absolute inset-0 opacity-5" style={{ y: y2 }}>
            <svg width="100%" height="100%">
            <pattern id="pattern-squares" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect x="15" y="15" width="20" height="20" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-squares)" />
            </svg>
        </motion.div>
        </div>
    );
    }

    export default function RoboticsEvent() {
    return (
        <div className="min-h-screen bg-gradient-to-b p-20 from-indigo-50 to-purple-50">
        <ParallaxBackground />
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 text-center">
            <FloatingRobot>
            <RiRobot2Fill className="mx-auto h-24 w-24 text-purple-600" />
            </FloatingRobot>
            <h1 className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Navikarana 1.0
            </h1>
            <h2 className="mt-4 text-2xl font-bold text-indigo-600">Empowering Intelligence</h2>
        </div>
        <div className="mt-12 text-center">
            <p className="text-lg text-gray-700">Join us at Mechatronites Club's national level fest with workshops, seminars, and competitions!</p>
        </div>
        <div className="mt-12 text-center relative">
            <p className="text-3xl font-bold text-gray-800">Registration Fee: ₹300/-</p>

            {/* Animated Cursor Pointer */}
            <motion.div
    initial={{ x: 0, y: 10, opacity: 1, scale: 1 }}
    animate={{
        x: [0, -5, 0],
        y: [15, 20, 15],
        scale: [1, 0.9, 1],
        opacity: [1, 1, 1]
    }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute left-[52%] top-[52%] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
>
    <Image src="/cursor-click.svg" alt="Mouse Cursor" width={50} height={50} />
</motion.div>




            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="inline-block mt-6">
            <Link
                href="https://forms.gle/7RbpBT6USpgXoqot8"
                className="rounded-full bg-white px-8 py-4 text-xl font-semibold text-purple-600 shadow-lg transition-transform hover:shadow-xl cursor-pointer"
            >
                Register Now!
            </Link>
            </motion.div>
        </div>
        <div className="mt-12 pb-8 text-center">
            <p className="text-lg text-gray-600">Powered by <span className="font-bold text-purple-600">Arka International School</span></p>
        </div>
        </div>
    );
    }
