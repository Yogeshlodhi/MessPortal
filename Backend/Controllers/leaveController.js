import { applyLeaveService, getAllLeavesService } from '../Services/leaveService.js';
import { statusCode } from '../Utils/http.js'

const applyLeave = (req, res) => {
    const leaveData = req.body;
    const roll = req.user
    // const roll = req.user
    console.log(roll)
    if (
        !leaveData.startDate ||
        !leaveData.endDate ||
        !leaveData.studentRoll ||
        !leaveData.reason
    ) {
        return res
            .status(statusCode.incorrectCredential)
            .send({ message: 'Fill in all Credentials' })
    }
    applyLeaveService(leaveData, roll)
        .then((data) => {
            return res
                .status(statusCode.created)
                .send({ message: 'Leave Applied', data: data })
        })
        .catch((err) => {
            return res
                .status(statusCode.badRequest)
                .send({ message: 'Bad Request', error: err.message })
        })
}

const getAllLeaves = (req, res) => {
    const student = req.user;
    // console.log(req.user)
    getAllLeavesService(student)
        .then((data) => {
            return res
                    .status(statusCode.ok)
                    .send({message: 'Leaves Found', data: data})
        })
        .catch((err) => {
            return res 
                    .status(statusCode.badRequest)
                    .send({message: err.message})
        })
}

export {
    applyLeave,
    getAllLeaves,
}