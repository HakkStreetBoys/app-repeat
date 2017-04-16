// import React from 'react';
// import { Link, Route } from 'react-router-dom';
//
// const Topics = ({ match }) => {
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${match.url}/rendering`}>
//             Rendering with React
//           </Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/components`}>
//             Components
//           </Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>
//
//       {/* NOTE Routes can be rendered now! */}
//       <Route path={`${match.url}/:topicId`} component={Topic}/>
//       {/* NOTE No IndexRoute needed! */}
//       <Route exact path={match.url} render={() => (
//         <h3>Please select a topic.</h3>
//       )}/>
//     </div>
//   );
// };
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )
//
// export default Topics;
