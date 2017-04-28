import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = ({ user }) => {
  // if(this.props.posts[0].menu_cat[0] == 8) {
  //   console.log('drink');
  // }

  return (
    <div className='navigation'>
      <nav>
        <ul>
          <NavLink to={'/matur'}>
            <img src={process.env.PUBLIC_URL + '/img/matur-icon.svg'} alt='' />
            <li>Matseðill</li>
          </NavLink>
          <NavLink to={`/myorder`} className='order_link'>
            <li className='order_btn'>
              <img className='order_icon_light' src={process.env.PUBLIC_URL + '/img/order_logo.svg'} alt='' />
              <img className='order_icon_dark' src={process.env.PUBLIC_URL + '/img/order_logo_black.svg'} alt='' />
            </li>
          </NavLink>
          <NavLink to={'/drykkir'}>
            <img src={process.env.PUBLIC_URL + '/img/drykkir-icon.svg'} alt='' />
            <li>Drykkir</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
