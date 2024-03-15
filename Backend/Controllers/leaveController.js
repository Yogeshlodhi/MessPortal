import { statusCode } from '../Utils/http.js'

const applyLeave = (req, res) => {
    const leaveData = req.body;
    if (
        !leaveData.startDate ||
        !leaveData.endDate ||
        !leaveData.studentName ||
        !leaveData.studentRoll ||
        !leaveData.reason
    ) {
        return res
            .status(statusCode.incorrectCredential)
            .send({message: 'Fill in all Credentials'})
    }

}

export {
    applyLeave,
}