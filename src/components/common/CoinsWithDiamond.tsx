import { FC } from 'react'

import CoinsContainer, { CoinsContainerProps } from '../containers/Coins/CoinsContainer'
import IconContainer, { IconContainerProps } from '../containers/IconContainer'
import CoinsTypography, { CoinsTypographyProps } from '../containers/Coins/CoinsTypography'

import DiamondIcon from '../icons/DiamondIcon'

interface CoinsWithDiamondProps
  extends CoinsTypographyProps,
  CoinsContainerProps,
  IconContainerProps {
  iconClasses?: string
}

const CoinsWithDiamond: FC<CoinsWithDiamondProps> = ({
  containerColor,
  containerSize,
  iconContainerColor,
  iconContainerSize,
  iconClasses,
  typographyFontColor,
  typographyFontSize,
  typographyQuantity
}) => {
  return (
    <CoinsContainer containerColor={containerColor} containerSize={containerSize}>
      <IconContainer iconContainerColor={iconContainerColor} iconContainerSize={iconContainerSize}>
        <DiamondIcon className={iconClasses} />
      </IconContainer>
      <CoinsTypography
        typographyFontColor={typographyFontColor}
        typographyFontSize={typographyFontSize}
        typographyQuantity={typographyQuantity}
      />
    </CoinsContainer>
  )
}
export default CoinsWithDiamond
