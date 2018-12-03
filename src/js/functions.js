
function process () {
  document.querySelector('#prime').addEventListener(
    'input',
    () => {
      console.log('New input')
      let prime = document.querySelector('#prime').value

      if (!Number.isInteger(prime)) {
        prime = eval(prime)
      }

      pollardRho1(prime)
    },
    true
  )
}

function pollardRho1 (prime) {
  let h2 = document.createElement('h2')
  let result = document.querySelector('#result')
  let x = 2
  let y = 2
  let d = 1

  while (d === 1) {
    x = g(x, prime)
    y = g(g(y, prime), prime)

    d = gcd(Math.abs(x - y), prime)

    if (d === prime) {
      return
    } else {
      if (d !== 1 && !isNaN(d)) {
        h2.innerText = prime + ' = ' + d + '\u00D7' + prime / d
        result.appendChild(h2)
      }
    }
  }
}

function g (x, prime) {
  return (Math.pow(x, 2) + 1) % prime
}

function gcd (a, b) {
  if (!b) {
    return a
  }

  return gcd(b, a % b)
}

function clear () {
  document.querySelector('#clear').addEventListener('click', () => {
    let result = document.querySelector('#result')

    result.innerHTML = ''
  })
}

const _clear = clear
const _process = process

export { _process as process, _clear as clear }
