const Course = require('../models/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storesCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses',{
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
            
         /*   
        Courses.countDocumentsDeleted()
            .then((deleteCount) => {
                console.log(deleteCount);
            })
            .catch(() => {});
        

        Course.find({})
            .then(courses => res.render('me/stored-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
        */
    }

    // [GET] /me/trash/courses
    trashCourses(req,res,next){
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }

}

module.exports = new MeController();