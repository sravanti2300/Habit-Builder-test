const Habit = require('../models/habits');
const { json } = require('express');

// controller got get details request

function parseDate(str) {
    return new Date(str);
}


function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

module.exports.details = function (req, res) {



    console.log(req.user);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;
   
    console.log(newdate);
    let curr = new Date
    let week = []
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
    }
    let indices = []
    for (let i = 0; i < 7; i++) {
        
        indices.push(datediff(parseDate(newdate), parseDate(week[i])))
    }

    Habit.find({ userId: req.user._id }, function (err, habits) {
        if (err) {
            Console.log('Error in fetching the habits');
            return;
        }

        for (i = 0; i < (habits.length); i++) {
            var Rewardpoints = false;
            var length = habits[i].TrackingStatus.length
            var included = false
            var Alldays = [habits[i].days.one, habits[i].days.two, habits[i].days.three, habits[i].days.four, habits[i].days.five, habits[i].days.six, habits[i].days.seven];

            if ((habits[i].TrackingStatus).length == 0 ) {


                (habits[i].TrackingStatus).push({ Date: newdate, status: "none" });
                Rewardpoints = true;
            }
            
else{
            if ((habits[i].TrackingStatus)[length - 1].Date != newdate ) {

                    (habits[i].TrackingStatus).push({ Date: newdate, status: "none" });
                    Rewardpoints = true;
            }

        }      


            Habit.findByIdAndUpdate(habits[i]._id, habits[i], function (err, newCreatedHabit) {
                if (err) {
                    console.log("Error in Updating");
                    return;
                }
            })


            if (Rewardpoints && ((habits[i].streak) % (habits[i].StreaksPerWeek) == 1)) {


                var IdString = req.user._id;
                User.findOne({ _id: IdString }, function (err, docs) {


                    User.findByIdAndUpdate(IdString, { Rewardcoins: Number(docs.Rewardcoins) + 1 }, function (err, newCreatedHabit) {
                        if (err) {
                            console.log("Error in Updating");
                            return;
                        }
                        req.user.Rewardcoins += 1;

                    })

                });

            }

        }
     
        return res.render('details', {
            title: "HabiTracker",
            habit_list: habits,
            week_list: week,
            indices: indices,
            user: req.user
        });
    })
}
// Updating the database for the request
module.exports.updateHabit = function (req, res) {
    let id = req.query.id;
    var p = req.query.index;
    console.log(p);
    // finding the habit
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("not found");
            return;
        }

        console.log(habit);

        var newHabit = habit
        var tid = newHabit.TrackingStatus.length + Number(p) - 1;
        console.log(tid);
        var val = habit.TrackingStatus[tid].status;

        if (val == "none") {
            habit.TrackingStatus[tid].status = "yes";
            newHabit.streak++;
        } else if (val == "yes") {
            habit.TrackingStatus[tid].status = "no";
            newHabit.streak--;
        } else {
            habit.TrackingStatus[tid].status = "none";
        }

        //updating that found habit
        Habit.findByIdAndUpdate(id, newHabit, function (err, newCreatedHabit) {
            if (err) {
                console.log("Error in Updating");
                return;
            }
            return res.redirect('back');
        })

    });
}


module.exports.allDates = function (req, res) {
    let id = req.query.id;
    var p = req.query.index;


    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day;

    // finding the habit
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("not found");
            return;
        }
        return res.render('EachHabit.ejs', {
            habit_details: habit,
            title: "HabitTracker",
            user: req.user,
            today:newdate

        });
    })


}