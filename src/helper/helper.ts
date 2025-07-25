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
