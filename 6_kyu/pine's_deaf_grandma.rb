def deaf_grandma(phrases)
  responses = []
  
  for phrase in phrases do
    if phrase == 'BYE'
      responses << 'OK, BYE!'
      break
    elsif phrase == phrase.upcase
      responses << 'NO, NOT SINCE 1938!'
    else
      responses << 'HUH?! SPEAK UP, SONNY!'
    end
  end
  
  responses
end