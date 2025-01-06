import type { Block } from 'payload'

export const GravityBlock: Block = {
  slug: 'gravityBlock',
  interfaceName: 'GravityBlock',
  fields: [
    {
      name: 'bodyType',
      type: 'select',
      options: ['rectangle', 'circle', 'svg'],
    },
  ],
}
