const isMobile = () => {
  return navigator ? /Mobi|Android|iPhone/i.test(navigator.userAgent) : false
}

export default isMobile