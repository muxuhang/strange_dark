const isMobile = () => {
  console.log('navigator',navigator)
  return navigator ? /Mobi|Android|iPhone/i.test(navigator.userAgent) : false
}

export default isMobile