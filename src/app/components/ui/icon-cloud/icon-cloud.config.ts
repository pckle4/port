export const CLOUD_OPTIONS: Record<string, any> = {
  animTiming: 'Smooth',
  reverse: true,
  depth: 1,
  wheelZoom: false,
  imageScale: 2,
  activeCursor: 'default',
  tooltip: 'native',
  initial: [0.15, -0.05], // Increased initial spin speed
  clickToFront: 500,
  tooltipDelay: 0,
  outlineColour: '#0000',
  maxSpeed: 0.06, // Doubled maximum speed
  minSpeed: 0.02, // Doubled minimum speed so it keeps moving
  dragControl: true,
  decel: 0.98,
  pinchZoom: false,
  freezeActive: true,
  freezeDecel: true,
  textFont: null,
  textColour: null
};