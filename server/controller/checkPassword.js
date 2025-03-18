const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')

async function checkPassword(request, response){
    try{
        const {password, userId} = request.body
        const user = await UserModel.findById(userId)
        const verifyPassword = await bcryptjs.compare(password, user.password)
        return response.status(200).json({
            message:"login successfully",
            data:user,
            success : true
        })

    }catch(error){
        return response.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}