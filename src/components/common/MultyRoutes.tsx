// import React from 'react'
// import { Navigate, matchRoutes, matchPath, useMatch, useMatches, useLocation } from 'react-router-dom'

// const MultyRoutes = () => {
//   const { pathname } = useLocation()
//   const pathList = [{ pathPattern: '/r/:code' }, { pathPattern: '/p/:code' }]

//   const res = pathList.find(({ pathPattern }) => matchPath(pathPattern, pathname))
//   if (res) {
//     const pathObj = useMatch(res.pathPattern)
//     const typeCode = pathObj?.pathname.split('/')[1]
//     console.log(typeCode, '====================================>>>>>>>>')
//   }
//   console.log(res, '====================================>>>>>>>>')
//   // const mtch = useMatch('/r/:code')
//   // console.log(mtch, '====================================>>>>>>>>')

//   return <Navigate to='/' replace />
// }

// export default MultyRoutes
