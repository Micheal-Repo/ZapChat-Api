import { Response, Request } from "express";

function errHandler(err: any, req: Request, res: Response, next: any) {
  console.log("error middlware");

  if (err.status) {
    const error = {
      success:false,
      message: err.message,
      type: err.type,
      status: err.status,
    };
    console.log(error);
    res.status(err.status).json(error);
  } else {
    const error = {
      msg: err.message,
      type: "server error",
      status: 500,
    };
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export default errHandler;
