import Image from "next/image";
import styles from "./page.module.css";

export default function YesPage() {
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
            </div>
        </div>
    );
}
