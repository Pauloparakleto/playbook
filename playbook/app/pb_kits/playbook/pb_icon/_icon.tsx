import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'

export type IconSizes = "lg"
| "xs"
| "sm"
| "1x"
| "2x"
| "3x"
| "4x"
| "5x"
| "6x"
| "7x"
| "8x"
| "9x"
| "10x"
| ""

type IconProps = {
  aria?: {[key: string]: string},
  border?: string,
  className?: string,
  customIcon?: {[key: string] :SVGElement},
  data?: {[key: string]: string},
  fixedWidth?: boolean,
  flip?: "horizontal" | "vertical" | "both" | "none",
  icon: string,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  inverse?: boolean,
  listItem?: boolean,
  pull?: "left" | "right" | "none",
  pulse?: boolean,
  rotation?: 90 | 180 | 270,
  size?: IconSizes,
  fontStyle?: 'far' | 'fas' | 'fab' | 'fak',
  spin?: boolean,
} & GlobalProps

const flipMap = {
  horizontal: 'fa-flip-horizontal',
  vertical: 'fa-flip-vertical',
  both: 'fa-flip-horizontal fa-flip-vertical',
  none: ""
}

const Icon = (props: IconProps) => {
  const {
    aria = {},
    border = false,
    className,
    customIcon,
    data = {},
    fixedWidth = true,
    flip = "none",
    htmlOptions = {},
    icon,
    id,
    inverse = false,
    listItem = false,
    pull,
    pulse = false,
    rotation,
    size,
    fontStyle = 'far',
    spin = false,
  } = props

  const faClasses = {
    'fa-border': border,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-li': listItem,
    'fa-pulse': pulse,
    'fa-spin': spin,
    [`fa-${size}`]: size,
    [`fa-pull-${pull}`]: pull,
    [`fa-rotate-${rotation}`]: rotation,

  }

  // Lets check and see if the icon prop is referring to a custom Power icon...
  // If so, then set fa-icon to "custom"
  // this ensures the JS will not do any further operations
  // faClasses[`fa-${icon}`] = customIcon ? 'custom' : icon
  if (!customIcon) faClasses[`fa-${icon}`] = icon
  
  const classes = classnames(
    flipMap[flip],
    'pb_icon_kit',
    customIcon ? '' : fontStyle,
    faClasses,
    globalProps(props),
    className
  )

  const classesEmoji = classnames(
    'pb_icon_kit_emoji',
    globalProps(props),
    className
  )

  aria.label ? null : aria.label = `${icon} icon`
  const ariaProps: {[key: string]: any} = buildAriaProps(aria)
  const dataProps: {[key: string]: any} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  // Add a conditional here to show only the SVG if custom
  const displaySVG = (customIcon: any) => {
    if (customIcon)
      return (
        <>
          {
            React.cloneElement(customIcon, {
              ...dataProps,
              ...htmlProps,
              className: classes,
              id,
            })
          }
        </>
      )
    else if (isValidEmoji(icon))
      return (
        <>
          <span
              {...dataProps}
              {...htmlProps}
              className={classesEmoji}
              id={id}
          >
            {icon}
          </span>
        </>
      )

    else
      return (
        <>
          <i
              {...dataProps}
              {...htmlProps}
              className={classes}
              id={id}
          />
          <span
              {...ariaProps}
              hidden
          />
        </>
      )
  }

  return (
    <>
      {displaySVG(customIcon)}
    </>
  )
}

export default Icon