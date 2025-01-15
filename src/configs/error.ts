


export default function generateError(status:number,msg:string,type?:string){
  
  let newError:any = new Error(msg)
  newError.status = status
  newError.type = type
  throw newError
}