import Image from "next/image";
import styles from "./page.module.css";

export default function YesPage() {
    const whatsappUrl =
        "https://wa.me/6285810222179?text=" +
        encodeURIComponent("Anis said YES");

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.headerText}>Knew you would say yes!</h1>
                <div className={styles.gifContainer}>
                    <Image
                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmo3c3l5ODh3ZGN6NHhhaDE2Mjg1ZjkwOXczdDFxbWM3dTBtaW9zaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9XY4f3FgFTT4QlaYqa/giphy.gif"
                        alt="Hugging characters"
                        width={500}
                        height={500}
                        unoptimized
                    />
                </div>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                    aria-label="Tell Ari on WhatsApp"
                >
                    <span className={styles.whatsappBubble}>Tell Ari 💬</span>
                    <svg
                        className={styles.whatsappIcon}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="16" cy="16" r="16" fill="#25D366" />
                        <path
                            d="M23.3 8.7a10.4 10.4 0 0 0-16.5 12.5L5 27l5.9-1.7a10.4 10.4 0 0 0 12.4-16.6zM16 24.2a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.2.9.9-3.1-.2-.3A8.6 8.6 0 1 1 16 24.2zm4.7-6.4c-.3-.1-1.5-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a7.6 7.6 0 0 1-3.8-3.3c-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6c0 1.5 1.1 3 1.3 3.2.1.2 2.2 3.3 5.3 4.6 2 .8 2.7.9 3.7.7.6-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"
                            fill="white"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
