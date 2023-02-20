
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

type TAppErr = {
    code:number,
    message:string
}

export class AppError extends Error {
    code: number;
    
    constructor(code: number, message: string) {
        super();
        this.code = code;
        this.message = message;
        this.stack = process.env.NODE_ENV === "production" ? "" : this.stack;
    }
}


const errHandler: ErrorRequestHandler = (error: TAppErr | AppError, req: Request, res: Response, next: NextFunction) => {
    const code = error.code || 500;
    const message = error.message;

    if (!(error instanceof AppError)) {
        return res.status(code).json({
            message: "The problem is on our end. We are working on fixing it.",
            success: false,
            data: null,
        });
    }

    res.status(code).json({
        message,
        success: false,
        data: null,
    });
    
};
export default errHandler;