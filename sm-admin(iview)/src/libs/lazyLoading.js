export default (url) =>()=>import(`@/views/${url}.vue`)
// export default (path)=> () => resolve => {
//     require.ensure([], (require) => {
//         resolve(require('@' + path + '.vue'))
//     })
// }
// export default (path)=>{
//     return resolve => {
//       require.ensure([], (require) => {
//         console.log("path",path)
//         resolve(require('@' + path + '.vue'))
//       })
//     }
// }
