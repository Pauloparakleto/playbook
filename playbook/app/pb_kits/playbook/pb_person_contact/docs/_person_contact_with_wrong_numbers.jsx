import React from 'react'

import PersonContact from '../_person_contact'

const PersonContactWithWrongNumbers = (props) => {
  return (
    <>
      <PersonContact
          contacts={[
            {
              contactType: 'email',
              contactValue: 'email@example.com',
            },
            {
              contactValue: '5555555555',
            },
            {
              contactType: 'wrong-phone',
              contactValue: '3245627482',
            },
            {
              contactType: 'phone',
              contactValue: '3048615385',
            },
          ]}
          firstName="Pauline"
          key="person-contact-1"
          lastName="Smith"
          {...props}
      />
    </>
  )
}

export default PersonContactWithWrongNumbers
