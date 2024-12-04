'use client'
import { useAuth } from '@/contexts/AuthProvider'
import { useToast } from '@/contexts/ToastProvider'
import { useEffect, useState } from 'react'
import { Unsubscribe } from './SubscriptionRCC'
import { getCurrentUser } from '@/lib/auth'

export default function FormContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false,
    })
    const [errors, setErrors] = useState({})
    const { toast } = useToast()
    const { user, emailIsSubscribing } = useAuth()

    function handleChange(e) {
        const { id, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }))
    }

    function validateForm() {
        const newErrors = {}
        if (!formData.name || formData.name.trim() === '') newErrors.name = 'Navn er påkrævet'
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Indtast en gyldig email'
        if (!formData.subject || formData.subject.trim() === '') newErrors.subject = 'Emne er påkrævet'
        if (!formData.message || formData.message.trim() === '') newErrors.message = 'Besked er påkrævet'

        setErrors(newErrors)


        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (response.ok) {
                toast('Tak! Din besked er sendt. Vi kontakter dig snarest muligt', { duration: 4000 })
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    newsletter: false,
                })

                console.log('Form Data:', formData)

            } else {
                // Hvis server-side validerings fejl
                console.error('Server errors:', result.errors)
            }
        } catch (error) {
            console.error('Unexpected error:', error)
            toast('Noget gik galt. Prøv venligst igen.', { variant: 'destructive' }, { duration: 5000 })
        }
    }

    const userSubscription = emailIsSubscribing.find((entry) => entry.email === user?.email)

    return (
        <div className='border border-gray-300 p-6'>

            <form onSubmit={handleSubmit} className=" w-full">
                <div className="flex flex-col lg:flex-row gap-4 pb-4">
                    <label htmlFor="name" className="flex flex-col gap-2 font-semibold w-full">
                        Navn
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`border p-2 font-normal outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Indtast dit navn"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </label>
                    <label htmlFor="email" className="flex flex-col gap-2 font-semibold w-full">
                        Email
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`border p-2 font-normal outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Indtast din email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="subject" className="flex flex-col gap-2 font-semibold">
                        Emne
                        <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`border p-2 font-normal outline-none ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Indtast emne"
                        />
                        {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                    </label>

                    <label htmlFor="message" className="flex flex-col gap-2 font-semibold">
                        Besked
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`border p-2 font-normal outline-none min-h-40 ${errors.message ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Indtast din besked"
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </label>
                </div>

                <div className="flex flex-col gap-4 py-2">
                    {user && userSubscription?.isSubscribing ? null : (

                        <label htmlFor="newsletter" className="text-sm text-primary3 flex items-center">
                            <input
                                type="checkbox"
                                id="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev
                        </label>
                    )}

                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 mt-2 hover:bg-primary3 md:self-start"
                    >
                        Send Besked
                    </button>

                </div>

            </form>
            {user && userSubscription?.isSubscribing ? (

                <div className='text-sm flex flex-wrap gap-1 pt-4'>
                    <p >Du er tilmeldt vores nyhedsbrev. Ønsker du at framelde dig nyhedsbrevet?</p>
                    <Unsubscribe text={"Klik her"} className={"text-red-400"} />
                </div>

            ) : null}
        </div>
    )
}
