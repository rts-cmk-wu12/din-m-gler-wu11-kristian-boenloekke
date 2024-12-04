import { getCurrentUser } from "@/lib/auth"

export async function POST(request) {
    try {
        const body = await request.json()
        const { email } = body
        

        if (!email) {
            console.error("Email is missing in the request body.")
            return new Response("Email is required", { status: 400 })
        }

        const response = await fetch("https://dinmaegler.onrender.com/subscribers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage || "Failed to subscribe. Please try again.")
        }

        const data = await response.json()

        return new Response(JSON.stringify({ message: `Successfully subscribed with email: ${data.email}` }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}

export async function DELETE() {
    try {
        const user = await getCurrentUser()

        if (!user || !user.email) {
            return new Response("Unauthorized", { status: 401 })
        }

        const email = user.email

        const response = await fetch(`https://dinmaegler.onrender.com/subscribers/${email}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            return new Response("Failed to delete subscriber", { status: response.status })
        }

        return new Response("Subscriber deleted successfully", { status: 200 })
    } catch (error) {
        console.error("Error deleting subscriber:", error)
        return new Response("Internal Server Error", { status: 500 })
    }
}
