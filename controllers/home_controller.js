const Habit = require('../models/habits');
const User = require('../models/User');

function parseDate(str) {
    return new Date(str);
}

// homepage controller
module.exports.home = function (req, res) {





    Habit.find({ userId: req.user._id }, function (err, habits) {



        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;

        let curr = new Date
        let week = []
        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            week.push(day)
        }

        if (err) {
            console.log('Error in fetching the habits');
            return;
        }
        return res.render('home', {
            title: "HabitTracker",
            habit_list: habits,
            week_list: week,
            user: req.user,
            today:newdate
        });
    })

}
// controller to create a habit
module.exports.createHabit = function (req, res) {



    console.log(req.body)
    let days = {
        one: req.body.day1,
        two: req.body.day2,
        three: req.body.day3,
        four: req.body.day4,
        five: req.body.day5,
        six: req.body.day6,
        seven: req.body.day7,
    }

    var TotalStreaks=0;

    if(days.one=="yes"){
        TotalStreaks+=1;
    }
    if(days.two=="yes"){
        TotalStreaks+=1;
    }
    if(days.three=="yes"){
        TotalStreaks+=1;
    }
    if(days.four=="yes"){
        TotalStreaks+=1;
    }
    if(days.five=="yes"){
        TotalStreaks+=1;
    }
    if(days.six=="yes"){
        TotalStreaks+=1;
    }
    if(days.seven=="yes"){
        TotalStreaks+=1;
    }


    let errors = [];
    //if startDate is not selected by default it is this day
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
  

    

    // var GoalDate = req.body.end;
    Habit.create({
        userId: req.user._id,
        habit: req.body.habit,
        end: req.body.end,
        description: req.body.description,
        date: Date(),
        startDate: newdate,
        time: req.body.time,
        days: days,
        StreaksPerWeek: TotalStreaks

    }, function (err, newHabit) {
        if (err) {
            console.log('Error in creating habit', err);
            return;
        }

        return res.redirect('back');
        
    });

}



// controller to delete a habit
module.exports.deleteHabit = function (req, res) {
    let id = req.query.id;
    Habit.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("Error in deleting Habit");
            return;
        }
        return res.redirect('back');

    });
}

