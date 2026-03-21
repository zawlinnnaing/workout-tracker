import { LucideIcon, LucideProps } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { ComponentType } from 'react';

export type WrappedIcon = ComponentType<LucideProps & { className?: string }>;

export function wrapIcon(icon: LucideIcon): WrappedIcon {
  return cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: 'color',
        width: 'size',
        height: 'size',
      },
    },
  }) as WrappedIcon;
}
