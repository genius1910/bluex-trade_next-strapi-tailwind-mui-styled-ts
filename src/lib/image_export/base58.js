// var ALPHABET, ALPHABET_MAP, Base58, i;

  // Base58 = (typeof module !== "undefined" && module !== null ? module.exports : void 0) || (window.Base58 = {});

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ALPHABET_MAP = {};

for (let i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}

export function encodeBase58(buffer) {
  var carry, digits, i, j;
  if (buffer.length === 0) {
    return "";
  }
  i = void 0;
  j = void 0;
  digits = [0];
  i = 0;
  while (i < buffer.length) {
    j = 0;
    while (j < digits.length) {
      digits[j] <<= 8;
      j++;
    }
    digits[0] += buffer[i];
    carry = 0;
    j = 0;
    while (j < digits.length) {
      digits[j] += carry;
      carry = (digits[j] / 58) | 0;
      digits[j] %= 58;
      ++j;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
    i++;
  }
  i = 0;
  while (buffer[i] === 0 && i < buffer.length - 1) {
    digits.push(0);
    i++;
  }
  return digits.reverse().map(function(digit) {
    return ALPHABET[digit];
  }).join("");
};
