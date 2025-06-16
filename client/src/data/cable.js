export const gauge = (size) => {
  const AWG = ['16', '14', '12', '10', '8', '6', '4', '3', '2', '1', '1/0', '2/0', '3/0', '4/0',]
  const KCMIL = ['250', '300', '350', '400', '500', '600', '750', '800', '900', '1000']

  if (AWG.includes(size)) {
    return `${size} AWG`
  } else if (KCMIL.includes(size)) {
    return `${size} kcmil`
  } else {
    return size
  }
}