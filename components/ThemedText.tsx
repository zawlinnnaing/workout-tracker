import { Text, type TextProps } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const typeClassNames: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-base leading-6',
  defaultSemiBold: 'text-base leading-6 font-semibold',
  title: 'text-[32px] font-bold leading-8',
  subtitle: 'text-xl font-bold',
  link: 'text-base leading-[30px] text-[#0a7ea4]',
};

export function ThemedText({
  className = '',
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? (darkColor ?? '#ECEDEE') : (lightColor ?? '#11181C');

  return (
    <Text
      className={`${typeClassNames[type]} ${className}`}
      style={[{ color }, style]}
      {...rest}
    />
  );
}
