export const formatNumber = (
  num: number | string | undefined,
  fixed = 0, // fixed = 3 => 3.141516 = 3.142
  shorten = false, // 100,000 => 100K; 1,000,000 => 1M
) => {
  if (num !== undefined) {
    if (typeof num === 'string') {
      num = parseInt(num);
    }
    if (!shorten) {
      return num.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      if (num < 1e3) {
        return num.toString();
      }
      if (num >= 1e3 && num < 1e6) {
        return +(num / 1e3).toFixed(1) + 'K';
      }
      if (num >= 1e6 && num < 1e9) {
        return +(num / 1e6).toFixed(1) + 'M';
      }
      if (num >= 1e9 && num < 1e12) {
        return +(num / 1e9).toFixed(1) + 'B';
      }
      if (num >= 1e12) {
        return +(num / 1e12).toFixed(1) + 'T';
      }
    }
  }
  return '0';
};
