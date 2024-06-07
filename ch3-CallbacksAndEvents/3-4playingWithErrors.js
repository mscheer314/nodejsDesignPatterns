import { EventEmitter } from 'events'
import { nextTick } from 'process'

function ticker(number, cb) {
  const emitter = new EventEmitter()

  emitter.on('tick', () => {
    if (Date.now() % 5 === 0) {
      return emitter.emit('error', new Error('Something went wrong'))
    }
    console.log('tick')
  })

  nextTick(() => {
    emitter.emit('tick')
  })

  const count = 1

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
