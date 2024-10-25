import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const LoadingScreen: React.FC = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown === 0) {
            router.push("/home");
        }

        const timer =
            countdown > 0 &&
            setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);

        return () => clearInterval(timer as NodeJS.Timeout);
    }, [countdown, router]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white">
            <div className="text-center">
                <div className="mb-6">
                    <Image
                        src="/logo.png"
                        alt="MyCare Logo"
                        width={50}
                        height={50}
                    />
                </div>
                <h1 className="text-2xl font-bold">MyCare</h1>
                <p className="mt-4">Selamat datang,</p>
                <h2 className="text-xl font-semibold mt-2">Dr. Romi</h2>
                <p className="mt-4">
                    Mengarahkan Anda ke Beranda...{" "}
                    <span className="text-lg font-bold">{countdown}</span>
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
