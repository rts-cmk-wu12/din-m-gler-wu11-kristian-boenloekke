'use client'

import { useAuth } from '@/contexts/AuthProvider'
import { Unsubscribe } from '@/components/SubscriptionRCC'

export function MySubscription() {
    const { user, emailIsSubscribing } = useAuth()

    const userSubscription = emailIsSubscribing.find((entry) => entry.email === user?.email)

    
    return (
        <>
            {userSubscription?.isSubscribing ? (
                <div>
                <p>Du er tilmeldt vores nyhedsbrev med email <span className='italic font-medium'>{user?.email} </span> </p>
                <Unsubscribe text="Klik her for at framelde vores nyhedsbrev" className="text-red-500" />
                </div>
                ) : null}

        </>
    )

}