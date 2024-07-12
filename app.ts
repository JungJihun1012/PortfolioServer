import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";

const app = express();
const GOOGLE_CLINET_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../PortFolio/dist")));

app.use("/", indexRouter);

// React에 모든 라우터 처리
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../PortFolio/dist/index.html"));
});

// catch 404 and forward to error handler


// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
