import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './success-page.module.css'

export default function SuccessPage() {
    let { messageId } = useParams()
    const [message, setMessage] = useState<string>("");


    useEffect(() => {
        if (messageId == "booking") {
            setMessage("Seats booked!")
        }
    }, [messageId]);


    return (
        <div className={styles.successPage}>
            {message}
        </div>
    )
}


