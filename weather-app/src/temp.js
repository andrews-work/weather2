export function temp(kelvin) {
    const celsius = kelvin - 273.15
    return celsius.toFixed(2)
  }