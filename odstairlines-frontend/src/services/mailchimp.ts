/**
 * Mailchimp Subscription Service for ODST Airlines
 */

export interface SubscribeParams {
  email: string;
  name?: string;
}

export interface SubscribeResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function subscribeToNewsletter({ email, name }: SubscribeParams): Promise<SubscribeResult> {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, message: data.message };
    }

    return {
      success: false,
      error: data.error || 'Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi.',
    };
  } catch (err: any) {
    console.error('Mailchimp subscription error:', err);
    // Even if local network proxy fails in some environments, handle gracefully
    return {
      success: false,
      error: err?.message || 'Gagal menghubungi server pendaftaran.',
    };
  }
}
