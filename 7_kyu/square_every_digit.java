public class SquareDigit {
  public int squareDigits(int n) {
    String[] array = String.valueOf(n).split("");
    String output = "";
    
    for (int i = 0; i < array.length; i++) {
      int num = Integer.valueOf(array[i]);
      output += String.valueOf(num * num);
    }
    
    return Integer.valueOf(output);
  }
}