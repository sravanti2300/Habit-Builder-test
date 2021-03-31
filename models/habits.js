const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({


    userId:{

        type :String,
        required:true
    },

    habit:{
        type : String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    end : {
        type:String
    },
    frequency : {
        type:String,

    },
    date:{
        type:String
    },
    time:{
        type:String,
        required:true
    },
    streak:{
        type:Number,
        default:0
    },
    startDate:{
        type:String,
    },
    StreaksPerWeek:{
        type:Number,
        default:0
    },
    days:{
        one:{
            type:String,
            default:null
        },
        two:{
            type:String,
            default:null
        },
        three:{
            type:String,
            default:null
        },
        four:{
            type:String,
            default:null
        },
        five:{
            type:String,
            default:null
        },
        six:{
            type:String,
            default:null
        },
        seven:{
            type:String,
            default:null
        }
    },
    TrackingStatus: [{
        Date:{
            type:String,
            default:null
        },
        status:{
            type:String,
            default:null
        }
         }]
});

const Habit = mongoose.model('Habit',habitSchema);

module.exports = Habit;