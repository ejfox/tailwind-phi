const plugin = require('tailwindcss/plugin')

/**
 * The Golden Ratio (φ or phi) is an irrational number approximately equal to 1.618034.
 * It's found when a line is divided into two parts where the ratio of the longer part 
 * to the shorter part equals the ratio of the whole line to the longer part.
 * 
 * In geometric terms: a/b = (a+b)/a = φ ≈ 1.618034
 */
const phi = 1.618034

// More precise calculations for our layout proportions
const phiRatios = {
  // Major segment: 1/φ = 0.618034
  major: (1 / phi * 100).toFixed(4),  // 61.8034%
  // Minor segment: 1/φ² = 0.381966
  minor: (1 / (phi * phi) * 100).toFixed(4),  // 38.1966%
  // Further subdivision: 1/φ³ = 0.236068
  tertiary: (1 / (phi * phi * phi) * 100).toFixed(4), // 23.6068%
  // Extended ratios for multi-column layouts
  'phi-4': {
    a: (1 / Math.pow(phi, 3) * 100).toFixed(4), // 23.6068%
    b: (1 / Math.pow(phi, 4) * 100).toFixed(4), // 14.5898%
    c: (1 / Math.pow(phi, 5) * 100).toFixed(4), // 9.0170%
    d: (1 / Math.pow(phi, 6) * 100).toFixed(4)  // 5.5728%
  },
  // Multi-column ratios
  columns: {
    // Pure golden ratio progression
    pure: [
      61.8034,  // 1/φ
      38.1966,  // 1/φ²
      23.6068,  // 1/φ³
      14.5898,  // 1/φ⁴
      9.0170,   // 1/φ⁵
      5.5728    // 1/φ⁶
    ],
    // Hybrid approach (major + equal divisions)
    hybrid: (n) => ({
      major: 61.8034,
      equal: (100 - 61.8034) / (n - 1)
    })
  }
}

/**
 * Generates spacing values based on the golden ratio
 * @param {number} base - Base size in pixels (default: 16)
 * @returns {Object} Scale of spacing values in rems
 */
const phiSpacing = (base = 16) => ({
  'phi': `${(base * phi) / 16}rem`,      // 1.618rem (~26px)
  'phi-sm': `${base / 16}rem`,           // 1rem (16px)
  'phi-xs': `${(base / phi) / 16}rem`,   // 0.618rem (~10px)
  'phi-2xs': `${(base / (phi * phi)) / 16}rem`, // 0.382rem (~6px)
})

// Add this new function for typography scale
const phiTypography = (base = 16) => {
  const toRem = (px) => `${px / 16}rem`
  return {
    // Major Scale (Multiplying by φ)
    'phi-3xl': toRem(base * Math.pow(phi, 4)),    // ~71px - Hero headlines
    'phi-2xl': toRem(base * Math.pow(phi, 3)),    // ~44px - Major headlines
    'phi-xl': toRem(base * Math.pow(phi, 2)),     // ~27px - Section headlines
    'phi-lg': toRem(base * phi),                  // ~17px - Subsection headlines
    'phi': toRem(base),                           // 16px - Base size
    
    // Minor Scale (Dividing by φ)
    'phi-sm': toRem(base / phi),                  // ~10px - Small text
    'phi-xs': toRem(base / (phi * phi)),         // ~6px - Very small text
    
    // Intermediate Sizes (Using √φ for smoother progression)
    'phi-2xl-alt': toRem(base * phi * Math.sqrt(phi)),  // ~35px
    'phi-xl-alt': toRem(base * Math.sqrt(phi * phi)),   // ~22px
    'phi-lg-alt': toRem(base * Math.sqrt(phi)),         // ~20px
    'phi-sm-alt': toRem(base / Math.sqrt(phi)),         // ~13px
  }
}

