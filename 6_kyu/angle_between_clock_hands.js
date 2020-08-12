function handAngle (date) {
  const h = date.getHours();
  const m = date.getMinutes();

  mAngle = m * 6;
  hAngle = 30 * h + (mAngle / 12);

  const angle = Math.abs(hAngle - mAngle);
  const smallestAngle = Math.min(angle, 360 - angle);

  return smallestAngle / 180 * Math.PI;
};
