/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]', 'class'],
  plugins: [tailwindAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			'2xl': '2rem',
  			DEFAULT: '1rem',
  			lg: '2rem',
  			md: '2rem',
  			sm: '1rem',
  			xl: '2rem'
  		},
  		screens: {
  			'2xl': '86rem',
  			lg: '64rem',
  			md: '48rem',
  			sm: '40rem',
  			xl: '80rem'
  		}
  	},
  	extend: {
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			border: 'hsla(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			input: 'hsl(var(--input))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			ring: 'hsl(var(--ring))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			success: 'hsl(var(--success))',
  			error: 'hsl(var(--error))',
  			warning: 'hsl(var(--warning))',
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
  		fontFamily: {
  			mono: [
  				'var(--font-geist-mono)'
  			],
  			sans: [
  				'var(--font-geist-sans)'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			}
  		},
  		typography: {
  			DEFAULT: {
  				css: [
  					{
  						'--tw-prose-body': 'var(--text)',
  						'--tw-prose-headings': 'var(--text)',
  						h1: {
  							fontWeight: 'normal',
  							marginBottom: '0.25em'
  						}
  					}
  				]
  			},
  			base: {
  				css: [
  					{
  						h1: {
  							fontSize: '2.5rem'
  						},
  						h2: {
  							fontSize: '1.25rem',
  							fontWeight: 600
  						}
  					}
  				]
  			},
  			md: {
  				css: [
  					{
  						h1: {
  							fontSize: '3.5rem'
  						},
  						h2: {
  							fontSize: '1.5rem'
  						}
  					}
  				]
  			}
  		}
  	}
  },
}

export default config
