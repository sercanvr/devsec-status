export function highlightTechElement(id: string): boolean {
  if (!id) return false;

  // Search for elements matching id or data-tech-id
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(`[id="${id}"], [data-tech-id="${id}"]`)
  );
  if (targets.length === 0) return false;

  // Select the visible element (desktop tr vs mobile card)
  const target = targets.find((el) => el.offsetParent !== null) || targets[0];

  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('highlight-glow');

  setTimeout(() => {
    target.classList.remove('highlight-glow');
  }, 1200);

  return true;
}
