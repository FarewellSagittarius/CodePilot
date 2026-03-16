/**
 * Next.js instrumentation hook — runs once when the server starts.
 * Used to initialize runtime log capture and trigger bridge auto-start.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Runtime log capture for Doctor export feature (upstream)
    const { initRuntimeLog } = await import('@/lib/runtime-log');
    initRuntimeLog();

    // Bridge auto-start (local patch: launchd/web deployment support)
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
