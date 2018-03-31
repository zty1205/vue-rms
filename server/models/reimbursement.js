const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 报销审批 MongoDB Schema模型
const RemSchema = new Schema({

    // 申请人
    applicat: {
        id: String,
        name: String,
        applicat_role: String,
        img_url: String // 图片证明
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

const Reimbursement = mongoose.model('Reimbursement', RemSchema)

module.exports = Reimbursement
