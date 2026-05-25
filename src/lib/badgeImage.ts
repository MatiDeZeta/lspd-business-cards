export function getBadgeImage(rank: string): string {
  const r = rank.toLowerCase();
  if (r.includes("chief of police")) return "/chief-badge.png";
  if (r.includes("assistant chief")) return "/asschief-badge.png";
  if (r.includes("deputy chief")) return "/depchief-badge.png";
  if (r.includes("commander")) return "/commander-badge.png";
  if (r.includes("captain")) return "/captain-badge.png";
  if (r.includes("lieutenant")) return "/lt-badge.png";
  if (r.includes("sergeant")) return "/sergeant-badge.png";
  if (r.includes("detective")) return "/detective-badge.png";
  return "/pofficer-badge.png";
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
