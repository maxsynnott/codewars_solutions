function getStrings(city) {
  const counts = {};
  
  city = city.toLowerCase();
  
  for (i = 0; i < city.length; i++) {
    const char = city[i];
    
    if (char >= 'a' && char <= 'z') counts[char] = "*".repeat((counts[char] || '').length + 1);
  };
  
  return Object.entries(counts).map(a => a.join(':')).join(',');
}