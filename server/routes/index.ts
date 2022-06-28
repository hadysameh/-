import {Express} from 'express'
import waredRouterfrom from './controllers-routes/waredRoutes'
// console.log(routes)

export let routesAssigner = (app:Express):void=>{
    app.use('/api/',waredRouterfrom)
    // app.use()
    // for (const key in routes) {
    //     if (Object.prototype.hasOwnProperty.call(routes, key)) {
    //         const element = routes[key];
    //         app.use('/api/',element)
    //     }
    // }
}

// exports = route_handler
