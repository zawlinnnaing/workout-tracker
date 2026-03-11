import {
  Dumbbell,
  Home,
  LucideIcon,
  ChevronRight,
  Send,
  Code,
} from 'lucide-react-native';
import { OpaqueColorValue, type StyleProp, type ViewStyle } from 'react-native';

const MAPPING: Record<string, LucideIcon> = {
  'house.fill': Home,
  'figure.strengthtraining.traditional': Dumbbell,
  'paperplane.fill': Send,
  'chevron.left.forwardslash.chevron.right': Code,
  'chevron.right': ChevronRight,
};

type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  const Icon = MAPPING[name];
  return <Icon size={size} color={color as string} style={style} />;
}
