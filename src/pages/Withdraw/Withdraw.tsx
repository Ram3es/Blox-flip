import { Outlet } from 'react-router-dom'

export const Withdraw = () => {
  return (
    <div>
      <h1 className='text-red text-5xl'>Withdraw</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus inventore ipsa fugiat
        similique, quia, necessitatibus repudiandae ad commodi architecto aliquam molestiae adipisci
        voluptates nesciunt esse magnam est delectus, iure nulla.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus inventore ipsa fugiat
        similique, quia, necessitatibus repudiandae ad commodi architecto aliquam molestiae adipisci
        voluptates nesciunt esse magnam est delectus, iure nulla.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus inventore ipsa fugiat
        similique, quia, necessitatibus repudiandae ad commodi architecto aliquam molestiae adipisci
        voluptates nesciunt esse magnam est delectus, iure nulla.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus inventore ipsa fugiat
        similique, quia, necessitatibus repudiandae ad commodi architecto aliquam molestiae adipisci
        voluptates nesciunt esse magnam est delectus, iure nulla.
      </p>
      <Outlet/>
    </div>
  )
}
