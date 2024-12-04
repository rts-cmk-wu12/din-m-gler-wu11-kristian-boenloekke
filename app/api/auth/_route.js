import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = cookies(); // Get cookies
  const tokenCookie = cookieStore.get('token'); // Check for token cookie
  const token = tokenCookie ? tokenCookie.value : null;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch('https://dinmaegler.onrender.com/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await response.json();
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = cookies(); // Access cookies
    await cookieStore.delete('token'); // Delete the token cookie

    return new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
