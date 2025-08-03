import type { Config } from "tailwindcss";

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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'amsterdam': ['Amsterdam', 'cursive'],
				'poppins': ['Poppins', 'sans-serif'],
				'playfair': ['Playfair Display', 'serif'],
				'dancing': ['Dancing Script', 'cursive'],
			},
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom Wedding Cult Brand Colors
				'chocolate': {
					DEFAULT: 'hsl(var(--chocolate-brown))',
					light: 'hsl(var(--chocolate-brown-light))',
				},
				'beige': {
					light: 'hsl(var(--beige-light))',
					warm: 'hsl(var(--beige-warm))',
				},
				'cream': 'hsl(var(--cream))',
				'gold': 'hsl(var(--gold-accent))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				// Cinematic Wedding Animations
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px hsl(var(--gold-accent) / 0.5)'
					},
					'50%': {
						boxShadow: '0 0 20px hsl(var(--gold-accent) / 0.8)'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				// Floating Ball Animations
				'float-slow': {
					'0%, 100%': {
						transform: 'translate(0, 0) rotate(0deg)'
					},
					'33%': {
						transform: 'translate(30px, -30px) rotate(120deg)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) rotate(240deg)'
					}
				},
				'float-slower': {
					'0%, 100%': {
						transform: 'translate(0, 0) rotate(0deg)'
					},
					'50%': {
						transform: 'translate(-40px, -20px) rotate(180deg)'
					}
				},
				'float-gentle': {
					'0%, 100%': {
						transform: 'translate(0, 0)'
					},
					'25%': {
						transform: 'translate(20px, -15px)'
					},
					'50%': {
						transform: 'translate(-15px, -25px)'
					},
					'75%': {
						transform: 'translate(-25px, 10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Cinematic Animations
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'fade-in-down': 'fade-in-down 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.8s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				// Floating Ball Animations
				'float-slow': 'float-slow 15s ease-in-out infinite',
				'float-slower': 'float-slower 20s ease-in-out infinite',
				'float-gentle': 'float-gentle 12s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
