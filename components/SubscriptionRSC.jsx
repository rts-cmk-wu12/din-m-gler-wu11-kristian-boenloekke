import { getCurrentUser } from "@/lib/auth"
export function SubscribeRSC() {

  async function handleSubscribe(formData) {
    'use server'

    const email = formData.get('email') 

    try {
      const response = await fetch('https://dinmaegler.onrender.com/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.')
      }

      const data = await response.json()
      return `Successfully subscribed with email: ${data.email}`
    } catch (error) {
      return `Error: ${error.message}`
    }
  }

  let message = null

  return (
    <div className="w-full">
      <form action={handleSubscribe} className="flex bg-white px-2 gap-2 w-full">
        <input
          type="email"
          name="email"
          placeholder="Indtast din email addresse"
          className="bg-white py-2 text-xs w-full outline-none"
          required
        />
        <button type="submit">
          <img src="/img/arrow.svg" alt="arrow" width={20} height={20} />
        </button>
      </form>
      {message && <p className="text-sm mt-2 text-center text-white">{message}</p>}
    </div>
  )
}


export function UnsubscribeRSC() {

  async function handleUnsubscribe() {
    'use server'

    try {
      const user = await getCurrentUser();
  
      if (!user || !user.email) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      const email = user.email;
  
      const response = await fetch(`https://dinmaegler.onrender.com/subscribers/${email}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        return new Response("Failed to delete subscriber", { status: response.status });
      }
  
      return new Response("Subscriber deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      return new Response("Internal Server Error", { status: 500 });
    }

  }

  return (
    <form action={handleUnsubscribe}>
      <button type="submit">
        Frameld nyhedsbrev
      </button>
    </form>
  )


}