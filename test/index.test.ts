import EventEmitterII from 'event-emitter-ii';

describe('EventEmitterII', () => {
  test('emitter are instance of EventEmitterII', () => {
    const emitter = new EventEmitterII();
    expect(emitter).toBeInstanceOf(EventEmitterII);
  });
});
