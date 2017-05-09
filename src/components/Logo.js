import React from 'react'

const Logo = () => {
  return (
    <div className='logo'>
      <img src={process.env.PUBLIC_URL + '/img/repeat-logo-tilbod.svg'} alt='' />
    </div>
  )
}

export default Logo
