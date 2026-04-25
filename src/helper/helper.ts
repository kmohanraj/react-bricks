export const preventBodyScroll = (status: boolean) => {
  const scrollLock = "scroll-lock";
  if (status) {
    document.body.classList.add(scrollLock);
    document.getElementsByTagName("html")[0].classList.add(scrollLock);
  } else {
    document.body.classList.remove(scrollLock);
    document.getElementsByTagName("html")[0].classList.remove(scrollLock);
  }
};

export const formatWithCommas = (val: number | string): string => {
  if (!val) return "";
  const parts = String(val).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const formatPrice = (price: number | bigint) => {
  return price ? new Intl.NumberFormat('en-In', {
    style: 'decimal',
    maximumFractionDigits: 2
  }).format(price) : ""
}