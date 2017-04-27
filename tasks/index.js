import gulp from 'gulp'

import { scripts } from './webpack'
import { server }  from './server'

export const dev   = gulp.series( server )
export const build = gulp.series( scripts )

export default dev
