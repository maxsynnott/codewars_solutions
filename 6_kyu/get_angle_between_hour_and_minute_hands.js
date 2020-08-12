const getAngle = t => {
  console.log(t)
  if (!/^(2[0-3]|[0-1]?[0-9]):[0-5]?[0-9]$/.test(t)) return "Invalid input";
  
  const [hour, min] = t.split(":");
  const [h, m] = [+hour % 12, +min];
  
  mAngle = m * 6;
  hAngle = 30 * h + (mAngle / 12);
  
  const angle = Math.abs(hAngle - mAngle);
  
  return Math.min(angle, 360 - angle);
};