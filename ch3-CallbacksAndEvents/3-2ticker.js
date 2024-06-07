import { EventEmitter } from 'events'

function ticker(number, cb) {
  const emitter = new EventEmitter()
  emitter.on('tick', () => console.log('tick'))
  const count = 0

  tick(number, emitter, count, cb)

  return emitter
}

function tick(number, emitter, count, cb) {
  if (number <= 0) {
    return cb(null, count)
  }

  setTimeout(() => {
    emitter.emit('tick')
    count++
    return tick(number - 50, emitter, count, cb)
  }, 50)
}

ticker(500, (err, count) => console.log(count))
