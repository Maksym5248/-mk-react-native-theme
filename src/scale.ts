import type { StyleSheet } from 'react-native';

const SCALABLE_PROPS = new Set([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'margin',
    'marginVertical',
    'marginHorizontal',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'fontSize',
    'lineHeight',
    'letterSpacing',
    'shadowRadius',
    'shadowOffset',
    'textShadowRadius',
    'top',
    'bottom',
    'left',
    'right',
    'translateX',
    'translateY',
    'scale',
]);

export function applyScale<B extends StyleSheet.NamedStyles<B> | StyleSheet.NamedStyles<any>>(styles: B, scale: number): B {
    const scaledStyles = {} as B;

    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const value = styles[key as keyof B];

            if (typeof value === 'object' && value !== null) {
                scaledStyles[key as keyof B] = applyScale(value as StyleSheet.NamedStyles<B>, scale) as B[keyof B];
            } else if (typeof value === 'number' && SCALABLE_PROPS.has(key)) {
                scaledStyles[key as keyof B] = (value * scale) as StyleSheet.NamedStyles<B> as B[keyof B];
            } else {
                scaledStyles[key as keyof B] = value;
            }
        }
    }

    return scaledStyles;
}
