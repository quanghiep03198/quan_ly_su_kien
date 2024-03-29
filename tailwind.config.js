const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ['class'],
   content: ['./src/**/*.{ts,tsx}'],
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
            sans: ['Inter var', ...defaultTheme.fontFamily.sans]
         },
         containers: {
            xs: '80px',
            sm: '128px'
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
            success: {
               DEFAULT: 'hsl(var(--success))',
               foreground: 'hsl(var(--success-foreground))'
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
            }
         },
         screens: {
            sm: {
               min: '320px',
               max: '599px'
            },
            md: {
               min: '600px',
               max: '1023px'
            },
            lg: {
               min: '1024px',
               max: '1365px'
            },
            xl: { min: '1366px' },
            xxl: { min: '1920px' }
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
         },
         keyframes: {
            'accordion-down': {
               from: { height: 0 },
               to: { height: 'var(--radix-accordion-content-height)' }
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: 0 }
            }
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out'
         }
      }
   },
   plugins: [
      require('tailwindcss-animate'),
      require('tailwind-scrollbar')({ nocompatible: true }),
      require('@tailwindcss/container-queries'),
      require('@tailwindcss/typography')
   ]
}
