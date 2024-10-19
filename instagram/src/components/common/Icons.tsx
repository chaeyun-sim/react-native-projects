import { Ionicons } from '@expo/vector-icons';

interface IconsProps {
  name: string;
  size?: number;
  color?: string;
}

export default function Icons({ name, size, color }: IconsProps) {
  return (
    <Ionicons
      name={name as keyof typeof Ionicons.glyphMap}
      size={size}
      color={color}
    />
  );
}
