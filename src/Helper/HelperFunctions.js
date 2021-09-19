// return thousand number format
export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// return sum of value
export function getSum(items, key){
  return items.reduce( function(a, b){
      return a + b[key];
  }, 0);
};