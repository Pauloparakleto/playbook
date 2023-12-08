import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type FormGroupProps = {
  aria?: {[key: string]: string},
  children?: Node,
  className?: string,
  data?: object,
  fullWidth?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
}

const FormGroup = (props: FormGroupProps) => {
  const {
    aria = {},
    className,
    data = {},
    fullWidth = false,
    htmlOptions = {},
    id,
    children,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_form_group_kit', { full: fullWidth }), globalProps(props), className)
  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {children}
    </div>
  )
}

export default FormGroup
