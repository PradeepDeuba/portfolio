import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				/**
				 * Semantic surface tokens. These replace the hard-coded
				 * `white/[0.07]`-style values the components used to carry, so a
				 * theme can be light or dark without touching component markup.
				 */
				line: 'hsl(var(--line))',
				panel: 'hsl(var(--panel))',
				ink: 'hsl(var(--ink))',

				/* Accent set, re-pointed per theme. */
				azure: 'hsl(var(--azure))',
				iris: 'hsl(var(--iris))',
				plasma: 'hsl(var(--plasma))',
				cyan: 'hsl(var(--cyan))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				/**
				 * Cards use xl/2xl/3xl, so those are mapped to variables too —
				 * otherwise the square themes (terminal, editorial, brutalist)
				 * would keep the dark theme's rounded corners.
				 */
				xl: 'var(--radius-lg)',
				'2xl': 'var(--radius-xl)',
				'3xl': 'var(--radius-2xl)'
			},
			/**
			 * Font families come from CSS variables so each theme can swap its
			 * typographic personality (serif / mono / system sans) without any
			 * component knowing about it.
			 */
			fontFamily: {
				sans: 'var(--font-body)',
				display: 'var(--font-display)',
				mono: 'var(--font-mono)'
			},
			fontSize: {
				'display-sm': ['clamp(2.25rem, 7vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
				'display-md': ['clamp(2.75rem, 9vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
				'display-lg': ['clamp(3.25rem, 13vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
				'display-xl': ['clamp(3.5rem, 18vw, 13rem)', { lineHeight: '0.86', letterSpacing: '-0.045em' }],
				label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }]
			},
			boxShadow: {
				/* Driven by theme vars: glow for dark themes, hard offset for brutalist, none for editorial. */
				glow: 'var(--shadow-glow)',
				card: 'var(--shadow-card)',
				lift: 'var(--shadow-lift)'
			},
			backgroundImage: {
				'grid-fine':
					'linear-gradient(to right, hsl(var(--line) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--line) / 0.55) 1px, transparent 1px)',
				'gradient-iris': 'linear-gradient(100deg, hsl(var(--azure)), hsl(var(--iris)) 45%, hsl(var(--plasma)))',
				'gradient-text': 'var(--gradient-text)'
			},
			backgroundSize: {
				'grid-fine': '56px 56px'
			},
			transitionTimingFunction: {
				expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
				smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			transitionDuration: {
				fast: '150ms',
				base: '250ms',
				slow: '450ms'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				marquee: {
					from: { transform: 'translate3d(0, 0, 0)' },
					to: { transform: 'translate3d(-50%, 0, 0)' }
				},
				'marquee-reverse': {
					from: { transform: 'translate3d(-50%, 0, 0)' },
					to: { transform: 'translate3d(0, 0, 0)' }
				},
				'drift-a': {
					'0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
					'33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
					'66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.96)' }
				},
				'drift-b': {
					'0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.04)' },
					'50%': { transform: 'translate3d(-6%, 5%, 0) scale(0.94)' }
				},
				shimmer: {
					'0%': { transform: 'translate3d(-120%, 0, 0)' },
					'100%': { transform: 'translate3d(220%, 0, 0)' }
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.9)', opacity: '0.7' },
					'100%': { transform: 'scale(1.9)', opacity: '0' }
				},
				/* Trace dashes travel along the circuit theme's PCB lines. */
				trace: {
					from: { strokeDashoffset: '0' },
					to: { strokeDashoffset: '-240' }
				},
				/* Terminal caret + scanline sweep. */
				caret: {
					'0%, 45%': { opacity: '1' },
					'50%, 95%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				scanline: {
					from: { transform: 'translate3d(0, -100%, 0)' },
					to: { transform: 'translate3d(0, 100vh, 0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				marquee: 'marquee var(--marquee-duration, 42s) linear infinite',
				'marquee-reverse': 'marquee-reverse var(--marquee-duration, 42s) linear infinite',
				'drift-a': 'drift-a 26s ease-in-out infinite',
				'drift-b': 'drift-b 34s ease-in-out infinite',
				shimmer: 'shimmer 2.4s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)) infinite',
				'pulse-ring': 'pulse-ring 2.4s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)) infinite',
				trace: 'trace 6s linear infinite',
				caret: 'caret 1.1s steps(1, end) infinite',
				scanline: 'scanline var(--scanline-duration, 9s) linear infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
