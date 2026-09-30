/** Resolve both explicit images and retained 2025–26 profile filenames. */
export function getProfilePicture(member) {
  if (member.imgSrc?.trim()) return member.imgSrc.trim();
  if (!member.imgAvail) return "/placeholderRED.webp";
  const name = `${member.firstName}${member.lastName ?? ""}`
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[.'`´\s]/g, "");
  return `/profilePictures/25-26/${name}.webp`;
}
