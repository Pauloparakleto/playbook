import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'
import Contact from '../pb_contact/_contact'
import Person from '../pb_person/_person'
import { GenericObject } from '../types'

type ContactItem = {
  contactType: string,
  contactValue: string,
  contactDetail: string,
}

type PersonContactProps = {
  aria?: { [key: string]: string },
  className?: string | string[],
  data?: GenericObject,
  firstName: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  lastName: string,
  contacts?: ContactItem[],
}

const PersonContact = (props: PersonContactProps): React.ReactElement => {
  const {
    aria = {},
    className,
    contacts = [],
    data = {},
    firstName,
    htmlOptions = {},
    id,
    lastName,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_person_contact_kit'),
    globalProps(props),
    className
  )

  const wrongContacts = () => (
    contacts.filter((contactObject) => (
      contactObject.contactType === 'wrong-phone'
    ))
  )

  const validContacts = () => (
    contacts.filter((contactObject) => (
      contactObject.contactType !== 'wrong-phone'
    ))
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Person
          firstName={firstName}
          lastName={lastName}
      />
      {validContacts().map((contactObject, index) => (
        <Contact
            contactDetail={contactObject.contactDetail}
            contactType={contactObject.contactType}
            contactValue={contactObject.contactValue}
            key={`valid-contact-${index}`}
        />
      ))}
      {wrongContacts().map((contactObject, index) => (
        <div key={`wrong-contact-caption-wrapper-${index}`}>
          <Caption
              className="wrong_numbers"
              key={`wrong-contact-caption-${index}`}
              text="wrong number"
          />
          <Contact
              contactType={contactObject.contactType}
              contactValue={contactObject.contactValue}
              key={`wrong-contact-${index}`}
          />
        </div>
      ))}
    </div>
  )
}

export default PersonContact
