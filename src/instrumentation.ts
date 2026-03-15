/**
 * Next.js instrumentation hook — runs once when the server starts.
 * Used to trigger bridge auto-start without relying on Electron.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Delay to let the database and other infrastructure initialize
    setTimeout(async () => {
      try {
        const { tryAutoStart } = await import('@/lib/bridge/bridge-manager');
        tryAutoStart();
      } catch (err) {
        console.error('[instrumentation] Bridge auto-start failed:', err);
      }
    }, 3000);
  }
}
