import { EventEmitter } from 'events'
import { nextTick } from 'process'

function ticker(number, cb) {
  const emitter = new EventEmitter()
  emitter.on('tick', () => console.log('tick'))
  nextTick(() => {
    emitter.emit('tick')
  })
  test()
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
