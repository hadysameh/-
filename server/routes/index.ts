import {Express} from 'express'
import waredRouterfrom from './controllers-routes/waredRoutes'
import saderRouter from './controllers-routes/saderRoutes'
import homeRouter from './controllers-routes/homeRoutes'
// console.log(routes)

export let routesAssigner = (app:Express):void=>{
    app.use('/api/',waredRouterfrom)
    app.use('/api/',saderRouter)
    app.use('/api/',homeRouter)
    // app.use()
    // for (const key in routes) {
    //     if (Object.prototype.hasOwnProperty.call(routes, key)) {
    //         const element = routes[key];
    //         app.use('/api/',element)
    //     }
    // }
}

// exports = route_handler
