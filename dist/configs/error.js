export default function generateError(status, msg, type) {
    let newError = new Error(msg);
    newError.status = status;
    newError.type = type;
    throw newError;
}
