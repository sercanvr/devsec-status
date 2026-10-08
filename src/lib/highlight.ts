export function highlightTechElement(id: string): boolean {
  if (!id || typeof id !== 'string') return false;

  const trimmedId = id.trim();
  if (!trimmedId) return false;

  // Escape special characters to prevent selector injection / DOMException
  const escapedId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(trimmedId)
    : trimmedId.replace(/["\\]/g, '\\$&');

  // Search for elements matching id or data-tech-id
  let targets: HTMLElement[] = [];
  try {
    targets = Array.from(
      document.querySelectorAll<HTMLElement>(`[id="${escapedId}"], [data-tech-id="${escapedId}"]`)
    );
  } catch {
    return false;
  }

  if (targets.length === 0) return false;

  // Select the visible element (desktop tr vs mobile card)
  const target = targets.find((el) => el.offsetParent !== null) || targets[0];

  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.remove('highlight-glow');
  void target.offsetWidth; // Force reflow to re-trigger CSS animation
  target.classList.add('highlight-glow');

  setTimeout(() => {
    target.classList.remove('highlight-glow');
  }, 1600);

  return true;
}

export function highlightWithRetry(id: string, maxAttempts = 25, interval = 60): void {
  if (!id) return;
  // Immediate attempt
  if (highlightTechElement(id)) return;

  let attempts = 0;
  const timer = setInterval(() => {
    attempts++;
    if (highlightTechElement(id) || attempts >= maxAttempts) {
      clearInterval(timer);
    }
  }, interval);
}

