import React from 'react';
import { DefaultTheme, Chip } from 'react-native-paper';

interface IProps {
  delta: number;
}

const DeltaCoinCard: React.FC<IProps> = ({ delta }) => {
  const icon = delta < 0 ? 'arrow-down' : 'arrow-up';
  const color = delta < 0 ? DefaultTheme.colors.notification : DefaultTheme.colors.accent;
  return (
    <Chip icon={icon} style={{ backgroundColor: color, marginRight: 15 }} selected selectedColor="white">
      {delta} %
    </Chip>
  );
};

export default DeltaCoinCard;
