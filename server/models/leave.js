const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 请假审批 MongoDB Schema模型
const LeaveSchema = new Schema({

    // 申请人
    applicat: {
        id: String,
        name: String,
        applicat_role: String, 
        time_begin: Date,
        time_end: Date,
        reason: String 
    },
    
    // 审批人
    auditor: { 
        id: String,
        name: String,
        role: String, // 审批人职位
        result: String, // 审批结果
        reason: String, // 审批理由 可以不写 用于审批不成功
    },

    // 请假表信息
    leave_id: String, // 要写一个自增长的函数
    created_at: { // 记录时间
        type: Date,
        required: true,
        default: Date.now()
    }

})

const Leave = mongoose.model('Leave', LeaveSchema)

module.exports = Leave