module.exports = plugin(function({ addBase, addUtilities, theme }) {
  addBase({
    ':root': {
      '--phi': phi.toString()
    }
  })

  // Add aspect ratio utilities
  addUtilities({
    '.aspect-phi': {
      aspectRatio: `${phi}/1`
    },
    '.aspect-phi-reverse': {
      aspectRatio: `1/${phi}`
    },
    // Grid utilities
    '.grid-cols-phi-fixed': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.major}%) minmax(0, ${phiRatios.minor}%)`,
    },
    '.grid-cols-phi-thirds': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.minor}%) minmax(0, ${phiRatios.tertiary}%) minmax(0, ${phiRatios.minor}%)`,
    },
    '.grid-cols-phi-small-start': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.tertiary}%) minmax(0, ${100 - parseFloat(phiRatios.tertiary)}%)`,
    },
    '.grid-cols-phi-small-end': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${100 - parseFloat(phiRatios.tertiary)}%) minmax(0, ${phiRatios.tertiary}%)`,
    },
    '.grid-cols-phi-4': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios['phi-4'].a}%) minmax(0, ${phiRatios['phi-4'].b}%) minmax(0, ${phiRatios['phi-4'].c}%) minmax(0, ${phiRatios['phi-4'].d}%)`,
    },
    '.grid-cols-phi-pure': {
      display: 'grid',
      gridTemplateColumns: phiRatios.columns.pure.map(w => `minmax(0, ${w}%)`).join(' ')
    },
    '.grid-cols-phi-5': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.columns.hybrid(5).major}%) repeat(4, minmax(0, ${phiRatios.columns.hybrid(5).equal}%))`
    },
    '.grid-cols-phi-6': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.columns.hybrid(6).major}%) repeat(5, minmax(0, ${phiRatios.columns.hybrid(6).equal}%))`
    },
    '.grid-cols-phi-7': {
      display: 'grid',
      gridTemplateColumns: `minmax(0, ${phiRatios.major}%) repeat(6, minmax(0, ${(100 - phiRatios.major) / 6}%))`,
    }
  })

  // Add spacing utilities explicitly
  addUtilities({
    // Padding utilities
    '.p-phi': { padding: phiSpacing().phi },
    '.p-phi-sm': { padding: phiSpacing()['phi-sm'] },
    '.p-phi-xs': { padding: phiSpacing()['phi-xs'] },
    '.p-phi-2xs': { padding: phiSpacing()['phi-2xs'] },
    
    // Padding X/Y variants
    '.px-phi': { paddingLeft: phiSpacing().phi, paddingRight: phiSpacing().phi },
    '.py-phi': { paddingTop: phiSpacing().phi, paddingBottom: phiSpacing().phi },
    '.px-phi-sm': { paddingLeft: phiSpacing()['phi-sm'], paddingRight: phiSpacing()['phi-sm'] },
    '.py-phi-sm': { paddingTop: phiSpacing()['phi-sm'], paddingBottom: phiSpacing()['phi-sm'] },
    '.px-phi-xs': { paddingLeft: phiSpacing()['phi-xs'], paddingRight: phiSpacing()['phi-xs'] },
    '.py-phi-xs': { paddingTop: phiSpacing()['phi-xs'], paddingBottom: phiSpacing()['phi-xs'] },

    // Individual padding sides
    '.pt-phi': { paddingTop: phiSpacing().phi },
    '.pr-phi': { paddingRight: phiSpacing().phi },
    '.pb-phi': { paddingBottom: phiSpacing().phi },
    '.pl-phi': { paddingLeft: phiSpacing().phi },
    '.pt-phi-sm': { paddingTop: phiSpacing()['phi-sm'] },
    '.pr-phi-sm': { paddingRight: phiSpacing()['phi-sm'] },
    '.pb-phi-sm': { paddingBottom: phiSpacing()['phi-sm'] },
    '.pl-phi-sm': { paddingLeft: phiSpacing()['phi-sm'] },
    '.pt-phi-xs': { paddingTop: phiSpacing()['phi-xs'] },
    '.pr-phi-xs': { paddingRight: phiSpacing()['phi-xs'] },
    '.pb-phi-xs': { paddingBottom: phiSpacing()['phi-xs'] },
    '.pl-phi-xs': { paddingLeft: phiSpacing()['phi-xs'] },

    // Margin utilities
    '.m-phi': { margin: phiSpacing().phi },
    '.m-phi-sm': { margin: phiSpacing()['phi-sm'] },
    '.m-phi-xs': { margin: phiSpacing()['phi-xs'] },
    
    // Margin X/Y variants
    '.mx-phi': { marginLeft: phiSpacing().phi, marginRight: phiSpacing().phi },
    '.my-phi': { marginTop: phiSpacing().phi, marginBottom: phiSpacing().phi },
    '.mx-phi-sm': { marginLeft: phiSpacing()['phi-sm'], marginRight: phiSpacing()['phi-sm'] },
    '.my-phi-sm': { marginTop: phiSpacing()['phi-sm'], marginBottom: phiSpacing()['phi-sm'] },
    '.mx-phi-xs': { marginLeft: phiSpacing()['phi-xs'], marginRight: phiSpacing()['phi-xs'] },
    '.my-phi-xs': { marginTop: phiSpacing()['phi-xs'], marginBottom: phiSpacing()['phi-xs'] },

    // Space Between utilities
    '.space-y-phi > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-y-reverse': '0',
      marginTop: `calc(${phiSpacing().phi} * calc(1 - var(--tw-space-y-reverse)))`,
      marginBottom: `calc(${phiSpacing().phi} * var(--tw-space-y-reverse))`,
    },
    '.space-x-phi > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-x-reverse': '0',
      marginRight: `calc(${phiSpacing().phi} * var(--tw-space-x-reverse))`,
      marginLeft: `calc(${phiSpacing().phi} * calc(1 - var(--tw-space-x-reverse)))`,
    },
    '.space-y-phi-sm > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-y-reverse': '0',
      marginTop: `calc(${phiSpacing()['phi-sm']} * calc(1 - var(--tw-space-y-reverse)))`,
      marginBottom: `calc(${phiSpacing()['phi-sm']} * var(--tw-space-y-reverse))`,
    },
    '.space-x-phi-sm > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-x-reverse': '0',
      marginRight: `calc(${phiSpacing()['phi-sm']} * var(--tw-space-x-reverse))`,
      marginLeft: `calc(${phiSpacing()['phi-sm']} * calc(1 - var(--tw-space-x-reverse)))`,
    },
    '.space-y-phi-xs > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-y-reverse': '0',
      marginTop: `calc(${phiSpacing()['phi-xs']} * calc(1 - var(--tw-space-y-reverse)))`,
      marginBottom: `calc(${phiSpacing()['phi-xs']} * var(--tw-space-y-reverse))`,
    },
    '.space-x-phi-xs > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-x-reverse': '0',
      marginRight: `calc(${phiSpacing()['phi-xs']} * var(--tw-space-x-reverse))`,
      marginLeft: `calc(${phiSpacing()['phi-xs']} * calc(1 - var(--tw-space-x-reverse)))`,
    },

    // Gap utilities
    '.gap-phi': { gap: phiSpacing().phi },
    '.gap-phi-sm': { gap: phiSpacing()['phi-sm'] },
    '.gap-phi-xs': { gap: phiSpacing()['phi-xs'] },
    '.gap-x-phi': { columnGap: phiSpacing().phi },
    '.gap-y-phi': { rowGap: phiSpacing().phi },
    '.gap-x-phi-sm': { columnGap: phiSpacing()['phi-sm'] },
    '.gap-y-phi-sm': { rowGap: phiSpacing()['phi-sm'] },
    '.gap-x-phi-xs': { columnGap: phiSpacing()['phi-xs'] },
    '.gap-y-phi-xs': { rowGap: phiSpacing()['phi-xs'] },
  })

  // Add line height utilities
  addUtilities({
    // Line height utilities based on powers of φ
    '.leading-phi': {
      lineHeight: phi.toString()  // 1.618034
    },
    '.leading-phi-2': {
      lineHeight: (phi * phi).toString()  // 2.618034
    },
    '.leading-phi-0.5': {
      lineHeight: Math.sqrt(phi).toString()  // 1.272019
    },
    '.leading-phi-tight': {
      lineHeight: (1 + (1/phi)).toString()  // 1.381966
    },
    '.leading-phi-relaxed': {
      lineHeight: (phi + (1/phi)).toString()  // 2.236068
    },
  })

  // Add typography utilities with proper classes and line heights
  const typographyUtilities = {
    // Major Scale
    '.text-phi-3xl': { 
      fontSize: phiTypography()['phi-3xl'],
      lineHeight: '1.2',  // Tighter for headlines
    },
    '.text-phi-2xl': { 
      fontSize: phiTypography()['phi-2xl'],
      lineHeight: '1.2'
    },
    '.text-phi-xl': { 
      fontSize: phiTypography()['phi-xl'],
      lineHeight: phi.toString()
    },
    '.text-phi-lg': { 
      fontSize: phiTypography()['phi-lg'],
      lineHeight: (1 + (1/phi)).toString()
    },
    '.text-phi': { 
      fontSize: phiTypography()['phi'],
      lineHeight: (1 + (1/phi)).toString()
    },
    '.text-phi-sm': { 
      fontSize: phiTypography()['phi-sm'],
      lineHeight: (1 + (1/phi)).toString()
    },
    '.text-phi-xs': { 
      fontSize: phiTypography()['phi-xs'],
      lineHeight: (1 + (1/phi)).toString()
    },

    // Alternative Sizes
    '.text-phi-2xl-alt': { 
      fontSize: phiTypography()['phi-2xl-alt'],
      lineHeight: '1.2'
    },
    '.text-phi-xl-alt': { 
      fontSize: phiTypography()['phi-xl-alt'],
      lineHeight: phi.toString()
    },
    '.text-phi-lg-alt': { 
      fontSize: phiTypography()['phi-lg-alt'],
      lineHeight: (1 + (1/phi)).toString()
    },
    '.text-phi-sm-alt': { 
      fontSize: phiTypography()['phi-sm-alt'],
      lineHeight: (1 + (1/phi)).toString()
    }
  }

  addUtilities(typographyUtilities)

  // Theme extensions
  return {
    theme: {
      extend: {
        // Spacing system (padding, margin, gap)
        spacing: phiSpacing(),
        padding: phiSpacing(),
        margin: phiSpacing(),
        gap: phiSpacing(),
        
        // Width system
        width: {
          'phi': `${phiRatios.major}%`,
          'phi-sm': `${phiRatios.minor}%`,
          'phi-xs': `${phiRatios.tertiary}%`
        },
        
        // Height system using viewport units
        height: {
          'phi': '61.8vh',
          'phi-sm': '38.2vh',
          'phi-xs': '23.6vh',
          'phi-2xs': '14.6vh',
        },
        
        // Typography scale
        fontSize: {
          ...phiTypography(),
        },
        
        // Line heights
        lineHeight: {
          'phi': phi.toString(),
          'phi-2': (phi * phi).toString(),
          'phi-0.5': Math.sqrt(phi).toString(),
          'phi-tight': (1 + (1/phi)).toString(),
          'phi-relaxed': (phi + (1/phi)).toString(),
        },
        
        // Border radius
        borderRadius: {
          'phi-sm': '0.382rem',   // 1/φ²
          'phi': '0.618rem',      // 1/φ
          'phi-lg': '1rem',       // Base
        },
        
        // Animation timings
        transitionDuration: {
          'phi': '618ms',         // Based on 1000/φ
          'phi-fast': '382ms',    // Based on 1000/φ²
          'phi-slow': '1000ms',   // Base timing unit
        },
        
        // Golden angle (137.5°)
        rotate: {
          'phi': '137.5deg',      // Golden angle
        }
      }
    }
  }
})