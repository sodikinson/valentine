"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { MESSAGES } from "./messages";

export default function Home() {
    const router = useRouter();
    const [noClickCount, setNoClickCount] = useState(0);
    const [yesFontSize, setYesFontSize] = useState(1.5);

    const handleNoClick = () => {
        setNoClickCount((prev) => prev + 1);
        setYesFontSize((prev) => prev * 1.5);
    };

    const handleYesClick = () => {
        router.push("/yes");
    };

    const noButtonText =
        noClickCount === 0
            ? "No"
            : MESSAGES[(noClickCount - 1) % MESSAGES.length];

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>Will you be my Valentine?????</h1>
                <div className={styles.buttons}>
                    <button
                        className={styles.yesButton}
                        onClick={handleYesClick}
                        style={{ fontSize: `${yesFontSize}em` }}
                    >
                        Yes
                    </button>
                    <button className={styles.noButton} onClick={handleNoClick}>
                        {noButtonText}
                    </button>
                </div>
                <div className={styles.gifContainer}>
                    <Image
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
                        alt="Cute cat GIF"
                        width={300}
                        height={300}
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
}
