import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import styles from './success-page.module.css'

export default function SuccessPage() {
    const { messageId } = useParams();
    const { width, height } = useWindowSize()
    const [message, setMessage] = useState<string>("");


    useEffect(() => {
        if (messageId == "add-booking") {
            setMessage("Seats booked!")
        }

        if (messageId == "add-movie") {
            setMessage("Movie added!")
        }

        if (messageId == "update-movie") {
            setMessage("Movie updated!")
        }

        if (messageId == "delete-movie") {
            setMessage("Movie deleted!")
        }
    }, [messageId]);


    return (
        <div className={styles.successPage}>
            <ReactConfetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={180}
            />

            {message}
        </div>
    )
}


