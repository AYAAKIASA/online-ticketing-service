import express from 'express';
import mongoose, { Types } from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import User, { IUser } from './models/User';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// @ts-ignore
mongoose.connect('mongodb://localhost:27017/mydatabase', mongooseOptions)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Express 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 설정
app.use(session({
  secret: 'your-secret-session-key',
  resave: false,
  saveUninitialized: false,
}));

// Passport 초기화 및 세션 사용 설정
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
    done(null, user._id); // 세션에 사용자 ID 저장
  });
  
  passport.deserializeUser(async (id: any, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // 요청마다 사용자 정보를 전달
    } catch (err) {
      done(err);
    }
  });

// Local Strategy 설정
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !user.verifyPassword(password)) {
      return done(null, false, { message: '유효하지 않은 자격 증명입니다.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// 라우터 등록
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
