import type { Block } from 'payload'

export const Ripple: Block = {
  slug: 'ripple',
  interfaceName: 'RippleBlock',
  fields: [
    {
      name: 'ripple',
      type: 'text',
    },
  ],
  labels: {
    plural: 'Ripples',
    singular: 'Ripple',
  },
}
