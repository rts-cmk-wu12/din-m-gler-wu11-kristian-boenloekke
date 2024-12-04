export async function POST(req) {
    try {
        
        const { name, email, subject, message, newsletter } = await req.json()

        // Server-side validering
        const errors = {}
        if (!name || name.trim() === '') errors.name = 'Navn er påkrævet'
        if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Indtast en gyldig email'
        if (!subject || subject.trim() === '') errors.subject = 'Emne er påkrævet'
        if (!message || message.trim() === '') errors.message = 'Besked er påkrævet'

        if (Object.keys(errors).length > 0) {
            return new Response(
                JSON.stringify({ success: false, errors }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }
        // log formdata til server
        console.log('Form Data:', { name, email, subject, message, newsletter })

        return new Response(
            JSON.stringify({ success: true, message: 'Formularen er sendt!' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Error processing request:', error)
        return new Response(
            JSON.stringify({ success: false, message: 'Noget gik galt. Prøv igen.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
